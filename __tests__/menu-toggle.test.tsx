import { describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MenuToggle } from "@/app/_components/shared/MenuToggle";

/**
 * The art and scenic headers used to swap a text label ("Menú +" / "Cerrar −")
 * to show that the mobile navigation was open. The affordance is now an animated
 * hamburger that morphs into a cross, so the state has to stay exposed to
 * assistive technology and voice control even though the visible word no longer
 * changes.
 */
describe("MenuToggle", () => {
  it("exposes the closed state as an expandable control", () => {
    render(<MenuToggle open={false} controls="arte-mobile-nav" onChange={() => {}} />);

    const toggle = screen.getByRole("button", { name: "Abrir menú" });
    expect(toggle).toHaveAttribute("aria-expanded", "false");
    expect(toggle).toHaveAttribute("aria-controls", "arte-mobile-nav");
    expect(toggle).toHaveAttribute("type", "button");
  });

  it("exposes the open state as a closable control", () => {
    render(<MenuToggle open controls="arte-mobile-nav" onChange={() => {}} />);

    expect(screen.getByRole("button", { name: "Cerrar menú" })).toHaveAttribute(
      "aria-expanded",
      "true",
    );
  });

  it("keeps a visible label that the accessible name still contains", () => {
    // WCAG 2.5.3: the accessible name must contain the visible label text.
    const { rerender } = render(
      <MenuToggle open={false} controls="nav" onChange={() => {}} />,
    );

    expect(screen.getByText("Menú")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /menú/i })).toBeInTheDocument();

    rerender(<MenuToggle open controls="nav" onChange={() => {}} />);
    expect(screen.getByText("Menú")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /menú/i })).toBeInTheDocument();
  });

  it("reports the next state when pressed", async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    const { rerender } = render(
      <MenuToggle open={false} controls="nav" onChange={onChange} />,
    );

    await user.click(screen.getByRole("button", { name: "Abrir menú" }));
    expect(onChange).toHaveBeenCalledWith(true);

    rerender(<MenuToggle open controls="nav" onChange={onChange} />);
    await user.click(screen.getByRole("button", { name: "Cerrar menú" }));
    expect(onChange).toHaveBeenLastCalledWith(false);
  });

  it("keeps the bars decorative", () => {
    const { container } = render(
      <MenuToggle open={false} controls="nav" onChange={() => {}} />,
    );

    const decorative = container.querySelectorAll('[aria-hidden="true"]');
    expect(decorative.length).toBeGreaterThan(0);
    // Three bars, all inside the decorative group.
    expect(decorative[0].querySelectorAll("span").length).toBeGreaterThanOrEqual(3);
  });
});
