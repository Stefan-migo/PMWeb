"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { assetPath } from "@/app/_lib/scenic/portfolio";
import { GlyphPair } from "@/app/_components/shared/Glyph";
import { MenuToggle } from "@/app/_components/shared/MenuToggle";
import styles from "./escenico.module.css";

const navigation = [
  { href: "/escenico#obras", label: "Obras" },
  { href: "/escenico#mirada", label: "Mi mirada" },
  { href: "/escenico#trayectoria", label: "Trayectoria" },
];

export function ScenicHeader() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);

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

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const closeMenu = () => setOpen(false);

  return (
    <header className={`${styles.header} ${scrolled ? styles.scrolled : ""}`}>
      <Link className={styles.wordmark} href="/" aria-label="Pájaro Maca, inicio">
        <Image
          src={assetPath("pajaro-maca-logo.webp")}
          alt=""
          width={720}
          height={388}
          priority
          className={styles.wordmarkLogo}
        />
      </Link>

      <MenuToggle
        open={open}
        controls="navigation"
        onChange={setOpen}
        className={styles.menuToggle}
        buttonRef={toggleRef}
      />

      <nav
        id="navigation"
        aria-label="Navegación principal"
        className={styles.nav}
        data-open={open ? "true" : "false"}
      >
        {navigation.map((link) => (
          <Link key={link.href} href={link.href} onClick={closeMenu}>
            {link.label}
          </Link>
        ))}
        <Link href="/" className={styles.moreRoute} onClick={closeMenu}>
          <GlyphPair kind="up-right">Más</GlyphPair>
        </Link>
        <Link
          href="/escenico#contacto"
          className={styles.stageMobileContact}
          onClick={closeMenu}
        >
          <GlyphPair kind="up-right">Conversemos</GlyphPair>
        </Link>
      </nav>

      <Link href="/escenico#contacto" className={styles.stageContact}>
        <GlyphPair kind="up-right">Conversemos</GlyphPair>
      </Link>
    </header>
  );
}
