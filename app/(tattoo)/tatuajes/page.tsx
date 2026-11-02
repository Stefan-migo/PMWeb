import type { Metadata } from "next";
import { TatuajesPageV2 } from "@/app/_components/blocks/TatuajesPageV2/TatuajesPageV2";
import { getAvailableDesigns, getPortfolioImages } from "@/app/_lib/queries/tattoos";

export const metadata: Metadata = {
  title: "Pájaro Maca · Tatuajes",
  description:
    "Pájaro Maca. Tatuajes y arte en la piel. Diseños personalizados en Villarrica, Chile.",
};

export default async function TatuajesPage() {
  const [portfolioImages, designs] = await Promise.all([
    getPortfolioImages(),
    getAvailableDesigns(),
  ]);

  return <TatuajesPageV2 portfolioImages={portfolioImages} designs={designs} />;
}
