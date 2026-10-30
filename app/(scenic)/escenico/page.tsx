import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Instagram, Mail, MapPin, Phone } from "lucide-react";
import { getScenicWorks } from "@/app/_lib/queries/scenic";
import {
  bio,
  contact,
  directionApproach,
  identity,
  imageSlots,
  stageWork,
  timeline,
  works,
} from "@/app/_lib/scenic/content";
import { ScenicImagePlaceholder } from "@/app/_components/scenic/ScenicImagePlaceholder";

export const metadata: Metadata = {
  title: "Escénico — Dirección de arte y danza",
  description:
    "Portafolio escénico de Macarena Almeida (Pájaro Maca): dirección de arte, danza, vestuario y máscaras en Chile y Colombia. 2014-2026.",
  openGraph: {
    title: "Escénico | PajaroMaca",
    description:
      "Dirección de arte, danza, vestuario y máscaras. Portafolio escénico 2014-2026.",
  },
};

const kindLabel: Record<string, string> = {
  obra: "Obra",
  videoclip: "Videoclip",
  espacio: "Espacio",
};

export default async function EscenicoPage() {
  // The media gallery is optional: production has no rows yet and a query
  // failure must degrade to an empty gallery instead of a 500.
  const media = await getScenicWorks().catch(() => []);

  return (
    <main>
      <section
        aria-labelledby="escenico-heading"
        className="mx-auto max-w-6xl px-4 pb-14 pt-16 sm:px-6 lg:px-8"
      >
        <p className="text-xs uppercase tracking-[0.35em] text-scenic-accent">
          {identity.artisticName} · {identity.period}
        </p>
        <h1
          id="escenico-heading"
          className="mt-4 font-[family-name:var(--font-scenic)] text-6xl leading-none tracking-wide sm:text-7xl lg:text-8xl"
        >
          Escénico
        </h1>
        <p className="mt-5 max-w-2xl text-lg text-scenic-text-muted">{identity.tagline}</p>

        <dl className="mt-8 grid gap-x-8 gap-y-3 text-sm sm:grid-cols-3">
          <div>
            <dt className="uppercase tracking-[0.2em] text-scenic-text-muted">Nombre</dt>
            <dd className="mt-1">{identity.name}</dd>
          </div>
          <div>
            <dt className="uppercase tracking-[0.2em] text-scenic-text-muted">Rol</dt>
            <dd className="mt-1">{identity.roles}</dd>
          </div>
          <div>
            <dt className="uppercase tracking-[0.2em] text-scenic-text-muted">Territorio</dt>
            <dd className="mt-1">{identity.scope}</dd>
          </div>
        </dl>

        <ScenicImagePlaceholder
          label={imageSlots.cover}
          aspect="wide"
          className="mt-10"
        />
      </section>

      <section
        id="sobre"
        aria-labelledby="sobre-heading"
        className="mx-auto grid max-w-6xl gap-10 px-4 py-14 sm:px-6 lg:grid-cols-[2fr_1fr] lg:px-8"
      >
        <div>
          <h2
            id="sobre-heading"
            className="font-[family-name:var(--font-serif)] text-4xl font-semibold"
          >
            Sobre Macarena
          </h2>
          <div className="mt-6 space-y-4 text-scenic-text-muted">
            {bio.map((paragraph) => (
              <p key={paragraph.slice(0, 40)} className="leading-relaxed">
                {paragraph}
              </p>
            ))}
          </div>
        </div>
        <ScenicImagePlaceholder label={imageSlots.portrait} aspect="portrait" />
      </section>

      <section
        id="direccion-de-arte"
        aria-labelledby="direccion-heading"
        className="border-y border-scenic-border/30 bg-scenic-surface/60"
      >
        <div className="mx-auto grid max-w-6xl gap-10 px-4 py-16 sm:px-6 lg:grid-cols-[1fr_2fr] lg:px-8">
          <ScenicImagePlaceholder label={imageSlots.direction} aspect="portrait" />
          <div>
            <h2
              id="direccion-heading"
              className="font-[family-name:var(--font-serif)] text-4xl font-semibold"
            >
              Dirección de arte
            </h2>
            <div className="mt-6 space-y-4 text-scenic-text-muted">
              {directionApproach.map((paragraph) => (
                <p key={paragraph.slice(0, 40)} className="leading-relaxed">
                  {paragraph}
                </p>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section
        id="trayectoria"
        aria-labelledby="trayectoria-heading"
        className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8"
      >
        <h2
          id="trayectoria-heading"
          className="font-[family-name:var(--font-serif)] text-4xl font-semibold"
        >
          Formación y trayectoria
        </h2>
        <ol className="mt-8 divide-y divide-scenic-border/30 border-t border-scenic-border/30">
          {timeline.map((entry) => (
            <li
              key={`${entry.period}-${entry.entry.slice(0, 24)}`}
              className="grid gap-2 py-4 sm:grid-cols-[8rem_1fr] sm:gap-6"
            >
              <span className="font-[family-name:var(--font-scenic)] text-xl tracking-wide text-scenic-accent">
                {entry.period}
              </span>
              <span className="text-scenic-text-muted">{entry.entry}</span>
            </li>
          ))}
        </ol>
      </section>

      <section
        id="obras"
        aria-labelledby="obras-heading"
        className="border-y border-scenic-border/30 bg-scenic-surface/60"
      >
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
          <h2
            id="obras-heading"
            className="font-[family-name:var(--font-serif)] text-4xl font-semibold"
          >
            Obras
          </h2>
          <p className="mt-3 max-w-2xl text-scenic-text-muted">
            Cada ficha separa la dirección artística y la coreografía de la dirección de arte, la
            interpretación y el diseño de vestuario.
          </p>

          <div className="mt-10 grid gap-8 sm:grid-cols-2">
            {works.map((work) => (
              <article
                key={work.slug}
                className="group flex flex-col border border-scenic-border/40 bg-scenic-bg"
              >
                <ScenicImagePlaceholder
                  label={work.mediaPlaceholder}
                  aspect="video"
                  className="border-0 border-b border-dashed border-scenic-border/60"
                />
                <div className="flex flex-1 flex-col p-6">
                  <p className="text-xs uppercase tracking-[0.25em] text-scenic-accent">
                    {kindLabel[work.kind]} · {work.yearLabel}
                  </p>
                  <h3 className="mt-2 font-[family-name:var(--font-serif)] text-2xl font-semibold">
                    <Link
                      href={`/escenico/${work.slug}`}
                      className="transition-colors hover:text-scenic-accent"
                    >
                      {work.title}
                    </Link>
                  </h3>
                  {work.entity && (
                    <p className="mt-1 text-sm text-scenic-text-muted">{work.entity}</p>
                  )}
                  <p className="mt-3 text-sm text-scenic-text-muted">
                    {work.macarenaRoles.join(" · ")}
                  </p>
                  <Link
                    href={`/escenico/${work.slug}`}
                    className="mt-5 inline-flex items-center gap-2 text-sm font-medium text-scenic-accent transition-colors hover:text-scenic-accent-hover"
                  >
                    Ver ficha
                    <ArrowRight
                      className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
                      aria-hidden="true"
                    />
                  </Link>
                </div>
              </article>
            ))}
          </div>

          {media.length > 0 && (
            <div className="mt-12">
              <h3 className="font-[family-name:var(--font-serif)] text-2xl font-semibold">
                Registro en escena
              </h3>
              <ul className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {media.map((item) => (
                  <li key={item.id} className="border border-scenic-border/40 bg-scenic-bg p-4">
                    <p className="text-sm font-medium">{item.title}</p>
                    {item.project_label && (
                      <p className="mt-1 text-xs uppercase tracking-[0.2em] text-scenic-accent">
                        {item.project_label}
                      </p>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </section>

      <section
        id="en-escena"
        aria-labelledby="en-escena-heading"
        className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8"
      >
        <h2
          id="en-escena-heading"
          className="font-[family-name:var(--font-serif)] text-4xl font-semibold"
        >
          En escena
        </h2>
        <p className="mt-3 max-w-2xl text-scenic-text-muted">
          {imageSlots.stageGallery.caption}
        </p>
        <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-4">
          {Array.from({ length: imageSlots.stageGallery.count }, (_, index) => (
            <ScenicImagePlaceholder
              key={index}
              label={`Presentación en escena ${index + 1} de ${imageSlots.stageGallery.count}`}
              aspect="portrait"
            />
          ))}
        </div>
      </section>

      <section
        id="escenarios"
        aria-labelledby="escenarios-heading"
        className="border-y border-scenic-border/30 bg-scenic-surface/60"
      >
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
          <h2
            id="escenarios-heading"
            className="font-[family-name:var(--font-serif)] text-4xl font-semibold"
          >
            Escenarios internacionales
          </h2>
          <ul className="mt-8 grid gap-6 sm:grid-cols-2">
            {stageWork.map((stage) => (
              <li
                key={stage.name}
                className="border-l-2 border-scenic-accent/60 pl-5"
              >
                <p className="font-[family-name:var(--font-scenic)] text-xl tracking-wide">
                  {stage.name}
                </p>
                <p className="mt-1 text-xs uppercase tracking-[0.2em] text-scenic-accent">
                  {stage.period}
                </p>
                {stage.detail && (
                  <p className="mt-2 text-sm text-scenic-text-muted">{stage.detail}</p>
                )}
                {stage.place && (
                  <p className="text-sm text-scenic-text-muted">{stage.place}</p>
                )}
                {stage.roles && (
                  <p className="mt-2 text-sm text-scenic-text-muted">{stage.roles}</p>
                )}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section
        id="contacto"
        aria-labelledby="contacto-heading"
        className="mx-auto grid max-w-6xl gap-10 px-4 py-16 sm:px-6 lg:grid-cols-[2fr_1fr] lg:px-8"
      >
        <div>
          <h2
            id="contacto-heading"
            className="font-[family-name:var(--font-serif)] text-4xl font-semibold"
          >
            Contacto
          </h2>
          <p className="mt-4 text-scenic-text-muted">{contact.name}</p>
          <ul className="mt-6 space-y-3 text-sm">
            <li>
              <a
                href={contact.instagramUrl}
                className="inline-flex items-center gap-2 text-scenic-text-muted transition-colors hover:text-scenic-accent"
              >
                <Instagram className="h-4 w-4" aria-hidden="true" />
                {contact.instagramHandle}
              </a>
            </li>
            <li>
              <a
                href={`mailto:${contact.email}`}
                className="inline-flex items-center gap-2 text-scenic-text-muted transition-colors hover:text-scenic-accent"
              >
                <Mail className="h-4 w-4" aria-hidden="true" />
                {contact.email}
              </a>
            </li>
            <li>
              <a
                href={`tel:${contact.phoneE164}`}
                className="inline-flex items-center gap-2 text-scenic-text-muted transition-colors hover:text-scenic-accent"
              >
                <Phone className="h-4 w-4" aria-hidden="true" />
                {contact.phone}
              </a>
            </li>
            <li className="inline-flex items-center gap-2 text-scenic-text-muted">
              <MapPin className="h-4 w-4" aria-hidden="true" />
              {contact.city}
            </li>
          </ul>
        </div>
        <ScenicImagePlaceholder label={imageSlots.contact} aspect="portrait" />
      </section>
    </main>
  );
}
