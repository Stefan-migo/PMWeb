import { describe, expect, it, vi } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import { CuidadosPage } from "@/app/_components/tattoo/CuidadosPage";

describe("CuidadosPage", () => {
  it("opens on the first stage and keeps one panel visible", () => {
    render(<CuidadosPage />);

    const tabs = screen.getAllByRole("tab");

    expect(tabs).toHaveLength(4);
    expect(tabs[0]).toHaveAttribute("aria-selected", "true");

    const panels = screen.getAllByRole("tabpanel", { hidden: true });

    expect(panels[0]).not.toHaveAttribute("hidden");
    expect(panels[1]).toHaveAttribute("hidden");
  });

  it("switches stages by click and keeps the caret moving with the arrow keys", () => {
    render(<CuidadosPage />);

    fireEvent.click(screen.getByRole("tab", { name: /Días 2–5/ }));
    expect(screen.getByRole("tab", { name: /Días 2–5/ })).toHaveAttribute(
      "aria-selected",
      "true",
    );

    fireEvent.keyDown(screen.getByRole("tab", { name: /Días 2–5/ }), { key: "ArrowRight" });
    expect(screen.getByRole("tab", { name: /Semana 2/ })).toHaveAttribute("aria-selected", "true");

    fireEvent.keyDown(screen.getByRole("tab", { name: /Semana 2/ }), { key: "End" });
    expect(screen.getByRole("tab", { name: /Semanas 3–4/ })).toHaveAttribute(
      "aria-selected",
      "true",
    );
  });

  it("keeps the medical guidance and the help channel", () => {
    render(<CuidadosPage />);

    expect(screen.getByRole("heading", { name: /Escucha tu piel/ })).toBeInTheDocument();
    expect(screen.getByText(/Ante fiebre, pus, dolor creciente o enrojecimiento/)).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /Consultar por WhatsApp/ })).toHaveAttribute(
      "href",
      expect.stringContaining("wa.me"),
    );
  });

  it("sends the guide to the browser's print dialog", () => {
    const print = vi.fn();
    vi.stubGlobal("print", print);
    render(<CuidadosPage />);

    fireEvent.click(screen.getByRole("button", { name: /Guardar guía/ }));

    expect(print).toHaveBeenCalled();

    vi.unstubAllGlobals();
  });
});
