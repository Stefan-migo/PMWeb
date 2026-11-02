import type { Metadata } from "next";
import styles from "../arte.module.css";

export const metadata: Metadata = {
  title: "Tienda",
  description:
    "Adquiere impresiones de alta calidad de mis obras. Prints, lienzos y productos. Envíos a todo Chile.",
  openGraph: {
    title: "Tienda | PajaroMaca",
    description: "Prints y obras de arte disponibles.",
  },
};

const products = [1, 2, 3, 4, 5, 6];

export default function TiendaPage() {
  return (
    <div className={`${styles.page} ${styles.wrap}`}>
      <div className={styles.pageHead}>
        <span className={styles.eyebrow}>Obra impresa</span>
        <h1 className={styles.pageTitle}>Tienda</h1>
        <p className={styles.pageLead}>
          Adquiere impresiones de alta calidad de mis obras. Cada print es
          producido con materiales de primera calidad.
        </p>
      </div>

      <div className={styles.productGrid}>
        {products.map((product) => (
          <article className={styles.productCard} key={product}>
            <div className={styles.productFrame} aria-label="Placeholder producto">
              <span>Producto {product}</span>
            </div>
            <div className={styles.productBody}>
              <h2 className={styles.productTitle}>Título de Obra {product}</h2>
              <p className={styles.productMeta}>Print sobre lienzo</p>
              <p className={styles.productPrice}>$XX.XXX</p>
            </div>
          </article>
        ))}
      </div>

      <section className={styles.notice} aria-labelledby="informacion-de-envios">
        <h2 className={styles.groupTitle} id="informacion-de-envios">
          Información de Envíos
        </h2>
        <p>
          Realizamos envíos a todo Chile. Los tiempos de producción son de 3-5
          días hábiles. Para envíos internacionales, contáctame directamente.
        </p>
        <p>
          <strong>Métodos de pago:</strong> Mercado Pago, Transferencia bancaria
        </p>
      </section>
    </div>
  );
}
