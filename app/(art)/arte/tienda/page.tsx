import type { Metadata } from "next";
import { Reveal } from "@/app/_components/shared/Reveal";

export const metadata: Metadata = {
  title: "Tienda",
  description:
    "Adquiere impresiones de alta calidad de mis obras. Prints, lienzos y productos. Envíos a todo Chile.",
  openGraph: {
    title: "Tienda | PajaroMaca",
    description: "Prints y obras de arte disponibles.",
  },
};

export default function TiendaPage() {
  return (
    <div className="py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <Reveal>
          <div className="mb-12">
            <h1 className="font-[family-name:var(--font-cormorant)] text-3xl lg:text-4xl font-semibold mb-4">
              Tienda
            </h1>
            <p className="text-[#78716c] max-w-2xl">
              Adquiere impresiones de alta calidad de mis obras. Cada print es producido con materiales
              de primera calidad.
            </p>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div
                key={i}
                className="bg-white border border-[#e7e5e4] rounded-xl overflow-hidden group cursor-pointer hover:shadow-lg transition-shadow"
              >
                <div className="aspect-square bg-[#fafaf9] flex items-center justify-center text-[#e7e5e4]" aria-label="Placeholder producto">
                  <span>Producto {i}</span>
                </div>
                <div className="p-4">
                  <h3 className="font-medium mb-1">T&iacute;tulo de Obra {i}</h3>
                  <p className="text-[#78716c] text-sm">Print sobre lienzo</p>
                  <p className="font-medium mt-2">$XX.XXX</p>
                </div>
              </div>
            ))}
          </div>
        </Reveal>

        <Reveal delay={0.2}>
          <div className="mt-12 p-6 bg-white border border-[#e7e5e4] rounded-xl">
            <h2 className="font-medium mb-4">Informaci&oacute;n de Env&iacute;os</h2>
            <p className="text-[#78716c] text-sm mb-4">
              Realizamos env&iacute;os a todo Chile. Los tiempos de producci&oacute;n son de 3-5 d&iacute;as h&aacute;biles.
              Para env&iacute;os internacionales, cont&aacute;ctame directamente.
            </p>
            <p className="text-[#78716c] text-sm">
              <strong>M&eacute;todos de pago:</strong> Mercado Pago, Transferencia bancaria
            </p>
          </div>
        </Reveal>
      </div>
    </div>
  );
}
