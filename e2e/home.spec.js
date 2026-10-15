import { expect, test } from "@playwright/test";

import { scrollThroughPage } from "./helpers";

test.describe("Home page", () => {
  test("loads with the right title and SEO description", async ({ page }) => {
    await page.goto("/");
    await expect(page).toHaveTitle(/Shri Balaji Faridabad Cab Service/);
    await expect(page.locator('meta[name="description"]')).toHaveAttribute("content", /Faridabad/);
    await expect(page.getByRole("heading", { level: 1 })).toContainText("Reliable Cabs");
  });

  test("has no JavaScript errors or console errors", async ({ page }) => {
    const errors = [];
    page.on("pageerror", (err) => errors.push(err.message));
    page.on("console", (msg) => msg.type() === "error" && errors.push(msg.text()));
    await page.goto("/");
    await scrollThroughPage(page);
    expect(errors).toEqual([]);
  });

  test("shows every section", async ({ page }) => {
    await page.goto("/");
    await scrollThroughPage(page);
    for (const heading of [
      "Premium Travel Solutions",
      "Choose Your Perfect Ride",
      "Your Trusted Travel Partner",
      "What Our Customers Say",
      "Book Your Cab Today",
    ]) {
      await expect(page.getByRole("heading", { name: heading })).toBeVisible();
    }
  });

  test("every image loads (no broken images) and uses WebP", async ({ page }) => {
    await page.goto("/");
    await scrollThroughPage(page);
    // wait for lazy images near the bottom to finish downloading
    await page.waitForFunction(() => [...document.images].every((img) => img.complete), null, { timeout: 10_000 });
    const images = await page.$$eval("img", (imgs) =>
      imgs.map((img) => ({ src: img.currentSrc || img.src, ok: img.complete && img.naturalWidth > 0 }))
    );
    expect(images.length).toBeGreaterThan(5);
    for (const image of images) {
      expect(image.ok, `broken image: ${image.src}`).toBe(true);
      expect(image.src).toMatch(/\.webp$|^data:image/);
    }
  });

  // The local preview server doesn't compress files, so this is the *uncompressed* size.
  // Real hosting (Vercel/Netlify) gzips text files; Lighthouse measured ~232 KB transferred.
  test("first load is lightweight (< 800 KB uncompressed)", async ({ page }) => {
    let bytes = 0;
    page.on("response", async (res) => {
      const len = Number(res.headers()["content-length"] || 0) || (await res.body().catch(() => Buffer.alloc(0))).length;
      bytes += len;
    });
    await page.goto("/", { waitUntil: "networkidle" });
    expect(bytes).toBeLessThan(800 * 1024);
  });

  test("page does not scroll sideways", async ({ page }) => {
    await page.goto("/");
    await scrollThroughPage(page);
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
    expect(overflow).toBeLessThanOrEqual(0);
  });

  test("floating Call and WhatsApp buttons point to the business", async ({ page }) => {
    await page.goto("/");
    await expect(page.getByRole("link", { name: "Call now", exact: true })).toHaveAttribute("href", "tel:+919229129633");
    await expect(page.getByRole("link", { name: "Chat on WhatsApp" }).last()).toHaveAttribute(
      "href",
      "https://wa.me/919229129633"
    );
  });
});
