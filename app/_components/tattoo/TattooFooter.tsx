"use client";

import Link from "next/link";
import { GlyphPair } from "@/app/_components/shared/Glyph";
import { TattooMark } from "@/app/_components/tattoo/TattooMark";
import "./TattooFooter.css";

type TattooFooterProps = {
  /** The landing sells the next story; a sub-page closes its own page. */
  variant?: "landing" | "section";
};

const COPY = {
  landing: {
    kicker: "¿Lo imaginamos?",
    headline: "Tu próxima historia.",
    bottomLeft: "Tatuajes · Villarrica, Chile",
  },
  section: {
    kicker: "La siguiente historia",
    headline: "¿La imaginamos?",
    bottomLeft: "Tatuajes · Inicio",
  },
} as const;

export function TattooFooter({ variant = "section" }: TattooFooterProps) {
  const copy = COPY[variant];
  const isLanding = variant === "landing";

  return (
    <footer className={`tattoo-footer tattoo-footer--${variant}`}>
      <div className="tattoo-footer__top">
        <p>{copy.kicker}</p>
        <Link href="/tatuajes/cotizar">
          <GlyphPair kind="up-right">{copy.headline}</GlyphPair>
        </Link>
      </div>

      <p className="tattoo-footer__brand">
        pájaro maca
        <TattooMark tone="dark" className="tattoo-footer__mark" />
      </p>

      <div className="tattoo-footer__bottom">
        {isLanding ? (
          <span>{copy.bottomLeft}</span>
        ) : (
          <Link href="/tatuajes">{copy.bottomLeft}</Link>
        )}
        <a href="https://instagram.com/pajaro_maca" target="_blank" rel="noopener noreferrer">
          <GlyphPair kind="up-right">Instagram</GlyphPair>
        </a>
        {isLanding ? (
          <Link href="/"><GlyphPair kind="up-right">Explorar más de mi universo</GlyphPair></Link>
        ) : (
          <span>Villarrica, Chile</span>
        )}
        <a href="#contenido"><GlyphPair kind="up">Volver arriba</GlyphPair></a>
      </div>
    </footer>
  );
}

export default TattooFooter;
