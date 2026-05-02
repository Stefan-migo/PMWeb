import type { Metadata } from "next";
import { MapPin, Clock, Instagram } from "lucide-react";
import { Reveal } from "@/app/_components/shared/Reveal";

export const metadata: Metadata = {
  title: "Sobre Mí — Tatuajes",
  description:
    "Conoce más sobre mi trabajo como tatuadora en Santiago, Chile. Mi historia, estilo y experiencia en blackwork, dotwork y más.",
  openGraph: {
    title: "Sobre Mí — Tatuajes | PajaroMaca",
    description: "Tatuadora profesional en Santiago. Blackwork, dotwork, geométrico.",
  },
};

export default function SobreMiPage() {
  return (
    <div className="py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <Reveal>
          <div className="mb-12">
            <h1 className="font-[family-name:var(--font-space-grotesk)] text-3xl lg:text-4xl font-bold mb-4">
              Sobre M&iacute;
            </h1>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            <div className="aspect-square bg-[#141414] rounded-xl flex items-center justify-center text-[#2a2a2a]" aria-label="Foto de perfil">
              <span>Tu foto aqu&iacute;</span>
            </div>
            <div>
              <h2 className="font-[family-name:var(--font-space-grotesk)] text-2xl font-bold mb-4">
                Mi Historia
              </h2>
              <p className="text-[#a3a3a3] mb-4 leading-relaxed">
                Soy tatuadora y artista visual con a&ntilde;os de experiencia en el mundo del tatuaje.
                Mi pasi&oacute;n por el arte me llev&oacute; a especializarme en dise&ntilde;os personalizados que
                cuentan historias &uacute;nicas en la piel de cada persona.
              </p>
              <p className="text-[#a3a3a3] leading-relaxed">
                Cada tatuaje es una colaboraci&oacute;n entre t&uacute; y yo. Me gusta conocer la historia
                detr&aacute;s de cada dise&ntilde;o antes de empezar a tatuar.
              </p>
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.2}>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-12">
            <div className="bg-[#141414] border border-[#2a2a2a] rounded-xl p-6">
              <MapPin className="w-6 h-6 text-[#ef4444] mb-3" aria-hidden="true" />
              <h3 className="font-bold mb-1">Ubicaci&oacute;n</h3>
              <p className="text-[#a3a3a3] text-sm">Santiago, Chile</p>
            </div>
            <div className="bg-[#141414] border border-[#2a2a2a] rounded-xl p-6">
              <Clock className="w-6 h-6 text-[#ef4444] mb-3" aria-hidden="true" />
              <h3 className="font-bold mb-1">Horario</h3>
              <p className="text-[#a3a3a3] text-sm">Lunes a S&aacute;bado, 10:00 - 19:00</p>
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.3}>
          <div className="mb-12">
            <h2 className="font-[family-name:var(--font-space-grotesk)] text-2xl font-bold mb-4">
              Estilos
            </h2>
            <div className="flex flex-wrap gap-2">
              {["Blackwork", "Dotwork", "Geométrico", "Neo-tradicional", "Linework"].map((style) => (
                <span
                  key={style}
                  className="px-4 py-2 bg-[#141414] border border-[#2a2a2a] rounded-full text-sm"
                >
                  {style}
                </span>
              ))}
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.4}>
          <div className="text-center">
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-[#a3a3a3] hover:text-[#f5f5f5] transition-colors focus-visible:outline-2 focus-visible:outline-[#ef4444] focus-visible:outline-offset-2"
              aria-label="Instagram @pajaroMacaTattoo"
            >
              <Instagram className="w-5 h-5" aria-hidden="true" />
              <span>@pajaroMacaTattoo</span>
            </a>
          </div>
        </Reveal>
      </div>
    </div>
  );
}
