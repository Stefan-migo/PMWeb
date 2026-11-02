import Link from "next/link";
import type { ReactNode } from "react";
import "@/app/_components/tattoo/TattooShell.css";

/** Breadcrumb of the section: one level, back to the landing. */
export function TattooBreadcrumb({ current }: { current: string }) {
  return (
    <nav className="tattoo-breadcrumb" aria-label="Ubicación">
      <Link href="/tatuajes">Tatuajes</Link>
      <span aria-hidden="true">/</span>
      <span>{current}</span>
    </nav>
  );
}

type TattooPageIntroProps = {
  eyebrow: string;
  title: ReactNode;
  lead?: string;
  aside?: ReactNode;
};

export function TattooPageIntro({ eyebrow, title, lead, aside }: TattooPageIntroProps) {
  return (
    <section className="tattoo-page-intro">
      <div>
        <p className="tattoo-eyebrow">{eyebrow}</p>
        <h1>{title}</h1>
        {lead ? <p className="tattoo-lead">{lead}</p> : null}
      </div>
      {aside ? <div className="tattoo-aside">{aside}</div> : null}
    </section>
  );
}

type TattooPageCtaProps = {
  eyebrow: string;
  title: ReactNode;
  href: string;
  label: string;
};

export function TattooPageCta({ eyebrow, title, href, label }: TattooPageCtaProps) {
  return (
    <section className="tattoo-page-cta">
      <div>
        <p className="tattoo-eyebrow">{eyebrow}</p>
        <h2>{title}</h2>
      </div>
      <Link className="tattoo-button" href={href}>
        {label} <span aria-hidden="true">↗</span>
      </Link>
    </section>
  );
}
