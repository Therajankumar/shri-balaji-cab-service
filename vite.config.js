import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
  // Vitest transforms test files itself; use the same automatic JSX runtime as the app.
  ...(process.env.VITEST && { esbuild: { jsx: "automatic" } }),
  test: {
    environment: "jsdom",
    setupFiles: ["./src/test/setup.js"],
    include: ["src/**/*.test.{js,jsx}"],
    css: false,
    coverage: {
      provider: "v8",
      include: ["src/**/*.{js,jsx}"],
      exclude: ["src/main.jsx", "src/test/**", "src/**/*.test.{js,jsx}"],
      reporter: ["text", "json-summary"],
    },
  },
});
