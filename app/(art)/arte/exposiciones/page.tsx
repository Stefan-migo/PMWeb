import type { Metadata } from "next";
import { Reveal } from "@/app/_components/shared/Reveal";

export const metadata: Metadata = {
  title: "Exposiciones",
  description:
    "Exposiciones actuales y pasadas de PajaroMaca. Conoce mi trayectoria como artista visual en Chile.",
  openGraph: {
    title: "Exposiciones | PajaroMaca",
    description: "Trayectoria de exposiciones de arte en Chile.",
  },
};

const currentExhibitions = [
  {
    title: "Conexiones Contemporáneas",
    venue: "Galería Fundación, Santiago",
    date: "Marzo — Junio 2026",
  },
];

const pastExhibitions = [
  { year: "2025", title: "Formas del Silencio", venue: "Centro Cultural La Moneda, Santiago" },
  { year: "2025", title: "Nuevas Narrativas", venue: "Galería Animal, Santiago" },
  { year: "2024", title: "Arte Joven Chileno", venue: "Museo de Arte Contemporáneo, Santiago" },
  { year: "2023", title: "Resonancias", venue: "Centro Cultural, Valparaíso" },
  { year: "2022", title: "Primera Muestra Individual", venue: "Galería Municipal, Providencia" },
];

export default function ExposicionesPage() {
  return (
    <div className="py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <Reveal>
          <div className="mb-12">
            <h1 className="font-[family-name:var(--font-cormorant)] text-3xl lg:text-4xl font-semibold mb-4">
              Exposiciones
            </h1>
            <p className="text-[#78716c]">
              Mi trayectoria art&iacute;stica a trav&eacute;s de exhibiciones individuales y colectivas.
            </p>
          </div>
        </Reveal>

        {currentExhibitions.length > 0 && (
          <Reveal delay={0.1}>
            <div className="mb-12">
              <h2 className="font-[family-name:var(--font-cormorant)] text-xl font-semibold mb-6">
                Exhibiciones Actuales
              </h2>
              <div className="space-y-6">
                {currentExhibitions.map((ex, i) => (
                  <div key={i} className="bg-white border border-[#e7e5e4] rounded-xl p-6">
                    <span className="text-xs text-[#059669] font-medium uppercase tracking-wider">
                      Actualmente en exhibici&oacute;n
                    </span>
                    <h3 className="font-medium text-lg mt-2 mb-2">{ex.title}</h3>
                    <p className="text-[#78716c] text-sm mb-1">{ex.venue}</p>
                    <p className="text-[#78716c] text-sm">{ex.date}</p>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        )}

        <Reveal delay={0.2}>
          <div>
            <h2 className="font-[family-name:var(--font-cormorant)] text-xl font-semibold mb-6">
              Exhibiciones Pasadas
            </h2>
            <div className="space-y-0">
              {pastExhibitions.map((ex, i) => (
                <div key={i} className="border-l-2 border-[#e7e5e4] pl-6 pb-8 last:pb-0">
                  <span className="text-xs text-[#78716c] font-medium">{ex.year}</span>
                  <h3 className="font-medium mt-1 mb-1">{ex.title}</h3>
                  <p className="text-[#78716c] text-sm">{ex.venue}</p>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </div>
  );
}
