"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu, X, Instagram, ArrowRight, Layout } from "lucide-react";
import { PageTransition } from "@/app/_components/shared/PageTransition";

const tattooNavLinks = [
  { href: "/tatuajes", label: "Inicio" },
  { href: "/tatuajes/portafolio", label: "Portafolio" },
  { href: "/tatuajes/disenos-disponibles", label: "Diseños disponibles" },
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
  const pathname = usePathname();

  if (pathname === "/tatuajes") {
    return children;
  }

  return (
    <div className="min-h-screen bg-[var(--tattoo-bg)] text-[var(--tattoo-text)]">
      <nav className="sticky top-0 z-50 bg-[var(--tattoo-bg)]/95 backdrop-blur-sm border-b border-[var(--tattoo-border)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link
              href="/tatuajes"
              className="font-[family-name:var(--font-display)] text-xl font-bold tracking-tight"
              aria-label="Inicio Tatuajes"
            >
              TATUAJES
            </Link>

            <div className="hidden md:flex items-center gap-8">
              {tattooNavLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`text-sm transition-colors relative group ${pathname === link.href ? "text-[var(--tattoo-accent)]" : "text-[var(--tattoo-text-muted)] hover:text-[var(--tattoo-text)]"}`}
                  aria-current={pathname === link.href ? "page" : undefined}
                >
                  {link.label}
                  <span className={`absolute -bottom-1 left-0 h-px bg-[var(--tattoo-accent)] transition-all ${pathname === link.href ? "w-full" : "w-0 group-hover:w-full"}`} />
                </Link>
              ))}
            </div>

            <div className="flex items-center gap-4">
              {/* Section Switcher */}
              <Link
                href="/arte"
                className="hidden md:inline-flex items-center gap-1.5 text-xs text-[var(--tattoo-text-muted)] hover:text-[var(--tattoo-text)] transition-colors border-r border-[var(--tattoo-border)] pr-4 font-medium tracking-wider uppercase"
              >
                Arte
                <ArrowRight className="w-3 h-3" />
              </Link>

              <Link
                href="/"
                className="hidden md:inline-flex text-[var(--tattoo-text-muted)] hover:text-[var(--tattoo-text)] transition-colors"
                aria-label="Volver al inicio"
              >
                <Layout className="w-4 h-4" />
              </Link>

              <a
                href="https://instagram.com/pajaro_maca"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[var(--tattoo-text-muted)] hover:text-[var(--tattoo-text)] transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-5 h-5" />
              </a>

              <button
                className="md:hidden text-[var(--tattoo-text)]"
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
          <div className="md:hidden border-t border-[var(--tattoo-border)] bg-[var(--tattoo-bg)]">
            <div className="px-4 py-4 space-y-2">
              {tattooNavLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className={`block px-4 py-3 rounded-lg transition-colors ${pathname === link.href ? "text-[var(--tattoo-accent)] bg-[var(--tattoo-surface)]" : "text-[var(--tattoo-text-muted)] hover:text-[var(--tattoo-text)] hover:bg-[var(--tattoo-surface)]"}`}
                  aria-current={pathname === link.href ? "page" : undefined}
                >
                  {link.label}
                </Link>
              ))}

              <hr className="border-[var(--tattoo-border)] my-2" />

              <Link
                href="/"
                onClick={() => setMobileOpen(false)}
                className="block px-4 py-3 rounded-lg text-[var(--tattoo-text-muted)] hover:text-[var(--tattoo-text)] hover:bg-[var(--tattoo-surface)] transition-colors text-sm"
              >
                Inicio (Landing)
              </Link>
              <Link
                href="/arte"
                onClick={() => setMobileOpen(false)}
                className="block px-4 py-3 rounded-lg text-[var(--tattoo-text-muted)] hover:text-[var(--tattoo-text)] hover:bg-[var(--tattoo-surface)] transition-colors text-sm"
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

      <footer className="bg-[var(--tattoo-bg)] border-t border-[var(--tattoo-border)] py-12 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="text-center md:text-left">
              <p className="font-[family-name:var(--font-display)] text-lg font-bold mb-2">
                TATUAJES
              </p>
              <p className="text-[var(--tattoo-text-muted)] text-sm">
                 Diseño personalizado en Villarrica, Chile
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-6 text-sm text-[var(--tattoo-text-muted)]">
              <Link href="/" className="hover:text-[var(--tattoo-text)] transition-colors">
                Inicio
              </Link>
              <Link href="/tatuajes/portafolio" className="hover:text-[var(--tattoo-text)] transition-colors">
                Portafolio
              </Link>
              <Link href="/tatuajes/disenos-disponibles" className="hover:text-[var(--tattoo-text)] transition-colors">
                Diseños disponibles
              </Link>
              <Link href="/tatuajes/cotizar" className="hover:text-[var(--tattoo-text)] transition-colors">
                Cotizar
              </Link>
              <Link href="/tatuajes/cuidados" className="hover:text-[var(--tattoo-text)] transition-colors">
                Cuidados
              </Link>
              <Link href="/arte" className="hover:text-[var(--tattoo-text)] transition-colors text-[var(--tattoo-text)]">
                Ir a Arte
              </Link>
            </div>

            <div className="text-[var(--tattoo-text-muted)] text-sm">
              &copy; {new Date().getFullYear()} PajaroMaca
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
