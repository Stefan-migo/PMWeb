"use client";

import { useMemo, useState } from "react";
import { ImageLightbox } from "@/app/_components/shared/ImageLightbox";
import { collectStyles, filterByStyle } from "@/app/_lib/tattoo/portfolio-filter";

export type PortfolioItem = {
  src: string;
  alt: string;
  style?: string | null;
};

type PortfolioGalleryProps = {
  items: PortfolioItem[];
};

/**
 * Grid plus style filter. The filter only renders when the collection carries
 * style metadata; otherwise there is nothing honest to filter by and the grid
 * stands alone.
 */
export function PortfolioGallery({ items }: PortfolioGalleryProps) {
  const styles = useMemo(() => collectStyles(items), [items]);
  const [activeStyle, setActiveStyle] = useState<string | null>(null);
  const visible = useMemo(() => filterByStyle(items, activeStyle), [items, activeStyle]);

  const grid = (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-4">
      <ImageLightbox images={visible} />
    </div>
  );

  if (styles.length === 0) {
    return grid;
  }

  return (
    <div>
      <div
        className="mb-8 flex flex-wrap gap-3"
        role="group"
        aria-label="Filtrar por estilo"
      >
        {[null, ...styles].map((style) => {
          const isActive = activeStyle === style;
          return (
            <button
              key={style ?? "todos"}
              type="button"
              aria-pressed={isActive}
              onClick={() => setActiveStyle(style)}
              className={`min-h-[44px] cursor-pointer rounded-lg border px-5 py-3 text-sm transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--tattoo-accent)] ${
                isActive
                  ? "border-[var(--tattoo-accent)] bg-[var(--tattoo-accent)] text-white"
                  : "border-[var(--tattoo-border)] text-[var(--tattoo-text-muted)] hover:border-[var(--tattoo-accent)] hover:text-[var(--tattoo-accent)]"
              }`}
            >
              {style ?? "Todos"}
            </button>
          );
        })}
      </div>

      <p aria-live="polite" className="mb-6 text-sm text-[var(--tattoo-text-muted)]">
        {visible.length} {visible.length === 1 ? "pieza" : "piezas"}
        {activeStyle ? ` en ${activeStyle}` : ""}
      </p>

      {grid}
    </div>
  );
}
