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

  return (
    <header className={styles.header}>
      <Link className={styles.wordmark} href="/" aria-label="Pájaro Maca, inicio">
        pájaro maca
        <span className={styles.wordmarkMark} aria-hidden="true">
          ✳
        </span>
      </Link>

      <Link className={styles.headerSection} href="/escenico">
        PORTAFOLIO ESCÉNICO
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
          <Link key={link.href} href={link.href} onClick={() => setOpen(false)}>
            {link.label}
          </Link>
        ))}
        <Link
          href="/escenico#contacto"
          className={styles.navContact}
          onClick={() => setOpen(false)}
        >
          Conversemos <span aria-hidden="true">↗</span>
        </Link>
      </nav>
    </header>
  );
}
