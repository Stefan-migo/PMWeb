"use client";

import { useState, useCallback, lazy, Suspense } from "react";
import Image from "next/image";
import "yet-another-react-lightbox/styles.css";
import "yet-another-react-lightbox/plugins/thumbnails.css";

const Lightbox = lazy(() => import("yet-another-react-lightbox"));

interface GalleryImage {
  src: string;
  alt?: string;
  width?: number;
  height?: number;
}

interface ImageLightboxProps {
  images: GalleryImage[];
  variant?: "tattoo" | "art";
}

export function ImageLightbox({ images, variant = "tattoo" }: ImageLightboxProps) {
  const [open, setOpen] = useState(false);
  const [index, setIndex] = useState(0);

  const openLightbox = useCallback((idx: number) => {
    setIndex(idx);
    setOpen(true);
  }, []);

  const slides = images.map((img) => ({
    src: img.src,
    alt: img.alt || "",
    width: img.width,
    height: img.height,
  }));

  const isTattoo = variant === "tattoo";

  return (
    <>
      {images.map((img, i) => (
        <button
          key={i}
          onClick={() => openLightbox(i)}
          className={`aspect-square rounded-lg overflow-hidden group cursor-pointer relative ${
            isTattoo
              ? "bg-[#141414]"
              : "bg-white border border-[#e7e5e4]"
          }`}
          aria-label={`Ver ${img.alt || `imagen ${i + 1}`}`}
        >
            <Image src={img.src} alt={img.alt || ""} fill sizes="(max-width: 640px) 50vw, 25vw" className="object-cover" />
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors flex items-center justify-center">
            <span className="text-white opacity-0 group-hover:opacity-100 transition-opacity text-sm font-medium">
              Ver
            </span>
          </div>
        </button>
      ))}

      {open && (
        <Suspense fallback={null}>
          <Lightbox
            open={open}
            close={() => setOpen(false)}
            index={index}
            slides={slides}
            styles={{
              container: { backgroundColor: "rgba(0, 0, 0, 0.95)" },
            }}
          />
        </Suspense>
      )}
    </>
  );
}
