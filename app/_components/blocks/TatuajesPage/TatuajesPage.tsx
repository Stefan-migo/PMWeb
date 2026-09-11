"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  Clock,
  Instagram,
  Layout,
  MapPin,
  Menu,
  X,
} from "lucide-react";
import { Reveal } from "@/app/_components/shared/Reveal";
import "./TatuajesPage.css";

const tattooNavLinks = [
  { href: "/tatuajes", label: "Inicio" },
  { href: "/tatuajes/portafolio", label: "Portafolio" },
  { href: "/tatuajes/cotizar", label: "Cotizar" },
  { href: "/tatuajes/sobre-mi", label: "Sobre Mí" },
  { href: "/tatuajes/cuidados", label: "Cuidados" },
];

const recentWorkPlaceholders = [1, 2, 3, 4];

export function TatuajesPage() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="tatuajes-page min-h-screen bg-[#0a0a0a] text-[#f5f5f5]">
      <nav className="sticky top-0 z-50 border-b border-[#2a2a2a] bg-[#0a0a0a]/95 backdrop-blur-sm">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <Link
              href="/tatuajes"
              className="font-[family-name:var(--font-space-grotesk)] text-xl font-bold tracking-tight"
              aria-label="Inicio Tatuajes"
            >
              TATUAJES
            </Link>

            <div className="hidden items-center gap-8 md:flex">
              {tattooNavLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="group relative text-sm text-[#a3a3a3] transition-colors hover:text-[#f5f5f5]"
                >
                  {link.label}
                  <span className="absolute -bottom-1 left-0 h-px w-0 bg-[#ef4444] transition-all group-hover:w-full" />
                </a>
              ))}
            </div>

            <div className="flex items-center gap-4">
              <Link
                href="/arte"
                className="hidden items-center gap-1.5 border-r border-[#2a2a2a] pr-4 text-xs font-medium uppercase tracking-wider text-[#a3a3a3] transition-colors hover:text-[#78716c] md:inline-flex"
              >
                Arte
                <ArrowRight className="h-3 w-3" aria-hidden="true" />
              </Link>
              <Link
                href="/"
                className="hidden text-[#a3a3a3] transition-colors hover:text-[#f5f5f5] md:inline-flex"
                aria-label="Volver al inicio"
              >
                <Layout className="h-4 w-4" />
              </Link>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#a3a3a3] transition-colors hover:text-[#f5f5f5]"
                aria-label="Instagram"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <button
                type="button"
                className="text-[#f5f5f5] md:hidden"
                onClick={() => setMobileOpen((open) => !open)}
                aria-label={mobileOpen ? "Cerrar menú" : "Abrir menú"}
                aria-expanded={mobileOpen}
              >
                {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>
        </div>

        {mobileOpen && (
          <div className="border-t border-[#2a2a2a] bg-[#0a0a0a] md:hidden">
            <div className="space-y-2 px-4 py-4">
              {tattooNavLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="block rounded-lg px-4 py-3 text-[#a3a3a3] transition-colors hover:bg-[#141414] hover:text-[#f5f5f5]"
                >
                  {link.label}
                </a>
              ))}
              <hr className="my-2 border-[#2a2a2a]" />
              <Link href="/" className="block rounded-lg px-4 py-3 text-sm text-[#a3a3a3] hover:bg-[#141414] hover:text-[#f5f5f5]">
                Inicio (Landing)
              </Link>
              <Link href="/arte" className="block rounded-lg px-4 py-3 text-sm text-[#a3a3a3] hover:bg-[#141414] hover:text-[#f5f5f5]">
                Ir a Arte →
              </Link>
            </div>
          </div>
        )}
      </nav>

      <main>
        <section className="relative px-4 py-24 sm:px-6 lg:px-8 lg:py-32">
          <div className="mx-auto max-w-7xl">
            <Reveal>
              <div className="max-w-3xl">
                <span className="mb-4 block text-sm uppercase tracking-[0.2em] text-[#ef4444]">Tattoo Artist</span>
                <h1 className="mb-6 font-[family-name:var(--font-space-grotesk)] text-4xl font-bold leading-tight lg:text-6xl">
                  Arte en la piel
                </h1>
                <p className="mb-8 max-w-xl text-lg text-[#a3a3a3]">
                  Diseños personalizados, únicos para cada persona. Cada tatuaje es una pieza creada especialmente para ti.
                </p>
                <div className="flex flex-col gap-4 sm:flex-row">
                  <a href="/tatuajes/cotizar" className="tatuajes-primary-button inline-flex items-center justify-center gap-2 rounded-lg bg-[#ef4444] px-6 py-3 font-medium text-white">
                    Cotizar mi tatuaje <ArrowRight className="h-4 w-4" aria-hidden="true" />
                  </a>
                  <a href="/tatuajes/portafolio" className="tatuajes-secondary-button inline-flex items-center justify-center gap-2 rounded-lg border border-[#2a2a2a] px-6 py-3 font-medium text-[#f5f5f5]">
                    Ver trabajos
                  </a>
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        <section className="border-t border-[#2a2a2a] px-4 py-16 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <Reveal delay={0.1}>
              <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
                <InfoItem icon={<MapPin />} title="Ubicación" detail="Santiago, Chile" />
                <InfoItem icon={<Clock />} title="Horario" detail="Lunes a Sábado, 10:00 - 19:00" />
                <InfoItem icon={<Instagram />} title="Sígueme" detail="@pajaroMacaTattoo" href="https://instagram.com" />
              </div>
            </Reveal>
          </div>
        </section>

        <section className="border-t border-[#2a2a2a] px-4 py-16 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <Reveal delay={0.2}>
              <div className="mb-8 flex items-center justify-between">
                <h2 className="font-[family-name:var(--font-space-grotesk)] text-2xl font-bold">Trabajos Recientes</h2>
                <a href="/tatuajes/portafolio" className="text-sm font-medium text-[#ef4444] hover:underline">Ver todos →</a>
              </div>
              <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
                {recentWorkPlaceholders.map((item) => (
                  <div key={item} className="flex aspect-square items-center justify-center rounded-lg bg-[#141414] text-[#2a2a2a]" aria-label="Placeholder imagen">
                    <span>Imagen {item}</span>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </section>

        <section className="bg-[#141414] px-4 py-24 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl text-center">
            <Reveal delay={0.3}>
              <h2 className="mb-4 font-[family-name:var(--font-space-grotesk)] text-3xl font-bold lg:text-4xl">¿Tienes una idea?</h2>
              <p className="mx-auto mb-8 max-w-xl text-[#a3a3a3]">Cuéntame tu idea y trabajemos juntos para crear el diseño perfecto.</p>
              <a href="/tatuajes/cotizar" className="tatuajes-primary-button inline-flex items-center gap-2 rounded-lg bg-[#ef4444] px-8 py-4 text-lg font-medium text-white">
                Solicitar Cotización <ArrowRight className="h-5 w-5" aria-hidden="true" />
              </a>
            </Reveal>
          </div>
        </section>
      </main>

      <footer className="mt-16 border-t border-[#2a2a2a] bg-[#0a0a0a] py-12">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-6 px-4 sm:px-6 md:flex-row lg:px-8">
          <div className="text-center md:text-left">
            <p className="mb-2 font-[family-name:var(--font-space-grotesk)] text-lg font-bold">TATUAJES</p>
            <p className="text-sm text-[#a3a3a3]">Diseño personalizado en Santiago, Chile</p>
          </div>
          <div className="flex flex-col items-center gap-6 text-sm text-[#a3a3a3] sm:flex-row">
            <Link href="/">Inicio</Link><Link href="/tatuajes/portafolio">Portafolio</Link><Link href="/tatuajes/cotizar">Cotizar</Link><Link href="/tatuajes/cuidados">Cuidados</Link><Link href="/arte" className="text-[#78716c]">Ir a Arte</Link>
          </div>
          <div className="text-sm text-[#a3a3a3]">© 2026 PajaroMaca</div>
        </div>
      </footer>
    </div>
  );
}

function InfoItem({ icon, title, detail, href }: { icon: React.ReactNode; title: string; detail: string; href?: string }) {
  const content = href ? <a href={href} target="_blank" rel="noopener noreferrer" aria-label="Instagram @pajaroMacaTattoo">{detail}</a> : detail;
  return <div className="flex items-start gap-4"><div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-[#141414] text-[#ef4444]" aria-hidden="true">{icon}</div><div><h3 className="mb-1 font-medium">{title}</h3><p className="text-sm text-[#a3a3a3]">{content}</p></div></div>;
}

export default TatuajesPage;
