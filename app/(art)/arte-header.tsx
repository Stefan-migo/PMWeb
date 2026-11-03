"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import styles from "./arte/arte.module.css";
import { GlyphPair, type GlyphKind } from "@/app/_components/shared/Glyph";
import { MenuToggle } from "@/app/_components/shared/MenuToggle";

interface NavItem {
  href: string;
  label: string;
  glyph?: GlyphKind;
}

const navigation: NavItem[] = [
  { href: "/arte/galeria", label: "Obras" },
  { href: "/arte/sobre-mi", label: "Mi mirada" },
  { href: "/arte/trayectoria", label: "Trayectoria" },
  { href: "/", label: "Más", glyph: "up-right" },
];

const contactLink: NavItem = {
  href: "/arte#contacto",
  label: "Conversemos",
  glyph: "up-right",
};

/**
 * Arte section header.
 *
 * The approved reference package ships this wordmark, label and navigation. The
 * anchors of the prototype become real routes so the art pages stay reachable,
 * and the last entry leaves the section for the site's three-way selection.
 *
 * On the landing the header overlays the animated hero and takes the colours of
 * the slide on screen, exactly as the hero package does; on every other art page
 * it stays the solid sticky bar it has always been.
 */
export function ArteHeader() {
  const [open, setOpen] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const overHero = usePathname() === "/arte";

  useEffect(() => {
    if (!open) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      setOpen(false);
      toggleRef.current?.focus();
    };

    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open]);

  const close = () => setOpen(false);

  return (
    <header className={`${styles.header} ${overHero ? styles.headerOverHero : ""}`}>
      <div
        className={`${styles.head} ${overHero ? styles.headOverHero : styles.wrap}`}
      >
        <Link className={styles.wordmark} href="/arte" aria-label="Pájaro Maca, inicio">
          <Image
            className={styles.wordmarkMark}
            src="/design/arte/logo/mark@2x.webp"
            alt=""
            width={205}
            height={320}
            sizes="64px"
            priority
          />
          <span>pájaro maca</span>
        </Link>

        <span className={styles.headLabel}>Universo visual</span>

        <nav className={styles.nav} aria-label="Navegación de arte">
          {navigation.map((item) => (
            <Link key={item.href} href={item.href}>
              {item.glyph ? (
                <GlyphPair kind={item.glyph}>{item.label}</GlyphPair>
              ) : (
                item.label
              )}
            </Link>
          ))}
          <Link className={styles.contactPill} href={contactLink.href}>
            <GlyphPair kind={contactLink.glyph ?? "up-right"}>
              {contactLink.label}
            </GlyphPair>
          </Link>
        </nav>

        <MenuToggle
          open={open}
          controls="arte-mobile-nav"
          onChange={setOpen}
          className={styles.menuToggle}
          buttonRef={toggleRef}
        />
      </div>

      <nav
        id="arte-mobile-nav"
        className={`${styles.mobilePanel} ${open ? styles.mobilePanelOpen : ""} ${
          overHero ? styles.mobilePanelOverHero : ""
        }`}
        aria-label="Navegación móvil de arte"
      >
        {[...navigation, contactLink].map((item) => (
          <Link key={item.href} href={item.href} onClick={close}>
            {item.glyph ? (
              <GlyphPair kind={item.glyph}>{item.label}</GlyphPair>
            ) : (
              item.label
            )}
          </Link>
        ))}
      </nav>
    </header>
  );
}
