import { beforeEach, describe, expect, it, vi } from "vitest";
import { fireEvent, render, screen, within } from "@testing-library/react";

let currentPath = "/tatuajes";

vi.mock("next/navigation", () => ({
  usePathname: () => currentPath,
}));

import { TattooHeader } from "@/app/_components/tattoo/TattooHeader";

describe("TattooHeader", () => {
  beforeEach(() => {
    currentPath = "/tatuajes";
  });

  it("renders exactly one navigation landmark", () => {
    render(<TattooHeader />);

    expect(screen.getAllByRole("navigation")).toHaveLength(1);
  });

  it("scrolls to the landing sections with in-page anchors on the landing", () => {
    render(<TattooHeader />);

    const nav = screen.getByRole("navigation");

    expect(within(nav).getByRole("link", { name: "Portafolio" })).toHaveAttribute(
      "href",
      "#portafolio",
    );
    expect(within(nav).getByRole("link", { name: "Cotizar" })).toHaveAttribute(
      "href",
      "#cotizar",
    );
    expect(
      within(nav).getByRole("link", { name: "Diseños disponibles" }),
    ).toHaveAttribute("href", "#disenos-disponibles");
  });

  it("links the same labels to the section pages outside the landing", () => {
    currentPath = "/tatuajes/cotizar";
    render(<TattooHeader />);

    const nav = screen.getByRole("navigation");

    expect(within(nav).getByRole("link", { name: "Portafolio" })).toHaveAttribute(
      "href",
      "/tatuajes/portafolio",
    );
    expect(
      within(nav).getByRole("link", { name: "Diseños disponibles" }),
    ).toHaveAttribute("href", "/tatuajes/disenos-disponibles");
  });

  it("marks the current section page as the active link", () => {
    currentPath = "/tatuajes/cotizar";
    render(<TattooHeader />);

    const nav = screen.getByRole("navigation");
    const active = within(nav).getByRole("link", { name: "Cotizar" });

    expect(active).toHaveAttribute("aria-current", "page");
    expect(within(nav).getByRole("link", { name: "Portafolio" })).not.toHaveAttribute(
      "aria-current",
    );
  });

  it("returns to the three-option main page from PajaroMaca", () => {
    render(<TattooHeader />);

    const homeLink = within(screen.getByRole("navigation")).getByRole("link", {
      name: "PajaroMaca",
    });

    expect(homeLink).toHaveAttribute("href", "/");
  });

  it("keeps the PajaroMaca link on section pages too", () => {
    currentPath = "/tatuajes/portafolio";
    render(<TattooHeader />);

    expect(
      within(screen.getByRole("navigation")).getByRole("link", { name: "PajaroMaca" }),
    ).toHaveAttribute("href", "/");
  });

  it("toggles the mobile menu", () => {
    render(<TattooHeader />);

    fireEvent.click(screen.getByRole("button", { name: "Abrir menú" }));
    expect(screen.getByRole("button", { name: "Cerrar menú" })).toHaveAttribute(
      "aria-expanded",
      "true",
    );

    fireEvent.click(screen.getByRole("button", { name: "Cerrar menú" }));
    expect(screen.getByRole("button", { name: "Abrir menú" })).toHaveAttribute(
      "aria-expanded",
      "false",
    );
  });
});
