"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import type { TattooImage } from "@/app/_lib/tattoo/designs";

const ROTATION_MS = 6500;

function pad(value: number) {
  return String(value).padStart(2, "0");
}

/**
 * The approved hero: a full-bleed photograph with no visible title, the quote
 * entry at the bottom-left and the carousel controls at the bottom-right.
 */
export function TattooHeroCarousel({ images }: { images: TattooImage[] }) {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined" || typeof window.matchMedia !== "function") return;

    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const handleMotion = () => {
      if (mediaQuery.matches) setPaused(true);
    };

    handleMotion();
    mediaQuery.addEventListener("change", handleMotion);

    return () => mediaQuery.removeEventListener("change", handleMotion);
  }, []);

  useEffect(() => {
    if (paused || images.length < 2) return;

    const tick = () => {
      if (document.hidden) return;
      setActive((index) => (index + 1) % images.length);
    };
    const timer = window.setInterval(tick, ROTATION_MS);

    return () => window.clearInterval(timer);
  }, [images.length, paused]);

  if (!images.length) return null;

  const current = images[active] ?? images[0];

  return (
    <section
      id="inicio"
      className="tatuajes-page-v2__hero"
      aria-label="Tatuajes Pájaro Maca"
    >
      <h1 className="tatuajes-page-v2__sr-only">Pájaro Maca · Tatuajes</h1>

      <div className="tatuajes-page-v2__hero-images" aria-hidden="true">
        {images.map((image, index) => (
          <div
            key={image.src}
            className={`tatuajes-page-v2__hero-slide ${index === active ? "is-active" : ""}`}
          >
            <Image
              src={image.src}
              alt=""
              fill
              priority={index === 0}
              sizes="100vw"
              className="tatuajes-page-v2__hero-image"
            />
          </div>
        ))}
      </div>
      <div className="tatuajes-page-v2__hero-shade" aria-hidden="true" />

      <div className="tatuajes-page-v2__hero-footer">
        <a className="tatuajes-page-v2__hero-quote" href="#cotizar">
          Cotizar <span aria-hidden="true">↗</span>
        </a>

        <div className="tatuajes-page-v2__hero-controls">
          <span aria-live="polite" className="tatuajes-page-v2__hero-count">
            {pad(active + 1)}
          </span>

          <div className="tatuajes-page-v2__dots" role="group" aria-label="Elegir fotografía">
            {images.map((image, index) => (
              <button
                key={image.src}
                type="button"
                className={index === active ? "is-active" : ""}
                onClick={() => setActive(index)}
                aria-label={`Ver foto ${index + 1}`}
                aria-pressed={index === active}
              />
            ))}
          </div>

          <span className="tatuajes-page-v2__hero-count">{pad(images.length)}</span>

          <button
            type="button"
            className="tatuajes-page-v2__pause"
            onClick={() => setPaused((value) => !value)}
            aria-label={paused ? "Reanudar carrusel" : "Pausar carrusel"}
            aria-pressed={paused}
          >
            {paused ? "▷" : "Ⅱ"}
          </button>
        </div>
      </div>

      <p className="tatuajes-page-v2__sr-only" aria-live="polite">
        {`Fotografía ${active + 1} de ${images.length}: ${current.alt}`}
      </p>
    </section>
  );
}

export default TattooHeroCarousel;
