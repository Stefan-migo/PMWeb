"use client";

import Image from "next/image";
import Link from "next/link";
import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  useSyncExternalStore,
} from "react";
import type { CSSProperties, MouseEvent as ReactMouseEvent } from "react";
import styles from "./escenico.module.css";
import {
  featuredWorks,
  galleryCopy,
  heroCopy,
  heroSlideDuration,
  heroSlides,
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
import { Glyph, GlyphPair } from "@/app/_components/shared/Glyph";

function prefersReducedMotion(): boolean {
  if (typeof window === "undefined" || typeof window.matchMedia !== "function") {
    return false;
  }
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function subscribeReducedMotion(onChange: () => void) {
  if (typeof window === "undefined" || typeof window.matchMedia !== "function") {
    return () => {};
  }
  const media = window.matchMedia("(prefers-reduced-motion: reduce)");
  media.addEventListener("change", onChange);
  return () => media.removeEventListener("change", onChange);
}

function reducedMotionSnapshot(): boolean {
  if (typeof window === "undefined" || typeof window.matchMedia !== "function") {
    return false;
  }
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

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
      data-reveal
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
          <Glyph kind="up-right" />
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
              <GlyphPair kind="up-right">Explorar obra</GlyphPair>
            </span>
          </>
        ) : (
          <span className={styles.workLink} aria-hidden="true">
            <Glyph kind="up-right" />
          </span>
        )}
      </div>
    </button>
  );
}

