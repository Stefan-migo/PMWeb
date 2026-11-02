import type { Metadata } from "next";
import Image from "next/image";
import styles from "../arte.module.css";
import { arteMiradaWork } from "@/app/_lib/arte/works";

export const metadata: Metadata = {
  title: "Sobre Mí — Arte",
  description:
    "Conoce más sobre mi trabajo como artista visual. Mi historia, CV y trayectoria en Chile.",
  openGraph: {
    title: "Sobre Mí — Arte | PajaroMaca",
    description: "Artista visual. Biografía, CV y trayectoria.",
  },
};

const instagramUrl = "https://www.instagram.com/pajaro_maca/";

const trajectory = [
  {
    heading: "Educación",
    items: [
      {
        title: "Licenciatura en Artes Visuales",
        meta: "2015 - 2019 · Universidad de Chile",
      },
    ],
  },
  {
    heading: "Exposiciones Individuales",
    items: [
      { title: "Título de Exhibición", meta: "2025 · Galería, Santiago" },
      {
        title: "Título de Exhibición",
        meta: "2023 · Centro Cultural, Valparaíso",
      },
    ],
  },
  {
    heading: "Premios y Reconocimientos",
    items: [{ title: "Premio Artes Visuales", meta: "2024 · Institución" }],
  },
];

export default function SobreMiPage() {
  return (
    <div className={`${styles.page} ${styles.wrap}`}>
      <div className={styles.pageHead}>
        <span className={styles.eyebrow}>Una mirada</span>
        <h1 className={styles.pageTitle}>
          Sobre <em>Mí</em>
        </h1>
        <p className={styles.pageLead}>
          Artista visual. Trabajo el color, la línea y lo simbólico como un mismo
          lenguaje.
        </p>
      </div>

      <section className={styles.profileGrid} aria-labelledby="biografia">
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
          <h2 className={styles.infoCardTitle} id="biografia">
            Biografía
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

      <section aria-labelledby="trayectoria">
        <h2 className={styles.groupTitle} id="trayectoria">
          Trayectoria
        </h2>

        {trajectory.map((group) => (
          <div key={group.heading}>
            <h3 className={styles.groupTitle}>{group.heading}</h3>
            <ul className={styles.list}>
              {group.items.map((item) => (
                <li className={styles.listItem} key={`${group.heading}-${item.title}-${item.meta}`}>
                  <span className={styles.listTitle}>{item.title}</span>
                  <span className={styles.listMeta}>{item.meta}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </section>
    </div>
  );
}
