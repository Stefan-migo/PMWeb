import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import HomePage from "@/app/page";

describe("Landing Page", () => {
  it("renders all three section titles", () => {
    render(<HomePage />);
    expect(screen.getAllByText("Tatuajes").length).toBeGreaterThan(0);
    expect(screen.getAllByText("Escénico").length).toBeGreaterThan(0);
    expect(screen.getAllByText("Arte").length).toBeGreaterThan(0);
  });

  it("has links to tattoo, stage and art sections", () => {
    render(<HomePage />);
    const tattooLink = screen.getByLabelText("Ir a sección Tatuajes");
    expect(tattooLink).toHaveAttribute("href", "/tatuajes");
    const stageLink = screen.getByLabelText("Ir a sección Escénico");
    expect(stageLink).toHaveAttribute("href", "/escenico");
    const artLink = screen.getByLabelText("Ir a sección Arte");
    expect(artLink).toHaveAttribute("href", "/arte");
  });
});
