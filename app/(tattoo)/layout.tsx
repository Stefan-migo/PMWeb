"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X, Instagram, ArrowRight, Layout } from "lucide-react";
import { PageTransition } from "@/app/_components/shared/PageTransition";

const tattooNavLinks = [
  { href: "/tatuajes", label: "Inicio" },
  { href: "/tatuajes/portafolio", label: "Portafolio" },
  { href: "/tatuajes/cotizar", label: "Cotizar" },
  { href: "/tatuajes/sobre-mi", label: "Sobre Mí" },
  { href: "/tatuajes/cuidados", label: "Cuidados" },
];

export default function TattooLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-[#f5f5f5]">
      <nav className="sticky top-0 z-50 bg-[#0a0a0a]/95 backdrop-blur-sm border-b border-[#2a2a2a]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link
              href="/tatuajes"
              className="font-[family-name:var(--font-space-grotesk)] text-xl font-bold tracking-tight"
              aria-label="Inicio Tatuajes"
            >
              TATUAJES
            </Link>

            <div className="hidden md:flex items-center gap-8">
              {tattooNavLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-sm text-[#a3a3a3] hover:text-[#f5f5f5] transition-colors relative group"
                >
                  {link.label}
                  <span className="absolute -bottom-1 left-0 w-0 h-px bg-[#ef4444] group-hover:w-full transition-all" />
                </Link>
              ))}
            </div>

            <div className="flex items-center gap-4">
              {/* Section Switcher */}
              <Link
                href="/arte"
                className="hidden md:inline-flex items-center gap-1.5 text-xs text-[#a3a3a3] hover:text-[#78716c] transition-colors border-r border-[#2a2a2a] pr-4 font-medium tracking-wider uppercase"
              >
                Arte
                <ArrowRight className="w-3 h-3" />
              </Link>

              <Link
                href="/"
                className="hidden md:inline-flex text-[#a3a3a3] hover:text-[#f5f5f5] transition-colors"
                aria-label="Volver al inicio"
              >
                <Layout className="w-4 h-4" />
              </Link>

              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#a3a3a3] hover:text-[#f5f5f5] transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-5 h-5" />
              </a>

              <button
                className="md:hidden text-[#f5f5f5]"
                onClick={() => setMobileOpen(!mobileOpen)}
                aria-label={mobileOpen ? "Cerrar menú" : "Abrir menú"}
                aria-expanded={mobileOpen}
              >
                {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {mobileOpen && (
          <div className="md:hidden border-t border-[#2a2a2a] bg-[#0a0a0a]">
            <div className="px-4 py-4 space-y-2">
              {tattooNavLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="block px-4 py-3 rounded-lg text-[#a3a3a3] hover:text-[#f5f5f5] hover:bg-[#141414] transition-colors"
                >
                  {link.label}
                </Link>
              ))}

              <hr className="border-[#2a2a2a] my-2" />

              <Link
                href="/"
                onClick={() => setMobileOpen(false)}
                className="block px-4 py-3 rounded-lg text-[#a3a3a3] hover:text-[#f5f5f5] hover:bg-[#141414] transition-colors text-sm"
              >
                Inicio (Landing)
              </Link>
              <Link
                href="/arte"
                onClick={() => setMobileOpen(false)}
                className="block px-4 py-3 rounded-lg text-[#a3a3a3] hover:text-[#f5f5f5] hover:bg-[#141414] transition-colors text-sm"
              >
                Ir a Arte &rarr;
              </Link>
            </div>
          </div>
        )}
      </nav>

      <main>
        <PageTransition variant="fadeScale">{children}</PageTransition>
      </main>

      <footer className="bg-[#0a0a0a] border-t border-[#2a2a2a] py-12 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="text-center md:text-left">
              <p className="font-[family-name:var(--font-space-grotesk)] text-lg font-bold mb-2">
                TATUAJES
              </p>
              <p className="text-[#a3a3a3] text-sm">
                Diseño personalizado en Santiago, Chile
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-6 text-sm text-[#a3a3a3]">
              <Link href="/" className="hover:text-[#f5f5f5] transition-colors">
                Inicio
              </Link>
              <Link href="/tatuajes/portafolio" className="hover:text-[#f5f5f5] transition-colors">
                Portafolio
              </Link>
              <Link href="/tatuajes/cotizar" className="hover:text-[#f5f5f5] transition-colors">
                Cotizar
              </Link>
              <Link href="/tatuajes/cuidados" className="hover:text-[#f5f5f5] transition-colors">
                Cuidados
              </Link>
              <Link href="/arte" className="hover:text-[#78716c] transition-colors text-[#78716c]">
                Ir a Arte
              </Link>
            </div>

            <div className="text-[#a3a3a3] text-sm">
              &copy; {new Date().getFullYear()} PajaroMaca
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
