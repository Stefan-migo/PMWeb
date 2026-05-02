"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Send, CheckCircle, AlertCircle } from "lucide-react";
import { useState } from "react";
import { Reveal } from "@/app/_components/shared/Reveal";

const quoteSchema = z.object({
  name: z.string().min(2, "El nombre debe tener al menos 2 caracteres"),
  phone: z.string().min(8, "Ingresa un número válido"),
  email: z.string().email("Email inválido").optional().or(z.literal("")),
  description: z.string().min(10, "Cuéntame más sobre tu idea (mínimo 10 caracteres)"),
  placement: z.string().optional(),
  size_approx: z.string().optional(),
  honeypot: z.string().max(0).optional(),
});

type QuoteFormData = z.infer<typeof quoteSchema>;

export default function CotizarPage() {
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [lastData, setLastData] = useState<QuoteFormData | null>(null);
  const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "56912345678";

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<QuoteFormData>({
    resolver: zodResolver(quoteSchema),
  });

  const onSubmit = async (data: QuoteFormData) => {
    if (data.honeypot) {
      return;
    }

    try {
      const response = await fetch("/api/quote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: data.name,
          phone: data.phone,
          email: data.email || undefined,
          description: data.description,
          placement: data.placement || undefined,
          size_approx: data.size_approx || undefined,
        }),
      });

      if (!response.ok) {
        throw new Error("Error al enviar la solicitud");
      }

      setLastData(data);
      setSubmitted(true);
    } catch {
      setError("Hubo un error. Intenta de nuevo o contáctame por WhatsApp.");
    }
  };

  if (submitted && lastData) {
    const waMessage = encodeURIComponent(
      `Hola! Soy ${lastData.name}. Acabo de enviar una solicitud de cotización desde la web:\n\n` +
      `- Idea: ${lastData.description}\n` +
      `- Zona: ${lastData.placement || "Por definir"}\n` +
      `- Tamaño: ${lastData.size_approx || "Por definir"}\n\n` +
      `Mi teléfono es ${lastData.phone}`
    );
    const waUrl = `https://wa.me/${whatsappNumber}?text=${waMessage}`;

    return (
      <div className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto text-center">
          <Reveal>
            <div className="w-16 h-16 bg-[#059669] rounded-full flex items-center justify-center mx-auto mb-6" aria-hidden="true">
              <CheckCircle className="w-8 h-8 text-white" />
            </div>
            <h1 className="font-[family-name:var(--font-space-grotesk)] text-3xl font-bold mb-4">
              &iexcl;Solicitud Enviada!
            </h1>
            <p className="text-[#a3a3a3] mb-8">
              He recibido tu solicitud. &iquest;Quieres enviarme un mensaje directo por WhatsApp con los detalles?
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href={waUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 bg-[#25D366] text-white px-6 py-3 rounded-lg font-medium hover:bg-[#20bd5a] transition-colors focus-visible:outline-2 focus-visible:outline-[#25D366] focus-visible:outline-offset-2"
              >
                Enviar por WhatsApp
              </a>
              <a
                href={`https://wa.me/${whatsappNumber}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 border border-[#2a2a2a] text-[#f5f5f5] px-6 py-3 rounded-lg font-medium hover:bg-[#1f1f1f] transition-colors focus-visible:outline-2 focus-visible:outline-[#ef4444] focus-visible:outline-offset-2"
              >
                Solo escribir
              </a>
            </div>
            <p className="text-[#a3a3a3] text-sm mt-6">
              O simplemente espera. Te contactar&eacute; pronto.
            </p>
          </Reveal>
        </div>
      </div>
    );
  }

  return (
    <div className="py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        <Reveal>
          <div className="mb-8">
            <h1 className="font-[family-name:var(--font-space-grotesk)] text-3xl lg:text-4xl font-bold mb-4">
              Solicitar Cotizaci&oacute;n
            </h1>
            <p className="text-[#a3a3a3]">
              Completa el formulario y me pondr&eacute; en contacto contigo para discutir tu pr&oacute;ximo tatuaje.
            </p>
          </div>
        </Reveal>

        {error && (
          <div className="mb-6 p-4 bg-[#dc2626]/10 border border-[#dc2626] rounded-lg flex items-center gap-3" role="alert">
            <AlertCircle className="w-5 h-5 text-[#dc2626]" aria-hidden="true" />
            <span className="text-[#ef4444]">{error}</span>
          </div>
        )}

        <Reveal delay={0.1}>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6" noValidate>
            <input type="text" {...register("honeypot")} className="hidden" tabIndex={-1} autoComplete="off" />

            <div>
              <label htmlFor="name" className="block text-sm font-medium mb-2">
                Nombre *
              </label>
              <input
                {...register("name")}
                type="text"
                id="name"
                className="w-full px-4 py-3 bg-[#141414] border border-[#2a2a2a] rounded-lg text-[#f5f5f5] placeholder-[#a3a3a3] focus:border-[#ef4444] focus:outline-none focus:ring-2 focus:ring-[#ef4444]/30 transition-colors"
                placeholder="Tu nombre completo"
              />
              {errors.name && (
                <p className="mt-1 text-sm text-[#ef4444]" role="alert">{errors.name.message}</p>
              )}
            </div>

            <div>
              <label htmlFor="phone" className="block text-sm font-medium mb-2">
                WhatsApp / Tel&eacute;fono *
              </label>
              <input
                {...register("phone")}
                type="tel"
                id="phone"
                className="w-full px-4 py-3 bg-[#141414] border border-[#2a2a2a] rounded-lg text-[#f5f5f5] placeholder-[#a3a3a3] focus:border-[#ef4444] focus:outline-none focus:ring-2 focus:ring-[#ef4444]/30 transition-colors"
                placeholder="+56 9 XXXX XXXX"
              />
              {errors.phone && (
                <p className="mt-1 text-sm text-[#ef4444]" role="alert">{errors.phone.message}</p>
              )}
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium mb-2">
                Email (opcional)
              </label>
              <input
                {...register("email")}
                type="email"
                id="email"
                className="w-full px-4 py-3 bg-[#141414] border border-[#2a2a2a] rounded-lg text-[#f5f5f5] placeholder-[#a3a3a3] focus:border-[#ef4444] focus:outline-none focus:ring-2 focus:ring-[#ef4444]/30 transition-colors"
                placeholder="tu@email.com"
              />
              {errors.email && (
                <p className="mt-1 text-sm text-[#ef4444]" role="alert">{errors.email.message}</p>
              )}
            </div>

            <div>
              <label htmlFor="description" className="block text-sm font-medium mb-2">
                Describe tu idea *
              </label>
              <textarea
                {...register("description")}
                id="description"
                rows={5}
                className="w-full px-4 py-3 bg-[#141414] border border-[#2a2a2a] rounded-lg text-[#f5f5f5] placeholder-[#a3a3a3] focus:border-[#ef4444] focus:outline-none focus:ring-2 focus:ring-[#ef4444]/30 transition-colors resize-none"
                placeholder="Cuéntame sobre el tatuaje que tienes en mente: tema, estilo, tamaño aproximado, etc."
              />
              {errors.description && (
                <p className="mt-1 text-sm text-[#ef4444]" role="alert">{errors.description.message}</p>
              )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="placement" className="block text-sm font-medium mb-2">
                  Zona del cuerpo
                </label>
                <select
                  {...register("placement")}
                  id="placement"
                  className="w-full px-4 py-3 bg-[#141414] border border-[#2a2a2a] rounded-lg text-[#f5f5f5] focus:border-[#ef4444] focus:outline-none focus:ring-2 focus:ring-[#ef4444]/30 transition-colors"
                >
                  <option value="">Seleccionar</option>
                  <option value="brazo">Brazo</option>
                  <option value="antebrazo">Antebrazo</option>
                  <option value="pierna">Pierna</option>
                  <option value="espalda">Espalda</option>
                  <option value="pecho">Pecho</option>
                  <option value="costillas">Costillas</option>
                  <option value="cuello">Cuello</option>
                  <option value="mano">Mano/Dedos</option>
                  <option value="otro">Otro</option>
                </select>
              </div>

              <div>
                <label htmlFor="size_approx" className="block text-sm font-medium mb-2">
                  Tama&ntilde;o aproximado
                </label>
                <input
                  {...register("size_approx")}
                  type="text"
                  id="size_approx"
                  className="w-full px-4 py-3 bg-[#141414] border border-[#2a2a2a] rounded-lg text-[#f5f5f5] placeholder-[#a3a3a3] focus:border-[#ef4444] focus:outline-none focus:ring-2 focus:ring-[#ef4444]/30 transition-colors"
                  placeholder="Ej: 10x15 cm"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full flex items-center justify-center gap-2 bg-[#ef4444] text-white px-6 py-4 rounded-lg font-medium hover:bg-[#dc2626] transition-colors disabled:opacity-50 disabled:cursor-not-allowed focus-visible:outline-2 focus-visible:outline-[#ef4444] focus-visible:outline-offset-2"
            >
              {isSubmitting ? (
                "Enviando..."
              ) : (
                <>
                  <Send className="w-4 h-4" aria-hidden="true" />
                  Enviar Solicitud
                </>
              )}
            </button>
          </form>
        </Reveal>

        <p className="mt-6 text-center text-[#a3a3a3] text-sm">
          &iquest;Prefieres escribir directamente?{" "}
          <a
            href={`https://wa.me/${whatsappNumber}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#25D366] hover:underline focus-visible:outline-2 focus-visible:outline-[#25D366] focus-visible:outline-offset-2"
          >
            Escr&iacute;beme por WhatsApp
          </a>
        </p>
      </div>
    </div>
  );
}
