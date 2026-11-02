export type TattooImage = {
  src: string;
  /** Descriptive alternative text, for screen readers. */
  alt: string;
  /** Caption of the piece in the approved design. */
  title?: string;
  /** Filter value; the CMS keeps the same value in its `style` column. */
  style?: string;
  /** Secondary descriptors shown next to the title, e.g. Colour · Botánico. */
  tags?: string[];
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
/**
 * Titles, styles and descriptors come from the approved design bundle, which
 * took them from the artist's own portfolio. The CMS wins when it has rows.
 */
export const portfolioImages: TattooImage[] = [
  {
    src: "/design/tatuajes-redesign/tattoo-1.webp",
    alt: "Tatuaje de corazón y flores",
    title: "Corazón & botánica",
    style: "Botánico",
    tags: ["Color", "Botánico"],
  },
  {
    src: "/design/tatuajes-redesign/tattoo-2.webp",
    alt: "Tatuaje botánico sobre el hombro",
    title: "Un jardín en la piel",
    style: "Botánico",
    tags: ["Línea fina", "Botánico"],
  },
  {
    src: "/design/tatuajes-redesign/tattoo-3.webp",
    alt: "Tatuaje de sirena",
    title: "Imaginario marino",
    style: "Figurativo",
    tags: ["Figurativo", "Línea"],
  },
  {
    src: "/design/tatuajes-redesign/tattoo-4.webp",
    alt: "Tatuaje de ave en vuelo",
    title: "Un vuelo propio",
    style: "Fauna",
    tags: ["Fauna", "Línea"],
  },
  {
    src: "/design/tatuajes-redesign/tattoo-5.webp",
    alt: "Tatuaje botánico de línea fina",
    title: "Botánica de línea fina",
    style: "Botánico",
    tags: ["Botánico", "Línea fina"],
  },
  {
    src: "/design/tatuajes-redesign/tattoo-6.webp",
    alt: "Tatuaje floral en las piernas",
    title: "Flores en la piel",
    style: "Botánico",
    tags: ["Botánico", "Línea"],
  },
  {
    src: "/design/tatuajes-redesign/tattoo-7.webp",
    alt: "Tatuaje de ballena y olas",
    title: "Ballena y olas",
    style: "Fauna",
    tags: ["Fauna", "Línea"],
  },
  {
    src: "/design/tatuajes-redesign/tattoo-8.webp",
    alt: "Tatuaje figurativo con felino",
    title: "Imaginario con felino",
    style: "Figurativo",
    tags: ["Figurativo", "Blackwork"],
  },
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
