"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import type { MouseEvent as ReactMouseEvent } from "react";
import styles from "./escenico.module.css";
import {
  featuredWorks,
  galleryCopy,
  hero,
  internationalStages,
  mainTimeline,
  fullTimeline,
  otherWorks,
  portfolioPdf,
  sceneGallery,
  sections,
  workSheetCredits,
  type FeaturedWork,
  type PortfolioPhoto,
} from "@/app/_lib/scenic/portfolio";
import { identity } from "@/app/_lib/scenic/content";

export type ScenicMediaItem = {
  id: number | string;
  title: string;
  media_kind: "image" | "video";
  media_url: string;
  poster_url: string | null;
  project_label: string | null;
};

type GalleryState = {
  photos: PortfolioPhoto[];
  index: number;
};

type PortfolioEscenicoProps = {
  /** Optional media published from the CMS; appended to the scene gallery. */
  media?: ScenicMediaItem[];
};

function subtitleFor(item: FeaturedWork): string | undefined {
  if (item.work.entity) return item.work.entity;

  const direction = item.work.credits.find((credit) => /direcci[oó]n/i.test(credit.role));
  return direction ? `${direction.role}: ${direction.person}` : undefined;
}

function WorkCard({
  item,
  onOpen,
  feature = false,
}: {
  item: FeaturedWork;
  onOpen: (item: FeaturedWork, trigger: HTMLElement) => void;
  feature?: boolean;
}) {
  return (
    <button
      type="button"
      className={`${styles.work} ${feature ? styles.workFeature : ""}`}
      aria-haspopup="dialog"
      onClick={(event) => onOpen(item, event.currentTarget)}
    >
      <div className={`${styles.workImage} ${item.work.slug === "el-final-de-mi-carrera" ? styles.finalImage : ""}`}>
        <Image
          src={item.cover.src}
          alt={item.cover.alt}
          fill
          sizes={feature ? "(max-width: 760px) 100vw, 90vw" : "(max-width: 760px) 100vw, 50vw"}
        />
        {feature && <span className={styles.imageLabel}>{item.category}</span>}
        <span className={styles.imageAction} aria-hidden="true">
          ↗
        </span>
      </div>
      <div className={styles.workCaption}>
        <div>
          <p className={styles.eyebrow}>{item.eyebrow}</p>
          <h3>{item.work.title}</h3>
          {!feature && <p className={styles.muted}>{item.meta.join(" · ")}</p>}
        </div>
        {feature ? (
          <>
            <p>
              {item.meta[0]}
              <br />
              <span className={styles.muted}>{item.meta[1]}</span>
            </p>
            <span className={styles.workLink}>
              Explorar obra <span aria-hidden="true">↗</span>
            </span>
          </>
        ) : (
          <span className={styles.workLink} aria-hidden="true">
            ↗
          </span>
        )}
      </div>
    </button>
  );
}

