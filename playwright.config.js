import { defineConfig, devices } from "@playwright/test";

// Functional (end-to-end) tests run against real production builds:
//  - port 4180: normal build (no EmailJS keys -> bookings go to WhatsApp)
//  - port 4181: build with test EmailJS keys (email requests are intercepted in the tests)
export default defineConfig({
  testDir: "./e2e",
  fullyParallel: true,
  retries: process.env.CI ? 1 : 0,
  reporter: [["list"], ["json", { outputFile: "test-results/e2e-results.json" }]],
  use: {
    baseURL: "http://localhost:4180",
    trace: "retain-on-failure",
  },
  projects: [
    { name: "desktop", use: { ...devices["Desktop Chrome"] }, testIgnore: /email\.spec/ },
    { name: "mobile", use: { ...devices["Pixel 7"] }, testIgnore: /email\.spec/ },
    {
      name: "emailjs",
      use: { ...devices["Desktop Chrome"], baseURL: "http://localhost:4181" },
      testMatch: /email\.spec/,
    },
  ],
  webServer: [
    {
      command: "npx vite build --outDir dist-e2e && npx vite preview --outDir dist-e2e --port 4180 --strictPort",
      url: "http://localhost:4180",
      reuseExistingServer: !process.env.CI,
      timeout: 120_000,
    },
    {
      command:
        "npx vite build --outDir dist-e2e-email && npx vite preview --outDir dist-e2e-email --port 4181 --strictPort",
      url: "http://localhost:4181",
      reuseExistingServer: !process.env.CI,
      timeout: 120_000,
      env: {
        VITE_EMAILJS_SERVICE_ID: "test_service",
        VITE_EMAILJS_TEMPLATE_ID: "test_template",
        VITE_EMAILJS_PUBLIC_KEY: "test_public_key",
      },
    },
  ],
});
