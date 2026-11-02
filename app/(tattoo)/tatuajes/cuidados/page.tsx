import type { Metadata } from "next";
import { CuidadosPage } from "@/app/_components/tattoo/CuidadosPage";

export const metadata: Metadata = {
  title: "Cuidados",
  description: "Cuidados · Pájaro Maca. Arte en la piel, Villarrica, Chile.",
};

export default function Cuidados() {
  return <CuidadosPage />;
}