export function PortfolioEscenico({ media = [] }: PortfolioEscenicoProps) {
  const [activeWork, setActiveWork] = useState<FeaturedWork | null>(null);
  const [gallery, setGallery] = useState<GalleryState | null>(null);

  const workDialogRef = useRef<HTMLDialogElement>(null);
  const galleryDialogRef = useRef<HTMLDialogElement>(null);
  const workTriggerRef = useRef<HTMLElement | null>(null);
  const galleryTriggerRef = useRef<HTMLElement | null>(null);

  const cmsPhotos = useMemo<PortfolioPhoto[]>(
    () =>
      media.flatMap((item) => {
        const src = item.media_kind === "image" ? item.media_url : item.poster_url;
        if (!src) return [];
        return [
          {
            src,
            alt: item.project_label ? `${item.title} · ${item.project_label}` : item.title,
          },
        ];
      }),
    [media],
  );

  const allScenePhotos = useMemo(
    () => [...sceneGallery, ...cmsPhotos],
    [cmsPhotos],
  );

  const openWork = useCallback((item: FeaturedWork, trigger: HTMLElement) => {
    workTriggerRef.current = trigger;
    setActiveWork(item);
  }, []);

  const closeWork = useCallback(() => {
    const dialog = workDialogRef.current;
    if (dialog?.open) dialog.close();
    else setActiveWork(null);
  }, []);

  const openGallery = useCallback(
    (photos: PortfolioPhoto[], index: number, trigger: HTMLElement) => {
      galleryTriggerRef.current = trigger;
      setGallery({ photos, index });
    },
    [],
  );

  const closeGallery = useCallback(() => {
    const dialog = galleryDialogRef.current;
    if (dialog?.open) dialog.close();
    else setGallery(null);
  }, []);

  const stepGallery = useCallback((delta: number) => {
    setGallery((current) => {
      if (!current) return current;
      const total = current.photos.length;
      return { ...current, index: (current.index + delta + total) % total };
    });
  }, []);

  useEffect(() => {
    const dialog = workDialogRef.current;
    if (!dialog) return;
    if (activeWork && !dialog.open) dialog.showModal();
  }, [activeWork]);

  useEffect(() => {
    const dialog = galleryDialogRef.current;
    if (!dialog) return;
    if (gallery && !dialog.open) dialog.showModal();
  }, [gallery]);

  const dialogOpen = Boolean(activeWork || gallery);

  useEffect(() => {
    if (!dialogOpen) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [dialogOpen]);

  const handleWorkDialogClose = () => {
    setActiveWork(null);
    workTriggerRef.current?.focus();
  };

  const handleGalleryDialogClose = () => {
    setGallery(null);
    galleryTriggerRef.current?.focus();
  };

  const closeOnBackdrop = (event: ReactMouseEvent<HTMLDialogElement>) => {
    const dialog = event.currentTarget;
    if (event.target !== dialog) return;
    const rect = dialog.getBoundingClientRect();
    const outside =
      event.clientX < rect.left ||
      event.clientX > rect.right ||
      event.clientY < rect.top ||
      event.clientY > rect.bottom;
    if (outside) dialog.close();
  };

  const activePhotos = gallery?.photos ?? [];
  const activePhoto = activePhotos[gallery?.index ?? 0];

  return (
    <main>
      <section id="inicio" className={styles.hero}>
        <div className={styles.heroImage}>
          <Image
            src={hero.image.src}
            alt={hero.image.alt}
            fill
            priority
            sizes="(max-width: 760px) 100vw, 60vw"
          />
          <div className={styles.imageWash} aria-hidden="true" />
        </div>

        <div className={styles.heroContent}>
          <p className={styles.eyebrow}>
            <span className={styles.tinyLine} aria-hidden="true" />
            {hero.eyebrow}
          </p>
          <h1 className={styles.heroTitle}>
            El cuerpo
            <br />
            como <em>territorio.</em>
          </h1>
          <p className={styles.heroDescription}>
            {hero.description[0]}
            <br />
            {hero.description[1]}
          </p>
          <div className={styles.heroActions}>
            <a className={styles.button} href="#obras">
              {hero.primaryCta} <span aria-hidden="true">↘</span>
            </a>
            <a className={styles.textLink} href={portfolioPdf.href} download>
              {portfolioPdf.label} <span aria-hidden="true">↓</span>
            </a>
          </div>
        </div>

        <div className={styles.heroBottom}>
          <span>
            {hero.bottom.location} <span className={styles.muted}>/</span>{" "}
            {hero.bottom.locationSecondary}
          </span>
          <span className={styles.heroPeriod}>{hero.bottom.period}</span>
          <a href="#obras" aria-label="Bajar a obras seleccionadas">
            {hero.bottom.scroll} <span aria-hidden="true">↓</span>
          </a>
        </div>
      </section>

      <section id="obras" aria-labelledby="obras-heading" className={`${styles.section} ${styles.works}`}>
        <div className={styles.sectionTop}>
          <p className={styles.eyebrow}>{sections.works.eyebrow}</p>
          <span className={styles.smallNote}>{sections.works.note}</span>
        </div>
        <div className={styles.sectionHeading}>
          <h2 id="obras-heading">
            La escena, <em>un cuerpo vivo.</em>
          </h2>
          <p>{sections.works.intro}</p>
        </div>

        {featuredWorks
          .filter((item) => item.feature)
          .map((item) => (
            <WorkCard key={item.work.slug} item={item} onOpen={openWork} feature />
          ))}

        <div className={styles.workGrid}>
          {featuredWorks
            .filter((item) => !item.feature)
            .map((item) => (
              <WorkCard key={item.work.slug} item={item} onOpen={openWork} />
            ))}
        </div>

        <div className={styles.otherWorks}>
          <p className={styles.eyebrow}>OTROS CRUCES CREATIVOS</p>
          {otherWorks.map((item) => (
            <Link key={item.slug} href={`/escenico/${item.slug}`} className={styles.otherRow}>
              <span>{item.period}</span>
              <h3>{item.title}</h3>
              <p>{item.detail}</p>
              <span>{item.role}</span>
            </Link>
          ))}
        </div>
      </section>

      <section id="mirada" aria-labelledby="mirada-heading" className={`${styles.about} ${styles.section}`}>
        <div className={styles.aboutPhoto}>
          <Image
            src={sections.about.image.src}
            alt={sections.about.image.alt}
            fill
            sizes="(max-width: 760px) 100vw, 45vw"
          />
          <p className={styles.photoCaption}>{sections.about.imageCaption}</p>
        </div>
        <div className={styles.aboutCopy}>
          <p className={styles.eyebrow}>{sections.about.eyebrow}</p>
          <h2 id="mirada-heading">
            De las artes visuales
            <br />
            al <em>cuerpo en escena.</em>
          </h2>
          <p className={styles.lead}>{sections.about.lead}</p>
          {sections.about.paragraphs.map((paragraph) => (
            <p key={paragraph.slice(0, 40)}>{paragraph}</p>
          ))}
          <blockquote>{sections.about.quote}</blockquote>
          <a className={styles.textLink} href={sections.about.link.href}>
            {sections.about.link.label} <span aria-hidden="true">↓</span>
          </a>
        </div>
      </section>

      <section
        id={sections.international.id}
        aria-labelledby="encuentros-heading"
        className={`${styles.section} ${styles.international}`}
      >
        <div className={styles.sectionTop}>
          <p className={styles.eyebrow}>{sections.international.eyebrow}</p>
          <span className={styles.smallNote}>{sections.international.note}</span>
        </div>
        <div className={styles.sectionHeading}>
          <h2 id="encuentros-heading">
            Un lenguaje <em>que viaja.</em>
          </h2>
          <p>{sections.international.intro}</p>
        </div>

        <div className={styles.internationalGrid}>
          {internationalStages.map((stage, index) => (
            <figure key={stage.name}>
              <button
                type="button"
                aria-label={`Ampliar fotografía de ${stage.name}`}
                onClick={(event) =>
                  openGallery(
                    internationalStages.map((entry) => entry.photo),
                    index,
                    event.currentTarget,
                  )
                }
              >
                <Image src={stage.photo.src} alt={stage.photo.alt} fill sizes="(max-width: 760px) 100vw, 55vw" />
                <span className={styles.imageAction} aria-hidden="true">
                  ⤢
                </span>
              </button>
              <figcaption>
                <div>
                  <h3>{stage.name}</h3>
                  <p>{stage.detail}</p>
                </div>
                <span>{stage.place}</span>
              </figcaption>
              {stage.role && <p className={styles.internationalRole}>{stage.role}.</p>}
            </figure>
          ))}
        </div>

        <div className={styles.galleryHeader}>
          <h3>{galleryCopy.heading}</h3>
          <p>
            {galleryCopy.intro} <span aria-hidden="true">↘</span>
          </p>
        </div>
        <div className={styles.sceneGallery} aria-label="Galería de presentaciones">
          {allScenePhotos.map((photo, index) => (
            <button
              key={`${photo.src}-${index}`}
              type="button"
              aria-label={`Ampliar fotografía ${index + 1} de presentaciones en escena`}
              onClick={(event) => openGallery(allScenePhotos, index, event.currentTarget)}
            >
              <Image src={photo.src} alt={photo.alt} fill sizes="(max-width: 760px) 25vw, 12vw" />
            </button>
          ))}
        </div>
        <p className={styles.galleryHint}>{galleryCopy.hint}</p>
      </section>

      <section
        id={sections.trajectory.id}
        aria-labelledby="trayectoria-heading"
        className={`${styles.section} ${styles.trajectory}`}
      >
        <div className={styles.trajectoryIntro}>
          <p className={styles.eyebrow}>{sections.trajectory.eyebrow}</p>
          <h2 id="trayectoria-heading">
            Una práctica
            <br />
            en <em>movimiento.</em>
          </h2>
          <p>{sections.trajectory.intro}</p>
          <a className={styles.textLink} href={portfolioPdf.href} download>
            {portfolioPdf.downloadLabel} <span aria-hidden="true">↓</span>
          </a>
        </div>

        <div>
          <div className={styles.timeline}>
            {mainTimeline.map((entry) => (
              <div key={`${entry.period}-${entry.title}`} className={styles.timelineRow}>
                <span>{entry.period}</span>
                <div>
                  <h3>{entry.title}</h3>
                  <p>{entry.detail}</p>
                </div>
              </div>
            ))}
          </div>

          <details className={styles.fullTimeline}>
            <summary>
              {sections.trajectory.expandLabel} <span aria-hidden="true">+</span>
            </summary>
            {fullTimeline.map((entry) => (
              <div key={`${entry.period}-${entry.title}`} className={styles.timelineRow}>
                <span>{entry.period}</span>
                <div>
                  <h3>{entry.title}</h3>
                  <p>{entry.detail}</p>
                </div>
              </div>
            ))}
          </details>
        </div>
      </section>

      <section
        id={sections.contact.id}
        aria-labelledby="contacto-heading"
        className={`${styles.section} ${styles.contact}`}
      >
        <div>
          <p className={styles.eyebrow}>{sections.contact.eyebrow}</p>
          <h2 id="contacto-heading">
            Hagamos
            <br />
            <em>escena.</em>
            <span className={styles.contactStar} aria-hidden="true">
              ✳
            </span>
          </h2>
          <p>{sections.contact.intro}</p>
          <a href={`mailto:${sections.contact.email}`} className={styles.contactEmail}>
            {sections.contact.email} <span aria-hidden="true">↗</span>
          </a>
        </div>
        <div className={styles.contactSide}>
          <p>
            {identity.name.toUpperCase()}
            <br />
            <span>{sections.contact.sideCity}</span>
          </p>
          <a
            href={sections.contact.instagram.href}
            target="_blank"
            rel="noopener noreferrer"
          >
            {sections.contact.instagram.label}{" "}
            <span>{sections.contact.instagram.detail} ↗</span>
          </a>
          <a href={sections.contact.phone.href}>
            {sections.contact.phone.label} <span>{sections.contact.phone.detail} ↗</span>
          </a>
          <a href={sections.contact.portfolio.href} download>
            {sections.contact.portfolio.label}{" "}
            <span>{sections.contact.portfolio.detail} ↓</span>
          </a>
        </div>
      </section>

      <dialog
        ref={workDialogRef}
        className={styles.dialog}
        aria-labelledby={activeWork ? "dialog-title" : undefined}
        onCancel={(event) => {
          event.preventDefault();
          closeWork();
        }}
        onClick={closeOnBackdrop}
        onClose={handleWorkDialogClose}
        onKeyDown={(event) => {
          if (event.key !== "Escape") return;
          event.preventDefault();
          closeWork();
        }}
      >
        <div className={styles.dialogToolbar}>
          <span className={styles.eyebrow}>PÁJARO MACA / FICHA DE OBRA</span>
          <button
            type="button"
            className={styles.closeDialog}
            onClick={closeWork}
            aria-label="Cerrar ficha"
          >
            Cerrar <span aria-hidden="true">×</span>
          </button>
        </div>

        {activeWork && (
          <div>
            <div className={styles.dialogCover}>
              <Image
                src={activeWork.cover.src}
                alt={activeWork.cover.alt}
                fill
                sizes="94vw"
              />
            </div>
            <div className={styles.dialogBody}>
              <p className={styles.eyebrow}>
                {activeWork.category} · {activeWork.work.yearLabel}
              </p>
              <h2 id="dialog-title">{activeWork.work.title}</h2>
              {subtitleFor(activeWork) && (
                <p className={styles.dialogSubtitle}>{subtitleFor(activeWork)}</p>
              )}

              <div className={styles.dialogColumns}>
                <div>
                  <h3>SOBRE LA OBRA</h3>
                  {activeWork.intro.map((paragraph) => (
                    <p key={paragraph.slice(0, 40)}>{paragraph}</p>
                  ))}
                  {activeWork.artDirection && (
                    <>
                      <h3>{activeWork.artDirectionHeading}</h3>
                      <p>{activeWork.artDirection}</p>
                    </>
                  )}
                </div>
                <aside>
                  <h3>FICHA ARTÍSTICA</h3>
                  <dl className={styles.credits}>
                    {workSheetCredits(activeWork.work).map((credit) => (
                      <div key={`${credit.role}-${credit.person}`}>
                        <dt>{credit.role}</dt>
                        <dd>{credit.person}</dd>
                      </div>
                    ))}
                    {activeWork.extraCredit && (
                      <div>
                        <dt>{activeWork.extraCredit.role}</dt>
                        <dd>{activeWork.extraCredit.person}</dd>
                      </div>
                    )}
                  </dl>
                  {activeWork.work.cast.length > 0 && (
                    <>
                      <h3>CREADORES INTÉRPRETES</h3>
                      <p className={styles.cast}>{activeWork.work.cast.join(", ")}.</p>
                    </>
                  )}
                </aside>
              </div>

              {activeWork.photos.length > 0 && (
                <div
                  className={`${styles.dialogPhotos} ${
                    activeWork.photos.length === 1 ? styles.dialogPhotosSingle : ""
                  }`}
                >
                  {activeWork.photos.map((photo, index) => (
                    <button
                      key={photo.src}
                      type="button"
                      className={styles.dialogPhoto}
                      aria-label={`Ampliar fotografía ${index + 1} de ${activeWork.work.title}`}
                      onClick={(event) =>
                        openGallery(activeWork.photos, index, event.currentTarget)
                      }
                    >
                      <Image src={photo.src} alt={photo.alt} fill sizes="45vw" />
                    </button>
                  ))}
                </div>
              )}

              <Link
                className={styles.dialogSheetLink}
                href={`/escenico/${activeWork.work.slug}`}
              >
                Ver ficha completa <span aria-hidden="true">↗</span>
              </Link>
            </div>
          </div>
        )}
      </dialog>

      <dialog
        ref={galleryDialogRef}
        className={styles.galleryDialog}
        aria-label="Visor de fotografías"
        onCancel={(event) => {
          event.preventDefault();
          closeGallery();
        }}
        onClick={closeOnBackdrop}
        onClose={handleGalleryDialogClose}
        onKeyDown={(event) => {
          if (event.key === "Escape") {
            event.preventDefault();
            closeGallery();
          }
          if (event.key === "ArrowLeft") {
            event.preventDefault();
            stepGallery(-1);
          }
          if (event.key === "ArrowRight") {
            event.preventDefault();
            stepGallery(1);
          }
        }}
      >
        <div className={styles.galleryToolbar}>
          <span>
            {galleryCopy.counterLabel} / {String((gallery?.index ?? 0) + 1).padStart(2, "0")} —{" "}
            {String(activePhotos.length).padStart(2, "0")}
          </span>
          <button
            type="button"
            className={styles.closeDialog}
            onClick={closeGallery}
            aria-label="Cerrar fotografía"
          >
            Cerrar <span aria-hidden="true">×</span>
          </button>
        </div>
        <div className={styles.galleryStage}>
          <button type="button" onClick={() => stepGallery(-1)} aria-label="Fotografía anterior">
            ←
          </button>
          <figure className={styles.galleryFigure}>
            <div className={styles.galleryImage}>
              {activePhoto && (
                <Image
                  src={activePhoto.src}
                  alt={activePhoto.alt}
                  fill
                  sizes="90vw"
                />
              )}
            </div>
            <figcaption>{activePhoto?.alt}</figcaption>
          </figure>
          <button type="button" onClick={() => stepGallery(1)} aria-label="Fotografía siguiente">
            →
          </button>
        </div>
      </dialog>
    </main>
  );
}
