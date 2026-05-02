import "@testing-library/jest-dom/vitest";

// Mock IntersectionObserver for framer-motion's useInView and Next.js Link
class MockIntersectionObserver {
  observe() {}
  unobserve() {}
  disconnect() {}
}

Object.defineProperty(window, "IntersectionObserver", {
  writable: true,
  configurable: true,
  value: MockIntersectionObserver,
});

// Mock scrollIntoView
Element.prototype.scrollIntoView = () => {};
