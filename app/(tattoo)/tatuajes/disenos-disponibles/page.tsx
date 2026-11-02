import type { Metadata } from "next";
import { DisenosPage } from "@/app/_components/tattoo/DisenosPage";
import { getAvailableDesigns } from "@/app/_lib/queries/tattoos";

export const metadata: Metadata = {
  title: "Diseños disponibles",
  description: "Diseños disponibles · Pájaro Maca. Arte en la piel, Villarrica, Chile.",
};

export default async function DisenosDisponiblesPage() {
  const designs = await getAvailableDesigns();
  return <DisenosPage designs={designs} />;
}
