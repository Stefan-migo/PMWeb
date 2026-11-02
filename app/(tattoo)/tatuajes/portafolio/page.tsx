import type { Metadata } from "next";
import { PortafolioPage as PortafolioPageClient } from "@/app/_components/tattoo/PortafolioPage";
import { getPortfolioRecords } from "@/app/_lib/queries/tattoos";

export const metadata: Metadata = {
  title: "Portafolio de Tatuajes",
  description:
    "Cada pieza es única, creada especialmente para cada persona. Un recorrido por historias que encontraron su forma.",
  openGraph: {
    title: "Portafolio · Pájaro Maca",
    description:
      "Cada pieza es única, creada especialmente para cada persona. Un recorrido por historias que encontraron su forma.",
  },
};

export default async function PortafolioPage() {
  const records = await getPortfolioRecords();
  return <PortafolioPageClient records={records} />;
}
