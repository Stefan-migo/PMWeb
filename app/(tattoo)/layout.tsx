"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { PageTransition } from "@/app/_components/shared/PageTransition";
import { TATTOO_LANDING_PATH, TattooHeader } from "@/app/_components/tattoo/TattooHeader";

export default function TattooLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isLanding = pathname === TATTOO_LANDING_PATH;

  return (
    <div className="min-h-screen bg-[var(--tattoo-bg)] text-[var(--tattoo-text)]">
      {/* The landing renders its own full-bleed hero and footer, so it only
          borrows the shared header; every section page gets header, transition
          and footer from here. */}
      <TattooHeader />

      {isLanding ? (
        children
      ) : (
        <>
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
        </>
      )}
    </div>
  );
}
