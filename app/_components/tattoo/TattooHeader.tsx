"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
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
          <span className="tattoo-header__brand-name">pájaro maca</span>
          <span className="tattoo-header__brand-sub">Arte en la piel</span>
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
            Más <span aria-hidden="true">↗</span>
          </Link>
        </nav>

        <div className="tattoo-header__actions">
          <a className="tattoo-header__cta" href={quoteHref} onClick={closeMenu}>
            Hablemos <span aria-hidden="true">↗</span>
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
