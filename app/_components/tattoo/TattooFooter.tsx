"use client";

import Link from "next/link";
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
          {copy.headline} <span aria-hidden="true">↗</span>
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
          Instagram ↗
        </a>
        {isLanding ? (
          <Link href="/">Explorar más de mi universo ↗</Link>
        ) : (
          <span>Villarrica, Chile</span>
        )}
        <a href="#contenido">Volver arriba ↑</a>
      </div>
    </footer>
  );
}

export default TattooFooter;
