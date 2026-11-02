import type { Metadata } from "next";
import { CotizarPage } from "@/app/_components/tattoo/CotizarPage";

export const metadata: Metadata = {
  title: "Cotizar",
  description: "Cotizar · Pájaro Maca. Arte en la piel, Villarrica, Chile.",
};

export default function Cotizar() {
  return <CotizarPage />;
}
