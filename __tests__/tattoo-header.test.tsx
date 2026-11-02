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
    expect(within(nav).getByRole("link", { name: "Diseños" })).toHaveAttribute(
      "href",
      "#disenos-disponibles",
    );
    expect(within(nav).getByRole("link", { name: "Cuidados" })).toHaveAttribute(
      "href",
      "#cuidados",
    );
  });

  it("offers the wordmark as the way back into the landing and the quote pill", () => {
    render(<TattooHeader />);

    expect(screen.getByRole("link", { name: "Pájaro Maca, tatuajes" })).toHaveAttribute(
      "href",
      "#inicio",
    );
    expect(screen.getByRole("link", { name: /Hablemos/ })).toHaveAttribute("href", "#cotizar");
  });

  it("puts the head badge next to the wordmark without renaming the link", () => {
    const { container } = render(<TattooHeader />);

    const badge = container.querySelector('img[src*="pajaro-maca-head-badge"]');

    expect(badge).not.toBeNull();
    // The badge is decorative: the link keeps one readable name.
    expect(badge).toHaveAttribute("alt", "");
    expect(screen.getByRole("link", { name: "Pájaro Maca, tatuajes" })).toBeInTheDocument();
  });

  it("links the same labels to the section pages outside the landing", () => {
    currentPath = "/tatuajes/disenos-disponibles";
    render(<TattooHeader />);

    const nav = screen.getByRole("navigation");

    expect(within(nav).getByRole("link", { name: "Portafolio" })).toHaveAttribute(
      "href",
      "/tatuajes/portafolio",
    );
    expect(within(nav).getByRole("link", { name: "Cuidados" })).toHaveAttribute(
      "href",
      "/tatuajes/cuidados",
    );
    expect(screen.getByRole("link", { name: "Pájaro Maca, tatuajes" })).toHaveAttribute(
      "href",
      "/tatuajes",
    );
    expect(screen.getByRole("link", { name: /Hablemos/ })).toHaveAttribute(
      "href",
      "/tatuajes/cotizar",
    );
  });

  it("marks the current section page as the active link", () => {
    currentPath = "/tatuajes/cuidados";
    render(<TattooHeader />);

    const nav = screen.getByRole("navigation");
    const active = within(nav).getByRole("link", { name: "Cuidados" });

    expect(active).toHaveAttribute("aria-current", "page");
    expect(within(nav).getByRole("link", { name: "Portafolio" })).not.toHaveAttribute(
      "aria-current",
    );
  });

  it("leaves the section for the three-option main page from Más", () => {
    currentPath = "/tatuajes/portafolio";
    render(<TattooHeader />);

    expect(
      within(screen.getByRole("navigation")).getByRole("link", { name: /Más/ }),
    ).toHaveAttribute("href", "/");
  });

  it("toggles the mobile menu and closes it with Escape", () => {
    render(<TattooHeader />);

    fireEvent.click(screen.getByRole("button", { name: "Abrir menú" }));
    expect(screen.getByRole("button", { name: "Cerrar menú" })).toHaveAttribute(
      "aria-expanded",
      "true",
    );

    fireEvent.keyDown(window, { key: "Escape" });
    expect(screen.getByRole("button", { name: "Abrir menú" })).toHaveAttribute(
      "aria-expanded",
      "false",
    );
  });
});
