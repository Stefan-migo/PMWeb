import type { ReactNode } from "react";
import Link from "next/link";
import { identity } from "@/app/_lib/scenic/content";

const scenicNavLinks = [
  { href: "/escenico#obras", label: "Obras" },
  { href: "/escenico#trayectoria", label: "Trayectoria" },
  { href: "/escenico#contacto", label: "Contacto" },
];

export default function ScenicLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-scenic-bg text-scenic-text">
      <a
        href="#contenido"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:bg-scenic-surface focus:px-4 focus:py-2 focus:text-scenic-text"
      >
        Saltar al contenido
      </a>

      <header className="sticky top-0 z-50 border-b border-scenic-border/40 bg-scenic-bg/90 backdrop-blur-sm">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <Link
            href="/escenico"
            aria-label="Inicio Escénico"
            className="font-[family-name:var(--font-scenic)] text-2xl tracking-wide text-scenic-text"
          >
            Escénico
          </Link>

          <nav aria-label="Navegación escénica">
            <ul className="flex items-center gap-4 text-sm sm:gap-8">
              {scenicNavLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-scenic-text-muted transition-colors hover:text-scenic-text"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href="/"
                  className="text-scenic-text-muted transition-colors hover:text-scenic-text"
                >
                  PajaroMaca
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </header>

      <div id="contenido">{children}</div>

      <footer className="mt-16 border-t border-scenic-border/40 px-4 py-10 text-sm text-scenic-text-muted sm:px-6 lg:px-8">
        <div className="mx-auto flex max-w-6xl flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <p>
            {identity.name} — {identity.artisticName}
          </p>
          <p>
            {identity.residence} · {identity.period}
          </p>
        </div>
      </footer>
    </div>
  );
}
