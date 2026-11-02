"use client";

import { useRef, useState } from "react";
import { Glyph, GlyphPair } from "@/app/_components/shared/Glyph";
import { TattooMark } from "@/app/_components/tattoo/TattooMark";
import { TattooBreadcrumb, TattooPageIntro } from "@/app/_components/tattoo/TattooSubpage";
import { whatsAppLink } from "@/app/_lib/tattoo/contact";
import "./CuidadosPage.css";

const stages = [
  {
    tab: "Primeras 24 h",
    eyebrow: "Primeras 24 h",
    title: "El primer cuidado",
    text: "Deja el vendaje el tiempo indicado en sesión. Luego lava suavemente con agua tibia y jabón sin perfume; seca con toques.",
  },
  {
    tab: "Días 2–5",
    eyebrow: "Días 2–5",
    title: "Con suavidad",
    text: "Aplica una capa muy fina de crema recomendada. Puede aparecer sensibilidad, picazón o una leve descamación.",
  },
  {
    tab: "Semana 2",
    eyebrow: "Semana 2",
    title: "Dale su tiempo",
    text: "Continúa lavando e hidratando sin rascar ni arrancar costras. La piel puede verse opaca mientras se renueva.",
  },
  {
    tab: "Semanas 3–4",
    eyebrow: "Semanas 3–4",
    title: "Sigue cuidándolo",
    text: "La superficie suele estar cicatrizada. Retoma gradualmente tus actividades y protege el tatuaje del sol.",
  },
];

const symbols = ["☼", "≈", "⌁", "left-right"] as const;
const avoid = ["Sol directo", "Piscina o jacuzzi", "Fricción y rascado", "Ropa ajustada"];

export function CuidadosPage() {
  const [active, setActive] = useState(0);
  const tabsRef = useRef<Array<HTMLButtonElement | null>>([]);

  const select = (index: number, focus = false) => {
    setActive(index);
    if (focus) tabsRef.current[index]?.focus();
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLButtonElement>, index: number) => {
    const keys = ["ArrowLeft", "ArrowRight", "Home", "End"];
    if (!keys.includes(event.key)) return;

    event.preventDefault();

    if (event.key === "Home") return select(0, true);
    if (event.key === "End") return select(stages.length - 1, true);
    select((index + (event.key === "ArrowRight" ? 1 : stages.length - 1)) % stages.length, true);
  };

  return (
    <div className="tattoo-subpage tp-cuidados">
      <TattooBreadcrumb current="Cuidados" />

      <TattooPageIntro
        eyebrow="04 / Después de la sesión"
        title={
          <>
            El cuidado también
            <br />
            es parte del <em>arte.</em>
          </>
        }
        lead="Una guía clara para acompañar tu piel durante las primeras semanas de cicatrización."
        aside={
          <>
            <button type="button" className="tattoo-text-link tp-cuidados__print" onClick={() => window.print()}>
              <GlyphPair kind="down">Guardar guía / PDF</GlyphPair>
            </button>
            <p>
              Para tenerla a mano.
              <br />
              <small>Usa «Guardar como PDF» al imprimir.</small>
            </p>
          </>
        }
      />

      <div className="tp-cuidados__layout">
        <aside className="tp-cuidados__toc" aria-label="En esta guía">
          <span>En esta guía</span>
          <a href="#etapas">01 / Etapas</a>
          <a href="#senales">02 / Señales</a>
          <a href="#evitar">03 / Qué evitar</a>
          <a href="#dudas">04 / Dudas</a>
        </aside>

        <div className="tp-cuidados__body">
          <section id="etapas">
            <p className="tattoo-eyebrow">Paso a paso</p>
            <h2>Cada etapa, <em>su cuidado.</em></h2>

            <div className="tp-cuidados__tabs" role="tablist" aria-label="Etapas de cicatrización">
              {stages.map((stage, index) => (
                <button
                  key={stage.tab}
                  ref={(element) => {
                    tabsRef.current[index] = element;
                  }}
                  type="button"
                  role="tab"
                  id={`stage-tab-${index}`}
                  aria-controls={`stage-panel-${index}`}
                  aria-selected={index === active}
                  tabIndex={index === active ? 0 : -1}
                  onClick={() => select(index)}
                  onKeyDown={(event) => handleKeyDown(event, index)}
                >
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  <b>{stage.tab}</b>
                  <span className="tp-cuidados__tab-marker" aria-hidden="true">
                    <Glyph kind="up-right" />
                  </span>
                </button>
              ))}
            </div>

            <div className="tp-cuidados__panels">
              {stages.map((stage, index) => (
                <div
                  key={stage.title}
                  role="tabpanel"
                  id={`stage-panel-${index}`}
                  aria-labelledby={`stage-tab-${index}`}
                  tabIndex={0}
                  hidden={index !== active}
                >
                  <span className="tp-cuidados__stage-number">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <p className="tattoo-eyebrow">{stage.eyebrow}</p>
                    <h3>{stage.title}</h3>
                    <p>{stage.text}</p>
                  </div>
                </div>
              ))}
            </div>

            <p className="tp-cuidados__caption">
              Sigue las indicaciones que recibiste durante tu sesión.
            </p>
          </section>

          <section id="senales" className="tp-cuidados__signals">
            <p className="tattoo-eyebrow">Conoce las señales</p>
            <h2>Escucha <em>tu piel.</em></h2>
            <div className="tp-cuidados__signals-grid">
              <div>
                <span className="tp-cuidados__signal-icon">✓</span>
                <h3>Es normal</h3>
                <ul>
                  <li>Sensibilidad o leve enrojecimiento al inicio.</li>
                  <li>Picazón y descamación durante la renovación.</li>
                  <li>Que el tatuaje se vea más opaco por unos días.</li>
                </ul>
              </div>
              <div className="tp-cuidados__alert">
                <span className="tp-cuidados__signal-icon">!</span>
                <h3>Consulta a un profesional</h3>
                <p>
                  Ante fiebre, pus, dolor creciente o enrojecimiento que se expande, busca atención de
                  un profesional de salud.
                </p>
              </div>
            </div>
          </section>

          <section id="evitar" className="tp-cuidados__avoid">
            <p className="tattoo-eyebrow">Protege el proceso</p>
            <h2>
              Evita durante
              <br />
              <em>2 a 4 semanas.</em>
            </h2>
            <div className="tp-cuidados__avoid-grid">
              {avoid.map((label, index) => (
                <div key={label}>
                  <span aria-hidden="true">{symbols[index] === "left-right" ? <Glyph kind="left-right" /> : symbols[index]}</span>
                  <p>{label}</p>
                </div>
              ))}
            </div>
          </section>

          <section id="dudas" className="tp-cuidados__contact">
            <TattooMark className="tp-cuidados__contact-mark" />
            <h2>¿Tienes <em>alguna duda?</em></h2>
            <p>
              Si tienes dudas sobre tu sesión o el proceso de cicatrización, puedes escribirme. Para
              síntomas de alarma, consulta siempre a un profesional de salud.
            </p>
            <a
              className="tattoo-text-link"
              href={whatsAppLink("Hola, tengo una pregunta sobre la cicatrización de mi tatuaje.")}
              target="_blank"
              rel="noopener noreferrer"
            >
              <GlyphPair kind="up-right">Consultar por WhatsApp</GlyphPair>
            </a>
          </section>
        </div>
      </div>
    </div>
  );
}

export default CuidadosPage;
