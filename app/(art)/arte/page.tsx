import Link from "next/link";
import { ArrowRight, Palette, Eye, ShoppingBag } from "lucide-react";
import { Reveal } from "@/app/_components/shared/Reveal";

export default function ArtePage() {
  return (
    <div className="min-h-screen">
      <section className="relative py-24 lg:py-32 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <Reveal>
            <div className="max-w-3xl">
              <span className="text-[#78716c] text-sm tracking-[0.2em] uppercase mb-4 block">
                Artista Visual
              </span>
              <h1 className="font-[family-name:var(--font-cormorant)] text-4xl lg:text-6xl font-semibold mb-6 leading-tight">
                Donde el arte cobra vida
              </h1>
              <p className="text-[#78716c] text-lg mb-8 max-w-xl">
                Explora mi colecci&oacute;n de obras, ilustraciones y proyectos art&iacute;sticos.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href="/arte/galeria"
                  className="inline-flex items-center justify-center gap-2 bg-[#1c1917] text-white px-6 py-3 rounded-lg font-medium hover:bg-[#57534e] transition-colors focus-visible:outline-2 focus-visible:outline-[#1c1917] focus-visible:outline-offset-2"
                >
                  Ver Galer&iacute;a
                  <ArrowRight className="w-4 h-4" aria-hidden="true" />
                </Link>
                <Link
                  href="/arte/tienda"
                  className="inline-flex items-center justify-center gap-2 border border-[#e7e5e4] text-[#1c1917] px-6 py-3 rounded-lg font-medium hover:bg-[#f5f5f4] transition-colors focus-visible:outline-2 focus-visible:outline-[#1c1917] focus-visible:outline-offset-2"
                >
                  Tienda
                </Link>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="py-16 px-4 sm:px-6 lg:px-8 border-t border-[#e7e5e4]">
        <div className="max-w-7xl mx-auto">
          <Reveal delay={0.1}>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <Link
                href="/arte/galeria"
                className="group flex items-start gap-4 p-6 bg-white border border-[#e7e5e4] rounded-xl hover:shadow-lg transition-shadow focus-visible:outline-2 focus-visible:outline-[#1c1917] focus-visible:outline-offset-2"
              >
                <div className="w-12 h-12 bg-[#fafaf9] rounded-lg flex items-center justify-center group-hover:bg-[#1c1917] group-hover:text-white transition-colors shrink-0" aria-hidden="true">
                  <Palette className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-medium mb-1">Galer&iacute;a</h3>
                  <p className="text-[#78716c] text-sm">Explora mi colecci&oacute;n de obras</p>
                </div>
              </Link>
              <Link
                href="/arte/exposiciones"
                className="group flex items-start gap-4 p-6 bg-white border border-[#e7e5e4] rounded-xl hover:shadow-lg transition-shadow focus-visible:outline-2 focus-visible:outline-[#1c1917] focus-visible:outline-offset-2"
              >
                <div className="w-12 h-12 bg-[#fafaf9] rounded-lg flex items-center justify-center group-hover:bg-[#1c1917] group-hover:text-white transition-colors shrink-0" aria-hidden="true">
                  <Eye className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-medium mb-1">Exposiciones</h3>
                  <p className="text-[#78716c] text-sm">Actuales y pasadas</p>
                </div>
              </Link>
              <Link
                href="/arte/tienda"
                className="group flex items-start gap-4 p-6 bg-white border border-[#e7e5e4] rounded-xl hover:shadow-lg transition-shadow focus-visible:outline-2 focus-visible:outline-[#1c1917] focus-visible:outline-offset-2"
              >
                <div className="w-12 h-12 bg-[#fafaf9] rounded-lg flex items-center justify-center group-hover:bg-[#1c1917] group-hover:text-white transition-colors shrink-0" aria-hidden="true">
                  <ShoppingBag className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-medium mb-1">Tienda</h3>
                  <p className="text-[#78716c] text-sm">Impresiones y productos</p>
                </div>
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="py-16 px-4 sm:px-6 lg:px-8 border-t border-[#e7e5e4]">
        <div className="max-w-7xl mx-auto">
          <Reveal delay={0.2}>
            <div className="flex items-center justify-between mb-8">
              <h2 className="font-[family-name:var(--font-cormorant)] text-2xl font-semibold">Obras Recientes</h2>
              <Link href="/arte/galeria" className="text-[#78716c] text-sm font-medium hover:text-[#1c1917] transition-colors focus-visible:outline-2 focus-visible:outline-[#1c1917] focus-visible:outline-offset-2">
                Ver todas &rarr;
              </Link>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="aspect-square bg-white border border-[#e7e5e4] rounded-lg flex items-center justify-center text-[#e7e5e4]" aria-label="Placeholder obra">
                  <span>Obra {i}</span>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
