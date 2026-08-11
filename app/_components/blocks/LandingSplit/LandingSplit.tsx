import { ArrowRight } from "lucide-react";

export interface LandingSplitProps {
  hrefTattoo: string;
  hrefArt: string;
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

export function LandingSplit({
  hrefTattoo,
  hrefArt,
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
}: LandingSplitProps) {
  return (
    <div className="flex flex-col lg:flex-row">
      <a
        href={hrefTattoo}
        aria-label={tattooAriaLabel}
        className="group relative flex min-h-[50vh] flex-1 flex-col items-center justify-center overflow-hidden bg-tattoo-bg p-8 transition-transform duration-300 hover:scale-[1.01] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--tattoo-accent)] lg:min-h-screen"
      >
        <div
          className="absolute inset-0 bg-gradient-to-br from-[var(--tattoo-surface-hover)] to-tattoo-bg"
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
          <span className="mb-4 block font-[family-name:var(--font-display)] text-sm font-medium uppercase tracking-[0.3em] text-tattoo-accent">
            {tattooEyebrow}
          </span>
          <h2 className="mb-6 font-[family-name:var(--font-display)] text-5xl font-bold uppercase tracking-tight text-tattoo-text lg:text-7xl">
            {tattooTitle}
          </h2>
          <p className="mx-auto mb-8 max-w-md text-lg text-tattoo-text-muted">
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
      </a>

      <a
        href={hrefArt}
        aria-label={artAriaLabel}
        className="group relative flex min-h-[50vh] flex-1 flex-col items-center justify-center overflow-hidden bg-art-bg p-8 transition-transform duration-300 hover:scale-[1.01] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--art-accent)] lg:min-h-screen"
      >
        <div
          className="absolute inset-0 bg-gradient-to-br from-art-surface to-[var(--art-surface-hover)]"
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
          <span className="mb-4 block text-sm font-medium uppercase tracking-[0.3em] text-art-accent">
            {artEyebrow}
          </span>
          <h2 className="mb-6 font-[family-name:var(--font-serif)] text-5xl font-semibold uppercase tracking-tight text-art-text lg:text-7xl">
            {artTitle}
          </h2>
          <p className="mx-auto mb-8 max-w-md text-lg text-art-text-muted">
            {artDescription}
          </p>
          <div className="inline-flex items-center gap-2 font-medium text-art-text">
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
      </a>
    </div>
  );
}

export default LandingSplit;
