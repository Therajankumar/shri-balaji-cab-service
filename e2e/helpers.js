// Scroll through the whole page so lazy images and scroll animations load.
export async function scrollThroughPage(page) {
  const height = await page.evaluate(() => document.body.scrollHeight);
  for (let y = 0; y <= height; y += 400) {
    await page.evaluate((top) => window.scrollTo(0, top), y);
    await page.waitForTimeout(80);
  }
  await page.waitForLoadState("networkidle");
}

// Fake WhatsApp so tests don't depend on the real site / network.
export async function stubWhatsApp(context) {
  await context.route("https://wa.me/**", (route) =>
    route.fulfill({ status: 200, contentType: "text/html", body: "<title>WhatsApp</title>" })
  );
}

export async function fillBooking(form, { pickup = "Sector 15, Faridabad", name = "Test User", phone = "9876543210" } = {}) {
  await form.getByLabel("Pickup *").fill(pickup);
  await form.getByLabel("Your Name *").fill(name);
  await form.getByLabel("Mobile Number *").fill(phone);
}
