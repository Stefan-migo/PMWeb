import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function HomePage() {
  return (
    <main className="min-h-screen flex flex-col">
      <div className="flex-1 flex flex-col lg:flex-row">
        <Link
          href="/tatuajes"
          className="group relative flex-1 min-h-[50vh] lg:min-h-screen bg-[#0a0a0a] flex flex-col items-center justify-center p-8 overflow-hidden transition-transform hover:scale-[1.01] focus-visible:outline-2 focus-visible:outline-[#ef4444] focus-visible:outline-offset-2"
          aria-label="Ir a sección Tatuajes"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-[#1a1a1a] to-[#0a0a0a]" aria-hidden="true" />

          <div className="absolute top-8 left-8 w-px h-24 bg-gradient-to-b from-transparent via-[#ef4444] to-transparent opacity-60" aria-hidden="true" />
          <div className="absolute bottom-8 right-8 w-24 h-px bg-gradient-to-r from-transparent via-[#ef4444] to-transparent opacity-60" aria-hidden="true" />

          <div className="relative z-10 text-center">
            <span className="block text-[#ef4444] text-sm tracking-[0.3em] uppercase mb-4 font-medium">
              Tatuajes
            </span>
            <h1 className="font-[family-name:var(--font-space-grotesk)] text-5xl lg:text-7xl font-bold text-[#f5f5f5] mb-6 tracking-tight">
              TATUAJES
            </h1>
            <p className="text-[#a3a3a3] text-lg mb-8 max-w-md">
              Diseños personalizados, arte en la piel. Conoce mi trabajo y agenda tu próxima sesión.
            </p>
            <div className="inline-flex items-center gap-2 text-[#ef4444] font-medium group-hover:gap-4 transition-all">
              <span>Ver Portafolio</span>
              <ArrowRight className="w-5 h-5" aria-hidden="true" />
            </div>
          </div>

          <div className="absolute bottom-0 left-0 right-0 h-1 bg-[#ef4444] transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left" aria-hidden="true" />
        </Link>

        <Link
          href="/arte"
          className="group relative flex-1 min-h-[50vh] lg:min-h-screen bg-[#fafaf9] flex flex-col items-center justify-center p-8 overflow-hidden transition-transform hover:scale-[1.01] focus-visible:outline-2 focus-visible:outline-[#1c1917] focus-visible:outline-offset-2"
          aria-label="Ir a sección Arte"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-[#ffffff] to-[#f5f5f4]" aria-hidden="true" />

          <div className="absolute top-8 right-8 w-px h-24 bg-gradient-to-b from-transparent via-[#78716c] to-transparent opacity-40" aria-hidden="true" />
          <div className="absolute bottom-8 left-8 w-24 h-px bg-gradient-to-r from-transparent via-[#78716c] to-transparent opacity-40" aria-hidden="true" />

          <div className="relative z-10 text-center">
            <span className="block text-[#78716c] text-sm tracking-[0.3em] uppercase mb-4 font-medium">
              Arte
            </span>
            <h1 className="font-[family-name:var(--font-cormorant)] text-5xl lg:text-7xl font-semibold text-[#1c1917] mb-6 tracking-tight">
              ARTE
            </h1>
            <p className="text-[#78716c] text-lg mb-8 max-w-md">
              Pintura, ilustración y más. Explora mi colección de arte visual y exposiciones.
            </p>
            <div className="inline-flex items-center gap-2 text-[#1c1917] font-medium group-hover:gap-4 transition-all">
              <span>Ver Galería</span>
              <ArrowRight className="w-5 h-5" aria-hidden="true" />
            </div>
          </div>

          <div className="absolute bottom-0 left-0 right-0 h-1 bg-[#1c1917] transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left" aria-hidden="true" />
        </Link>
      </div>

      <footer className="bg-[#0a0a0a] text-[#a3a3a3] py-6 px-8">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm">
            &copy; {new Date().getFullYear()} PajaroMaca. Todos los derechos reservados.
          </p>
          <div className="flex items-center gap-6">
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm hover:text-[#f5f5f5] transition-colors"
              aria-label="Instagram"
            >
              Instagram
            </a>
            <a
              href="https://wa.me/56912345678"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm hover:text-[#f5f5f5] transition-colors"
              aria-label="WhatsApp"
            >
              WhatsApp
            </a>
          </div>
        </div>
      </footer>
    </main>
  );
}
