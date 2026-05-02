import type { Metadata } from "next";
import { ImageLightbox } from "@/app/_components/shared/ImageLightbox";
import { Reveal } from "@/app/_components/shared/Reveal";

export const metadata: Metadata = {
  title: "Galería de Arte",
  description:
    "Explora mi colección de arte visual: pintura, ilustración, arte digital, escultura y dibujo. Artista visual en Santiago, Chile.",
  openGraph: {
    title: "Galería de Arte | PajaroMaca",
    description: "Pintura, ilustración, digital, escultura y dibujo.",
  },
};

const sampleArtworks = [
  { src: "/placeholder-art-1.jpg", alt: "Pintura abstracta" },
  { src: "/placeholder-art-2.jpg", alt: "Ilustración digital" },
  { src: "/placeholder-art-3.jpg", alt: "Serie botánica" },
  { src: "/placeholder-art-4.jpg", alt: "Retrato al óleo" },
  { src: "/placeholder-art-5.jpg", alt: "Escultura en arcilla" },
  { src: "/placeholder-art-6.jpg", alt: "Dibujo carbón" },
  { src: "/placeholder-art-7.jpg", alt: "Acuarela sobre papel" },
  { src: "/placeholder-art-8.jpg", alt: "Grabado" },
];

const categories = ["Todos", "Pintura", "Ilustración", "Digital", "Escultura", "Dibujo"];

export default function GaleriaPage() {
  return (
    <div className="py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <Reveal>
          <div className="mb-12">
            <h1 className="font-[family-name:var(--font-cormorant)] text-3xl lg:text-4xl font-semibold mb-4">
              Galer&iacute;a
            </h1>
            <p className="text-[#78716c] max-w-2xl">
              Una selecci&oacute;n de mis obras organizadas por categor&iacute;a.
            </p>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="flex flex-wrap gap-3 mb-8" role="tablist" aria-label="Filtrar por categoría">
            {categories.map((cat) => (
              <button
                key={cat}
                role="tab"
                aria-selected={cat === "Todos"}
                className="px-5 py-3 min-h-[44px] rounded-lg text-sm border border-[#e7e5e4] hover:border-[#1c1917] hover:text-[#1c1917] transition-colors cursor-pointer focus-visible:outline-2 focus-visible:outline-[#1c1917] focus-visible:outline-offset-2"
              >
                {cat}
              </button>
            ))}
          </div>
        </Reveal>

        <Reveal delay={0.2}>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
            <ImageLightbox images={sampleArtworks} variant="art" />
          </div>
        </Reveal>
      </div>
    </div>
  );
}
