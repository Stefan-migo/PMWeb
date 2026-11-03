import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Reveal } from "@/app/_components/shared/Reveal";
import { TattooMark } from "@/app/_components/tattoo/TattooMark";
import { TattooBreadcrumb, TattooPageCta } from "@/app/_components/tattoo/TattooSubpage";
import "./SobreMiPage.css";
import { Glyph } from "@/app/_components/shared/Glyph";

export const metadata: Metadata = {
  title: "Sobre mí",
  description: "Sobre mí · Pájaro Maca. Arte en la piel, Villarrica, Chile.",
};

const styles = ["Blackwork", "Dotwork", "Geométrico", "Neo-tradicional", "Linework"];

export default function SobreMiPage() {
  return (
    <div className="tattoo-subpage tp-sobre-mi">
      <TattooBreadcrumb current="Sobre mí" />

      <section className="tp-sobre-mi__artist">
        <div className="tp-sobre-mi__image">
          <Image
            src="/design/tatuajes-redesign/tattoo-detail.webp"
            alt="Detalle de un tatuaje ornamental realizado por Pájaro Maca"
            fill
            sizes="(max-width: 700px) 92vw, 50vw"
            className="tp-sobre-mi__image-photo"
          />
          <span className="tp-sobre-mi__image-label">
            El detalle también cuenta una historia.
          </span>
        </div>

        <Reveal className="tp-sobre-mi__story" delay={0.1}>
          <div>
            <p className="tattoo-eyebrow">03 / Sobre mí</p>
            <h1>
              Mi trazo.
              <br />
              <em>Tu historia.</em>
            </h1>
            <p className="tp-sobre-mi__opening">
              Soy tatuadora
              <br />
              y artista visual.
            </p>
            <p className="tp-sobre-mi__text">
              Mi pasión por el arte me llevó a especializarme en diseños personalizados que cuentan
              historias únicas en la piel de cada persona.
            </p>
            <p className="tp-sobre-mi__text">
              Cada tatuaje es una colaboración entre tú y yo. Me gusta conocer la historia detrás de
              cada diseño antes de empezar a tatuar.
            </p>
            <a
              className="tattoo-text-link"
              href="https://instagram.com/pajaro_maca"
              target="_blank"
              rel="noopener noreferrer"
            >
              @pajaro_maca <Glyph kind="up-right" />
            </a>
          </div>
        </Reveal>
      </section>

      <section className="tp-sobre-mi__studio" aria-label="Datos del estudio">
        <div>
          <span>01 / Dónde</span>
          <h2>Villarrica, Chile</h2>
          <p>Diseño personalizado, en el sur.</p>
        </div>
        <div>
          <span>02 / Cuándo</span>
          <h2>Lunes a sábado</h2>
          <p>10:00 — 19:00</p>
        </div>
        <Link href="/tatuajes/cotizar">
          <span>03 / Conversemos</span>
          <h2>
            Tu idea es el comienzo <Glyph kind="up-right" />
          </h2>
          <p>Hablemos de tu próxima pieza.</p>
        </Link>
      </section>

      <Reveal>
        <section className="tp-sobre-mi__philosophy">
          <p className="tattoo-eyebrow">Una colaboración en la piel</p>
          <p className="tp-sobre-mi__quote">
            Antes de dibujar,
            <br />
            <em>me gusta escuchar.</em>
          </p>
          <TattooMark className="tp-sobre-mi__philosophy-mark" />
        </section>
      </Reveal>

      <section className="tp-sobre-mi__styles">
        <Reveal>
          <div>
            <p className="tattoo-eyebrow">Lenguajes que exploro</p>
            <h2>
              Un universo.
              <br />
              <em>Muchos trazos.</em>
            </h2>
            <p className="tp-sobre-mi__text">Cada idea encuentra su propio lenguaje visual.</p>
            <Link className="tattoo-text-link" href="/tatuajes/portafolio">
              Explorar mi trabajo <Glyph kind="up-right" />
            </Link>
          </div>
        </Reveal>

        <ol className="tp-sobre-mi__style-list">
          {styles.map((style, index) => (
            <li key={style}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <h3>{style}</h3>
              <TattooMark className="tp-sobre-mi__style-mark" />
            </li>
          ))}
        </ol>
      </section>

      <TattooPageCta
        eyebrow="Una idea. Una conversación."
        title={
          <>
            Lo creamos <em>juntos.</em>
          </>
        }
        href="/tatuajes/cotizar"
        label="Hablemos de tu idea"
      />
    </div>
  );
}
