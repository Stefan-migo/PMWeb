/**
 * Arte section content.
 *
 * The approved reference package ships fifteen works as bundled WebP files and
 * a single-page prototype. The `artworks` table in Supabase is empty, so this
 * module is the source of truth for the visual universe until real records are
 * published through the CMS.
 *
 * Categories are curatorial proposals from the approved design, and every work
 * without a confirmed title is presented as «Sin título», as the package asks.
 */

export const arteCategories = [
  "Todas",
  "Cuerpo y naturaleza",
  "Fauna",
  "Símbolos",
] as const;

export type ArteCategory = Exclude<(typeof arteCategories)[number], "Todas">;

export type ArteCategoryFilter = (typeof arteCategories)[number];

export interface ArteWork {
  /** Stable presentation id, also used for the visible catalogue number. */
  id: number;
  /** Two-digit catalogue number shown in captions and the viewer. */
  code: string;
  title: string;
  category: ArteCategory;
  alt: string;
  src: string;
  width: number;
  height: number;
}

interface ArteWorkSeed {
  id: number;
  category: ArteCategory;
  alt: string;
  width: number;
  height: number;
}

const seeds: ArteWorkSeed[] = [
  {
    id: 1,
    category: "Cuerpo y naturaleza",
    alt: "Ilustración de dos figuras violetas junto al agua bajo un gran sol naranja",
    width: 1600,
    height: 1738,
  },
  {
    id: 2,
    category: "Fauna",
    alt: "Jaguar fucsia y turquesa con manchas rojas, entre hojas verdes",
    width: 1484,
    height: 1800,
  },
  {
    id: 3,
    category: "Fauna",
    alt: "Gallina multicolor con el texto Estamos bien",
    width: 736,
    height: 851,
  },
  {
    id: 4,
    category: "Cuerpo y naturaleza",
    alt: "Figura verde danzando entre hojas y lluvia",
    width: 1600,
    height: 1717,
  },
  {
    id: 5,
    category: "Cuerpo y naturaleza",
    alt: "Figura azul con cabello violeta sosteniendo un fruto de cacao",
    width: 1491,
    height: 1800,
  },
  {
    id: 6,
    category: "Fauna",
    alt: "Ave de pico largo con plumas azules, amarillas y turquesas",
    width: 1511,
    height: 1241,
  },
  {
    id: 7,
    category: "Cuerpo y naturaleza",
    alt: "Figura violeta sentada entre estrellas, con motivos vegetales sobre la piel",
    width: 1600,
    height: 1635,
  },
  {
    id: 8,
    category: "Cuerpo y naturaleza",
    alt: "Figura azul de cabello abundante con bambú al fondo",
    width: 1369,
    height: 1800,
  },
  {
    id: 9,
    category: "Fauna",
    alt: "Gallo de colores vivos sobre un fondo cálido texturado",
    width: 498,
    height: 800,
  },
  {
    id: 10,
    category: "Cuerpo y naturaleza",
    alt: "Figura de tonos suaves entre hojas con los brazos elevados",
    width: 1546,
    height: 1800,
  },
  {
    id: 11,
    category: "Símbolos",
    alt: "Representación de Ganesha en tonos azules y dorados sobre fondo violeta",
    width: 714,
    height: 1000,
  },
  {
    id: 12,
    category: "Cuerpo y naturaleza",
    alt: "Figura naranja con serpientes y estrellas sobre fondo rojo",
    width: 1578,
    height: 1800,
  },
  {
    id: 13,
    category: "Cuerpo y naturaleza",
    alt: "Figura violeta con hongos y cabello naranja sobre fondo verde",
    width: 1351,
    height: 1800,
  },
  {
    id: 14,
    category: "Cuerpo y naturaleza",
    alt: "Figura negra en una postura invertida sobre fondo rojo",
    width: 1350,
    height: 1800,
  },
  {
    id: 15,
    category: "Cuerpo y naturaleza",
    alt: "Figura negra en movimiento con cabello violeta dentro de un círculo",
    width: 1600,
    height: 1574,
  },
];

export const arteWorks: ArteWork[] = seeds.map((seed) => {
  const code = String(seed.id).padStart(2, "0");

  return {
    ...seed,
    code,
    title: "Sin título",
    src: `/design/arte/obra-${code}.webp`,
  };
});

/** Works shown as the rotated pair in the hero, in the approved order. */
export const arteHeroWorks = {
  main: arteWorks[0],
  small: arteWorks[1],
};

/** Work that illustrates «Mi mirada» in the approved design. */
export const arteMiradaWork = arteWorks[7];

/**
 * Filters the catalogue for the gallery. `Todas` keeps the curated order, any
 * other category keeps the curated order of its own subset.
 */
export function filterArteWorks(
  works: ArteWork[],
  category: ArteCategoryFilter,
): ArteWork[] {
  if (category === "Todas") return works;

  return works.filter((work) => work.category === category);
}

/** Visible count label, e.g. `15 obras` (singular aware). */
export function arteCountLabel(total: number): string {
  return `${total} ${total === 1 ? "obra" : "obras"}`;
}
