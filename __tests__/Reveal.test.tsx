import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { Reveal } from "@/app/_components/shared/Reveal";

describe("Reveal Component", () => {
  it("renders children", () => {
    render(
      <Reveal>
        <p>Test content</p>
      </Reveal>
    );
    expect(screen.getByText("Test content")).toBeInTheDocument();
  });

  it("applies custom className", () => {
    const { container } = render(
      <Reveal className="custom-class">
        <p>Content</p>
      </Reveal>
    );
    expect(container.firstElementChild).toHaveClass("custom-class");
  });

  it("renders with different directions", () => {
    const { container } = render(
      <Reveal direction="right">
        <p>Content</p>
      </Reveal>
    );
    expect(container.firstElementChild).toBeInTheDocument();
  });

  it("renders with custom delay", () => {
    const { container } = render(
      <Reveal delay={0.5}>
        <p>Content</p>
      </Reveal>
    );
    expect(container.firstElementChild).toBeInTheDocument();
  });
});
