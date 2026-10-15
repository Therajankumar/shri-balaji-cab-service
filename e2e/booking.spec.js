import { expect, test } from "@playwright/test";

import { fillBooking, stubWhatsApp } from "./helpers";

test.describe("Booking (no email keys -> WhatsApp)", () => {
  test.beforeEach(async ({ context }) => stubWhatsApp(context));

  test("empty form shows the 3 required-field errors", async ({ page }) => {
    await page.goto("/");
    const form = page.locator("#book");
    await form.getByRole("button", { name: /Request Booking/ }).click();
    await expect(form.getByText("Please enter a pickup location.")).toBeVisible();
    await expect(form.getByText("Please enter your name.")).toBeVisible();
    await expect(form.getByText("Please enter a valid 10-digit mobile number.")).toBeVisible();
  });

  test("invalid phone number is rejected", async ({ page }) => {
    await page.goto("/");
    const form = page.locator("#book");
    await fillBooking(form, { phone: "12345" });
    await form.getByRole("button", { name: /Request Booking/ }).click();
    await expect(form.getByText("Please enter a valid 10-digit mobile number.")).toBeVisible();
  });

  test("valid booking opens WhatsApp with all details", async ({ page, context }) => {
    await page.goto("/");
    const form = page.locator("#book");
    await form.getByRole("radio", { name: /Airport/ }).click();
    await fillBooking(form);
    await form.getByLabel("Drop").fill("IGI Airport T3");
    await form.getByLabel("Vehicle").selectOption("Maruti Ertiga");

    const [popup] = await Promise.all([
      context.waitForEvent("page"),
      form.getByRole("button", { name: /Request Booking/ }).click(),
    ]);
    const text = new URL(popup.url()).searchParams.get("text");
    expect(popup.url()).toContain("wa.me/919229129633");
    expect(text).toContain("Trip: Airport");
    expect(text).toContain("Pickup: Sector 15, Faridabad");
    expect(text).toContain("Drop: IGI Airport T3");
    expect(text).toContain("Vehicle: Maruti Ertiga");
    expect(text).toContain("Phone: 9876543210");
    await expect(form.getByText(/opened in WhatsApp/)).toBeVisible();
  });

  test("fleet 'Book Now' scrolls to the form with that vehicle selected", async ({ page }) => {
    await page.goto("/");
    await page.locator("#fleet").scrollIntoViewIfNeeded();
    await page.locator("#fleet").getByRole("button", { name: "Book Now" }).nth(2).click();
    const form = page.locator("#book");
    await expect(form).toBeInViewport();
    await expect(form.getByLabel("Vehicle")).toHaveValue("Toyota Innova Crysta");
  });

  test("service button scrolls to the form with that trip type selected", async ({ page }) => {
    await page.goto("/");
    await page.getByRole("button", { name: /Book Outstation Ride/ }).click();
    const form = page.locator("#book");
    await expect(form).toBeInViewport();
    await expect(form.getByRole("radio", { name: /Outstation/ })).toHaveAttribute("aria-checked", "true");
  });

  test("contact-section inquiry form also works (with email & notes)", async ({ page, context }) => {
    await page.goto("/#contact");
    const form = page.locator("#contact-form");
    await fillBooking(form);
    await form.getByLabel("Email").fill("customer@example.com");
    await form.getByLabel("Notes").fill("Return trip, 3 bags");

    const [popup] = await Promise.all([
      context.waitForEvent("page"),
      form.getByRole("button", { name: /Request Booking/ }).click(),
    ]);
    const text = new URL(popup.url()).searchParams.get("text");
    expect(text).toContain("Email: customer@example.com");
    expect(text).toContain("Notes: Return trip, 3 bags");
  });
});
