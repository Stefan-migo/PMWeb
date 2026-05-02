import type { Metadata } from "next";
import { Instagram } from "lucide-react";
import { Reveal } from "@/app/_components/shared/Reveal";

export const metadata: Metadata = {
  title: "Sobre Mí — Arte",
  description:
    "Conoce más sobre mi trabajo como artista visual. Mi historia, CV y trayectoria en Chile.",
  openGraph: {
    title: "Sobre Mí — Arte | PajaroMaca",
    description: "Artista visual. Biografía, CV y trayectoria.",
  },
};

export default function SobreMiPage() {
  return (
    <div className="py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <Reveal>
          <div className="mb-12">
            <h1 className="font-[family-name:var(--font-cormorant)] text-3xl lg:text-4xl font-semibold mb-4">
              Sobre M&iacute;
            </h1>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            <div className="aspect-square bg-white border border-[#e7e5e4] rounded-xl flex items-center justify-center text-[#e7e5e4]" aria-label="Foto de perfil">
              <span>Tu foto aqu&iacute;</span>
            </div>
            <div>
              <h2 className="font-[family-name:var(--font-cormorant)] text-2xl font-semibold mb-4">
                Biograf&iacute;a
              </h2>
              <p className="text-[#78716c] mb-4 leading-relaxed">
                Soy artista visual con una trayectoria dedicada a la exploraci&oacute;n de formas y colores
                que conectan lo contempor&aacute;neo con lo tradicional.
              </p>
              <p className="text-[#78716c] leading-relaxed">
                Mi trabajo ha sido exhibido en galer&iacute;as y espacios culturales de Chile y Latinoam&eacute;rica,
                buscando siempre crear piezas que generen reflexi&oacute;n y conexi&oacute;n con el espectador.
              </p>
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.2}>
          <div className="mb-12">
            <h2 className="font-[family-name:var(--font-cormorant)] text-2xl font-semibold mb-6">
              Trayectoria
            </h2>

            <div className="space-y-8">
              <div>
                <h3 className="text-sm font-medium uppercase tracking-wider text-[#78716c] mb-4">
                  Educaci&oacute;n
                </h3>
                <div className="space-y-4">
                  <div className="border-l-2 border-[#e7e5e4] pl-6">
                    <span className="text-xs text-[#78716c]">2015 - 2019</span>
                    <p className="font-medium">Licenciatura en Artes Visuales</p>
                    <p className="text-[#78716c] text-sm">Universidad de Chile</p>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-sm font-medium uppercase tracking-wider text-[#78716c] mb-4">
                  Exposiciones Individuales
                </h3>
                <div className="space-y-4">
                  {[
                    { year: "2025", title: "Título de Exhibición", venue: "Galería, Santiago" },
                    { year: "2023", title: "Título de Exhibición", venue: "Centro Cultural, Valparaíso" },
                  ].map((item, index) => (
                    <div key={index} className="border-l-2 border-[#e7e5e4] pl-6">
                      <span className="text-xs text-[#78716c]">{item.year}</span>
                      <p className="font-medium">{item.title}</p>
                      <p className="text-[#78716c] text-sm">{item.venue}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-sm font-medium uppercase tracking-wider text-[#78716c] mb-4">
                  Premios y Reconocimientos
                </h3>
                <div className="space-y-4">
                  <div className="border-l-2 border-[#e7e5e4] pl-6">
                    <span className="text-xs text-[#78716c]">2024</span>
                    <p className="font-medium">Premio Artes Visuales</p>
                    <p className="text-[#78716c] text-sm">Instituci&oacute;n</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.3}>
          <div className="text-center">
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-[#78716c] hover:text-[#1c1917] transition-colors focus-visible:outline-2 focus-visible:outline-[#1c1917] focus-visible:outline-offset-2"
              aria-label="Instagram @pajaroMacaArte"
            >
              <Instagram className="w-5 h-5" aria-hidden="true" />
              <span>@pajaroMacaArte</span>
            </a>
          </div>
        </Reveal>
      </div>
    </div>
  );
}
