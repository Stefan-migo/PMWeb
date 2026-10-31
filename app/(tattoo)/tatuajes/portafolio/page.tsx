import type { Metadata } from "next";
import { Reveal } from "@/app/_components/shared/Reveal";
import { PortfolioGallery } from "@/app/_components/tattoo/PortfolioGallery";
import { getPortfolioRecords } from "@/app/_lib/queries/tattoos";

export const metadata: Metadata = {
  title: "Portafolio de Tatuajes",
  description:
    "Explora mi portafolio de tatuajes. Blackwork, tradicional, neo-tradicional, realismo, dotwork y más. Diseños personalizados en Villarrica, Chile.",
  openGraph: {
    title: "Portafolio de Tatuajes | PajaroMaca",
    description: "Blackwork, tradicional, realismo y más estilos.",
  },
};

export default async function PortafolioPage() {
  const records = await getPortfolioRecords();
  const items = records.map((record) => ({
    src: record.image_path,
    alt: record.title,
    style: record.style ?? null,
  }));

  return (
    <div className="bg-[var(--tattoo-bg)] px-4 py-20 text-[var(--tattoo-text)] sm:px-6 lg:px-8 lg:py-28">
      <div className="mx-auto max-w-7xl">
        <Reveal>
          <section className="max-w-3xl" aria-labelledby="portfolio-heading">
            <p className="mb-4 text-xs font-medium uppercase tracking-[.16em] text-[var(--tattoo-accent)]">
              Trabajo en piel
            </p>
            <h1
              id="portfolio-heading"
              className="font-[family-name:var(--font-display)] text-5xl font-bold leading-[.95] tracking-tight sm:text-7xl"
            >
              Portafolio
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-[var(--tattoo-text-muted)]">
              Cada pieza es única, creada especialmente para cada cliente.
            </p>
          </section>
        </Reveal>

        <div className="mt-16">
          <PortfolioGallery items={items} />
        </div>

        <p className="mt-16 text-center text-[var(--tattoo-text-muted)]">
          Más trabajos en{" "}
          <a
            className="text-[var(--tattoo-accent)] transition-colors hover:text-[var(--tattoo-accent-hover)] hover:underline"
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
