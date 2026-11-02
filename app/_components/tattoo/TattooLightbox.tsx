"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef } from "react";
import type { TattooImage } from "@/app/_lib/tattoo/designs";

const MODAL_OPEN_CLASS = "tattoo-lightbox-open";

function pad(value: number) {
  return String(value).padStart(2, "0");
}

type TattooLightboxProps = {
  items: TattooImage[];
  /** Open index, or null when the viewer is closed. */
  index: number | null;
  onChange: (index: number) => void;
  onClose: () => void;
};

/**
 * Full-screen viewer for the gallery. The native dialog brings the top layer,
 * the focus trap and the focus return to the trigger; this component adds the
 * scroll lock, the arrow keys and the counter.
 */
export function TattooLightbox({ items, index, onChange, onClose }: TattooLightboxProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const isOpen = index !== null;

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (isOpen && !dialog.open) dialog.showModal();
    if (!isOpen && dialog.open) dialog.close();
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;

    document.body.classList.add(MODAL_OPEN_CLASS);

    return () => document.body.classList.remove(MODAL_OPEN_CLASS);
  }, [isOpen]);

  const step = useCallback(
    (delta: number) => {
      if (index === null || !items.length) return;
      onChange((index + delta + items.length) % items.length);
    },
    [index, items.length, onChange],
  );

  const current = index === null ? null : items[index];

  return (
    <dialog
      ref={dialogRef}
      className="tatuajes-page-v2__lightbox"
      aria-label="Fotografía de tatuaje"
      onClose={onClose}
      onKeyDown={(event) => {
        if (event.key === "ArrowRight") {
          event.preventDefault();
          step(1);
        }
        if (event.key === "ArrowLeft") {
          event.preventDefault();
          step(-1);
        }
      }}
    >
      <button
        type="button"
        className="tatuajes-page-v2__lightbox-close"
        aria-label="Cerrar fotografía"
        onClick={onClose}
      >
        ✕
      </button>
      <button
        type="button"
        className="tatuajes-page-v2__lightbox-nav"
        aria-label="Fotografía anterior"
        onClick={() => step(-1)}
      >
        ←
      </button>

      <figure className="tatuajes-page-v2__lightbox-figure">
        <div className="tatuajes-page-v2__lightbox-image">
          {current ? (
            <Image src={current.src} alt={current.alt} fill sizes="100vw" className="tatuajes-page-v2__lightbox-img" />
          ) : null}
        </div>
        {current && index !== null ? (
          <figcaption>
            {pad(index + 1)} / {pad(items.length)} — {current.title ?? current.alt}
          </figcaption>
        ) : null}
      </figure>

      <button
        type="button"
        className="tatuajes-page-v2__lightbox-nav"
        aria-label="Siguiente fotografía"
        onClick={() => step(1)}
      >
        →
      </button>
    </dialog>
  );
}

export default TattooLightbox;
