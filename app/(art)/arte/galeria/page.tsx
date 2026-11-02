import type { Metadata } from "next";
import styles from "../arte.module.css";
import { ArteGallery } from "../arte-gallery";
import { arteWorks } from "@/app/_lib/arte/works";

export const metadata: Metadata = {
  title: "Galería de Arte",
  description:
    "Explora mi colección de arte visual: pintura, ilustración, arte digital, escultura y dibujo. Artista visual en Santiago, Chile.",
  openGraph: {
    title: "Galería de Arte | PajaroMaca",
    description: "Pintura, ilustración, digital, escultura y dibujo.",
  },
};

export default function GaleriaPage() {
  return (
    <div className={`${styles.page} ${styles.wrap}`}>
      <div className={styles.pageHead}>
        <span className={styles.eyebrow}>01 / Obra visual</span>
        <h1 className={styles.pageTitle}>Galería</h1>
        <p className={styles.pageLead}>
          Una selección de mis obras organizadas por categoría. Abre cada pieza
          para verla completa y recorrer la selección con el teclado.
        </p>
      </div>

      <ArteGallery works={arteWorks} />
    </div>
  );
}
