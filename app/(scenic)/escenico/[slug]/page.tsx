import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { getWorkBySlug, works } from "@/app/_lib/scenic/content";
import { ScenicImagePlaceholder } from "@/app/_components/scenic/ScenicImagePlaceholder";

const kindLabel: Record<string, string> = {
  obra: "Obra",
  videoclip: "Videoclip",
  espacio: "Espacio",
};

type PageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return works.map((work) => ({ slug: work.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const work = getWorkBySlug(slug);

  if (!work) {
    return { title: "Obra no encontrada — Escénico" };
  }

  const description =
    work.summary?.split("\n\n")[0] ??
    `${work.title}: ${work.macarenaRoles.join(", ")}. ${work.yearLabel}.`;

  return {
    title: `${work.title} — Escénico`,
    description,
    openGraph: {
      title: `${work.title} | PajaroMaca`,
      description,
    },
  };
}

export default async function ScenicWorkPage({ params }: PageProps) {
  const { slug } = await params;
  const work = getWorkBySlug(slug);

  if (!work) {
    notFound();
  }

  const summaryParagraphs = work.summary?.split("\n\n") ?? [];

  return (
    <main className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
      <Link
        href="/escenico#obras"
        className="inline-flex items-center gap-2 text-sm text-scenic-text-muted transition-colors hover:text-scenic-accent"
      >
        <ArrowLeft className="h-4 w-4" aria-hidden="true" />
        Volver a Escénico
      </Link>

      <p className="mt-8 text-xs uppercase tracking-[0.3em] text-scenic-accent">
        {kindLabel[work.kind]} · {work.yearLabel}
        {work.status === "premiered" && (
          <span className="ml-3 border border-scenic-accent/60 px-2 py-0.5 text-[0.65rem] tracking-[0.2em]">
            Estrenada
          </span>
        )}
      </p>

      <h1 className="mt-4 font-[family-name:var(--font-serif)] text-5xl font-semibold leading-tight sm:text-6xl">
        {work.title}
      </h1>

      {work.entity && (
        <p className="mt-3 text-lg text-scenic-text-muted">{work.entity}</p>
      )}
      {work.place && <p className="text-sm text-scenic-text-muted">{work.place}</p>}

      <ScenicImagePlaceholder label={work.mediaPlaceholder} aspect="wide" className="mt-8" />

      {summaryParagraphs.length > 0 && (
        <div className="mt-10 space-y-4 text-lg leading-relaxed text-scenic-text-muted">
          {summaryParagraphs.map((paragraph) => (
            <p key={paragraph.slice(0, 40)}>{paragraph}</p>
          ))}
        </div>
      )}

      <section
        aria-labelledby="ficha-heading"
        className="mt-12 border-t border-scenic-border/30 pt-8"
      >
        <h2
          id="ficha-heading"
          className="font-[family-name:var(--font-serif)] text-3xl font-semibold"
        >
          Ficha técnica
        </h2>

        <dl className="mt-6 divide-y divide-scenic-border/30">
          {work.credits.map((credit) => (
            <div
              key={`${credit.role}-${credit.person}`}
              className="grid gap-1 py-3 sm:grid-cols-[16rem_1fr] sm:gap-6"
            >
              <dt className="text-xs uppercase tracking-[0.2em] text-scenic-text-muted">
                {credit.role}
              </dt>
              <dd className="text-scenic-text">{credit.person}</dd>
            </div>
          ))}

          {work.macarenaRoles.map((role) => (
            <div
              key={role}
              className="grid gap-1 py-3 sm:grid-cols-[16rem_1fr] sm:gap-6"
            >
              <dt className="text-xs uppercase tracking-[0.2em] text-scenic-text-muted">
                {role}
              </dt>
              <dd className="text-scenic-text">Macarena Almeida</dd>
            </div>
          ))}

          {work.duration && (
            <div className="grid gap-1 py-3 sm:grid-cols-[16rem_1fr] sm:gap-6">
              <dt className="text-xs uppercase tracking-[0.2em] text-scenic-text-muted">
                Duración
              </dt>
              <dd className="text-scenic-text">{work.duration}</dd>
            </div>
          )}
        </dl>
      </section>

      {work.artDirectionNote && (
        <section aria-labelledby="resena-heading" className="mt-12">
          <h2
            id="resena-heading"
            className="font-[family-name:var(--font-serif)] text-3xl font-semibold"
          >
            Reseña de dirección de arte
          </h2>
          <p className="mt-4 leading-relaxed text-scenic-text-muted">
            {work.artDirectionNote}
          </p>
        </section>
      )}

      {work.cast.length > 0 && (
        <section aria-labelledby="elenco-heading" className="mt-12">
          <h2
            id="elenco-heading"
            className="font-[family-name:var(--font-serif)] text-3xl font-semibold"
          >
            Creadores intérpretes
          </h2>
          <ul className="mt-4 grid gap-x-8 gap-y-2 text-sm text-scenic-text-muted sm:grid-cols-2">
            {work.cast.map((name) => (
              <li key={name}>{name}</li>
            ))}
          </ul>
        </section>
      )}
    </main>
  );
}
