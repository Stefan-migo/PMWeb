import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import SobreMiPage from "../app/(tattoo)/tatuajes/sobre-mi/page";

describe("SobreMiPage", () => {
  it("tells the artist story under one heading", () => {
    render(<SobreMiPage />);

    expect(screen.getByRole("heading", { level: 1, name: /Mi trazo.*Tu historia/ })).toBeInTheDocument();
    expect(screen.getByText(/Soy tatuadora/)).toBeInTheDocument();
    expect(screen.getByText(/Cada tatuaje es una colaboración/)).toBeInTheDocument();
  });

  it("lists the styles she works in", () => {
    render(<SobreMiPage />);

    for (const style of ["Blackwork", "Dotwork", "Geométrico", "Neo-tradicional", "Linework"]) {
      expect(screen.getByRole("heading", { name: style })).toBeInTheDocument();
    }
  });

  it("publishes the studio data and the way to reach her", () => {
    render(<SobreMiPage />);

    expect(screen.getByRole("heading", { name: "Villarrica, Chile" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Lunes a sábado" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /@pajaro_maca/ })).toHaveAttribute(
      "href",
      "https://instagram.com/pajaro_maca",
    );
  });

  it("repeats the monochrome mark instead of the old asterisk", () => {
    const { container } = render(<SobreMiPage />);

    // The philosophy block plus the five styles carry the mark.
    expect(
      container.querySelectorAll('img[src*="pajaro-maca-silhouette-white"]').length,
    ).toBeGreaterThanOrEqual(6);
    expect(screen.queryByText("✳")).not.toBeInTheDocument();
  });
});
