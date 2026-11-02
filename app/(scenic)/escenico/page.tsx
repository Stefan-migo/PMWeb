import type { Metadata } from "next";
import { getScenicWorks } from "@/app/_lib/queries/scenic";
import { PortfolioEscenico } from "./portfolio-escenico";

export const metadata: Metadata = {
  title: { absolute: "Escénico — Pájaro Maca · Macarena Almeida" },
  description:
    "El cuerpo como territorio de creación. Obras, dirección de arte e interpretación de Macarena Almeida, Pájaro Maca. Villarrica, Chile.",
  openGraph: {
    title: "Escénico — Pájaro Maca · Macarena Almeida",
    description:
      "El cuerpo como territorio de creación. Obras, dirección de arte e interpretación de Macarena Almeida, Pájaro Maca.",
    images: [
      {
        url: "/escenico/assets/materialidad.webp",
        alt: "Una tela translúcida envuelve una silueta sobre un escenario oscuro.",
      },
    ],
  },
};

export default async function EscenicoPage() {
  // The media gallery is optional: production has no rows yet and a query
  // failure must degrade to the static gallery instead of a 500.
  const media = await getScenicWorks().catch(() => []);

  return <PortfolioEscenico media={media} />;
}
