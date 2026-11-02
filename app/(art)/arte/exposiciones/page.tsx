import type { Metadata } from "next";
import styles from "../arte.module.css";

export const metadata: Metadata = {
  title: "Exposiciones",
  description:
    "Exposiciones actuales y pasadas de PajaroMaca. Conoce mi trayectoria como artista visual en Chile.",
  openGraph: {
    title: "Exposiciones | PajaroMaca",
    description: "Trayectoria de exposiciones de arte en Chile.",
  },
};

const currentExhibitions = [
  {
    title: "Conexiones Contemporáneas",
    venue: "Galería Fundación, Santiago",
    date: "Marzo — Junio 2026",
  },
];

const pastExhibitions = [
  { year: "2025", title: "Formas del Silencio", venue: "Centro Cultural La Moneda, Santiago" },
  { year: "2025", title: "Nuevas Narrativas", venue: "Galería Animal, Santiago" },
  { year: "2024", title: "Arte Joven Chileno", venue: "Museo de Arte Contemporáneo, Santiago" },
  { year: "2023", title: "Resonancias", venue: "Centro Cultural, Valparaíso" },
  { year: "2022", title: "Primera Muestra Individual", venue: "Galería Municipal, Providencia" },
];

export default function ExposicionesPage() {
  return (
    <div className={`${styles.page} ${styles.wrap}`}>
      <div className={styles.pageHead}>
        <span className={styles.eyebrow}>Trayectoria</span>
        <h1 className={styles.pageTitle}>Exposiciones</h1>
        <p className={styles.pageLead}>
          Mi trayectoria artística a través de exhibiciones individuales y
          colectivas.
        </p>
      </div>

      {currentExhibitions.length > 0 && (
        <section aria-labelledby="exhibiciones-actuales">
          <h2 className={styles.groupTitle} id="exhibiciones-actuales">
            Exhibiciones Actuales
          </h2>
          <ul className={styles.list}>
            {currentExhibitions.map((exhibition) => (
              <li className={styles.listItem} key={exhibition.title}>
                <h3 className={styles.listTitle}>{exhibition.title}</h3>
                <span className={styles.listMeta}>
                  Actualmente en exhibición · {exhibition.venue} · {exhibition.date}
                </span>
              </li>
            ))}
          </ul>
        </section>
      )}

      <section aria-labelledby="exhibiciones-pasadas">
        <h2 className={styles.groupTitle} id="exhibiciones-pasadas">
          Exhibiciones Pasadas
        </h2>
        <ul className={styles.list}>
          {pastExhibitions.map((exhibition) => (
            <li className={styles.listItem} key={`${exhibition.year}-${exhibition.title}`}>
              <h3 className={styles.listTitle}>{exhibition.title}</h3>
              <span className={styles.listMeta}>
                {exhibition.year} · {exhibition.venue}
              </span>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
