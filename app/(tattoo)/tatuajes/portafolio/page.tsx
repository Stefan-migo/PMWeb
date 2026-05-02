import type { Metadata } from "next";
import { ImageLightbox } from "@/app/_components/shared/ImageLightbox";
import { Reveal } from "@/app/_components/shared/Reveal";

export const metadata: Metadata = {
  title: "Portafolio de Tatuajes",
  description:
    "Explora mi portafolio de tatuajes. Blackwork, tradicional, neo-tradicional, realismo, dotwork y más. Diseños personalizados en Santiago, Chile.",
  openGraph: {
    title: "Portafolio de Tatuajes | PajaroMaca",
    description: "Blackwork, tradicional, realismo y más estilos.",
  },
};

const sampleImages = [
  { src: "/placeholder-tattoo-1.jpg", alt: "Blackwork brazo" },
  { src: "/placeholder-tattoo-2.jpg", alt: "Tradicional pierna" },
  { src: "/placeholder-tattoo-3.jpg", alt: "Neo-tradicional brazo" },
  { src: "/placeholder-tattoo-4.jpg", alt: "Realismo espalda" },
  { src: "/placeholder-tattoo-5.jpg", alt: "Dotwork antebrazo" },
  { src: "/placeholder-tattoo-6.jpg", alt: "Geométrico costillas" },
  { src: "/placeholder-tattoo-7.jpg", alt: "Blackwork brazo completo" },
  { src: "/placeholder-tattoo-8.jpg", alt: "Linework minimalista" },
];

const styles = ["Todos", "Blackwork", "Tradicional", "Neo-tradicional", "Realismo", "Dotwork"];

export default function PortafolioPage() {
  return (
    <div className="py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <Reveal>
          <div className="mb-12">
            <h1 className="font-[family-name:var(--font-space-grotesk)] text-3xl lg:text-4xl font-bold mb-4">
              Portafolio
            </h1>
            <p className="text-[#a3a3a3] max-w-2xl">
              Cada pieza es &uacute;nica, creada especialmente para cada cliente.
            </p>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="flex flex-wrap gap-3 mb-8" role="tablist" aria-label="Filtrar por estilo">
            {styles.map((style) => (
              <button
                key={style}
                role="tab"
                aria-selected={style === "Todos"}
                className="px-5 py-3 min-h-[44px] rounded-lg text-sm border border-[#2a2a2a] hover:border-[#ef4444] hover:text-[#ef4444] transition-colors cursor-pointer focus-visible:outline-2 focus-visible:outline-[#ef4444] focus-visible:outline-offset-2"
              >
                {style}
              </button>
            ))}
          </div>
        </Reveal>

        <Reveal delay={0.2}>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
            <ImageLightbox images={sampleImages} />
          </div>
        </Reveal>
      </div>
    </div>
  );
}
