import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import HomePage from "@/app/page";

describe("Landing Page", () => {
  it("renders both section titles", () => {
    render(<HomePage />);
    expect(screen.getByText("TATUAJES")).toBeInTheDocument();
    expect(screen.getByText("ARTE")).toBeInTheDocument();
  });

  it("renders navigation links", () => {
    render(<HomePage />);
    const instagramLink = screen.getByLabelText("Instagram");
    expect(instagramLink).toBeInTheDocument();
    const whatsappLink = screen.getByLabelText("WhatsApp");
    expect(whatsappLink).toBeInTheDocument();
  });

  it("has links to tattoo and art sections", () => {
    render(<HomePage />);
    const tattooLink = screen.getByLabelText("Ir a sección Tatuajes");
    expect(tattooLink).toHaveAttribute("href", "/tatuajes");
    const artLink = screen.getByLabelText("Ir a sección Arte");
    expect(artLink).toHaveAttribute("href", "/arte");
  });
});
