"use client";

import { useCallback, useEffect, useRef, useState, useSyncExternalStore } from "react";
import type { CSSProperties } from "react";
import Image from "next/image";
import styles from "./arte-hero.module.css";
import {
  arteHeroDuration,
  arteHeroWorks,
} from "@/app/_lib/arte/works";

const iconPause = (
  <svg viewBox="0 0 20 20" aria-hidden="true">
    <path d="M7 4v12M13 4v12" strokeWidth="2" />
  </svg>
);

const iconPlay = (
  <svg viewBox="0 0 20 20" aria-hidden="true">
    <path d="m6 3 10 7-10 7Z" />
  </svg>
);

const total = arteHeroWorks.length;

const REDUCED_MOTION = "(prefers-reduced-motion: reduce)";

function subscribeReducedMotion(onChange: () => void) {
  if (typeof window === "undefined" || typeof window.matchMedia !== "function") {
    return () => {};
  }
  const query = window.matchMedia(REDUCED_MOTION);
  query.addEventListener("change", onChange);
  return () => query.removeEventListener("change", onChange);
}

function getReducedMotion() {
  if (typeof window === "undefined" || typeof window.matchMedia !== "function") {
    return false;
  }
  return window.matchMedia(REDUCED_MOTION).matches;
}

/**
 * Animated hero of the art landing.
 *
 * Ported from the approved hero package: one full-viewport carousel where each
 * work brings its own background and ink colour, with autoplay, pause, arrows,
 * numbered markers, keyboard, touch swipe and fullscreen. The «Ver las seis
 * obras» selector was removed with the page it opened, so the markers are the
 * only way to pick a work.
 */
