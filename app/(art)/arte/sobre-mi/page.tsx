import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import styles from "../arte.module.css";
import { arteMiradaWork } from "@/app/_lib/arte/works";

export const metadata: Metadata = {
  title: "Mi mirada — Arte",
  description:
    "Artist statement de Pájaro Maca: el color, la línea y lo simbólico como un mismo lenguaje.",
  openGraph: {
    title: "Mi mirada — Arte | PajaroMaca",
    description: "Artist statement. El color, la línea y lo simbólico.",
  },
};

const instagramUrl = "https://www.instagram.com/pajaro_maca/";

export default function MiMiradaPage() {
  return (
    <div className={`${styles.page} ${styles.wrap}`}>
      <div className={styles.pageHead}>
        <span className={styles.eyebrow}>Mi mirada</span>
        <h1 className={styles.pageTitle}>
          Mi <em>mirada.</em>
        </h1>
        <p className={styles.pageLead}>
          Artista visual. Trabajo el color, la línea y lo simbólico como un mismo
          lenguaje.
        </p>
      </div>

      <section className={styles.profileGrid} aria-labelledby="statement">
        <Image
          className={styles.profileImage}
          src={arteMiradaWork.src}
          alt={arteMiradaWork.alt}
          width={arteMiradaWork.width}
          height={arteMiradaWork.height}
          sizes="(max-width: 620px) 90vw, 40vw"
          loading="lazy"
        />

        <div className={styles.prose}>
          <h2 className={styles.infoCardTitle} id="statement">
            Artist statement
          </h2>
          <p>
            Soy artista visual con una trayectoria dedicada a la exploración de
            formas y colores que conectan lo contemporáneo con lo tradicional.
          </p>
          <p>
            Mi trabajo ha sido exhibido en galerías y espacios culturales de Chile
            y Latinoamérica, buscando siempre crear piezas que generen reflexión y
            conexión con el espectador.
          </p>
          <a
            className={styles.textLink}
            href={instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram @pajaro_maca"
          >
            @pajaro_maca ↗
          </a>
        </div>
      </section>

      <div className={styles.ctaRow}>
        <Link className={styles.pill} href="/arte/trayectoria">
          Ver la trayectoria <span aria-hidden="true">↘</span>
        </Link>
        <Link className={styles.textLink} href="/arte/galeria">
          Explorar las obras ↗
        </Link>
      </div>
    </div>
  );
}
