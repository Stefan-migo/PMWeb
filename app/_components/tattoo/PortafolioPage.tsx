"use client";

import { useMemo, useState } from "react";
import type { Tattoo } from "@/app/_lib/queries/tattoos";
import type { TattooImage } from "@/app/_lib/tattoo/designs";
import { collectStyles, filterByStyle } from "@/app/_lib/tattoo/portfolio-filter";
import { TattooBreadcrumb, TattooPageCta, TattooPageIntro } from "@/app/_components/tattoo/TattooSubpage";
import { TattooMark } from "@/app/_components/tattoo/TattooMark";
import { TattooLightbox } from "@/app/_components/tattoo/TattooLightbox";
import { PortfolioGallery } from "@/app/_components/tattoo/PortfolioGallery";
import "@/app/_components/tattoo/PortafolioPage.css";

function pad(value: number) {
  return String(value).padStart(2, "0");
}

export function PortafolioPage({ records }: { records: Tattoo[] }) {
  const items = useMemo<TattooImage[]>(
    () => records.map((record) => ({
      src: record.image_path,
      alt: record.title,
      title: record.title,
      style: record.style ?? undefined,
      tags: record.tags,
    })),
    [records],
  );
  const styles = useMemo(() => collectStyles(items), [items]);
  const [activeStyle, setActiveStyle] = useState<string | null>(null);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const visible = useMemo(() => filterByStyle(items, activeStyle), [items, activeStyle]);

  return (
    <div className="tp-portafolio tattoo-subpage">
      <TattooBreadcrumb current="Portafolio" />
      <TattooPageIntro
        eyebrow="01 / TRABAJO EN PIEL"
        title={<>Portafolio<br /><em>en la piel.</em></>}
        lead="Cada pieza es única, creada especialmente para cada persona. Un recorrido por historias que encontraron su forma."
        aside={
          <>
            <TattooMark tone="light" />
            <p>UN TRAZO.<br />UNA HISTORIA.<br />TU PIEL.</p>
          </>
        }
      />

      <section className="tp-collection" aria-label="Galería de tatuajes">
        <div className="tp-toolbar">
          {styles.length > 0 ? (
            <div className="tp-filters" role="group" aria-label="Filtrar tatuajes">
              {[null, ...styles].map((style) => (
                <button
                  key={style ?? "todos"}
                  type="button"
                  className="tp-filter-button"
                  aria-pressed={activeStyle === style}
                  onClick={() => setActiveStyle(style)}
                >
                  {style ?? "Todos"}
                </button>
              ))}
            </div>
          ) : null}
          <span className="tp-result-count" role="status">
            {pad(visible.length)} {visible.length === 1 ? "TRABAJO" : "TRABAJOS"}
          </span>
        </div>

        <PortfolioGallery items={visible} allItems={items} onOpen={setLightboxIndex} />

        <div className="tp-gallery-end">
          <span>HASTA AQUÍ, UNA PEQUEÑA SELECCIÓN.</span>
          <a className="tattoo-text-link" href="https://instagram.com/pajaro_maca" target="_blank" rel="noopener noreferrer">
            Más en Instagram <span aria-hidden="true">↗</span>
          </a>
        </div>
      </section>

      <TattooPageCta
        eyebrow="TU HISTORIA TODAVÍA NO ESTÁ AQUÍ"
        title={<>Hagámosle <em>un lugar.</em></>}
        href="/tatuajes/cotizar"
        label="Hablemos de tu idea"
      />

      <TattooLightbox
        items={visible}
        index={lightboxIndex}
        onChange={setLightboxIndex}
        onClose={() => setLightboxIndex(null)}
      />
    </div>
  );
}
