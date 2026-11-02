"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import type { AvailableDesign } from "@/app/_lib/tattoo/designs";
import { TattooBreadcrumb, TattooPageCta, TattooPageIntro } from "@/app/_components/tattoo/TattooSubpage";
import "./DisenosPage.css";

type Filter = "todos" | "disponible" | "reservado";

type DisenosPageProps = {
  designs: AvailableDesign[];
};

function consultationHref(design: AvailableDesign): string {
  const params = new URLSearchParams({ diseno: design.name });
  if (design.status === "Reservado") params.set("variacion", "1");
  return `/tatuajes/cotizar?${params.toString()}`;
}

function Availability({ status }: { status: AvailableDesign["status"] }) {
  return (
    <span className={`dp-availability${status === "Reservado" ? " reservado" : ""}`}>
      <i aria-hidden="true" />
      {status}
    </span>
  );
}

export function DisenosPage({ designs }: DisenosPageProps) {
  const [filter, setFilter] = useState<Filter>("todos");
  const [selected, setSelected] = useState<AvailableDesign | null>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const openerRef = useRef<HTMLButtonElement>(null);

  const availableCount = designs.filter((design) => design.status === "Disponible").length;
  const reservedCount = designs.filter((design) => design.status === "Reservado").length;
  const counts: Record<Filter, number> = {
    todos: designs.length,
    disponible: availableCount,
    reservado: reservedCount,
  };

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!selected || !dialog) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    dialog.showModal();

    return () => {
      document.body.style.overflow = previousOverflow;
      if (dialog.open) dialog.close();
    };
  }, [selected]);

  useEffect(() => () => {
    document.body.style.overflow = "";
  }, []);

  const closeDialog = () => {
    setSelected(null);
    openerRef.current?.focus();
  };

  const filters: { value: Filter; label: string }[] = [
    { value: "todos", label: "Todos" },
    { value: "disponible", label: "Disponibles" },
    { value: "reservado", label: "Reservados" },
  ];

  return (
    <div className="tattoo-subpage dp-page">
      <TattooBreadcrumb current="Diseños disponibles" />
      <TattooPageIntro
        eyebrow="02 / DISEÑOS DISPONIBLES"
        title={<>Una idea<br /><em>esperando encontrarte.</em></>}
        lead="Explora piezas para llevar a tu piel. Si alguna ya está reservada, podemos conversar sobre una variación personalizada."
        aside={
          <div className="dp-summary">
            <span>{String(availableCount).padStart(2, "0")}</span>
            <p>PIEZAS DISPONIBLES<br /><small>Consulta disponibilidad al reservar.</small></p>
          </div>
        }
      />

      <section className="dp-catalog" aria-label="Catálogo de diseños disponibles">
        <div className="dp-toolbar">
          <div className="dp-filters" aria-label="Filtrar disponibilidad">
            {filters.map(({ value, label }) => (
              <button key={value} className="dp-filter" type="button" aria-pressed={filter === value} onClick={() => setFilter(value)}>
                {label} <small>{String(counts[value]).padStart(2, "0")}</small>
              </button>
            ))}
          </div>
          <span role="status">{String(counts[filter]).padStart(2, "0")} DISEÑOS</span>
        </div>

        <div className="dp-grid">
          {designs.map((design, index) => {
            const isAvailable = design.status === "Disponible";
            return (
              <article className="dp-piece" key={design.id} hidden={filter !== "todos" && (isAvailable ? filter !== "disponible" : filter !== "reservado")}>
                <button
                  className="dp-photo"
                  type="button"
                  aria-label={`Ver detalle de ${design.name}`}
                  onClick={(event) => {
                    openerRef.current = event.currentTarget;
                    setSelected(design);
                  }}
                >
                  <Image src={design.src} alt={design.alt} fill sizes="(max-width: 700px) 88vw, 30vw" />
                  <Availability status={design.status} />
                  <span className="dp-open" aria-hidden="true">↗</span>
                </button>
                <div className="dp-meta">
                  <span className="dp-index">FLASH / {String(index + 1).padStart(2, "0")}</span>
                  <h2>{design.name}</h2>
                  <div className="dp-tags">{[design.style, design.size].filter((tag): tag is string => Boolean(tag)).map((tag) => <span key={tag}>{tag}</span>)}</div>
                  <p>{design.detail}</p>
                  <Link className="tattoo-text-link" href={consultationHref(design)}>
                    {isAvailable ? "Consultar este diseño" : "Pedir una variación"}<span aria-hidden="true">↗</span>
                  </Link>
                </div>
              </article>
            );
          })}
        </div>
        <p className="dp-footnote">Las imágenes muestran las piezas sobre piel como referencia de su composición.</p>
      </section>

      <section className="dp-process">
        <div>
          <p className="tattoo-eyebrow">DEL CATÁLOGO A TU PIEL</p>
          <h2>Así lo<br /><em>hacemos tuyo.</em></h2>
        </div>
        <ol className="dp-steps">
          <li><span>01</span><div><h3>Elige una pieza</h3><p>Escríbeme indicando el nombre del diseño que te interesa.</p></div></li>
          <li><span>02</span><div><h3>Ajustamos los detalles</h3><p>Conversamos sobre ubicación, tamaño y cualquier adaptación.</p></div></li>
          <li><span>03</span><div><h3>Confirmamos tu fecha</h3><p>Con el diseño listo, coordinamos la sesión y la reserva.</p></div></li>
        </ol>
      </section>

      <TattooPageCta eyebrow="¿ENCONTRASTE TU PIEZA?" title={<>Del papel a <em>tu piel.</em></>} href="/tatuajes/cotizar" label="Consultar un diseño" />

      <dialog
        ref={dialogRef}
        className="dp-dialog"
        aria-labelledby="dp-dialog-title"
        onClose={closeDialog}
      >
        {selected ? (
          <>
            <button className="dp-close" type="button" aria-label="Cerrar diseño" onClick={() => dialogRef.current?.close()}>✕</button>
            <div className="dp-dialog-image"><Image src={selected.src} alt={selected.alt} fill sizes="(max-width: 700px) 92vw, 55vw" /></div>
            <div className="dp-dialog-copy">
              <p className="tattoo-eyebrow">ELIGE TU PIEZA</p>
              <Availability status={selected.status} />
              <h2 id="dp-dialog-title">{selected.name}</h2>
              <p className="dp-description">{selected.detail}</p>
              <div className="dp-tags">{[selected.style, selected.size].filter((tag): tag is string => Boolean(tag)).map((tag) => <span key={tag}>{tag}</span>)}</div>
              <p className="dp-note">Conversemos sobre ubicación, tamaño y disponibilidad antes de confirmar tu reserva.</p>
              <Link className="tattoo-button" href={consultationHref(selected)}>{selected.status === "Reservado" ? "Pedir una variación" : "Consultar diseño"}<span aria-hidden="true">↗</span></Link>
            </div>
          </>
        ) : null}
      </dialog>
    </div>
  );
}
