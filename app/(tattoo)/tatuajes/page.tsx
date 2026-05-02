import Link from "next/link";
import { ArrowRight, Clock, MapPin, Instagram } from "lucide-react";
import { Reveal } from "@/app/_components/shared/Reveal";

export default function TatuajesPage() {
  return (
    <div className="min-h-screen">
      <section className="relative py-24 lg:py-32 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <Reveal>
            <div className="max-w-3xl">
              <span className="text-[#ef4444] text-sm tracking-[0.2em] uppercase mb-4 block">
                Tattoo Artist
              </span>
              <h1 className="font-[family-name:var(--font-space-grotesk)] text-4xl lg:text-6xl font-bold mb-6 leading-tight">
                Arte en la piel
              </h1>
              <p className="text-[#a3a3a3] text-lg mb-8 max-w-xl">
                Diseños personalizados, únicos para cada persona. Cada tatuaje es una pieza creada
                especialmente para ti.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href="/tatuajes/cotizar"
                  className="inline-flex items-center justify-center gap-2 bg-[#ef4444] text-white px-6 py-3 rounded-lg font-medium hover:bg-[#dc2626] transition-colors focus-visible:outline-2 focus-visible:outline-[#ef4444] focus-visible:outline-offset-2"
                >
                  Cotizar mi tatuaje
                  <ArrowRight className="w-4 h-4" aria-hidden="true" />
                </Link>
                <Link
                  href="/tatuajes/portafolio"
                  className="inline-flex items-center justify-center gap-2 border border-[#2a2a2a] text-[#f5f5f5] px-6 py-3 rounded-lg font-medium hover:bg-[#1f1f1f] transition-colors focus-visible:outline-2 focus-visible:outline-[#ef4444] focus-visible:outline-offset-2"
                >
                  Ver trabajos
                </Link>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="py-16 px-4 sm:px-6 lg:px-8 border-t border-[#2a2a2a]">
        <div className="max-w-7xl mx-auto">
          <Reveal delay={0.1}>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-[#141414] rounded-lg flex items-center justify-center shrink-0" aria-hidden="true">
                  <MapPin className="w-6 h-6 text-[#ef4444]" />
                </div>
                <div>
                  <h3 className="font-medium mb-1">Ubicación</h3>
                  <p className="text-[#a3a3a3] text-sm">Santiago, Chile</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-[#141414] rounded-lg flex items-center justify-center shrink-0" aria-hidden="true">
                  <Clock className="w-6 h-6 text-[#ef4444]" />
                </div>
                <div>
                  <h3 className="font-medium mb-1">Horario</h3>
                  <p className="text-[#a3a3a3] text-sm">Lunes a Sábado, 10:00 - 19:00</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-[#141414] rounded-lg flex items-center justify-center shrink-0" aria-hidden="true">
                  <Instagram className="w-6 h-6 text-[#ef4444]" />
                </div>
                <div>
                  <h3 className="font-medium mb-1">Sígueme</h3>
                  <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-[#a3a3a3] text-sm hover:text-[#f5f5f5] transition-colors" aria-label="Instagram @pajaroMacaTattoo">
                    @pajaroMacaTattoo
                  </a>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="py-16 px-4 sm:px-6 lg:px-8 border-t border-[#2a2a2a]">
        <div className="max-w-7xl mx-auto">
          <Reveal delay={0.2}>
            <div className="flex items-center justify-between mb-8">
              <h2 className="font-[family-name:var(--font-space-grotesk)] text-2xl font-bold">Trabajos Recientes</h2>
              <Link href="/tatuajes/portafolio" className="text-[#ef4444] text-sm font-medium hover:underline focus-visible:outline-2 focus-visible:outline-[#ef4444] focus-visible:outline-offset-2">
                Ver todos &rarr;
              </Link>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="aspect-square bg-[#141414] rounded-lg flex items-center justify-center text-[#2a2a2a]" aria-label="Placeholder imagen">
                  <span>Imagen {i}</span>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-[#141414]">
        <div className="max-w-7xl mx-auto text-center">
          <Reveal delay={0.3}>
            <h2 className="font-[family-name:var(--font-space-grotesk)] text-3xl lg:text-4xl font-bold mb-4">
              &iquest;Tienes una idea?
            </h2>
            <p className="text-[#a3a3a3] mb-8 max-w-xl mx-auto">
              Cu&eacute;ntame tu idea y trabajemos juntos para crear el dise&ntilde;o perfecto.
            </p>
            <Link
              href="/tatuajes/cotizar"
              className="inline-flex items-center gap-2 bg-[#ef4444] text-white px-8 py-4 rounded-lg font-medium hover:bg-[#dc2626] transition-colors text-lg focus-visible:outline-2 focus-visible:outline-white focus-visible:outline-offset-2"
            >
              Solicitar Cotizaci&oacute;n
              <ArrowRight className="w-5 h-5" aria-hidden="true" />
            </Link>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
