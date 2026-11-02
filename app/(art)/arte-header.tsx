"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import styles from "./arte/arte.module.css";

const navigation = [
  { href: "/arte/galeria", label: "Obras" },
  { href: "/arte/sobre-mi", label: "Mi mirada" },
  { href: "/escenico", label: "Escénico ↗" },
];

const contactLink = { href: "/arte#contacto", label: "Conversemos ↗" };

/**
 * Arte section header.
 *
 * The approved reference package ships this wordmark, label and navigation. The
 * anchors of the prototype become real routes so the four art pages stay
 * reachable, and «Escénico» points at the project's own scenic section instead
 * of the external proposal site.
 */
export function ArteHeader() {
  const [open, setOpen] = useState(false);
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

  const close = () => setOpen(false);

  return (
    <header className={styles.header}>
      <div className={`${styles.wrap} ${styles.head}`}>
        <Link className={styles.wordmark} href="/arte" aria-label="Pájaro Maca, inicio">
          pájaro maca
          <span className={styles.wordmarkMark} aria-hidden="true">
            ✳
          </span>
        </Link>

        <span className={styles.headLabel}>Universo visual</span>

        <nav className={styles.nav} aria-label="Navegación de arte">
          {navigation.map((item) => (
            <Link key={item.href} href={item.href}>
              {item.label}
            </Link>
          ))}
          <Link className={styles.contactPill} href={contactLink.href}>
            {contactLink.label}
          </Link>
        </nav>

        <button
          ref={toggleRef}
          type="button"
          className={styles.menuToggle}
          aria-expanded={open}
          aria-controls="arte-mobile-nav"
          onClick={() => setOpen((value) => !value)}
        >
          {open ? "Cerrar −" : "Menú +"}
        </button>
      </div>

      <nav
        id="arte-mobile-nav"
        className={`${styles.mobilePanel} ${open ? styles.mobilePanelOpen : ""}`}
        aria-label="Navegación móvil de arte"
      >
        {[...navigation, contactLink].map((item) => (
          <Link key={item.href} href={item.href} onClick={close}>
            {item.label}
          </Link>
        ))}
      </nav>
    </header>
  );
}
