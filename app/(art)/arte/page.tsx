import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import styles from "./arte.module.css";
import { ArteGallery } from "./arte-gallery";
import { ArteHero } from "./arte-hero";
import { ArteReveal } from "./arte-reveal";
import { Glyph, GlyphPair } from "@/app/_components/shared/Glyph";
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

      <ArteReveal direction="none" duration={1.1} amount={0.3}>
        <div className={styles.strip} aria-hidden="true">
          Lo natural <span><Glyph kind="asterisk" /></span> Lo sensible{" "}
          <span><Glyph kind="asterisk" /></span> Lo imaginado
        </div>
      </ArteReveal>

      <section className={`${styles.section} ${styles.wrap} ${styles.anchor}`} id="galeria">
        <div className={styles.sectionHead}>
          <ArteReveal>
            <span className={styles.eyebrow}>01 / Obra visual</span>
            <h2 className={styles.sectionTitle}>
              Un mundo para
              <br />
              <em>mirar de cerca.</em>
            </h2>
          </ArteReveal>
          <ArteReveal delay={0.12}>
            <p className={styles.intro}>
              Recorre las obras a tu ritmo.
              <br />
              Abre cada imagen para verla completa
              <br />y descubrir sus detalles.
            </p>
          </ArteReveal>
        </div>

        <ArteGallery works={arteWorks} />
      </section>

      <section className={`${styles.section} ${styles.mirada} ${styles.anchor}`} id="mirada">
        <div className={`${styles.wrap} ${styles.miradaGrid}`}>
          <ArteReveal className={styles.miradaPicture} direction="left" amount={0.25}>
            <Image
              className={styles.miradaImage}
              src={arteMiradaWork.src}
              alt={arteMiradaWork.alt}
              width={arteMiradaWork.width}
              height={arteMiradaWork.height}
              sizes="(max-width: 620px) 80vw, 40vw"
              loading="lazy"
            />
          </ArteReveal>

          <ArteReveal className={styles.miradaText} delay={0.12} amount={0.25}>
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
              <GlyphPair kind="up-right">Descubrir el universo escénico</GlyphPair>
            </Link>
            <div className={styles.tagline}>CUERPO · NATURALEZA · IMAGINACIÓN</div>
          </ArteReveal>
        </div>
      </section>

      <section className={`${styles.contactSection} ${styles.anchor}`} id="contacto">
        <div className={`${styles.wrap} ${styles.contactTop}`}>
          <ArteReveal amount={0.3}>
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
          </ArteReveal>
          <ArteReveal className={styles.contactAction} delay={0.15} amount={0.3}>
            <a
              className={`${styles.pill} ${styles.contactPillAction}`}
              href={instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              Escríbeme en Instagram <Glyph kind="up-right" />
            </a>
          </ArteReveal>
        </div>
      </section>
    </>
  );
}
