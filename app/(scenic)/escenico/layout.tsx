import type { ReactNode } from "react";
import Link from "next/link";
import localFont from "next/font/local";
import styles from "./escenico.module.css";
import { ScenicHeader } from "./scenic-header";
import { identity } from "@/app/_lib/scenic/content";
import { sections } from "@/app/_lib/scenic/portfolio";

// The reference package ships its own editorial and sans faces. They are
// loaded locally so the theatre voice never depends on a third-party CDN and
// stays scoped to this route group.
const editorial = localFont({
  src: [
    { path: "./fonts/editorial-regular.otf", weight: "400", style: "normal" },
    { path: "./fonts/editorial-italic.otf", weight: "400", style: "italic" },
  ],
  variable: "--font-escenico-editorial",
  display: "swap",
});

const sans = localFont({
  src: [{ path: "./fonts/sans-regular.otf", weight: "400", style: "normal" }],
  variable: "--font-escenico-sans",
  display: "swap",
});

export default function ScenicLayout({ children }: { children: ReactNode }) {
  return (
    <div className={`${editorial.variable} ${sans.variable} ${styles.shell}`}>
      <a href="#contenido" className={styles.skip}>
        Saltar al contenido
      </a>

      <ScenicHeader />

      <div id="contenido">{children}</div>

      <footer className={styles.footer}>
        <Link className={styles.wordmark} href="/escenico">
          pájaro maca
        </Link>
        <p>{sections.footer.eyebrow}</p>
        <a href="#contenido">{sections.footer.backToTop} ↑</a>
      </footer>

      <span className="sr-only">
        {identity.name} — {identity.artisticName}
      </span>
    </div>
  );
}
