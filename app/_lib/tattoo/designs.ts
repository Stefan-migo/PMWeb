export type TattooImage = {
  src: string;
  alt: string;
};

export type AvailableDesign = TattooImage & {
  id: string;
  name: string;
  status: "Disponible" | "Reservado";
  detail: string;
  style?: string;
  size?: string;
};

// This local collection intentionally matches the shape a future feed adapter can return.
export const portfolioImages: TattooImage[] = [
  { src: "/design/tatuajes-redesign/tattoo-1.webp", alt: "Tatuaje de corazón y flores" },
  { src: "/design/tatuajes-redesign/tattoo-2.webp", alt: "Tatuaje botánico sobre el hombro" },
  { src: "/design/tatuajes-redesign/tattoo-3.webp", alt: "Tatuaje de sirena" },
  { src: "/design/tatuajes-redesign/tattoo-4.webp", alt: "Tatuaje de ave en vuelo" },
  { src: "/design/tatuajes-redesign/tattoo-5.webp", alt: "Tatuaje botánico de línea fina" },
  { src: "/design/tatuajes-redesign/tattoo-6.webp", alt: "Tatuaje floral en las piernas" },
  { src: "/design/tatuajes-redesign/tattoo-7.webp", alt: "Tatuaje de ballena y olas" },
  { src: "/design/tatuajes-redesign/tattoo-8.webp", alt: "Tatuaje figurativo con felino" },
];

export const availableDesigns: AvailableDesign[] = [
  {
    id: "botanico",
    ...portfolioImages[4],
    name: "Botánico",
    status: "Disponible",
    detail: "Pieza adaptable a tu tamaño y ubicación.",
    style: "Línea fina",
    size: "Mediana",
  },
  {
    id: "fauna-marina",
    ...portfolioImages[6],
    name: "Fauna marina",
    status: "Disponible",
    detail: "Diseño único para reservar.",
    style: "Botánico",
    size: "Mediana",
  },
  {
    id: "figurativo",
    ...portfolioImages[7],
    name: "Figurativo",
    status: "Reservado",
    detail: "Consulta por una variación personalizada.",
    style: "Figurativo",
    size: "Grande",
  },
];
