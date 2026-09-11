export type TattooImage = {
  src: string;
  alt: string;
};

export type AvailableDesign = TattooImage & {
  id: string;
  name: string;
  status: "Disponible" | "Reservado";
  detail: string;
};

// This local collection intentionally matches the shape a future feed adapter can return.
export const portfolioImages: TattooImage[] = [
  { src: "/design/tattoo/Layer 1.png", alt: "Tatuaje de corazón y flores" },
  { src: "/design/tattoo/Layer 2.png", alt: "Tatuaje botánico sobre el hombro" },
  { src: "/design/tattoo/Layer 3.png", alt: "Tatuaje de sirena" },
  { src: "/design/tattoo/Layer 4.png", alt: "Tatuaje de ave en vuelo" },
  { src: "/design/tattoo/Layer 5.png", alt: "Tatuaje botánico de línea fina" },
  { src: "/design/tattoo/Layer 6.png", alt: "Tatuaje floral en las piernas" },
  { src: "/design/tattoo/Layer 7.png", alt: "Tatuaje de ballena y olas" },
  { src: "/design/tattoo/Layer 8.png", alt: "Tatuaje figurativo con felino" },
];

export const availableDesigns: AvailableDesign[] = [
  {
    id: "botanico",
    ...portfolioImages[4],
    name: "Botánico",
    status: "Disponible",
    detail: "Pieza adaptable a tu tamaño y ubicación.",
  },
  {
    id: "fauna-marina",
    ...portfolioImages[6],
    name: "Fauna marina",
    status: "Disponible",
    detail: "Diseño único para reservar.",
  },
  {
    id: "figurativo",
    ...portfolioImages[7],
    name: "Figurativo",
    status: "Reservado",
    detail: "Consulta por una variación personalizada.",
  },
];