export function PortfolioEscenico({ media = [] }: PortfolioEscenicoProps) {
  const [activeWork, setActiveWork] = useState<FeaturedWork | null>(null);
  const [gallery, setGallery] = useState<GalleryState | null>(null);
  const [slideIndex, setSlideIndex] = useState(0);
  const [pauseOverride, setPauseOverride] = useState<boolean | null>(null);
  const reduceMotion = useSyncExternalStore(
    subscribeReducedMotion,
    reducedMotionSnapshot,
    () => false,
  );
  const slidePaused = pauseOverride ?? reduceMotion;
  const [heroViewerOpen, setHeroViewerOpen] = useState(false);
  const [slideAnnouncement, setSlideAnnouncement] = useState("");

  const mainRef = useRef<HTMLElement>(null);
  const heroRef = useRef<HTMLElement>(null);
  const thumbsRef = useRef<HTMLDivElement>(null);
  const workDialogRef = useRef<HTMLDialogElement>(null);
  const galleryDialogRef = useRef<HTMLDialogElement>(null);
  const heroViewerRef = useRef<HTMLDialogElement>(null);
  const workTriggerRef = useRef<HTMLElement | null>(null);
  const galleryTriggerRef = useRef<HTMLElement | null>(null);
  const heroTriggerRef = useRef<HTMLElement | null>(null);
  const touchStartRef = useRef<{ x: number; y: number } | null>(null);

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

  const goToSlide = useCallback((next: number, manual = false) => {
    const total = heroSlides.length;
    const index = ((next % total) + total) % total;
    setSlideIndex(index);
    thumbsRef.current
      ?.querySelectorAll<HTMLElement>(`.${styles.stageProgress}`)
      .forEach((bar) => {
        bar.style.transform = "scaleX(0)";
      });
    if (manual) {
      setSlideAnnouncement(
        `Fotografía ${index + 1} de ${total}. ${heroSlides[index].title}`,
      );
    }
  }, []);

  const openHeroViewer = useCallback((trigger: HTMLElement) => {
    heroTriggerRef.current = trigger;
    setHeroViewerOpen(true);
  }, []);

  const closeHeroViewer = useCallback(() => {
    const dialog = heroViewerRef.current;
    if (dialog?.open) dialog.close();
    else setHeroViewerOpen(false);
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

  useEffect(() => {
    const dialog = heroViewerRef.current;
    if (!dialog) return;
    if (heroViewerOpen && !dialog.open) dialog.showModal();
  }, [heroViewerOpen]);

  useEffect(() => {
    if (slidePaused) return;
    if (typeof requestAnimationFrame !== "function") return;

    let frame = 0;
    let last = performance.now();
    let elapsed = 0;

    thumbsRef.current
      ?.querySelectorAll<HTMLElement>(`.${styles.stageProgress}`)
      .forEach((bar) => {
        bar.style.transform = "scaleX(0)";
      });

    const tick = (now: number) => {
      const delta = Math.min(now - last, 100);
      last = now;
      const menuOpen =
        document
          .querySelector('[aria-controls="navigation"]')
          ?.getAttribute("aria-expanded") === "true";
      const anyDialogOpen = Boolean(document.querySelector("dialog[open]"));
      const hero = heroRef.current;
      const heroVisible = hero ? hero.getBoundingClientRect().bottom > 100 : false;

      if (!document.hidden && !menuOpen && !anyDialogOpen && heroVisible) {
        elapsed += delta;
        const activeBar = thumbsRef.current?.children[slideIndex]?.querySelector<HTMLElement>(
          `.${styles.stageProgress}`,
        );
        if (activeBar) {
          activeBar.style.transform = `scaleX(${Math.min(elapsed / heroSlideDuration, 1)})`;
        }
        if (elapsed >= heroSlideDuration) {
          elapsed = 0;
          setSlideIndex((current) => (current + 1) % heroSlides.length);
        }
      }

      frame = requestAnimationFrame(tick);
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [slidePaused, slideIndex]);

  useEffect(() => {
    if (prefersReducedMotion() || typeof IntersectionObserver === "undefined") return;
    const root = mainRef.current;
    if (!root) return;

    const targets = Array.from(root.querySelectorAll<HTMLElement>("[data-reveal]"));
    if (targets.length === 0) return;

    const groups = new Map<Element, number>();
    for (const target of targets) {
      const parent = target.parentElement ?? root;
      const position = groups.get(parent) ?? 0;
      groups.set(parent, position + 1);
      target.dataset.revealDelay = String(Math.min(position % 4, 3) * 85);
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          const element = entry.target as HTMLElement;
          observer.unobserve(element);
          if (typeof element.animate !== "function") continue;
          element.animate(
            [
              { opacity: 0, transform: "translate3d(0,26px,0)" },
              { opacity: 1, transform: "translate3d(0,0,0)" },
            ],
            {
              duration: 850,
              delay: Number(element.dataset.revealDelay ?? 0),
              easing: "cubic-bezier(.2,.65,.3,1)",
              fill: "backwards",
            },
          );
        }
      },
      { threshold: 0.08, rootMargin: "0px 0px -24px 0px" },
    );

    targets.forEach((target) => observer.observe(target));
    return () => observer.disconnect();
  }, []);

  const dialogOpen = Boolean(activeWork || gallery || heroViewerOpen);

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

  const handleHeroViewerClose = () => {
    setHeroViewerOpen(false);
    heroTriggerRef.current?.focus();
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
    <main ref={mainRef}>
      <section
        id="inicio"
        ref={heroRef}
        className={styles.hero}
        aria-roledescription="carrusel"
        aria-label={heroCopy.ariaLabel}
        onKeyDown={(event) => {
          if (event.key === "ArrowRight") {
            event.preventDefault();
            goToSlide(slideIndex + 1, true);
          }
          if (event.key === "ArrowLeft") {
            event.preventDefault();
            goToSlide(slideIndex - 1, true);
          }
        }}
        onTouchStart={(event) => {
          const touch = event.changedTouches[0];
          touchStartRef.current = { x: touch.clientX, y: touch.clientY };
        }}
        onTouchEnd={(event) => {
          const start = touchStartRef.current;
          if (!start) return;
          const touch = event.changedTouches[0];
          const dx = touch.clientX - start.x;
          const dy = touch.clientY - start.y;
          if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy)) {
            goToSlide(slideIndex + (dx < 0 ? 1 : -1), true);
          }
          touchStartRef.current = null;
        }}
      >
        <div className={styles.stageSlides}>
          {heroSlides.map((slide, index) => (
            <div
              key={slide.src}
              className={`${styles.stageSlide} ${
                index === slideIndex ? styles.stageSlideActive : ""
              }`}
              role="group"
              aria-roledescription="diapositiva"
              aria-label={`${index + 1} de ${heroSlides.length}`}
              aria-hidden={index !== slideIndex}
              style={
                {
                  "--focus": slide.focus,
                  "--mobile-focus": slide.mobileFocus,
                } as CSSProperties
              }
            >
              <Image
                src={slide.src}
                alt={slide.alt}
                fill
                priority={index === 0}
                loading={index === 0 ? undefined : "eager"}
                sizes="100vw"
              />
            </div>
          ))}
        </div>
        <div className={styles.stageShade} aria-hidden="true" />

        <button
          type="button"
          className={styles.stageExpand}
          aria-label={heroCopy.expand}
          title={heroCopy.expand}
          onClick={(event) => openHeroViewer(event.currentTarget)}
        >
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="M9 4H4v5m11-5h5v5M4 15v5h5m11-5v5h-5" />
          </svg>
        </button>

        <h1 className={styles.srOnly}>{heroCopy.srTitle}</h1>

        <div className={styles.stageBottom}>
          <div className={styles.stageCount}>
            <span>{String(slideIndex + 1).padStart(2, "0")}</span>
            <span className={styles.stageTotal}>
              / {String(heroSlides.length).padStart(2, "0")}
            </span>
            <span className={styles.stageAuthor}>
              {heroCopy.author}
              <span className={styles.stageDiscipline}>ARTES ESCÉNICAS</span>
            </span>
          </div>

          <div
            ref={thumbsRef}
            className={styles.stageThumbs}
            role="group"
            aria-label="Elegir fotografía"
          >
            {heroSlides.map((slide, index) => (
              <button
                key={slide.src}
                type="button"
                className={styles.stageThumb}
                aria-label={`Ver fotografía ${index + 1}: ${slide.title}`}
                aria-current={index === slideIndex ? "true" : "false"}
                onClick={() => goToSlide(index, true)}
              >
                <Image src={slide.src} alt="" fill sizes="64px" />
                <span className={styles.stageProgress} aria-hidden="true" />
              </button>
            ))}
          </div>

          <div className={styles.stageControls}>
            <button
              type="button"
              aria-label={slidePaused ? heroCopy.resume : heroCopy.pause}
              aria-pressed={slidePaused}
              onClick={() => setPauseOverride(!slidePaused)}
            >
              {slidePaused ? (
                <svg viewBox="0 0 20 20" aria-hidden="true">
                  <path d="m6 3 10 7-10 7Z" />
                </svg>
              ) : (
                <svg viewBox="0 0 20 20" aria-hidden="true">
                  <path d="M7 4v12M13 4v12" />
                </svg>
              )}
            </button>
            <button
              type="button"
              aria-label={heroCopy.previous}
              onClick={() => goToSlide(slideIndex - 1, true)}
            >
              <Glyph kind="left" />
            </button>
            <button
              type="button"
              aria-label={heroCopy.next}
              onClick={() => goToSlide(slideIndex + 1, true)}
            >
              <Glyph kind="right" />
            </button>
          </div>
        </div>

        <a className={styles.stageScroll} href="#obras" aria-label="Bajar a las obras">
          <GlyphPair kind="down">{heroCopy.explore}</GlyphPair>
        </a>
        <p className={styles.srOnly} aria-live="polite">
          {slideAnnouncement}
        </p>
      </section>

      <section id="obras" aria-labelledby="obras-heading" className={`${styles.section} ${styles.works}`}>
        <div className={styles.sectionTop} data-reveal>
          <p className={styles.eyebrow}>{sections.works.eyebrow}</p>
          <span className={styles.smallNote}>{sections.works.note}</span>
        </div>
        <div className={styles.sectionHeading} data-reveal>
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
          <p className={styles.eyebrow} data-reveal>OTROS CRUCES CREATIVOS</p>
          {otherWorks.map((item) => (
            <Link key={item.slug} href={`/escenico/${item.slug}`} className={styles.otherRow} data-reveal>
              <span>{item.period}</span>
              <h3>{item.title}</h3>
              <p>{item.detail}</p>
              <span>{item.role}</span>
            </Link>
          ))}
        </div>
      </section>

      <section id="mirada" aria-labelledby="mirada-heading" className={`${styles.about} ${styles.section}`}>
        <div className={styles.aboutPhoto} data-reveal>
          <Image
            src={sections.about.image.src}
            alt={sections.about.image.alt}
            fill
            sizes="(max-width: 760px) 100vw, 45vw"
          />
          <p className={styles.photoCaption}>{sections.about.imageCaption}</p>
        </div>
        <div className={styles.aboutCopy}>
          <p className={styles.eyebrow} data-reveal>{sections.about.eyebrow}</p>
          <h2 id="mirada-heading" data-reveal>
            De las artes visuales
            <br />
            al <em>cuerpo en escena.</em>
          </h2>
          <p className={styles.lead} data-reveal>{sections.about.lead}</p>
          {sections.about.paragraphs.map((paragraph) => (
            <p key={paragraph.slice(0, 40)} data-reveal>{paragraph}</p>
          ))}
          <blockquote data-reveal>{sections.about.quote}</blockquote>
          <a className={styles.textLink} href={sections.about.link.href} data-reveal>
            <GlyphPair kind="down">{sections.about.link.label}</GlyphPair>
          </a>
        </div>
      </section>

      <section
        id={sections.international.id}
        aria-labelledby="encuentros-heading"
        className={`${styles.section} ${styles.international}`}
      >
        <div className={styles.sectionTop} data-reveal>
          <p className={styles.eyebrow}>{sections.international.eyebrow}</p>
          <span className={styles.smallNote}>
            {sections.international.noteBefore}{" "}
            <Glyph kind="left-right" />{" "}
            {sections.international.noteAfter}
          </span>
        </div>
        <div className={styles.sectionHeading} data-reveal>
          <h2 id="encuentros-heading">
            Un lenguaje <em>que viaja.</em>
          </h2>
          <p>{sections.international.intro}</p>
        </div>

        <div className={styles.internationalGrid}>
          {internationalStages.map((stage, index) => (
            <figure key={stage.name} data-reveal>
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

        <div className={styles.galleryHeader} data-reveal>
          <h3>{galleryCopy.heading}</h3>
          <p>
            <GlyphPair kind="down-right">{galleryCopy.intro}</GlyphPair>
          </p>
        </div>
        <div className={styles.sceneGallery} aria-label="Galería de presentaciones">
          {allScenePhotos.map((photo, index) => (
            <button
              key={`${photo.src}-${index}`}
              type="button"
              data-reveal
              aria-label={`Ampliar fotografía ${index + 1} de presentaciones en escena`}
              onClick={(event) => openGallery(allScenePhotos, index, event.currentTarget)}
            >
              <Image src={photo.src} alt={photo.alt} fill sizes="(max-width: 760px) 25vw, 12vw" />
            </button>
          ))}
        </div>
        <p className={styles.galleryHint} data-reveal>{galleryCopy.hint}</p>
      </section>

      <section
        id={sections.trajectory.id}
        aria-labelledby="trayectoria-heading"
        className={`${styles.section} ${styles.trajectory}`}
      >
        <div className={styles.trajectoryIntro}>
          <p className={styles.eyebrow} data-reveal>{sections.trajectory.eyebrow}</p>
          <h2 id="trayectoria-heading" data-reveal>
            Una práctica
            <br />
            en <em>movimiento.</em>
          </h2>
          <p data-reveal>{sections.trajectory.intro}</p>
          <a className={styles.textLink} href={portfolioPdf.href} download data-reveal>
            <GlyphPair kind="down">{portfolioPdf.downloadLabel}</GlyphPair>
          </a>
        </div>

        <div>
          <div className={styles.timeline}>
            {mainTimeline.map((entry) => (
              <div key={`${entry.period}-${entry.title}`} className={styles.timelineRow} data-reveal>
                <span>{entry.period}</span>
                <div>
                  <h3>{entry.title}</h3>
                  <p>{entry.detail}</p>
                </div>
              </div>
            ))}
          </div>

          <details className={styles.fullTimeline} data-reveal>
            <summary>
              {sections.trajectory.expandLabel} <span aria-hidden="true">+</span>
            </summary>
            {fullTimeline.map((entry) => (
              <div key={`${entry.period}-${entry.title}`} className={styles.timelineRow} data-reveal>
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
        <div data-reveal>
          <p className={styles.eyebrow}>{sections.contact.eyebrow}</p>
          <h2 id="contacto-heading">
            Hagamos
            <br />
            <em>escena.</em>
            <span className={styles.contactStar} aria-hidden="true">
              <Glyph kind="asterisk" />
            </span>
          </h2>
          <p>{sections.contact.intro}</p>
          <a href={`mailto:${sections.contact.email}`} className={styles.contactEmail}>
            <GlyphPair kind="up-right">{sections.contact.email}</GlyphPair>
          </a>
        </div>
        <div className={styles.contactSide} data-reveal>
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
            <span>
              <GlyphPair kind="up-right">{sections.contact.instagram.detail}</GlyphPair>
            </span>
          </a>
          <a href={sections.contact.phone.href}>
            {sections.contact.phone.label} <span>
              <GlyphPair kind="up-right">{sections.contact.phone.detail}</GlyphPair>
            </span>
          </a>
          <a href={sections.contact.portfolio.href} download>
            {sections.contact.portfolio.label}{" "}
            <span>
              <GlyphPair kind="down">{sections.contact.portfolio.detail}</GlyphPair>
            </span>
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

              <a
                className={styles.dialogSheetLink}
                href={`/escenico/${activeWork.work.slug}`}
                aria-label={`Ver ficha completa de ${activeWork.work.title}`}
              >
                <GlyphPair kind="right">Ver ficha completa</GlyphPair>
              </a>
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
            <Glyph kind="left" />
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
            <Glyph kind="right" />
          </button>
        </div>
      </dialog>
      <dialog
        ref={heroViewerRef}
        className={styles.stageViewer}
        aria-label={heroCopy.viewerLabel}
        onCancel={(event) => {
          event.preventDefault();
          closeHeroViewer();
        }}
        onClick={closeOnBackdrop}
        onClose={handleHeroViewerClose}
        onKeyDown={(event) => {
          if (event.key !== "Escape") return;
          event.preventDefault();
          closeHeroViewer();
        }}
      >
        <div className={styles.stageViewerToolbar}>
          <span>{heroCopy.viewerKicker}</span>
          <button
            type="button"
            className={styles.closeDialog}
            onClick={closeHeroViewer}
            aria-label="Cerrar fotografía"
          >
            Cerrar <span aria-hidden="true">×</span>
          </button>
        </div>
        <div className={styles.stageViewerImage}>
          <Image
            src={heroSlides[slideIndex].src}
            alt={heroSlides[slideIndex].alt}
            fill
            sizes="100vw"
          />
        </div>
      </dialog>

    </main>
  );
}
