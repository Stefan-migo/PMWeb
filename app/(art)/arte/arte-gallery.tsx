"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import styles from "./arte.module.css";
import {
  arteCategories,
  arteCountLabel,
  filterArteWorks,
  type ArteCategoryFilter,
  type ArteWork,
} from "@/app/_lib/arte/works";

const instagramUrl = "https://www.instagram.com/pajaro_maca/";

interface ArteGalleryProps {
  works: ArteWork[];
}

/**
 * Curated gallery from the approved reference package: category filters, a
 * masonry of works and a native dialog viewer. The viewer keeps the prototype's
 * behaviour — arrow keys, Escape, scroll lock and focus return — implemented
 * with React state instead of DOM APIs.
 */
export function ArteGallery({ works }: ArteGalleryProps) {
  const [category, setCategory] = useState<ArteCategoryFilter>("Todas");
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const reducedMotion = useReducedMotion();
  const dialogRef = useRef<HTMLDialogElement>(null);
  const openerRef = useRef<HTMLButtonElement | null>(null);

  const visible = filterArteWorks(works, category);
  const active = activeIndex === null ? null : (visible[activeIndex] ?? null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (activeIndex === null) {
      if (dialog.open) dialog.close();
      return;
    }

    if (!dialog.open) dialog.showModal();
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "";
    };
  }, [activeIndex]);

  useEffect(() => {
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  const open = (index: number, opener: HTMLButtonElement) => {
    openerRef.current = opener;
    setActiveIndex(index);
  };

  const move = (delta: number) => {
    setActiveIndex((current) => {
      if (current === null || visible.length === 0) return current;
      return (current + delta + visible.length) % visible.length;
    });
  };

  const close = () => {
    setActiveIndex(null);
  };

  return (
    <>
      <div className={styles.filters}>
        <div className={styles.filterList} role="group" aria-label="Filtrar obras">
          {arteCategories.map((option) => (
            <button
              key={option}
              type="button"
              className={styles.filter}
              aria-pressed={option === category}
              onClick={() => setCategory(option)}
            >
              {option}
            </button>
          ))}
        </div>
        <span className={styles.count} aria-live="polite">
          {arteCountLabel(visible.length)}
        </span>
      </div>

      {visible.length === 0 ? (
        <p className={styles.emptyGallery}>
          Todavía no hay obras en esta categoría.
        </p>
      ) : (
        <div className={styles.gallery} key={category}>
          {visible.map((work, index) => (
            <motion.button
              key={work.id}
              type="button"
              className={styles.work}
              data-reveal=""
              aria-label={`Ver obra ${work.code}: ${work.alt}`}
              onClick={(event) => open(index, event.currentTarget)}
              initial={{ opacity: 0, y: 34, scale: 0.985 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{
                duration: reducedMotion ? 0 : 0.7,
                delay: reducedMotion ? 0 : (index % 3) * 0.08,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              <span className={styles.artFrame}>
                <Image
                  src={work.src}
                  alt={work.alt}
                  width={work.width}
                  height={work.height}
                  sizes="(max-width: 620px) 45vw, (max-width: 900px) 30vw, 28vw"
                  className={styles.workImage}
                  loading={index < 3 ? "eager" : "lazy"}
                />
                <span className={styles.viewBadge} aria-hidden="true">
                  ↗
                </span>
              </span>
              <span className={styles.caption}>
                <span className={styles.captionTitle}>{work.title}</span>
                <span className={styles.captionMeta}>
                  {work.category} / {work.code}
                </span>
              </span>
            </motion.button>
          ))}
        </div>
      )}

      <p className={styles.curationNote}>
        Agrupaciones curatoriales propuestas para esta selección. Las piezas sin
        título confirmado se presentan como «Sin título».
      </p>

      <dialog
        ref={dialogRef}
        className={styles.viewerDialog}
        aria-label="Visor de obras"
        onClose={() => {
          setActiveIndex(null);
          openerRef.current?.focus();
        }}
        onKeyDown={(event) => {
          if (event.key === "ArrowRight") {
            event.preventDefault();
            move(1);
          }
          if (event.key === "ArrowLeft") {
            event.preventDefault();
            move(-1);
          }
        }}
      >
        <div className={styles.viewer}>
          <div className={styles.viewerHead}>
            <span>
              {activeIndex === null
                ? ""
                : `${String(activeIndex + 1).padStart(2, "0")} / ${String(visible.length).padStart(2, "0")}`}
            </span>
            <span>PÁJARO MACA · OBRA VISUAL</span>
            <button
              type="button"
              className={styles.viewerClose}
              aria-label="Cerrar visor"
              onClick={close}
            >
              ×
            </button>
          </div>

          <div className={styles.viewerImageWrap}>
            {active ? (
              <Image
                src={active.src}
                alt={active.alt}
                fill
                sizes="100vw"
                className={styles.viewerImage}
              />
            ) : null}
            <div className={styles.viewerNav}>
              <button
                type="button"
                className={styles.viewerNavButton}
                aria-label="Obra anterior"
                onClick={() => move(-1)}
              >
                ←
              </button>
              <button
                type="button"
                className={styles.viewerNavButton}
                aria-label="Obra siguiente"
                onClick={() => move(1)}
              >
                →
              </button>
            </div>
          </div>

          <div className={styles.viewerFoot}>
            <div>
              <h3 className={styles.viewerTitle}>
                {active ? `${active.title} · ${active.code}` : ""}
              </h3>
              <p className={styles.viewerCategory}>{active?.category ?? ""}</p>
            </div>
            <a
              className={styles.viewerAsk}
              href={instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              Consultar por esta obra ↗
            </a>
          </div>
        </div>
      </dialog>
    </>
  );
}
