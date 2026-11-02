import type { ReactNode } from "react";
import Link from "next/link";
import styles from "./arte/arte.module.css";
import { ArteHeader } from "./arte-header";
import { PageTransition } from "@/app/_components/shared/PageTransition";

const footerNavigation = [
  { href: "/arte/galeria", label: "Obras" },
  { href: "/arte/sobre-mi", label: "Mi mirada" },
  { href: "/arte/exposiciones", label: "Exposiciones" },
  { href: "/arte/tienda", label: "Tienda" },
];

const instagramUrl = "https://www.instagram.com/pajaro_maca/";

/**
 * Arte section shell.
 *
 * The approved reference package defines the paper/violet identity for the whole
 * art section, so the prototype's chrome becomes this layout: the landing stays
 * identical to the package and the four art pages share the same palette,
 * typography and navigation.
 */
export default function ArtLayout({ children }: { children: ReactNode }) {
  return (
    <div className={styles.shell}>
      <a className={styles.skip} href="#contenido">
        Saltar al contenido
      </a>

      <ArteHeader />

      <main id="contenido">
        <PageTransition variant="fadeSlide">{children}</PageTransition>
      </main>

      <footer className={`${styles.wrap} ${styles.footer}`}>
        <Link className={styles.footerWordmark} href="/arte" aria-label="Pájaro Maca, inicio">
          pájaro maca
          <span aria-hidden="true">✳</span>
        </Link>

        <nav className={styles.footerLinks} aria-label="Navegación del pie de arte">
          {footerNavigation.map((item) => (
            <Link key={item.href} href={item.href}>
              {item.label}
            </Link>
          ))}
          <a href={instagramUrl} target="_blank" rel="noopener noreferrer">
            Instagram ↗
          </a>
          <a href="#contenido">Volver arriba ↑</a>
        </nav>

        <span className={styles.copyright}>
          © {new Date().getFullYear()} Pájaro Maca · Macarena Almeida
        </span>
      </footer>
    </div>
  );
}
