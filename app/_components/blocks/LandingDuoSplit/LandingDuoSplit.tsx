import { useEffect, useState } from "react";
import { ArrowRight } from "lucide-react";
import "./LandingDuoSplit.css";

export interface LandingDuoSplitProps {
  hrefTattoo: string;
  hrefArt: string;
  delay?: number;
  delayTattoo?: number;
  delayArt?: number;
  imageTattoo?: string;
  imageArt?: string;
  tattooEyebrow?: string;
  tattooTitle?: string;
  tattooDescription?: string;
  tattooCta?: string;
  tattooAriaLabel?: string;
  artEyebrow?: string;
  artTitle?: string;
  artDescription?: string;
  artCta?: string;
  artAriaLabel?: string;
}

const DEFAULTS = {
  delay: 300,
  delayTattoo: 200,
  delayArt: 450,
  imageTattoo: "/design/landing/tattoo.jpg",
  imageArt: "/design/landing/art.jpg",
  tattooEyebrow: "Tatuajes",
  tattooTitle: "Tatuajes",
  tattooDescription:
    "Diseños personalizados, arte en la piel. Conoce mi trabajo y agenda tu próxima sesión.",
  tattooCta: "Ver Portafolio",
  tattooAriaLabel: "Ir a sección Tatuajes",
  artEyebrow: "Arte",
  artTitle: "Arte",
  artDescription:
    "Pintura, ilustración y más. Explora mi colección de arte visual y exposiciones.",
  artCta: "Ver Galería",
  artAriaLabel: "Ir a sección Arte",
};

export function LandingDuoSplit({
  hrefTattoo,
  hrefArt,
  delay = DEFAULTS.delay,
  delayTattoo = DEFAULTS.delayTattoo,
  delayArt = DEFAULTS.delayArt,
  imageTattoo = DEFAULTS.imageTattoo,
  imageArt = DEFAULTS.imageArt,
  tattooEyebrow = DEFAULTS.tattooEyebrow,
  tattooTitle = DEFAULTS.tattooTitle,
  tattooDescription = DEFAULTS.tattooDescription,
  tattooCta = DEFAULTS.tattooCta,
  tattooAriaLabel = DEFAULTS.tattooAriaLabel,
  artEyebrow = DEFAULTS.artEyebrow,
  artTitle = DEFAULTS.artTitle,
  artDescription = DEFAULTS.artDescription,
  artCta = DEFAULTS.artCta,
  artAriaLabel = DEFAULTS.artAriaLabel,
}: LandingDuoSplitProps) {
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    const t = setTimeout(() => setPhase(1), delay);
    return () => clearTimeout(t);
  }, [delay]);

  const rootClass = [
    "lds",
    "flex flex-col lg:flex-row",
    phase >= 1 && "lds--revealed",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div className={rootClass}>
      <a
        href={hrefTattoo}
        aria-label={tattooAriaLabel}
        className="lds-panel group relative flex min-h-[55vh] flex-1 flex-col items-center justify-center overflow-hidden bg-tattoo-bg p-6 transition-transform duration-300 hover:scale-[1.01] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--tattoo-accent)] sm:p-8 sm:min-h-[50vh] lg:min-h-screen"
      >
        <div
          className="absolute inset-0 bg-cover bg-center transition-transform duration-700 ease-out group-hover:scale-105"
          style={{ backgroundImage: `url(${imageTattoo})` }}
          aria-hidden="true"
        />

        <div
          className="absolute inset-0 bg-black/60"
          aria-hidden="true"
        />

        <div
          className="absolute left-8 top-8 h-24 w-px bg-gradient-to-b from-transparent via-tattoo-accent to-transparent opacity-60"
          aria-hidden="true"
        />
        <div
          className="absolute bottom-8 right-8 h-px w-24 bg-gradient-to-r from-transparent via-tattoo-accent to-transparent opacity-60"
          aria-hidden="true"
        />

        <div className="relative z-10 text-center">
          <span className="mb-3 block font-[family-name:var(--font-display)] text-xs font-medium uppercase tracking-[0.3em] text-tattoo-accent sm:mb-4 sm:text-sm">
            {tattooEyebrow}
          </span>
          <h2 className="mb-4 font-[family-name:var(--font-display)] text-4xl font-bold uppercase tracking-tight text-tattoo-text sm:mb-6 sm:text-5xl lg:text-7xl">
            {tattooTitle}
          </h2>
          <p className="mx-auto mb-6 max-w-md text-base text-tattoo-text-muted sm:mb-8 sm:text-lg">
            {tattooDescription}
          </p>
          <div className="inline-flex items-center gap-2 font-medium text-tattoo-accent">
            <span>{tattooCta}</span>
            <ArrowRight
              className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1"
              aria-hidden="true"
            />
          </div>
        </div>

        <div
          className="absolute inset-x-0 bottom-0 h-1 origin-left scale-x-0 bg-tattoo-accent transition-transform duration-300 group-hover:scale-x-100"
          aria-hidden="true"
        />

        <div
          className="lds-curtain lds-curtain--up lds-curtain--dark"
          style={{ transitionDelay: `${delayTattoo}ms` }}
          aria-hidden="true"
        />
      </a>

      <a
        href={hrefArt}
        aria-label={artAriaLabel}
        className="lds-panel group relative flex min-h-[55vh] flex-1 flex-col items-center justify-center overflow-hidden bg-tattoo-bg p-6 transition-transform duration-300 hover:scale-[1.01] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--art-accent)] sm:p-8 sm:min-h-[50vh] lg:min-h-screen"
      >
        <div
          className="absolute inset-0 bg-cover bg-center transition-transform duration-700 ease-out group-hover:scale-105"
          style={{ backgroundImage: `url(${imageArt})` }}
          aria-hidden="true"
        />

        <div
          className="absolute inset-0 bg-black/60"
          aria-hidden="true"
        />

        <div
          className="absolute right-8 top-8 h-24 w-px bg-gradient-to-b from-transparent via-art-accent to-transparent opacity-40"
          aria-hidden="true"
        />
        <div
          className="absolute bottom-8 left-8 h-px w-24 bg-gradient-to-r from-transparent via-art-accent to-transparent opacity-40"
          aria-hidden="true"
        />

        <div className="relative z-10 text-center">
          <span className="mb-3 block text-xs font-medium uppercase tracking-[0.3em] text-art-accent sm:mb-4 sm:text-sm">
            {artEyebrow}
          </span>
          <h2 className="mb-4 font-[family-name:var(--font-serif)] text-4xl font-semibold uppercase tracking-tight text-tattoo-text sm:mb-6 sm:text-5xl lg:text-7xl">
            {artTitle}
          </h2>
          <p className="mx-auto mb-6 max-w-md text-base text-tattoo-text-muted sm:mb-8 sm:text-lg">
            {artDescription}
          </p>
          <div className="inline-flex items-center gap-2 font-medium text-art-accent">
            <span>{artCta}</span>
            <ArrowRight
              className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1"
              aria-hidden="true"
            />
          </div>
        </div>

        <div
          className="absolute inset-x-0 bottom-0 h-1 origin-left scale-x-0 bg-art-accent transition-transform duration-300 group-hover:scale-x-100"
          aria-hidden="true"
        />

        <div
          className="lds-curtain lds-curtain--down lds-curtain--dark"
          style={{ transitionDelay: `${delayArt}ms` }}
          aria-hidden="true"
        />
      </a>
    </div>
  );
}

export default LandingDuoSplit;
