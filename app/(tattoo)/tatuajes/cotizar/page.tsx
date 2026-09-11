import type { Metadata } from "next";
import {
  ArrowRight,
  CalendarDays,
  FileText,
  Instagram,
  Lightbulb,
  MapPin,
  MessageCircle,
  Ruler,
  Sparkles,
} from "lucide-react";
import { Reveal } from "@/app/_components/shared/Reveal";

export const metadata: Metadata = {
  title: "Cotizar un tatuaje",
  description: "Cuéntame tu idea de tatuaje y recibe orientación para tu proyecto.",
};

const briefDetails = [
  { icon: Lightbulb, title: "Tu idea", text: "La idea, referencia o historia detrás de la pieza." },
  { icon: MapPin, title: "Ubicación", text: "La zona del cuerpo y el lado, si corresponde." },
  { icon: Ruler, title: "Tamaño", text: "Una medida aproximada, por ejemplo 10 × 15 cm." },
];

const processSteps = [
  { icon: MessageCircle, number: "01", title: "Me escribís tu idea", text: "Cuéntame qué quieres tatuarte, dónde y qué tamaño imaginas." },
  { icon: FileText, number: "02", title: "Te paso boceto y presupuesto", text: "Revisamos la propuesta, los detalles y el valor de tu proyecto." },
  { icon: CalendarDays, number: "03", title: "Agendamos la sesión", text: "Cuando aprobamos la idea, coordinamos fecha y duración." },
  { icon: Sparkles, number: "04", title: "Cuidados", text: "Después de tatuarte recibes indicaciones para una buena cicatrización." },
];

const faqs = [
  ["¿Cómo se calcula el precio?", "Considero el tamaño, el nivel de detalle y la zona del cuerpo. Con esos datos puedo darte una orientación más precisa."],
  ["¿Se requiere abono o reserva?", "Sí. Para confirmar una fecha se solicita un abono, cuyo detalle te informo al momento de agendar."],
  ["¿Con cuánta anticipación debo reservar?", "Lo ideal es escribir con varias semanas de anticipación. La disponibilidad cambia según la temporada y la duración de cada proyecto."],
];

