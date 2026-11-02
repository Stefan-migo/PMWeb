"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { GlyphPair } from "@/app/_components/shared/Glyph";
import { TattooMark } from "@/app/_components/tattoo/TattooMark";
import { TattooBreadcrumb, TattooPageIntro } from "@/app/_components/tattoo/TattooSubpage";
import {
  getContactEmail,
  mailtoLink,
  tattooInstagramDmUrl,
  whatsAppLink,
} from "@/app/_lib/tattoo/contact";
import "./CotizarPage.css";

const processSteps = [
  {
    title: "Me escribes tu idea",
    text: "Cuéntame qué quieres tatuarte, dónde y qué tamaño imaginas.",
  },
  {
    title: "Boceto y presupuesto",
    text: "Revisamos la propuesta, los detalles y el valor de tu proyecto.",
  },
  {
    title: "Agendamos la sesión",
    text: "Cuando aprobamos la idea, coordinamos fecha y duración.",
  },
  {
    title: "Te acompaño después",
    text: "Después de tatuarte recibes indicaciones para una buena cicatrización.",
  },
];

const faqs = [
  {
    question: "¿Cómo se calcula el precio?",
    answer:
      "Considero el tamaño, el nivel de detalle y la zona del cuerpo. Con esos datos puedo darte una orientación más precisa.",
  },
  {
    question: "¿Se requiere abono o reserva?",
    answer:
      "Sí. Para confirmar una fecha se solicita un abono, cuyo detalle te informo al momento de agendar.",
  },
  {
    question: "¿Con cuánta anticipación debo reservar?",
    answer:
      "Lo ideal es escribir con varias semanas de anticipación. La disponibilidad cambia según la temporada y la duración de cada proyecto.",
  },
];

