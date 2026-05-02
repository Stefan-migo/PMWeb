import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { PageTransition } from "@/app/_components/shared/PageTransition";

vi.mock("next/navigation", () => ({
  usePathname: () => "/test",
}));

describe("PageTransition Component", () => {
  it("renders children", () => {
    render(
      <PageTransition>
        <p>Page content</p>
      </PageTransition>
    );
    expect(screen.getByText("Page content")).toBeInTheDocument();
  });

  it("renders with fadeScale variant", () => {
    const { container } = render(
      <PageTransition variant="fadeScale">
        <p>Content</p>
      </PageTransition>
    );
    expect(container.firstElementChild).toBeInTheDocument();
  });

  it("renders with fadeSlide variant (default)", () => {
    const { container } = render(
      <PageTransition>
        <p>Content</p>
      </PageTransition>
    );
    expect(container.firstElementChild).toBeInTheDocument();
  });
});
