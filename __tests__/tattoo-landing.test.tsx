import { beforeEach, describe, expect, it } from "vitest";
import { fireEvent, render, screen, within } from "@testing-library/react";
import { TatuajesPageV2 } from "@/app/_components/blocks/TatuajesPageV2/TatuajesPageV2";
import { portfolioImages } from "@/app/_lib/tattoo/designs";

/**
 * jsdom implements the dialog element and its `open` attribute but not the
 * top-layer methods the viewer needs, so the shim replicates `showModal` and
 * the `close` event.
 */
function installDialogShim() {
  if (typeof HTMLDialogElement === "undefined") return;

  HTMLDialogElement.prototype.showModal = function showModal(this: HTMLDialogElement) {
    this.open = true;
  };

  HTMLDialogElement.prototype.close = function close(this: HTMLDialogElement) {
    if (!this.open) return;
    this.open = false;
    this.dispatchEvent(new Event("close"));
  };
}

const workOpeners = () => screen.getAllByRole("button", { name: /^Ver (?!foto|más|menos)/ });

describe("TatuajesPageV2", () => {
  beforeEach(() => {
    installDialogShim();
  });

  it("keeps the approved hero: one screen-reader title and no visible heading", () => {
    render(<TatuajesPageV2 />);

    const heading = screen.getByRole("heading", { level: 1 });

    expect(heading).toHaveTextContent("Pájaro Maca · Tatuajes");
    expect(heading).toHaveClass("tatuajes-page-v2__sr-only");
    expect(screen.getByRole("link", { name: /Cotizar/ })).toHaveAttribute("href", "#cotizar");
    expect(screen.getAllByRole("button", { name: /^Ver foto/ })).toHaveLength(3);
  });

  it("lets the visitor pick a photograph and pause the rotation", () => {
    render(<TatuajesPageV2 />);

    fireEvent.click(screen.getByRole("button", { name: "Ver foto 2" }));
    expect(screen.getByRole("button", { name: "Ver foto 2" })).toHaveAttribute(
      "aria-pressed",
      "true",
    );
    expect(
      within(screen.getByRole("region", { name: "Tatuajes Pájaro Maca" })).getByText("02"),
    ).toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: "Pausar carrusel" }));
    expect(screen.getByRole("button", { name: "Reanudar carrusel" })).toHaveAttribute(
      "aria-pressed",
      "true",
    );
  });

  it("shows four featured works and expands to the whole selection", () => {
    render(<TatuajesPageV2 />);

    expect(workOpeners()).toHaveLength(4);

    const more = screen.getByRole("button", { name: /Ver más tatuajes/ });
    expect(more).toHaveAttribute("aria-expanded", "false");

    fireEvent.click(more);
    expect(workOpeners()).toHaveLength(8);

    fireEvent.click(screen.getByRole("button", { name: /Ver menos/ }));
    expect(workOpeners()).toHaveLength(4);
  });

  it("opens the viewer on the selected work and moves through the selection", () => {
    render(<TatuajesPageV2 />);

    fireEvent.click(workOpeners()[0]);

    const dialog = screen.getByRole("dialog", { name: "Fotografía de tatuaje" });
    expect(dialog).toHaveAttribute("open");
    expect(within(dialog).getByText(/01 \/ 08 — Corazón & botánica/)).toBeInTheDocument();
    expect(document.body).toHaveClass("tattoo-lightbox-open");

    fireEvent.click(within(dialog).getByRole("button", { name: "Siguiente fotografía" }));
    expect(within(dialog).getByText(/02 \/ 08/)).toBeInTheDocument();

    fireEvent.click(within(dialog).getByRole("button", { name: "Fotografía anterior" }));
    expect(within(dialog).getByText(/01 \/ 08/)).toBeInTheDocument();

    fireEvent.click(within(dialog).getByRole("button", { name: "Cerrar fotografía" }));
    expect(dialog).not.toHaveAttribute("open");
    expect(document.body).not.toHaveClass("tattoo-lightbox-open");
  });

  it("keeps every section and its route", () => {
    render(<TatuajesPageV2 />);

    expect(screen.getByRole("heading", { name: /El arte de/ })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: /Una idea esperando/ })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: /Una colaboración/ })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: /Todo empieza/ })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: /El cuidado también/ })).toBeInTheDocument();

    expect(screen.getByRole("link", { name: /Ver portafolio completo/ })).toHaveAttribute(
      "href",
      "/tatuajes/portafolio",
    );
    expect(screen.getByRole("link", { name: /Ver diseños disponibles/ })).toHaveAttribute(
      "href",
      "/tatuajes/disenos-disponibles",
    );
    expect(screen.getByRole("link", { name: /Solicitar cotización/ })).toHaveAttribute(
      "href",
      "/tatuajes/cotizar",
    );
    expect(screen.getByRole("link", { name: /Leer guía de cuidados/ })).toHaveAttribute(
      "href",
      "/tatuajes/cuidados",
    );
    expect(screen.getByRole("link", { name: /Conoce mi universo/ })).toHaveAttribute(
      "href",
      "https://instagram.com/pajaro_maca",
    );
  });

  it("stamps the brand mark in the footer", () => {
    const { container } = render(<TatuajesPageV2 />);

    const mark = container.querySelector('img[src*="pajaro-maca-silhouette-dark"]');

    expect(mark).not.toBeNull();
    expect(mark).toHaveAttribute("alt", "");
  });

  it("renders the designs it is given instead of a hardcoded list", () => {
    const [firstDesign] = [
      { id: "pieza", src: portfolioImages[0].src, alt: "Pieza de prueba", name: "Pieza de prueba", status: "Disponible" as const, detail: "Detalle de prueba." },
    ];

    render(<TatuajesPageV2 designs={[firstDesign]} />);

    expect(screen.getByRole("heading", { name: "Pieza de prueba" })).toBeInTheDocument();
    expect(screen.getByText("Detalle de prueba.")).toBeInTheDocument();
  });
});
