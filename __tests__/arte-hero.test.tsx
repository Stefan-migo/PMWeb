import { describe, expect, it } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import { ArteHero } from "../app/(art)/arte/arte-hero";
import { arteHeroWorks } from "../app/_lib/arte/works";

// Hidden slides are out of the accessibility tree, which is the point of the
// aria-hidden wiring, so the DOM count comes from the attribute itself.
const slides = () =>
  document.querySelectorAll('[aria-roledescription="diapositiva"]');
const activeSlide = () => screen.getByRole("group", { name: /de 8$/ });

const marker = (code: string) =>
  screen.getByRole("button", { name: new RegExp(`^Ver obra ${code}:`) });

describe("ArteHero", () => {
  it("renders the eight slides of the carousel with the first one active", () => {
    render(<ArteHero />);

    expect(slides()).toHaveLength(8);
    expect(activeSlide()).toHaveAttribute("aria-label", "1 de 8");
    expect(screen.getByRole("button", { name: "Pausar reproducción" })).toBeInTheDocument();
    expect(screen.queryByText(/Ver las seis obras/)).not.toBeInTheDocument();
  });

  it("keeps the page title as the document heading", () => {
    render(<ArteHero />);

    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(
      "La vida en otros colores.",
    );
  });

  it("mirrors the slide colours on the document for the section header", () => {
    render(<ArteHero />);

    expect(document.documentElement.style.getPropertyValue("--hero-bg")).toBe(
      arteHeroWorks[0].bg,
    );
    expect(document.documentElement.style.getPropertyValue("--hero-ink")).toBe(
      arteHeroWorks[0].ink,
    );

    fireEvent.click(screen.getByRole("button", { name: "Obra siguiente" }));

    expect(document.documentElement.style.getPropertyValue("--hero-bg")).toBe(
      arteHeroWorks[1].bg,
    );
  });

  it("advances with the arrows and wraps around in both directions", () => {
    render(<ArteHero />);

    fireEvent.click(screen.getByRole("button", { name: "Obra siguiente" }));
    expect(activeSlide()).toHaveAttribute("aria-label", "2 de 8");
    expect(screen.getByText(/^Obra 2 de 8\./)).toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: "Obra anterior" }));
    fireEvent.click(screen.getByRole("button", { name: "Obra anterior" }));
    expect(activeSlide()).toHaveAttribute("aria-label", "8 de 8");
  });

  it("moves through the keyboard and keeps one marker current", () => {
    render(<ArteHero />);

    fireEvent.keyDown(document, { key: "ArrowRight" });
    expect(activeSlide()).toHaveAttribute("aria-label", "2 de 8");
    expect(marker("02")).toHaveAttribute("aria-current", "true");
    expect(marker("01")).toHaveAttribute("aria-current", "false");

    fireEvent.keyDown(document, { key: "ArrowLeft" });
    expect(activeSlide()).toHaveAttribute("aria-label", "1 de 8");
  });

  it("jumps to the selected work from its marker", () => {
    render(<ArteHero />);

    fireEvent.click(marker("06"));

    expect(activeSlide()).toHaveAttribute("aria-label", "6 de 8");
    expect(marker("06")).toHaveAttribute("aria-current", "true");
    expect(screen.getByText(/^Obra 6 de 8\./)).toBeInTheDocument();
  });

  it("toggles the reproduction with the pause control and the space bar", () => {
    render(<ArteHero />);

    const pause = screen.getByRole("button", { name: "Pausar reproducción" });
    expect(pause).toHaveAttribute("aria-pressed", "false");

    fireEvent.click(pause);
    expect(screen.getByRole("button", { name: "Reanudar reproducción" })).toHaveAttribute(
      "aria-pressed",
      "true",
    );

    fireEvent.keyDown(document.body, { code: "Space" });
    expect(screen.getByRole("button", { name: "Pausar reproducción" })).toHaveAttribute(
      "aria-pressed",
      "false",
    );
  });
});
