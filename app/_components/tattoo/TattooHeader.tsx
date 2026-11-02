"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { GlyphPair } from "@/app/_components/shared/Glyph";
import { useCallback, useEffect, useState } from "react";
import "./TattooHeader.css";

export const TATTOO_LANDING_PATH = "/tatuajes";
/** The three-option main page: not a tattoo route, but the way out of the section. */
export const TATTOO_HOME_PATH = "/";

/**
 * One header for the whole tattoo section. On the landing each label moves to a
 * landing section; on a section page the same label opens that page. The last
 * entry leaves the section for the three-option main page, and the pill is the
 * quote entry point in both places.
 */
const tattooSections = [
  { label: "Portafolio", anchor: "#portafolio", href: "/tatuajes/portafolio" },
  { label: "Diseños", anchor: "#disenos-disponibles", href: "/tatuajes/disenos-disponibles" },
  { label: "Sobre mí", anchor: "#sobre-mi", href: "/tatuajes/sobre-mi" },
  { label: "Cuidados", anchor: "#cuidados", href: "/tatuajes/cuidados" },
];

export function TattooHeader() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const isLanding = pathname === TATTOO_LANDING_PATH;
  const closeMenu = useCallback(() => setMobileOpen(false), []);

  useEffect(() => {
    if (!isLanding) return;

    const handleScroll = () => setScrolled(window.scrollY > 8);

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => window.removeEventListener("scroll", handleScroll);
  }, [isLanding]);

  useEffect(() => {
    if (!mobileOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMobileOpen(false);
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [mobileOpen]);

  const headerClassName = [
    "tattoo-header",
    isLanding ? "tattoo-header--overlay" : "tattoo-header--solid",
    scrolled ? "is-scrolled" : "",
  ]
    .filter(Boolean)
    .join(" ");

  const quoteHref = isLanding ? "#cotizar" : "/tatuajes/cotizar";

  return (
    <header className={headerClassName}>
      <div className="tattoo-header__inner">
        <Link
          href={isLanding ? "#inicio" : TATTOO_LANDING_PATH}
          className="tattoo-header__brand"
          aria-label="Pájaro Maca, tatuajes"
          onClick={closeMenu}
        >
          {/* The pack's head badge: the sanctioned mark below the illustrated
              mark's 100 px minimum. */}
          <Image
            src="/design/logo/pajaro-maca-head-badge.png"
            alt=""
            width={76}
            height={76}
            className="tattoo-header__brand-mark"
            priority
          />
          <span className="tattoo-header__brand-text">
            <span className="tattoo-header__brand-name">pájaro maca</span>
            <span className="tattoo-header__brand-sub">Arte en la piel</span>
          </span>
        </Link>

        <nav
          id="tatuajes-menu"
          className={`tattoo-header__links ${mobileOpen ? "is-open" : ""}`}
          aria-label="Navegación de tatuajes"
        >
          {tattooSections.map((section) =>
            isLanding ? (
              <a key={section.href} href={section.anchor} onClick={closeMenu}>
                {section.label}
              </a>
            ) : (
              <Link
                key={section.href}
                href={section.href}
                onClick={closeMenu}
                aria-current={pathname === section.href ? "page" : undefined}
              >
                {section.label}
              </Link>
            ),
          )}

          <Link href={TATTOO_HOME_PATH} onClick={closeMenu}>
            <GlyphPair kind="up-right">Más</GlyphPair>
          </Link>
        </nav>

        <div className="tattoo-header__actions">
          <a className="tattoo-header__cta" href={quoteHref} onClick={closeMenu}>
            <GlyphPair kind="up-right">Hablemos</GlyphPair>
          </a>

          <button
            type="button"
            className="tattoo-header__menu-button"
            onClick={() => setMobileOpen((open) => !open)}
            aria-label={mobileOpen ? "Cerrar menú" : "Abrir menú"}
            aria-expanded={mobileOpen}
            aria-controls="tatuajes-menu"
          >
            {mobileOpen ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
          </button>
        </div>
      </div>
    </header>
  );
}

export default TattooHeader;
