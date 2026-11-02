"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useState } from "react";
import { Reveal } from "@/app/_components/shared/Reveal";
import { TattooHeroCarousel } from "@/app/_components/tattoo/TattooHeroCarousel";
import { TattooLightbox } from "@/app/_components/tattoo/TattooLightbox";
import {
  availableDesigns,
  portfolioImages as localPortfolioImages,
  type AvailableDesign,
  type TattooImage,
} from "@/app/_lib/tattoo/designs";
import "./TatuajesPageV2.css";

/** The three photographs the approved hero rotates through, in its order. */
const HERO_ORDER = [1, 0, 3];
/** Gallery slots: two wide frames, one tall frame and a wide closing frame. */
const WORK_SLOTS = ["a", "b", "c", "d"];

function pad(value: number) {
  return String(value).padStart(2, "0");
}

type TatuajesPageV2Props = {
  portfolioImages?: TattooImage[];
  designs?: AvailableDesign[];
};

export function TatuajesPageV2({
  portfolioImages = localPortfolioImages,
  designs = availableDesigns,
}: TatuajesPageV2Props = {}) {
  const [expanded, setExpanded] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const heroImages = HERO_ORDER.map((position) => portfolioImages[position]).filter(
    (image): image is TattooImage => Boolean(image),
  );
  const heroSlides = heroImages.length === HERO_ORDER.length ? heroImages : portfolioImages.slice(0, 3);
  const featuredWorks = portfolioImages.slice(0, WORK_SLOTS.length);
  const moreWorks = portfolioImages.slice(WORK_SLOTS.length);
  const aboutImage = portfolioImages[5] ?? portfolioImages[0];
  const closeLightbox = useCallback(() => setLightboxIndex(null), []);

  return (
    <div className="tatuajes-page-v2">
      <TattooHeroCarousel images={heroSlides} />

      <div className="tatuajes-page-v2__intro">
        <span className="tatuajes-page-v2__intro-claim">Un trazo. Una historia. Tu piel.</span>
        <span className="tatuajes-page-v2__star" aria-hidden="true">
          ✳
        </span>
        <p className="tatuajes-page-v2__intro-note">
          Diseños pensados para acompañarte por mucho tiempo.
        </p>
      </div>

      <section id="portafolio" className="tatuajes-page-v2__section">
        <Reveal>
          <div className="tatuajes-page-v2__heading">
            <div>
              <p className="tatuajes-page-v2__eyebrow">01 / Trabajo reciente</p>
              <h2>
                El arte de
                <br />
                <em>hacerlo tuyo.</em>
              </h2>
            </div>
            <div className="tatuajes-page-v2__heading-aside">
              <p>
                Botánica, fauna y universos personales.
                <br />
                Un recorrido por mis últimos trabajos.
              </p>
              <Link className="tatuajes-page-v2__text-link" href="/tatuajes/portafolio">
                Ver portafolio completo <span aria-hidden="true">↗</span>
              </Link>
            </div>
          </div>
        </Reveal>

        <div className="tatuajes-page-v2__gallery">
          {featuredWorks.map((image, index) => (
            <Reveal
              key={image.src}
              className={`tatuajes-page-v2__work tatuajes-page-v2__work--${WORK_SLOTS[index]}`}
              delay={index * 0.07}
            >
              <button
                type="button"
                className="tatuajes-page-v2__work-button"
                onClick={() => setLightboxIndex(index)}
                aria-label={`Ver ${image.alt}`}
              >
                <span className="tatuajes-page-v2__photo">
                  <Image
                    src={image.src}
                    alt={image.alt}
                    fill
                    sizes="(max-width: 700px) 92vw, 60vw"
                    className="tatuajes-page-v2__photo-image"
                  />
                  <span className="tatuajes-page-v2__expand" aria-hidden="true">
                    ↗
                  </span>
                </span>
                <span className="tatuajes-page-v2__caption">
                  <span>{image.alt}</span>
                  <small>{pad(index + 1)} / Tatuaje</small>
                </span>
              </button>
            </Reveal>
          ))}
        </div>

        <div className="tatuajes-page-v2__more" id="tatuajes-more-gallery" hidden={!expanded}>
          {moreWorks.map((image, position) => {
            const index = WORK_SLOTS.length + position;

            return (
              <button
                key={image.src}
                type="button"
                className="tatuajes-page-v2__work-button"
                onClick={() => setLightboxIndex(index)}
                aria-label={`Ver ${image.alt}`}
              >
                <span className="tatuajes-page-v2__photo">
                  <Image
                    src={image.src}
                    alt={image.alt}
                    fill
                    sizes="(max-width: 700px) 45vw, 24vw"
                    className="tatuajes-page-v2__photo-image"
                  />
                  <span className="tatuajes-page-v2__expand" aria-hidden="true">
                    ↗
                  </span>
                </span>
                <span className="tatuajes-page-v2__caption">
                  <span>{image.alt}</span>
                  <small>{pad(index + 1)} / Tatuaje</small>
                </span>
              </button>
            );
          })}
        </div>

        <div className="tatuajes-page-v2__gallery-footer">
          <span>Una selección de mi trabajo</span>
          {moreWorks.length > 0 ? (
            <button
              type="button"
              className="tatuajes-page-v2__text-link tatuajes-page-v2__more-button"
              onClick={() => setExpanded((value) => !value)}
              aria-expanded={expanded}
              aria-controls="tatuajes-more-gallery"
            >
              {expanded ? "Ver menos" : "Ver más tatuajes"}{" "}
              <span aria-hidden="true">{expanded ? "−" : "＋"}</span>
            </button>
          ) : null}
        </div>
      </section>

      <section id="disenos-disponibles" className="tatuajes-page-v2__section tatuajes-page-v2__designs">
        <Reveal>
          <div className="tatuajes-page-v2__heading">
            <div>
              <p className="tatuajes-page-v2__eyebrow">02 / Piezas para elegir</p>
              <h2>
                Una idea esperando
                <br />
                <em>encontrarte.</em>
              </h2>
            </div>
            <div className="tatuajes-page-v2__heading-aside">
              <p>
                Explora ideas listas para llevar a tu piel
                <br />
                o adaptar contigo.
              </p>
              <Link
                className="tatuajes-page-v2__text-link"
                href="/tatuajes/disenos-disponibles"
              >
                Ver diseños disponibles <span aria-hidden="true">↗</span>
              </Link>
            </div>
          </div>
        </Reveal>

        <div className="tatuajes-page-v2__design-grid">
          {designs.map((design, index) => (
            <Reveal key={design.id} delay={index * 0.08}>
              <Link
                className="tatuajes-page-v2__design-card"
                href="/tatuajes/disenos-disponibles"
              >
                <div className="tatuajes-page-v2__design-image">
                  <Image
                    src={design.src}
                    alt={design.alt}
                    fill
                    sizes="(max-width: 700px) 78vw, 33vw"
                    className="tatuajes-page-v2__design-photo"
                  />
                  <span className="tatuajes-page-v2__design-index">{pad(index + 1)}</span>
                </div>
                <div className="tatuajes-page-v2__design-label">
                  <h3>{design.name}</h3>
                  <span aria-hidden="true">↗</span>
                </div>
                <p className="tatuajes-page-v2__design-detail">{design.detail}</p>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>

      <section id="sobre-mi" className="tatuajes-page-v2__section tatuajes-page-v2__about">
        <Reveal className="tatuajes-page-v2__about-visual">
          <span className="tatuajes-page-v2__about-image">
            {aboutImage ? (
              <Image
                src={aboutImage.src}
                alt={aboutImage.alt}
                fill
                sizes="(max-width: 700px) 92vw, 45vw"
                className="tatuajes-page-v2__photo-image"
              />
            ) : null}
          </span>
          <span className="tatuajes-page-v2__stamp">
            Pájaro Maca
            <br />
            Arte en la piel
            <br />
            <span aria-hidden="true">✳</span>
          </span>
        </Reveal>

        <Reveal className="tatuajes-page-v2__about-copy" delay={0.12} direction="right">
          <div>
            <p className="tatuajes-page-v2__eyebrow">03 / Sobre mí</p>
            <h2>
              Una colaboración
              <br />
              <em>en la piel.</em>
            </h2>
            <p className="tatuajes-page-v2__body-text">
              Soy tatuadora y artista visual. Creo diseños personalizados que convierten historias,
              símbolos e intuiciones en piezas únicas.
            </p>
            <p className="tatuajes-page-v2__body-text">
              Cada sesión comienza escuchando tu idea. Juntos definimos el lenguaje visual, la
              ubicación y el tamaño para que el resultado se sienta verdaderamente tuyo.
            </p>
            <a
              className="tatuajes-page-v2__text-link"
              href="https://instagram.com/pajaro_maca"
              target="_blank"
              rel="noopener noreferrer"
            >
              Conoce mi universo <span aria-hidden="true">↗</span>
            </a>
            <p className="tatuajes-page-v2__location">
              <span className="tatuajes-page-v2__dot" aria-hidden="true" />
              Villarrica, Chile
            </p>
          </div>
        </Reveal>
      </section>

      <section id="cotizar" className="tatuajes-page-v2__section tatuajes-page-v2__quote">
        <Reveal className="tatuajes-page-v2__quote-heading">
          <div>
            <p className="tatuajes-page-v2__eyebrow">04 / Tu idea, el primer paso</p>
            <h2>
              Todo empieza
              <br />
              con un <em>«¿y si…?»</em>
            </h2>
            <p className="tatuajes-page-v2__body-text">
              Cuéntame qué tienes en mente.
              <br />
              Le damos forma, juntos.
            </p>
            <Link className="tatuajes-page-v2__button" href="/tatuajes/cotizar">
              Solicitar cotización <span aria-hidden="true">↗</span>
            </Link>
          </div>
        </Reveal>

        <Reveal delay={0.12}>
          <div className="tatuajes-page-v2__quote-steps">
            <div>
              <span>01</span>
              <div>
                <h3>Tu idea</h3>
                <p>Una historia, un símbolo o una referencia visual. No necesitas tener todo resuelto.</p>
              </div>
              <b aria-hidden="true">↗</b>
            </div>
            <div>
              <span>02</span>
              <div>
                <h3>El lugar y el tamaño</h3>
                <p>Dónde te gustaría llevarlo y sus medidas aproximadas.</p>
              </div>
              <b aria-hidden="true">↗</b>
            </div>
            <div>
              <span>03</span>
              <div>
                <h3>Lo creamos contigo</h3>
                <p>
                  Con esa información puedo orientarte sobre el diseño, el valor y la disponibilidad.
                </p>
              </div>
              <b aria-hidden="true">↗</b>
            </div>
          </div>
        </Reveal>
      </section>

      <section id="cuidados" className="tatuajes-page-v2__section tatuajes-page-v2__care">
        <Reveal className="tatuajes-page-v2__care-symbol">
          <span aria-hidden="true">✳</span>
        </Reveal>

        <Reveal className="tatuajes-page-v2__care-copy" delay={0.08}>
          <div>
            <p className="tatuajes-page-v2__eyebrow">05 / Después de la sesión</p>
            <h2>
              El cuidado también
              <br />
              es parte del <em>arte.</em>
            </h2>
            <p className="tatuajes-page-v2__body-text">
              Cuida tu tatuaje desde el primer día. La guía completa te acompaña paso a paso durante
              la cicatrización.
            </p>
            <Link className="tatuajes-page-v2__text-link" href="/tatuajes/cuidados">
              Leer guía de cuidados <span aria-hidden="true">↗</span>
            </Link>
          </div>
        </Reveal>

        <Reveal className="tatuajes-page-v2__care-points" delay={0.16} direction="right">
          <>
            <span>
              <i>01</i> <b>Lava suavemente</b>
            </span>
            <span>
              <i>02</i> <b>Hidrata con una capa fina</b>
            </span>
            <span>
              <i>03</i> <b>Evita sol, piscinas y fricción</b>
            </span>
          </>
        </Reveal>
      </section>

      <footer className="tatuajes-page-v2__footer">
        <div className="tatuajes-page-v2__footer-top">
          <p>¿Lo imaginamos?</p>
          <Link href="/tatuajes/cotizar">
            Tu próxima historia. <span aria-hidden="true">↗</span>
          </Link>
        </div>

        <p className="tatuajes-page-v2__footer-brand">
          pájaro maca <span aria-hidden="true">✳</span>
        </p>

        <div className="tatuajes-page-v2__footer-bottom">
          <span>Tatuajes · Villarrica, Chile</span>
          <a href="https://instagram.com/pajaro_maca" target="_blank" rel="noopener noreferrer">
            Instagram ↗
          </a>
          <Link href="/">Explorar más de mi universo ↗</Link>
          <a href="#inicio">Volver arriba ↑</a>
        </div>
      </footer>

      <TattooLightbox
        items={portfolioImages}
        index={lightboxIndex}
        onChange={setLightboxIndex}
        onClose={closeLightbox}
      />
    </div>
  );
}

export default TatuajesPageV2;