export function ArteHero() {
  // The carousel starts paused when the visitor asked for reduced motion, and
  // follows that preference until they use the pause control themselves.
  const reducedMotion = useSyncExternalStore(
    subscribeReducedMotion,
    getReducedMotion,
    () => false,
  );
  const [userPaused, setUserPaused] = useState<boolean | null>(null);
  const paused = userPaused ?? reducedMotion;

  const [index, setIndex] = useState(0);
  const [previous, setPrevious] = useState<number | null>(null);
  const [announcement, setAnnouncement] = useState("");

  const heroRef = useRef<HTMLElement | null>(null);
  const currentRef = useRef(0);
  const pausedRef = useRef(paused);
  const elapsedRef = useRef(0);
  const lastRef = useRef(0);
  const fillRefs = useRef<Array<HTMLSpanElement | null>>([]);
  const swipeRef = useRef<{ x: number; y: number } | null>(null);

  const work = arteHeroWorks[index];

  const resetFills = useCallback(() => {
    for (const fill of fillRefs.current) {
      if (fill) fill.style.transform = "scaleX(0)";
    }
  }, []);

  const go = useCallback(
    (next: number, manual = false) => {
      const target = ((next % total) + total) % total;
      if (target === currentRef.current) {
        elapsedRef.current = 0;
        return;
      }

      setPrevious(currentRef.current);
      currentRef.current = target;
      setIndex(target);
      elapsedRef.current = 0;
      resetFills();

      if (manual) {
        setAnnouncement(
          `Obra ${target + 1} de ${total}. ${arteHeroWorks[target].alt}`,
        );
      }
    },
    [resetFills],
  );

  const setPlaying = useCallback((value: boolean) => {
    setUserPaused(value);
  }, []);

  useEffect(() => {
    pausedRef.current = paused;
  }, [paused]);

  // Mirror the slide colours on the document so the section header, which is a
  // sibling of the hero, can take them over the carousel.
  useEffect(() => {
    const root = document.documentElement;
    root.style.setProperty("--hero-bg", work.bg);
    root.style.setProperty("--hero-ink", work.ink);

    const meta = document.querySelector('meta[name="theme-color"]');
    meta?.setAttribute("content", work.bg);

    return () => {
      root.style.removeProperty("--hero-bg");
      root.style.removeProperty("--hero-ink");
    };
  }, [work.bg, work.ink]);

  // Autoplay: one progress fill per slide, advanced by the same duration as the
  // reference package.
  useEffect(() => {
    lastRef.current = performance.now();
    let frame = 0;

    const tick = (now: number) => {
      const delta = Math.min(now - lastRef.current, 100);
      lastRef.current = now;

      const blocked =
        pausedRef.current ||
        document.hidden ||
        document.querySelector("dialog[open]") !== null;

      if (!blocked) {
        elapsedRef.current += delta;
        const ratio = Math.min(elapsedRef.current / arteHeroDuration, 1);
        const fill = fillRefs.current[currentRef.current];
        if (fill) fill.style.transform = `scaleX(${ratio})`;
        if (elapsedRef.current >= arteHeroDuration) go(currentRef.current + 1);
      }

      frame = requestAnimationFrame(tick);
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [go]);

  // Arrow keys drive the carousel; the space bar toggles it. Both stay out of
  // the way while any dialog is open.
  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (document.querySelector("dialog[open]")) return;

      if (event.key === "ArrowRight") {
        event.preventDefault();
        go(currentRef.current + 1, true);
      }
      if (event.key === "ArrowLeft") {
        event.preventDefault();
        go(currentRef.current - 1, true);
      }
      if (event.code === "Space" && event.target === document.body) {
        event.preventDefault();
        setPlaying(!pausedRef.current);
      }
    };

    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [go, setPlaying]);

  const onTouchStart = (event: React.TouchEvent) => {
    const touch = event.changedTouches[0];
    swipeRef.current = { x: touch.clientX, y: touch.clientY };
  };

  const onTouchEnd = (event: React.TouchEvent) => {
    if (!swipeRef.current) return;
    const touch = event.changedTouches[0];
    const dx = touch.clientX - swipeRef.current.x;
    const dy = touch.clientY - swipeRef.current.y;
    if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy)) {
      go(currentRef.current + (dx < 0 ? 1 : -1), true);
    }
    swipeRef.current = null;
  };

  const toggleFullscreen = async () => {
    try {
      if (document.fullscreenElement) {
        await document.exitFullscreen();
      } else {
        await heroRef.current?.requestFullscreen();
      }
    } catch {
      setAnnouncement("La pantalla completa no está disponible en este navegador.");
    }
  };

  return (
    <section
      id="inicio"
      ref={heroRef}
      className={styles.hero}
      style={
        {
          "--hero-bg": work.bg,
          "--hero-ink": work.ink,
        } as CSSProperties
      }
      aria-roledescription="carrusel"
      aria-label="Obras de Pájaro Maca"
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
    >
      <h1 className={styles.srOnly}>La vida en otros colores.</h1>

      <p className={styles.vertical} aria-hidden="true">
        CUERPO · COLOR · IMAGINACIÓN
      </p>
      <p className={styles.signature} aria-hidden="true">
        Un universo en movimiento
      </p>

      <div className={styles.stage}>
        {arteHeroWorks.map((item, i) => {
          const isActive = i === index;
          const isLeaving = i === previous && !isActive;

          return (
            <div
              key={item.id}
              className={`${styles.slide} ${isActive ? styles.slideActive : ""} ${
                isLeaving ? styles.slideLeaving : ""
              }`}
              role="group"
              aria-roledescription="diapositiva"
              aria-label={`${i + 1} de ${total}`}
              aria-hidden={!isActive}
            >
              <Image
                src={item.src}
                alt={item.alt}
                fill
                sizes="(max-width: 760px) 95vw, 85vw"
                className={styles.slideImage}
                priority={i === 0}
                loading={i === 0 ? undefined : "eager"}
                decoding="async"
                draggable={false}
              />
            </div>
          );
        })}
      </div>

      <p
        className={`${styles.hint} ${paused && !reducedMotion ? styles.hintShow : ""}`}
      >
        PAUSA PARA CONTEMPLAR
      </p>

      <footer className={styles.heroFooter}>
        <div className={styles.info}>
          <span className={styles.label}>Obra visual</span>
          <div className={styles.infoLine}>
            <span className={styles.number}>
              {String(index + 1).padStart(2, "0")}
            </span>
            <span className={styles.description}>Selección de ilustraciones</span>
          </div>
        </div>

        <div className={styles.timeline} role="group" aria-label="Seleccionar obra">
          {arteHeroWorks.map((item, i) => (
            <button
              key={item.id}
              type="button"
              className={styles.marker}
              aria-label={`Ver obra ${item.code}: ${item.alt}`}
              aria-current={i === index}
              onClick={() => go(i, true)}
            >
              <span>{item.code}</span>
              <span className={styles.track}>
                <span
                  className={styles.fill}
                  ref={(element) => {
                    fillRefs.current[i] = element;
                  }}
                />
              </span>
            </button>
          ))}
        </div>

        <div className={styles.actions}>
          <button
            type="button"
            className={`${styles.icon} ${styles.pause}`}
            aria-label={paused ? "Reanudar reproducción" : "Pausar reproducción"}
            aria-pressed={paused}
            onClick={() => setPlaying(!paused)}
          >
            {paused ? iconPlay : iconPause}
          </button>
          <button
            type="button"
            className={styles.icon}
            aria-label="Obra anterior"
            onClick={() => go(currentRef.current - 1, true)}
          >
            <svg viewBox="0 0 24 24">
              <path d="M19 12H5m6-6-6 6 6 6" />
            </svg>
          </button>
          <button
            type="button"
            className={styles.icon}
            aria-label="Obra siguiente"
            onClick={() => go(currentRef.current + 1, true)}
          >
            <svg viewBox="0 0 24 24">
              <path d="M5 12h14m-6-6 6 6-6 6" />
            </svg>
          </button>
          <button
            type="button"
            className={`${styles.icon} ${styles.expand}`}
            aria-label="Activar pantalla completa"
            onClick={toggleFullscreen}
          >
            <svg viewBox="0 0 24 24">
              <path d="M9 4H4v5m11-5h5v5M4 15v5h5m11-5v5h-5" />
            </svg>
          </button>
        </div>
      </footer>

      <p className={styles.srOnly} aria-live="polite">
        {announcement}
      </p>
    </section>
  );
}
