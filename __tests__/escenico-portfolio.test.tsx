import { beforeAll, describe, expect, it, vi } from "vitest";
import { fireEvent, render, screen, within } from "@testing-library/react";
import { PortfolioEscenico } from "@/app/(scenic)/escenico/portfolio-escenico";
import { ScenicHeader } from "@/app/(scenic)/escenico/scenic-header";

// `next/image` needs the Next.js build pipeline; tests only care about the
// rendered alt text and the fill layout, so a plain img keeps the tree simple.
vi.mock("next/image", () => ({
  default: (props: Record<string, unknown>) => {
    const htmlProps = { ...props };
    delete htmlProps.fill;
    delete htmlProps.priority;
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        {...(htmlProps as React.ImgHTMLAttributes<HTMLImageElement>)}
        alt={String(props.alt ?? "")}
      />
    );
  },
}));

beforeAll(() => {
  // jsdom ships <dialog> but not its modal methods.
  if (typeof HTMLDialogElement === "undefined") return;

  if (!HTMLDialogElement.prototype.showModal) {
    HTMLDialogElement.prototype.showModal = function showModal(this: HTMLDialogElement) {
      this.setAttribute("open", "");
    };
  }

  if (!HTMLDialogElement.prototype.close) {
    HTMLDialogElement.prototype.close = function close(this: HTMLDialogElement) {
      this.removeAttribute("open");
      this.dispatchEvent(new Event("close"));
    };
  }
});

function openWork(trigger: RegExp, title: string) {
  fireEvent.click(screen.getByRole("button", { name: trigger }));
  return screen.getByRole("dialog", { name: title });
}

describe("Escénico portfolio — content", () => {
  it("renders the redesigned hero as the page title", () => {
    render(<PortfolioEscenico />);

    const title = screen.getByRole("heading", { level: 1 });
    expect(title).toHaveTextContent("El cuerpo");
    expect(title).toHaveTextContent("como territorio.");
    expect(screen.getByText("MACARENA ALMEIDA · ARTES ESCÉNICAS")).toBeInTheDocument();
  });

  it("keeps the work sheets, the three featured works and the other crosses", () => {
    render(<PortfolioEscenico />);

    for (const title of [
      "Tensión Superficial",
      "Tres prácticas para habitar",
      "El final de mi carrera",
      "Atlas",
      "Kema",
      "La Taller",
    ]) {
      expect(screen.getAllByText(title).length).toBeGreaterThan(0);
    }
  });

  it("links the other works to their existing detail pages", () => {
    render(<PortfolioEscenico />);

    expect(screen.getByRole("link", { name: /Atlas/ })).toHaveAttribute(
      "href",
      "/escenico/atlas",
    );
    expect(screen.getByRole("link", { name: /Kema/ })).toHaveAttribute(
      "href",
      "/escenico/kema",
    );
    expect(screen.getByRole("link", { name: /La Taller/ })).toHaveAttribute(
      "href",
      "/escenico/la-taller",
    );
  });

  it("keeps the PDF portfolio reachable", () => {
    render(<PortfolioEscenico />);

    const downloads = screen.getAllByRole("link", { name: /Portafolio PDF|Descargar portafolio/ });
    expect(downloads.length).toBeGreaterThanOrEqual(2);
    for (const link of downloads) {
      expect(link).toHaveAttribute("href", "/escenico/assets/pajaro-maca-portafolio-escenico.pdf");
      expect(link).toHaveAttribute("download");
    }
  });
});

describe("Escénico portfolio — work sheet dialog", () => {
  it("opens a work sheet with its credits and full sheet link", () => {
    render(<PortfolioEscenico />);
    const dialog = openWork(/Tensión Superficial/, "Tensión Superficial");

    expect(within(dialog).getByRole("heading", { name: "Tensión Superficial" })).toBeVisible();
    expect(within(dialog).getByText("Kattya Soto")).toBeVisible();
    expect(within(dialog).getByText("42 minutos")).toBeVisible();
    expect(within(dialog).getAllByText("Macarena Almeida")).toHaveLength(2);
    expect(within(dialog).getByRole("link", { name: /Ver ficha completa/ })).toHaveAttribute(
      "href",
      "/escenico/tension-superficial",
    );
  });

  it("locks the page scroll while open and restores it on Escape", () => {
    render(<PortfolioEscenico />);
    const trigger = screen.getByRole("button", { name: /Tensión Superficial/ });
    const dialog = openWork(/Tensión Superficial/, "Tensión Superficial");

    expect(document.body.style.overflow).toBe("hidden");

    fireEvent.keyDown(dialog, { key: "Escape" });

    expect(dialog).not.toHaveAttribute("open");
    expect(document.body.style.overflow).toBe("");
    expect(trigger).toHaveFocus();
  });

  it("opens the photo viewer from a work sheet with only that work's photos", () => {
    render(<PortfolioEscenico />);
    const dialog = openWork(/Tensión Superficial/, "Tensión Superficial");

    fireEvent.click(
      within(dialog).getByRole("button", { name: /Ampliar fotografía 1 de Tensión Superficial/ }),
    );

    const gallery = screen.getByRole("dialog", { name: /visor de fotografías/i });
    expect(within(gallery).getByText("ARCHIVO ESCÉNICO / 01 — 02")).toBeVisible();
  });
});

describe("Escénico portfolio — scene gallery", () => {
  it("opens the viewer, steps with the arrow keys and closes with Escape", () => {
    render(<PortfolioEscenico />);

    fireEvent.click(
      screen.getByRole("button", {
        name: "Ampliar fotografía 1 de presentaciones en escena",
      }),
    );

    const gallery = screen.getByRole("dialog", { name: /visor de fotografías/i });
    expect(within(gallery).getByText("ARCHIVO ESCÉNICO / 01 — 08")).toBeVisible();

    fireEvent.keyDown(gallery, { key: "ArrowRight" });
    expect(within(gallery).getByText("ARCHIVO ESCÉNICO / 02 — 08")).toBeVisible();

    fireEvent.keyDown(gallery, { key: "ArrowLeft" });
    expect(within(gallery).getByText("ARCHIVO ESCÉNICO / 01 — 08")).toBeVisible();

    fireEvent.keyDown(gallery, { key: "Escape" });
    expect(gallery).not.toHaveAttribute("open");
  });
});

describe("Escénico header — mobile menu", () => {
  it("toggles the navigation, exposes aria-expanded and closes with Escape", () => {
    render(<ScenicHeader />);

    const toggle = screen.getByRole("button", { name: /Menú/ });
    const nav = screen.getByRole("navigation", { name: /Navegación principal/ });
    expect(toggle).toHaveAttribute("aria-expanded", "false");
    expect(nav).toHaveAttribute("data-open", "false");

    fireEvent.click(toggle);
    expect(toggle).toHaveAttribute("aria-expanded", "true");
    expect(nav).toHaveAttribute("data-open", "true");

    fireEvent.keyDown(document, { key: "Escape" });
    expect(toggle).toHaveAttribute("aria-expanded", "false");
    expect(toggle).toHaveFocus();
  });
});
