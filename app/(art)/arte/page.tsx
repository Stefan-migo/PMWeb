import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import styles from "./arte.module.css";
import { ArteGallery } from "./arte-gallery";
import { ArteHero } from "./arte-hero";
import { arteMiradaWork, arteWorks } from "@/app/_lib/arte/works";

export const metadata: Metadata = {
  title: "Arte",
  description:
    "El universo visual de Pájaro Maca. Una selección de ilustraciones donde se encuentran cuerpo, naturaleza y color.",
  openGraph: {
    title: "Arte | PajaroMaca",
    description:
      "El universo visual de Pájaro Maca. Ilustraciones donde se encuentran cuerpo, naturaleza y color.",
  },
};

const instagramUrl = "https://www.instagram.com/pajaro_maca/";

/**
 * Art landing, ported from the approved reference package. The header and
 * footer live in the section layout, so this page starts at the hero.
 */
export default function ArtePage() {
  return (
    <>
      <ArteHero />

      <div className={styles.strip} aria-hidden="true">
        Lo natural <span>✳</span> Lo sensible <span>✳</span> Lo imaginado{" "}
        <span>✳</span> Lo natural <span>✳</span> Lo sensible
      </div>

      <section className={`${styles.section} ${styles.wrap} ${styles.anchor}`} id="galeria">
        <div className={styles.sectionHead}>
          <div>
            <span className={styles.eyebrow}>01 / Obra visual</span>
            <h2 className={styles.sectionTitle}>
              Un mundo para
              <br />
              <em>mirar de cerca.</em>
            </h2>
          </div>
          <p className={styles.intro}>
            Recorre las obras a tu ritmo.
            <br />
            Abre cada imagen para verla completa
            <br />y descubrir sus detalles.
          </p>
        </div>

        <ArteGallery works={arteWorks} />
      </section>

      <section className={`${styles.section} ${styles.mirada} ${styles.anchor}`} id="mirada">
        <div className={`${styles.wrap} ${styles.miradaGrid}`}>
          <div className={styles.miradaPicture}>
            <Image
              className={styles.miradaImage}
              src={arteMiradaWork.src}
              alt={arteMiradaWork.alt}
              width={arteMiradaWork.width}
              height={arteMiradaWork.height}
              sizes="(max-width: 620px) 80vw, 40vw"
              loading="lazy"
            />
          </div>

          <div className={styles.miradaText}>
            <span className={styles.eyebrow}>02 / Una mirada, muchos lenguajes</span>
            <h2 className={styles.sectionTitle}>
              Entre el cuerpo
              <br />y lo <em>silvestre.</em>
            </h2>
            <p className={styles.miradaBody}>
              En este universo visual, los cuerpos se entrelazan con hojas,
              animales y símbolos. El color transforma lo familiar: una gallina,
              un gesto o una figura humana se abren a otras posibilidades.
            </p>
            <p className={styles.miradaBody}>
              La línea reúne estas imágenes como un hilo común. A veces intensa y
              vibrante; otras, suave y silenciosa.
            </p>
            <Link className={styles.textLink} href="/escenico">
              Descubrir el universo escénico ↗
            </Link>
            <div className={styles.tagline}>CUERPO · NATURALEZA · IMAGINACIÓN</div>
          </div>
        </div>
      </section>

      <section className={`${styles.contactSection} ${styles.anchor}`} id="contacto">
        <div className={`${styles.wrap} ${styles.contactTop}`}>
          <div>
            <span className={styles.eyebrow}>03 / Sigamos la conversación</span>
            <h2 className={styles.contactTitle}>
              ¿Una obra te
              <br />
              hizo <em>sentir algo?</em>
            </h2>
            <p>
              Para consultar por una pieza, proponer una colaboración o conocer
              más del trabajo de Pájaro Maca.
            </p>
          </div>
          <a
            className={`${styles.pill} ${styles.contactPillAction}`}
            href={instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            Escríbeme en Instagram <span aria-hidden="true">↗</span>
          </a>
        </div>
      </section>
    </>
  );
}
