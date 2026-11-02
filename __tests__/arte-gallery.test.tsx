import { beforeEach, describe, expect, it } from "vitest";
import { fireEvent, render, screen, within } from "@testing-library/react";
import { ArteGallery } from "../app/(art)/arte/arte-gallery";
import { arteWorks } from "../app/_lib/arte/works";

/**
 * jsdom does not implement the modal dialog API yet. This shim only replicates
 * the platform behaviour the component relies on: `open`, `showModal`, `close`
 * and the `close` event a browser fires on Escape.
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

const openers = () =>
  screen.getAllByRole("button", { name: /^Ver obra \d\d:/ });

describe("ArteGallery", () => {
  beforeEach(() => {
    installDialogShim();
    document.body.style.overflow = "";
  });

  it("lists the whole curated selection and its count", () => {
    const { container } = render(<ArteGallery works={arteWorks} />);

    expect(openers()).toHaveLength(15);
    expect(screen.getByText("15 obras")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Todas" })).toHaveAttribute(
      "aria-pressed",
      "true",
    );
    expect(container.querySelector("dialog")?.open).toBe(false);
  });

  it("filters the works by category and keeps the pressed state exclusive", () => {
    render(<ArteGallery works={arteWorks} />);

    fireEvent.click(screen.getByRole("button", { name: "Fauna" }));

    expect(openers()).toHaveLength(4);
    expect(screen.getByText("4 obras")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Fauna" })).toHaveAttribute(
      "aria-pressed",
      "true",
    );
    expect(screen.getByRole("button", { name: "Todas" })).toHaveAttribute(
      "aria-pressed",
      "false",
    );

    fireEvent.click(screen.getByRole("button", { name: "Todas" }));

    expect(openers()).toHaveLength(15);
    expect(screen.getByText("15 obras")).toBeInTheDocument();
  });

  it("opens the viewer on the selected work and reports its position", () => {
    const { container } = render(<ArteGallery works={arteWorks} />);
    const dialog = container.querySelector("dialog")!;
    const viewer = within(dialog);

    fireEvent.click(screen.getByRole("button", { name: /^Ver obra 03:/ }));

    expect(dialog.open).toBe(true);
    expect(viewer.getByText("03 / 15")).toBeInTheDocument();
    expect(viewer.getByText("Sin título · 03")).toBeInTheDocument();
    expect(viewer.getByText("Fauna")).toBeInTheDocument();
    expect(document.body.style.overflow).toBe("hidden");
  });

  it("moves through the filtered selection and wraps around", () => {
    render(<ArteGallery works={arteWorks} />);

    fireEvent.click(screen.getByRole("button", { name: "Fauna" }));
    fireEvent.click(screen.getByRole("button", { name: /^Ver obra 02:/ }));

    expect(screen.getByText("01 / 04")).toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: "Obra siguiente" }));
    expect(screen.getByText("02 / 04")).toBeInTheDocument();
    expect(screen.getByText("Sin título · 03")).toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: "Obra anterior" }));
    fireEvent.click(screen.getByRole("button", { name: "Obra anterior" }));
    expect(screen.getByText("04 / 04")).toBeInTheDocument();
    expect(screen.getByText("Sin título · 09")).toBeInTheDocument();
  });

  it("closes the viewer from its own control and returns the focus", () => {
    const { container } = render(<ArteGallery works={arteWorks} />);
    const dialog = container.querySelector("dialog")!;
    const opener = screen.getByRole("button", { name: /^Ver obra 04:/ });

    opener.focus();
    fireEvent.click(opener);
    expect(dialog.open).toBe(true);

    fireEvent.click(screen.getByRole("button", { name: "Cerrar visor" }));

    expect(dialog.open).toBe(false);
    expect(document.activeElement).toBe(opener);
    expect(document.body.style.overflow).toBe("");
  });
});
