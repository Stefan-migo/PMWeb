"use client";

import Link from "next/link";
import { useState } from "react";
import { X } from "lucide-react";
import { PageTransition } from "@/app/_components/shared/PageTransition";

const artNavLinks = [
  { href: "/arte", label: "Inicio" },
  { href: "/arte/galeria", label: "Galería" },
  { href: "/arte/exposiciones", label: "Exposiciones" },
  { href: "/arte/sobre-mi", label: "Sobre Mí" },
  { href: "/arte/tienda", label: "Tienda" },
];

export default function ArtLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#fafaf9] text-[#1c1917]">
      <nav className="sticky top-0 z-50 bg-[#fafaf9]/95 backdrop-blur-sm border-b border-[#e7e5e4]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link
              href="/arte"
              className="font-[family-name:var(--font-cormorant)] text-2xl font-semibold tracking-tight"
              aria-label="Inicio Arte"
            >
              Arte
            </Link>

            <div className="hidden md:flex items-center gap-8">
              {artNavLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-sm text-[#78716c] hover:text-[#1c1917] transition-colors relative group"
                >
                  {link.label}
                  <span className="absolute -bottom-1 left-0 w-0 h-px bg-[#1c1917] group-hover:w-full transition-all" />
                </Link>
              ))}
            </div>

            <div className="flex items-center gap-4">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#78716c] hover:text-[#1c1917] transition-colors"
                aria-label="Instagram"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
              </a>

              <button
                className="md:hidden text-[#1c1917]"
                onClick={() => setMobileOpen(!mobileOpen)}
                aria-label={mobileOpen ? "Cerrar menú" : "Abrir menú"}
                aria-expanded={mobileOpen}
              >
                {mobileOpen ? (
                  <X className="w-6 h-6" />
                ) : (
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                )}
              </button>
            </div>
          </div>
        </div>

        {mobileOpen && (
          <div className="md:hidden border-t border-[#e7e5e4] bg-[#fafaf9]">
            <div className="px-4 py-4 space-y-2">
              {artNavLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="block px-4 py-3 rounded-lg text-[#78716c] hover:text-[#1c1917] hover:bg-[#f5f5f4] transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        )}
      </nav>

      <main>
        <PageTransition variant="fadeSlide">{children}</PageTransition>
      </main>

      <footer className="bg-[#fafaf9] border-t border-[#e7e5e4] py-12 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="text-center md:text-left">
              <p className="font-[family-name:var(--font-cormorant)] text-xl font-semibold mb-2">
                Arte
              </p>
              <p className="text-[#78716c] text-sm">
                Artista Visual
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-6 text-sm text-[#78716c]">
              <Link href="/arte/galeria" className="hover:text-[#1c1917] transition-colors">
                Galería
              </Link>
              <Link href="/arte/exposiciones" className="hover:text-[#1c1917] transition-colors">
                Exposiciones
              </Link>
              <Link href="/arte/tienda" className="hover:text-[#1c1917] transition-colors">
                Tienda
              </Link>
            </div>

            <div className="text-[#78716c] text-sm">
              &copy; {new Date().getFullYear()} PajaroMaca
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