export default function CotizarPage() {
  const number = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "56912345678";
  const message = encodeURIComponent("Hola, quiero cotizar un tatuaje.\n\nQué quiero tatuarme: \nUbicación en el cuerpo: \nTamaño en centímetros: ");

  return (
    <div className="bg-[var(--tattoo-bg)] px-4 py-20 text-[var(--tattoo-text)] sm:px-6 lg:px-8 lg:py-28">
      <div className="mx-auto max-w-7xl">
        <Reveal>
          <section className="max-w-3xl" aria-labelledby="quote-heading">
            <p className="mb-4 text-xs font-medium uppercase tracking-[.16em] text-[var(--tattoo-accent)]">Primer paso</p>
            <h1 id="quote-heading" className="font-[family-name:var(--font-display)] text-5xl font-bold leading-[.95] tracking-tight sm:text-7xl">Cuéntame tu idea</h1>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-[var(--tattoo-text-muted)]">Cada tatuaje comienza con una conversación. Comparte estos tres datos y te orientarás mejor sobre el diseño, el valor y la disponibilidad.</p>
          </section>
        </Reveal>

        <section className="mt-16" aria-labelledby="brief-heading">
          <Reveal><h2 id="brief-heading" className="font-[family-name:var(--font-display)] text-2xl font-bold sm:text-3xl">Para preparar tu cotización</h2></Reveal>
          <ol className="mt-7 grid gap-4 md:grid-cols-3">
            {briefDetails.map(({ icon: Icon, title, text }, index) => (
              <Reveal key={title} delay={index * 0.08}>
                <li className="h-full rounded-xl border border-[var(--tattoo-border)] bg-[var(--tattoo-surface)] p-6 transition-colors hover:border-[var(--tattoo-accent)]">
                  <div className="flex items-center justify-between"><Icon className="h-6 w-6 text-[var(--tattoo-accent)]" aria-hidden="true" /><span className="font-[family-name:var(--font-display)] text-2xl font-bold text-[var(--tattoo-accent)]">0{index + 1}</span></div>
                  <h3 className="mt-8 font-[family-name:var(--font-display)] text-xl font-bold">{title}</h3><p className="mt-2 text-sm leading-relaxed text-[var(--tattoo-text-muted)]">{text}</p>
                </li>
              </Reveal>
            ))}
          </ol>
        </section>

        <section className="mt-24" aria-labelledby="process-heading">
          <Reveal><p className="mb-3 text-xs font-medium uppercase tracking-[.16em] text-[var(--tattoo-accent)]">El proceso</p><h2 id="process-heading" className="font-[family-name:var(--font-display)] text-3xl font-bold sm:text-4xl">Cómo funciona</h2></Reveal>
          <ol className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {processSteps.map(({ icon: Icon, number: stepNumber, title, text }, index) => (
              <Reveal key={title} delay={index * 0.08}>
                <li className="relative h-full border-l border-[var(--tattoo-border)] bg-[var(--tattoo-surface)] p-6 sm:min-h-56">
                  <Icon className="h-6 w-6 text-[var(--tattoo-accent)]" aria-hidden="true" /><span className="absolute right-5 top-5 text-xs text-[var(--tattoo-text-muted)]">{stepNumber}</span>
                  <h3 className="mt-8 font-[family-name:var(--font-display)] text-lg font-bold">{title}</h3><p className="mt-2 text-sm leading-relaxed text-[var(--tattoo-text-muted)]">{text}</p>
                </li>
              </Reveal>
            ))}
          </ol>
        </section>

        <section className="mt-24 max-w-3xl" aria-labelledby="faq-heading">
          <Reveal><h2 id="faq-heading" className="font-[family-name:var(--font-display)] text-3xl font-bold sm:text-4xl">Preguntas frecuentes</h2></Reveal>
          <div className="mt-8 divide-y divide-[var(--tattoo-border)] border-y border-[var(--tattoo-border)]">
            {faqs.map(([question, answer], index) => <Reveal key={question} delay={index * 0.06}><details className="group py-5"><summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-[family-name:var(--font-display)] font-bold focus-visible:outline-2 focus-visible:outline-[var(--tattoo-accent)]"><span>{question}</span><span className="text-2xl font-normal text-[var(--tattoo-accent)] transition-transform group-open:rotate-45" aria-hidden="true">+</span></summary><p className="max-w-2xl pt-3 leading-relaxed text-[var(--tattoo-text-muted)]">{answer}</p></details></Reveal>)}
          </div>
        </section>

        <Reveal delay={0.15}>
          <section className="mt-20 border border-[var(--tattoo-accent)]/50 bg-[var(--tattoo-accent)]/10 p-6 sm:p-8" aria-label="Contacto para cotizar">
            <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between"><div><p className="text-xs font-medium uppercase tracking-[.16em] text-[var(--tattoo-accent)]">Hablemos</p><h2 className="mt-2 font-[family-name:var(--font-display)] text-2xl font-bold">Tu idea merece un espacio propio.</h2></div><div className="flex flex-col gap-3 sm:flex-row"><a className="inline-flex items-center justify-center gap-2 rounded-lg bg-[var(--tattoo-accent)] px-6 py-4 font-medium text-white transition-colors hover:bg-[var(--tattoo-accent-hover)]" href={`https://wa.me/${number}?text=${message}`} target="_blank" rel="noopener noreferrer"><MessageCircle className="h-5 w-5" aria-hidden="true" /> Enviar por WhatsApp <ArrowRight className="h-4 w-4" aria-hidden="true" /></a><a className="inline-flex items-center justify-center gap-2 rounded-lg border border-[var(--tattoo-border)] px-6 py-4 font-medium transition-colors hover:border-[var(--tattoo-accent)]" href="https://instagram.com/pajaro_maca" target="_blank" rel="noopener noreferrer"><Instagram className="h-5 w-5" aria-hidden="true" /> Instagram</a></div></div>
          </section>
        </Reveal>
      </div>
    </div>
  );
}
