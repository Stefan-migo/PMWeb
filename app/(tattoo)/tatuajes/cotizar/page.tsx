import type { Metadata } from "next";
import { Instagram, MessageCircle, ArrowRight } from "lucide-react";
import { Reveal } from "@/app/_components/shared/Reveal";

export const metadata: Metadata = { title: "Cotizar un tatuaje", description: "Cuéntame tu idea de tatuaje y recibe orientación para tu proyecto." };

export default function CotizarPage() {
  const number = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "56912345678";
  const message = encodeURIComponent("Hola, quiero cotizar un tatuaje.\n\nQué quiero tatuarme: \nUbicación en el cuerpo: \nTamaño en centímetros: ");

  return <div className="py-24 px-4 sm:px-6 lg:px-8"><div className="max-w-3xl mx-auto">
    <Reveal><p className="text-[#ef4444] text-xs font-medium tracking-[.16em] uppercase mb-3">Primer paso</p><h1 className="font-[family-name:var(--font-space-grotesk)] text-4xl lg:text-6xl font-bold mb-6">Cuéntame tu idea</h1><p className="text-[#a3a3a3] text-lg max-w-2xl">Para orientarte mejor, envíame estos tres datos:</p></Reveal>
    <Reveal delay={0.1}><ol className="mt-10 grid gap-4 sm:grid-cols-3"><li className="bg-[#141414] border border-[#2a2a2a] rounded-xl p-6"><b className="text-[#ef4444] text-2xl">01</b><h2 className="font-bold mt-5">Qué quieres tatuarte</h2><p className="text-[#a3a3a3] text-sm mt-2">La idea, referencia o historia detrás.</p></li><li className="bg-[#141414] border border-[#2a2a2a] rounded-xl p-6"><b className="text-[#ef4444] text-2xl">02</b><h2 className="font-bold mt-5">Dónde irá</h2><p className="text-[#a3a3a3] text-sm mt-2">La zona del cuerpo y el lado, si aplica.</p></li><li className="bg-[#141414] border border-[#2a2a2a] rounded-xl p-6"><b className="text-[#ef4444] text-2xl">03</b><h2 className="font-bold mt-5">Tamaño en cm</h2><p className="text-[#a3a3a3] text-sm mt-2">Una medida aproximada, por ejemplo 10 × 15 cm.</p></li></ol></Reveal>
     <Reveal delay={0.2}><div className="mt-12 flex flex-col sm:flex-row gap-4"><a className="inline-flex items-center justify-center gap-2 bg-[#ef4444] text-white px-6 py-4 rounded-lg font-medium hover:bg-[#dc2626]" href={`https://wa.me/${number}?text=${message}`} target="_blank" rel="noopener noreferrer"> <MessageCircle className="w-5 h-5" aria-hidden="true" /> Enviar por WhatsApp <ArrowRight className="w-4 h-4" aria-hidden="true" /></a><a className="inline-flex items-center justify-center gap-2 border border-[#2a2a2a] px-6 py-4 rounded-lg font-medium hover:border-[#ef4444]" href="https://instagram.com/pajaro_maca" target="_blank" rel="noopener noreferrer"><Instagram className="w-5 h-5" aria-hidden="true" /> Escribirme por Instagram</a></div></Reveal>
  </div></div>;
}
