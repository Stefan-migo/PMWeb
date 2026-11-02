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
  const works = document.querySelector("#obras");
  if (!(works instanceof HTMLElement)) throw new Error("The works section is missing");
  fireEvent.click(within(works).getByRole("button", { name: trigger }));
  return screen.getByRole("dialog", { name: title });
}

describe("Escénico portfolio — content", () => {
  it("renders the photographic hero and its carousel controls", () => {
    render(<PortfolioEscenico />);

    const title = screen.getByRole("heading", { level: 1 });
    expect(title).toHaveTextContent("Pájaro Maca · Artes escénicas");

    const hero = screen.getByRole("region", {
      name: "Archivo escénico de Macarena Almeida",
    });
    expect(within(hero).getByText("01")).toBeInTheDocument();
    expect(within(hero).getAllByRole("button", { name: /^Ver fotografía \d+:/ })).toHaveLength(6);
    expect(within(hero).getByRole("group", { name: "1 de 6" })).toBeInTheDocument();
    expect(within(hero).getByRole("button", { name: "Pausar carrusel" })).toHaveAttribute(
      "aria-pressed",
      "false",
    );
  });

  it("advances the carousel, announces the change and toggles pause", () => {
    render(<PortfolioEscenico />);
    const hero = screen.getByRole("region", {
      name: "Archivo escénico de Macarena Almeida",
    });

    fireEvent.click(within(hero).getByRole("button", { name: "Fotografía siguiente" }));

    expect(within(hero).getByText("02")).toBeInTheDocument();
    expect(within(hero).getByRole("group", { name: "2 de 6" })).toBeInTheDocument();
    expect(
      within(hero).getByText("Fotografía 2 de 6. Archivo escénico"),
    ).toBeInTheDocument();
    expect(
      within(hero).getByRole("button", { name: "Ver fotografía 2: Archivo escénico" }),
    ).toHaveAttribute("aria-current", "true");

    fireEvent.click(within(hero).getByRole("button", { name: "Fotografía anterior" }));
    expect(within(hero).getByText("01")).toBeInTheDocument();

    const pause = within(hero).getByRole("button", { name: "Pausar carrusel" });
    fireEvent.click(pause);
    expect(pause).toHaveAttribute("aria-pressed", "true");
    expect(pause).toHaveAccessibleName("Reanudar carrusel");
  });

  it("opens the full hero photograph and returns the focus on Escape", () => {
    render(<PortfolioEscenico />);
    const hero = screen.getByRole("region", {
      name: "Archivo escénico de Macarena Almeida",
    });
    const expand = within(hero).getByRole("button", { name: "Ver fotografía completa" });

    fireEvent.click(expand);

    const viewer = screen.getByRole("dialog", { name: "Fotografía escénica completa" });
    expect(
      within(viewer).getByAltText(/Intérpretes con vestuario blanco/),
    ).toBeInTheDocument();

    fireEvent.keyDown(viewer, { key: "Escape" });
    expect(viewer).not.toHaveAttribute("open");
    expect(expand).toHaveFocus();
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

    const downloads = screen.getAllByRole("link", {
      name: /Descargar portafolio|Portafolio escénico/,
    });
    expect(downloads).toHaveLength(2);
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
    const works = document.querySelector("#obras");
    if (!(works instanceof HTMLElement)) throw new Error("The works section is missing");
    const trigger = within(works).getByRole("button", { name: /Tensión Superficial/ });
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
    expect(screen.getByRole("link", { name: "Más" })).toHaveAttribute("href", "/");
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
