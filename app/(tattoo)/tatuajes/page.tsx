import { TatuajesPageV2 } from "@/app/_components/blocks/TatuajesPageV2/TatuajesPageV2";
import { getPortfolioImages } from "@/app/_lib/queries/tattoos";

export default async function TatuajesPage() {
  const portfolioImages = await getPortfolioImages();

  return <TatuajesPageV2 portfolioImages={portfolioImages} />;
}
