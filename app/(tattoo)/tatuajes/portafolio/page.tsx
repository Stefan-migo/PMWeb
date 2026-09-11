import type { Metadata } from "next";
import { ImageLightbox } from "@/app/_components/shared/ImageLightbox";
import { Reveal } from "@/app/_components/shared/Reveal";
import { portfolioImages } from "@/app/_lib/tattoo/designs";

export const metadata: Metadata = {
  title: "Portafolio de Tatuajes",
  description:
    "Explora mi portafolio de tatuajes. Blackwork, tradicional, neo-tradicional, realismo, dotwork y más. Diseños personalizados en Villarrica, Chile.",
  openGraph: {
    title: "Portafolio de Tatuajes | PajaroMaca",
    description: "Blackwork, tradicional, realismo y más estilos.",
  },
};

const styles = ["Todos", "Blackwork", "Tradicional", "Neo-tradicional", "Realismo", "Dotwork"];

export default function PortafolioPage() {
  return (
    <div className="py-24 px-4 sm:px-6 lg:px-8">
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
            <ImageLightbox images={portfolioImages} />
          </div>
        </Reveal>
        <p className="mt-10 text-center text-[#a3a3a3]">
          Más trabajos en{" "}
          <a
            className="text-[#ef4444] hover:underline"
            href="https://instagram.com/pajaro_maca"
            target="_blank"
            rel="noopener noreferrer"
          >
            @pajaro_maca en Instagram
          </a>
          .
        </p>
      </div>
    </div>
  );
}
