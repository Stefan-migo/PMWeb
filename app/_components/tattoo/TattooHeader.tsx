"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import "./TattooHeader.css";

export const TATTOO_LANDING_PATH = "/tatuajes";
export const TATTOO_HOME_PATH = "/";

/**
 * One header for the whole tattoo section. On the landing it moves between the
 * landing sections with in-page anchors; on the section pages those same labels
 * open the matching page. The last entry returns to the three-option main page.
 */
const tattooSections = [
  { label: "Portafolio", anchor: "#portafolio", href: "/tatuajes/portafolio" },
  { label: "Cotizar", anchor: "#cotizar", href: "/tatuajes/cotizar" },
  { label: "Sobre Mí", anchor: "#sobre-mi", href: "/tatuajes/sobre-mi" },
  { label: "Cuidados", anchor: "#cuidados", href: "/tatuajes/cuidados" },
  {
    label: "Diseños disponibles",
    anchor: "#disenos-disponibles",
    href: "/tatuajes/disenos-disponibles",
  },
];

export function TattooHeader() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const isLanding = pathname === TATTOO_LANDING_PATH;
  const closeMenu = () => setMobileOpen(false);

  useEffect(() => {
    if (!isLanding) return;

    const handleScroll = () => setScrolled(window.scrollY > 8);

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => window.removeEventListener("scroll", handleScroll);
  }, [isLanding]);

  const headerClassName = [
    "tattoo-header",
    isLanding ? "tattoo-header--overlay" : "tattoo-header--solid",
    scrolled ? "is-scrolled" : "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <header className={headerClassName}>
      <div className="tattoo-header__inner">
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
            PajaroMaca
          </Link>
        </nav>
      </div>
    </header>
  );
}

export default TattooHeader;
