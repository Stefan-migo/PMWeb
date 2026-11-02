import { beforeEach, describe, expect, it } from "vitest";
import { fireEvent, render, screen, within } from "@testing-library/react";
import { PortafolioPage } from "@/app/_components/tattoo/PortafolioPage";
import type { Tattoo } from "@/app/_lib/queries/tattoos";

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

const records: Tattoo[] = [
  {
    id: 1,
    title: "Corazón & botánica",
    slug: "corazon",
    image_path: "/design/tatuajes-redesign/tattoo-1.webp",
    style: "Botánico",
    tags: ["Color", "Botánico"],
    sort_order: 0,
    is_published: true,
  },
  {
    id: 2,
    title: "Un vuelo propio",
    slug: "vuelo",
    image_path: "/design/tatuajes-redesign/tattoo-4.webp",
    style: "Fauna",
    tags: ["Fauna", "Línea"],
    sort_order: 1,
    is_published: true,
  },
  {
    id: 3,
    title: "Imaginario con felino",
    slug: "felino",
    image_path: "/design/tatuajes-redesign/tattoo-8.webp",
    style: "Figurativo",
    tags: ["Figurativo", "Blackwork"],
    sort_order: 2,
    is_published: true,
  },
];

const openers = () => screen.getAllByRole("button", { name: /^Ampliar / });

describe("PortafolioPage", () => {
  beforeEach(() => {
    installDialogShim();
  });

  it("renders one piece per record with its caption", () => {
    render(<PortafolioPage records={records} />);

    expect(openers()).toHaveLength(3);
    expect(screen.getByText("Corazón & botánica")).toBeInTheDocument();
    expect(screen.getByText("Color · Botánico")).toBeInTheDocument();
  });

  it("offers only the styles the collection carries", () => {
    render(<PortafolioPage records={records} />);

    const filters = screen.getByRole("group", { name: "Filtrar tatuajes" });

    expect(within(filters).getAllByRole("button")).toHaveLength(4);
    expect(within(filters).getByRole("button", { name: "Todos" })).toHaveAttribute(
      "aria-pressed",
      "true",
    );
  });

  it("hides the pieces that do not match and updates the count", () => {
    render(<PortafolioPage records={records} />);

    fireEvent.click(screen.getByRole("button", { name: "Fauna" }));

    expect(openers()).toHaveLength(1);
    expect(screen.getByRole("status")).toHaveTextContent("01 TRABAJO");
  });

  it("opens the viewer on the piece that was clicked", () => {
    render(<PortafolioPage records={records} />);

    fireEvent.click(openers()[1]);

    const dialog = screen.getByRole("dialog", { name: "Fotografía de tatuaje" });

    expect(dialog).toHaveAttribute("open");
    expect(within(dialog).getByText(/Un vuelo propio/)).toBeInTheDocument();
  });
});
