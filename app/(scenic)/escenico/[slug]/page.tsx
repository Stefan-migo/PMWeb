import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getWorkBySlug, works } from "@/app/_lib/scenic/content";
import { featuredWorks, workSheetCredits } from "@/app/_lib/scenic/portfolio";
import styles from "../escenico.module.css";

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

  const presentation = featuredWorks.find((item) => item.work.slug === work.slug);
  const summaryParagraphs = work.summary?.split("\n\n") ?? [];
  const credits = workSheetCredits(work);

  return (
    <main>
      <article className={styles.workSheet}>
        <div className={styles.workSheetTop}>
          <Link href="/escenico#obras" className={styles.textLink}>
            ← Volver a Escénico
          </Link>
          <p className={styles.eyebrow}>
            {kindLabel[work.kind]} · {work.yearLabel}
            {work.status === "premiered" && (
              <span className={styles.workSheetTag}>Estrenada</span>
            )}
          </p>
          <h1 className={styles.workSheetTitle}>{work.title}</h1>
          {work.entity && <p className={styles.dialogSubtitle}>{work.entity}</p>}
          {work.place && <p className={styles.dialogSubtitle}>{work.place}</p>}
        </div>

        {presentation && (
          <div className={styles.workSheetCover}>
            <Image
              src={presentation.cover.src}
              alt={presentation.cover.alt}
              fill
              priority
              sizes="(max-width: 760px) 100vw, 1200px"
            />
          </div>
        )}

        <div className={styles.workSheetColumns}>
          <div>
            <h2>SOBRE LA OBRA</h2>
            {summaryParagraphs.length > 0 ? (
              summaryParagraphs.map((paragraph) => (
                <p key={paragraph.slice(0, 40)}>{paragraph}</p>
              ))
            ) : (
              <p>{work.artDirectionNote}</p>
            )}

            {summaryParagraphs.length > 0 && work.artDirectionNote && (
              <>
                <h2>RESEÑA DE DIRECCIÓN DE ARTE</h2>
                <p>{work.artDirectionNote}</p>
              </>
            )}

            {work.cast.length > 0 && (
              <>
                <h2>CREADORES INTÉRPRETES</h2>
                <p>{work.cast.join(", ")}.</p>
              </>
            )}
          </div>

          <section aria-labelledby="ficha-heading">
            <h2 id="ficha-heading">Ficha técnica</h2>
            <dl className={styles.credits}>
              {credits.map((credit) => (
                <div key={`${credit.role}-${credit.person}`}>
                  <dt>{credit.role}</dt>
                  <dd>{credit.person}</dd>
                </div>
              ))}
              {presentation?.extraCredit && (
                <div>
                  <dt>{presentation.extraCredit.role}</dt>
                  <dd>{presentation.extraCredit.person}</dd>
                </div>
              )}
            </dl>
          </section>
        </div>

        {presentation && presentation.photos.length > 0 && (
          <div className={styles.workSheetPhotos}>
            {presentation.photos.map((photo) => (
              <div key={photo.src} className={styles.workSheetPhoto}>
                <Image
                  src={photo.src}
                  alt={photo.alt}
                  fill
                  sizes="(max-width: 760px) 100vw, 600px"
                />
              </div>
            ))}
          </div>
        )}
      </article>
    </main>
  );
}
