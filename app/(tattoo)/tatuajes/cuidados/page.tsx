import type { Metadata } from "next";
import { Reveal } from "@/app/_components/shared/Reveal";

export const metadata: Metadata = {
  title: "Cuidados del Tatuaje",
  description:
    "Guía completa de cuidados para tu nuevo tatuaje. Instrucciones paso a paso para una correcta cicatrización.",
  openGraph: {
    title: "Cuidados del Tatuaje | PajaroMaca",
    description: "Guía completa para la cicatrización de tu tatuaje.",
  },
};

const aftercareSections = [
  {
    title: "Primeras 24 horas",
    content: `Mantén el vendaje puesto durante las primeras 2-4 horas después de hacerte el tatuaje. Después, lava suavemente con agua tibia y jabón antibacterial sin perfume. Seca dando palmaditas con una toalla limpia.

Aplica una capa fina de crema hidratante o producto específico para tatuajes 2-3 veces al día.`,
  },
  {
    title: "Días 2-14",
    content: `Lava el tatuaje 2 veces al día con jabón antibacterial. No frotes fuerte, solo da suaves palmaditas.

Aplica crema hidratante después de cada lavado. El tatuaje puede empezar a pelarse como una quemadura solar — ¡no lo arranques!

Evita:
- Piscinas y jacuzzis
- Exposición directa al sol
- Ropa muy ajustada sobre el tatuaje
- Baños largos en tina`,
  },
  {
    title: "Cuidado a Largo Plazo",
    content: `Una vez cicatrizado (2-4 semanas), aplica bloqueador solar cuando expongas el tatuaje al sol para mantener los colores vibrantes.

Mantén la piel hidratada para preservar la calidad del tatuaje a largo plazo.`,
  },
  {
    title: "Señales de Infección",
    content: `Consulta a un médico si experimentas:
- Fiebre o escalofríos
- Enrojecimiento excesivo que se expande
- Hinchazón severa o pus
- Dolor que empeora en lugar de mejorar después de unos días
- Líneas rojas que salen del tatuaje

Tu salud es lo primero — ante cualquier duda, consulta a un profesional.`,
  },
];

export default function CuidadosPage() {
  return (
    <div className="py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <Reveal>
          <div className="mb-12">
            <h1 className="font-[family-name:var(--font-space-grotesk)] text-3xl lg:text-4xl font-bold mb-4">
              Cuidados del Tatuaje
            </h1>
            <p className="text-[#a3a3a3]">
              Sigue estas instrucciones para asegurar una correcta cicatrización de tu nuevo tatuaje.
            </p>
          </div>
        </Reveal>

        <div className="space-y-8">
          {aftercareSections.map((section, index) => (
            <Reveal key={index} delay={index * 0.1}>
              <div className="bg-[#141414] border border-[#2a2a2a] rounded-xl p-6">
                <h2 className="font-[family-name:var(--font-space-grotesk)] text-xl font-bold mb-4 flex items-center gap-3">
                  <span className="w-8 h-8 bg-[#ef4444]/20 rounded-lg flex items-center justify-center text-[#ef4444] text-sm">
                    {index + 1}
                  </span>
                  {section.title}
                </h2>
                <div className="text-[#a3a3a3] whitespace-pre-line leading-relaxed">
                  {section.content}
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.4}>
          <div className="mt-12 p-6 bg-[#141414] border border-[#2a2a2a] rounded-xl">
            <p className="text-center text-[#a3a3a3]">
              &iquest;Tienes dudas sobre el cuidado de tu tatuaje?{" "}
              <a
                href={`https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER}?text=${encodeURIComponent("Hola! Tengo una pregunta sobre cuidados de mi tatuaje.")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#25D366] hover:underline focus-visible:outline-2 focus-visible:outline-[#25D366] focus-visible:outline-offset-2"
              >
                Escr&iacute;beme por WhatsApp
              </a>
            </p>
          </div>
        </Reveal>
      </div>
    </div>
  );
}
