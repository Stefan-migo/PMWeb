"use client";

import type { Ref } from "react";
import styles from "./MenuToggle.module.css";

interface MenuToggleProps {
  /** Whether the panel the button controls is open. */
  open: boolean;
  /** Id of the panel, wired to `aria-controls`. */
  controls: string;
  /** Receives the next state; the header keeps the panel's state. */
  onChange: (open: boolean) => void;
  /** Section class, so each header keeps its own shape and colour. */
  className?: string;
  /** Visible word, kept for the design. The accessible name carries the state. */
  label?: string;
  /** Lets the header return focus to the button when the panel closes. */
  buttonRef?: Ref<HTMLButtonElement>;
}

/**
 * The mobile navigation toggle of the art and scenic headers.
 *
 * It replaces the "+" / "−" character the headers used to swap: those code
 * points are emoji-capable, so phones drew an emoji instead of a sign, and a
 * swapped character told you nothing about where the control was. Three bars
 * morph into a cross while the panel slides open, and the state stays exposed
 * through `aria-expanded` plus a name that contains the visible word.
 *
 * The outer button takes its shape from the section stylesheet; only the inner
 * block owns the layout, so a section rule can still hide the button on desktop.
 */
export function MenuToggle({
  open,
  controls,
  onChange,
  className,
  label = "Menú",
  buttonRef,
}: MenuToggleProps) {
  return (
    <button
      ref={buttonRef}
      type="button"
      className={[className, open ? styles.open : null].filter(Boolean).join(" ")}
      aria-expanded={open}
      aria-controls={controls}
      aria-label={open ? "Cerrar menú" : "Abrir menú"}
      onClick={() => onChange(!open)}
    >
      <span className={styles.inner}>
        <span className={styles.bars} aria-hidden="true">
          <span className={styles.bar} />
          <span className={styles.bar} />
          <span className={styles.bar} />
        </span>
        <span className={styles.label}>{label}</span>
      </span>
    </button>
  );
}

export default MenuToggle;
