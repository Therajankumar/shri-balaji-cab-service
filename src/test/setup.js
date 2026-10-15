import "@testing-library/jest-dom/vitest";
import { cleanup } from "@testing-library/react";
import { afterEach, vi } from "vitest";

afterEach(() => {
  cleanup();
  vi.restoreAllMocks();
});

// jsdom doesn't implement these browser APIs; the app (and framer-motion) use them.
class MockIntersectionObserver {
  constructor(callback) {
    this.callback = callback;
  }
  observe() {}
  unobserve() {}
  disconnect() {}
  takeRecords() {
    return [];
  }
}
globalThis.IntersectionObserver = MockIntersectionObserver;
window.IntersectionObserver = MockIntersectionObserver;
Element.prototype.scrollIntoView = vi.fn();
window.scrollTo = vi.fn();
