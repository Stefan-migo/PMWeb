import type { Metadata } from "next";
import Link from "next/link";
import styles from "../arte.module.css";
import {
  awards,
  currentShows,
  education,
  pastShows,
} from "@/app/_lib/arte/trajectory";
import { Glyph, GlyphPair } from "@/app/_components/shared/Glyph";

export const metadata: Metadata = {
  title: "Trayectoria",
  description:
    "Exposiciones, formación y reconocimientos de Pájaro Maca como artista visual en Chile.",
  openGraph: {
    title: "Trayectoria | PajaroMaca",
    description: "Exposiciones, formación y reconocimientos.",
  },
};

const instagramUrl = "https://www.instagram.com/pajaro_maca/";

export default function TrayectoriaPage() {
  return (
    <div className={`${styles.page} ${styles.wrap}`}>
      <div className={styles.pageHead}>
        <span className={styles.eyebrow}>Trayectoria</span>
        <h1 className={styles.pageTitle}>
          El recorrido de <em>la obra.</em>
        </h1>
        <p className={styles.pageLead}>
          Exposiciones, formación y reconocimientos. Un recorrido por los
          espacios donde el trabajo ha estado en diálogo con el público.
        </p>
      </div>

      {currentShows.map((show) => (
        <section className={styles.now} key={show.title} aria-label="Exposición actual">
          <div>
            <p className={styles.nowLabel}>Actualmente en exhibición</p>
            <h2 className={styles.nowTitle}>{show.title}</h2>
            <p className={styles.nowMeta}>{show.venue}</p>
          </div>
          <p className={styles.nowDate}>{show.date}</p>
        </section>
      ))}

      <section aria-labelledby="muestras">
        <h2 className={styles.groupTitle} id="muestras">
          Exposiciones
        </h2>
        <ul className={styles.timelineList}>
          {pastShows.map((show) => (
            <li className={styles.timelineRow} key={`${show.year}-${show.title}`}>
              <span className={styles.timelineYear}>{show.year}</span>
              <h3 className={styles.timelineTitle}>{show.title}</h3>
              <span className={styles.timelineVenue}>{show.venue}</span>
            </li>
          ))}
        </ul>
      </section>

      <div className={styles.columns}>
        <section aria-labelledby="formacion">
          <h2 className={styles.groupTitle} id="formacion">
            Formación
          </h2>
          <ul className={styles.list}>
            {education.map((entry) => (
              <li className={styles.listItem} key={entry.title}>
                <span className={styles.listTitle}>{entry.title}</span>
                <span className={styles.listMeta}>{entry.meta}</span>
              </li>
            ))}
          </ul>
        </section>

        <section aria-labelledby="reconocimientos">
          <h2 className={styles.groupTitle} id="reconocimientos">
            Reconocimientos
          </h2>
          <ul className={styles.list}>
            {awards.map((entry) => (
              <li className={styles.listItem} key={entry.title}>
                <span className={styles.listTitle}>{entry.title}</span>
                <span className={styles.listMeta}>{entry.meta}</span>
              </li>
            ))}
          </ul>
        </section>
      </div>

      <div className={styles.ctaRow}>
        <a
          className={styles.pill}
          href={instagramUrl}
          target="_blank"
          rel="noopener noreferrer"
        >
          Escribirme <Glyph kind="up-right" />
        </a>
        <Link className={styles.textLink} href="/arte/sobre-mi">
          <GlyphPair kind="up-right">Mi mirada</GlyphPair>
        </Link>
      </div>
    </div>
  );
}
