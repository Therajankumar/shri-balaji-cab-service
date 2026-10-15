import { expect, test } from "@playwright/test";

import { fillBooking } from "./helpers";

// Runs against the build that has (test) EmailJS keys. The EmailJS API is intercepted.
test.describe("Booking by email (EmailJS configured)", () => {
  test("successful send shows confirmation and clears the form", async ({ page }) => {
    let payload;
    await page.route("**/api.emailjs.com/**", async (route) => {
      payload = route.request().postDataJSON();
      await route.fulfill({ status: 200, body: "OK" });
    });

    await page.goto("/");
    const form = page.locator("#book");
    await fillBooking(form);
    await form.getByRole("button", { name: /Request Booking/ }).click();

    await expect(form.getByText(/booking request has been sent/)).toBeVisible();
    await expect(form.getByLabel("Pickup *")).toHaveValue("");
    expect(payload.service_id).toBe("test_service");
    expect(payload.template_id).toBe("test_template");
    expect(payload.template_params).toMatchObject({
      pickup: "Sector 15, Faridabad",
      from_name: "Test User",
      phone: "9876543210",
      trip_type: "Local",
    });
  });

  test("failed send shows an error with WhatsApp and call fallbacks", async ({ page }) => {
    await page.route("**/api.emailjs.com/**", (route) => route.fulfill({ status: 500, body: "error" }));

    await page.goto("/");
    const form = page.locator("#book");
    await fillBooking(form);
    await form.getByRole("button", { name: /Request Booking/ }).click();

    const alert = form.getByRole("alert");
    await expect(alert).toContainText("couldn't send your request");
    await expect(alert.getByRole("link", { name: "Send it on WhatsApp" })).toHaveAttribute("href", /wa\.me\/919229129633\?text=/);
    await expect(alert.getByRole("link", { name: "+91 92291 29633" })).toHaveAttribute("href", "tel:+919229129633");
    await expect(form.getByLabel("Pickup *")).toHaveValue("Sector 15, Faridabad");
  });

  test("submit button shows 'Sending...' while waiting", async ({ page }) => {
    let release;
    await page.route("**/api.emailjs.com/**", async (route) => {
      await new Promise((resolve) => (release = resolve));
      await route.fulfill({ status: 200, body: "OK" });
    });

    await page.goto("/");
    const form = page.locator("#book");
    await fillBooking(form);
    await form.getByRole("button", { name: /Request Booking/ }).click();
    await expect(form.getByRole("button", { name: "Sending..." })).toBeDisabled();
    release();
    await expect(form.getByText(/booking request has been sent/)).toBeVisible();
  });
});