export function CotizarPage() {
  const ideaRef = useRef<HTMLTextAreaElement>(null);
  const reviewRef = useRef<HTMLDivElement>(null);
  const [message, setMessage] = useState("");
  const [ready, setReady] = useState(false);
  const [copyStatus, setCopyStatus] = useState("");

  // The catalogue hands over the chosen piece through the query string. Reading
  // it here keeps the page static: no useSearchParams, no Suspense boundary.
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const design = params.get("diseno");
    if (!design) return;

    const prefix =
      params.get("variacion") === "1" ? "Me gustaría una variación del diseño " : "Me interesa el diseño ";

    if (ideaRef.current) ideaRef.current.value = prefix + design.slice(0, 150) + ".";
  }, []);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const form = event.currentTarget;
    if (typeof form.reportValidity === "function" && !form.reportValidity()) return;

    const data = new FormData(form);
    const composed = [
      "Hola, quiero cotizar un tatuaje.",
      "",
      `Qué quiero tatuarme: ${String(data.get("idea") ?? "").trim()}`,
      `Ubicación en el cuerpo: ${String(data.get("placement") ?? "").trim()}`,
      `Tamaño en centímetros: ${String(data.get("size") ?? "").trim()}`,
    ].join("\n");

    setMessage(composed);
    setReady(true);
    setCopyStatus("");

    window.setTimeout(() => {
      reviewRef.current?.focus();
      reviewRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
    }, 0);
  };

  const handleInstagram = async () => {
    try {
      await navigator.clipboard.writeText(message);
      setCopyStatus("Mensaje copiado. Pégalo en el chat de Instagram.");
    } catch {
      setCopyStatus("No se pudo copiar automáticamente: selecciona el mensaje y cópialo a mano.");
    }

    window.open(tattooInstagramDmUrl, "_blank", "noopener,noreferrer");
  };

  return (
    <div className="tattoo-subpage tp-cotizar">
      <TattooBreadcrumb current="Cotizar" />

      <TattooPageIntro
        eyebrow="05 / El primer paso"
        title={
          <>
            Cuéntame
            <br />
            <em>tu idea.</em>
          </>
        }
        lead="Cada tatuaje comienza con una conversación. Comparte tu idea, ubicación y tamaño para orientarte sobre el diseño, el valor y la disponibilidad."
        aside={
          <>
            <TattooMark className="tp-cotizar__intro-mark" />
            <p>
              De una idea
              <br />
              a algo tuyo.
            </p>
          </>
        }
      />

      <section className="tp-cotizar__inquiry">
        <aside className="tp-cotizar__aside">
          <p className="tattoo-eyebrow">Una conversación, sin prisa</p>
          <h2>
            Le damos forma
            <br />
            <em>juntos.</em>
          </h2>
          <p>
            Completa estos tres datos y prepara tu mensaje. Podrás revisarlo y copiarlo antes de
            escribirme por Instagram.
          </p>
          <div className="tp-cotizar__note">
            <span className="tp-cotizar__dot" aria-hidden="true" /> Villarrica, Chile
            <br />
            <span>Lunes a sábado · 10:00 — 19:00</span>
          </div>
          <Link className="tattoo-text-link" href="/tatuajes/disenos-disponibles">
            <GlyphPair kind="up-right">¿Buscas inspiración?</GlyphPair>
          </Link>
        </aside>

        <form className="tp-cotizar__form" onSubmit={handleSubmit}>
          <div className="tp-cotizar__field">
            <label htmlFor="idea">
              <span>01</span> ¿Qué te gustaría tatuarte?
            </label>
            <textarea
              ref={ideaRef}
              id="idea"
              name="idea"
              required
              maxLength={1200}
              rows={4}
              placeholder="Tu idea, una historia o el nombre de un diseño…"
            />
            <small>Puedes compartir las imágenes de referencia directamente en el chat.</small>
          </div>

          <div className="tp-cotizar__field">
            <label htmlFor="placement">
              <span>02</span> ¿En qué parte del cuerpo?
            </label>
            <input
              id="placement"
              name="placement"
              required
              maxLength={150}
              placeholder="Por ejemplo: antebrazo izquierdo"
              autoComplete="off"
            />
          </div>

          <div className="tp-cotizar__field">
            <label htmlFor="size">
              <span>03</span> ¿Qué tamaño imaginas?
            </label>
            <input
              id="size"
              name="size"
              required
              maxLength={100}
              placeholder="Por ejemplo: 10 × 15 cm"
              autoComplete="off"
            />
          </div>

          <button className="tattoo-button tp-cotizar__submit" type="submit">
            <GlyphPair kind="up-right">Preparar mi mensaje</GlyphPair>
          </button>
          <p className="tp-cotizar__form-note">
            Preparar el mensaje no envía una solicitud ni confirma una reserva.
          </p>

          {ready ? (
            <div className="tp-cotizar__review" ref={reviewRef} tabIndex={-1}>
              <p className="tattoo-eyebrow">Tu mensaje está listo</p>
              <h3>Así empieza la conversación.</h3>
              <pre className="tp-cotizar__preview">{message}</pre>

              <div className="tp-cotizar__actions">
                <button type="button" className="tattoo-button" onClick={handleInstagram}>
                  <GlyphPair kind="up-right">Abrir Instagram</GlyphPair>
                </button>
                <a
                  className="tp-cotizar__alt"
                  href={whatsAppLink(message)}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <GlyphPair kind="up-right">Enviar por WhatsApp</GlyphPair>
                </a>
                <a className="tp-cotizar__email" href={mailtoLink("Cotización de tatuaje")}>
                  {getContactEmail()}
                </a>
              </div>

              <p className="tp-cotizar__hint">
                Instagram no admite texto precargado: el mensaje queda en tu portapapeles para
                pegarlo en el chat. En WhatsApp se abre ya escrito.
              </p>
              <p className="tp-cotizar__status" role="status">
                {copyStatus}
              </p>
            </div>
          ) : null}
        </form>
      </section>

      <section className="tp-cotizar__process">
        <div>
          <p className="tattoo-eyebrow">El proceso</p>
          <h2>
            De la idea
            <br />
            <em>a la sesión.</em>
          </h2>
        </div>
        <div className="tp-cotizar__steps">
          {processSteps.map((step, index) => (
            <article key={step.title}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <h3>{step.title}</h3>
              <p>{step.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="tp-cotizar__faq">
        <div>
          <p className="tattoo-eyebrow">Antes de empezar</p>
          <h2>
            Quizás te
            <br />
            <em>preguntabas…</em>
          </h2>
        </div>
        <div className="tp-cotizar__faq-list">
          {faqs.map((faq) => (
            <details key={faq.question}>
              <summary>
                {faq.question}
                <span aria-hidden="true">＋</span>
              </summary>
              <p>{faq.answer}</p>
            </details>
          ))}
        </div>
      </section>
    </div>
  );
}

export default CotizarPage;
