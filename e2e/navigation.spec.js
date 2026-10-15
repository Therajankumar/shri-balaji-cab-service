import { expect, test } from "@playwright/test";

test.describe("Navigation", () => {
  test("desktop: menu links scroll to sections and highlight the active one", async ({ page, isMobile }) => {
    test.skip(isMobile, "desktop menu only");
    await page.goto("/");
    const nav = page.getByRole("navigation", { name: "Main" });

    for (const [link, id] of [["Fleet", "fleet"], ["Reviews", "testimonials"], ["Contact", "contact"]]) {
      await nav.getByRole("link", { name: link }).click();
      await expect(page.locator(`#${id}`)).toBeInViewport();
      await expect(nav.getByRole("link", { name: link })).toHaveAttribute("aria-current", "page");
    }
  });

  test("mobile: hamburger menu opens, navigates and closes", async ({ page, isMobile }) => {
    test.skip(!isMobile, "mobile menu only");
    await page.goto("/");
    await page.getByRole("button", { name: "Open menu" }).click();
    const menu = page.getByRole("navigation", { name: "Mobile" });
    await expect(menu).toBeVisible();

    await menu.getByRole("link", { name: "Fleet" }).click();
    await expect(page.locator("#fleet")).toBeInViewport();
    await expect(page.getByRole("button", { name: "Open menu" })).toHaveAttribute("aria-expanded", "false");
  });

  test("navbar becomes solid after scrolling", async ({ page }) => {
    await page.goto("/");
    const header = page.locator("header");
    await expect(header).toHaveClass(/bg-transparent/);
    await page.evaluate(() => window.scrollTo(0, 800));
    await expect(header).toHaveClass(/backdrop-blur-md/);
  });

  test("back-to-top button is clickable (not covered) and returns to the top", async ({ page }) => {
    await page.goto("/");
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    // a normal click fails if another element (e.g. the floating Call button) covers the button
    await page.getByRole("button", { name: "Back to top" }).click();
    await expect.poll(() => page.evaluate(() => window.scrollY)).toBeLessThan(5);
  });
});

test.describe("Layout at common screen widths", () => {
  for (const width of [768, 1024, 1280, 1366]) {
    test(`back-to-top is not covered by floating buttons at ${width}px`, async ({ page, isMobile }) => {
      test.skip(isMobile, "desktop widths only");
      await page.setViewportSize({ width, height: 800 });
      await page.goto("/");
      await page.evaluate(() => window.scrollTo({ top: document.body.scrollHeight, behavior: "instant" }));
      await expect
        .poll(() => page.evaluate(() => window.scrollY + window.innerHeight >= document.body.scrollHeight - 2))
        .toBe(true);
      const box = await page.getByRole("button", { name: "Back to top" }).boundingBox();
      const topElement = await page.evaluate(
        ({ x, y }) => document.elementFromPoint(x, y)?.closest("button,a")?.getAttribute("aria-label"),
        { x: box.x + box.width / 2, y: box.y + box.height / 2 }
      );
      expect(topElement).toBe("Back to top");
    });
  }
});
