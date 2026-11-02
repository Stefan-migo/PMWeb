import type { ComponentType, ReactNode } from "react";
import {
  ArrowDown,
  ArrowDownRight,
  ArrowLeft,
  ArrowLeftRight,
  ArrowRight,
  ArrowUp,
  ArrowUpRight,
  Asterisk,
  type LucideProps,
} from "lucide-react";
import styles from "./Glyph.module.css";

export type GlyphKind =
  | "up-right"
  | "down-right"
  | "right"
  | "left"
  | "up"
  | "down"
  | "left-right"
  | "asterisk";

const GLYPHS: Record<GlyphKind, ComponentType<LucideProps>> = {
  "up-right": ArrowUpRight,
  "down-right": ArrowDownRight,
  right: ArrowRight,
  left: ArrowLeft,
  up: ArrowUp,
  down: ArrowDown,
  "left-right": ArrowLeftRight,
  asterisk: Asterisk,
};

interface GlyphProps {
  kind: GlyphKind;
  className?: string;
}

/**
 * A single decorative marker of the approved designs: the diagonals that close a
 * link, the arrows of a viewer, the asterisk that separates the phrases of a
 * marquee.
 *
 * These were literal characters (`↗`, `←`, `✳`). Those code points are
 * emoji-capable, and on phones the font fallback picked the colour emoji font, so
 * the arrow a designer drew turned into an emoji. An SVG removes the font from
 * the equation entirely: same shape, same size and no emoji on any platform.
 *
 * The icon lives inside a wrapper `span` on purpose. The section stylesheets
 * reset every image and svg they contain (`.shell svg { display: block }` in the
 * art section), which turns a bare inline `<svg>` into a block box and splits the
 * line it sits on. The wrapper owns the layout; the icon only fills it.
 *
 * Always decorative — the text next to it already carries the meaning — so it is
 * hidden from assistive technology.
 */
export function Glyph({ kind, className }: GlyphProps) {
  const Icon = GLYPHS[kind];
  const classes = [styles.glyph, kind === "asterisk" && styles.asterisk, className]
    .filter(Boolean)
    .join(" ");

  return (
    <span className={classes} aria-hidden="true">
      <Icon
        className={styles.icon}
        strokeWidth={kind === "asterisk" ? 2 : 1.4}
        focusable="false"
      />
    </span>
  );
}

interface GlyphPairProps {
  kind: GlyphKind;
  children: ReactNode;
}

/**
 * A label with its marker, kept on one line.
 *
 * Section links are flex containers (the mobile panel is a flex column, the
 * desktop nav a flex row), so a bare sibling `<svg>` becomes its own flex item
 * and drops below the text. Pairing them in a single inline-flex box keeps the
 * marker where the design puts it, on every breakpoint.
 */
export function GlyphPair({ kind, children }: GlyphPairProps) {
  return (
    <span className={styles.pair}>
      <span>{children}</span>
      <Glyph kind={kind} />
    </span>
  );
}
