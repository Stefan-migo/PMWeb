"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
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
        pájaro maca
        <span className={styles.wordmarkMark} aria-hidden="true">
          ✳
        </span>
        <small className={styles.wordmarkSmall}>ARTES ESCÉNICAS</small>
      </Link>

      <button
        ref={toggleRef}
        type="button"
        className={styles.menuToggle}
        aria-expanded={open}
        aria-controls="navigation"
        onClick={() => setOpen((value) => !value)}
      >
        Menú <span aria-hidden="true">{open ? "−" : "+"}</span>
      </button>

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
        <Link href="/arte" className={styles.artRoute} onClick={closeMenu}>
          Arte <span aria-hidden="true">↗</span>
        </Link>
        <Link
          href="/escenico#contacto"
          className={styles.stageMobileContact}
          onClick={closeMenu}
        >
          Conversemos <span aria-hidden="true">↗</span>
        </Link>
      </nav>

      <Link href="/escenico#contacto" className={styles.stageContact}>
        Conversemos <span aria-hidden="true">↗</span>
      </Link>
    </header>
  );
}
