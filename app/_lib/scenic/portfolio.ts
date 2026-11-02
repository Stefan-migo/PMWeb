/**
 * Presentation layer for `/escenico`.
 *
 * The verified facts (titles, credits, roles, periods) stay in `content.ts`.
 * This module only adds the copy and the image mapping of the redesigned
 * portfolio, so the page can be rendered without duplicating editorial facts.
 */

import { contact, identity, stageWork, works, type ScenicWork } from "./content";

export const assetPath = (file: string) => `/escenico/assets/${file}`;

export const portfolioPdf = {
  href: assetPath("pajaro-maca-portafolio-escenico.pdf"),
  label: "Portafolio PDF",
  downloadLabel: "Descargar portafolio",
} as const;

export type PortfolioPhoto = {
  src: string;
  alt: string;
};

export type HeroSlide = {
  src: string;
  title: string;
  alt: string;
  focus: string;
  mobileFocus: string;
};

/** The six photographs of the hero carousel, in the approved order. */
export const heroSlides: HeroSlide[] = [
  {
    src: assetPath("escena-hero-01.webp"),
    title: "Tensión Superficial",
    alt: "Intérpretes con vestuario blanco en un encuentro de cuerpos y gestos bajo una luz cenital.",
    focus: "50% 48%",
    mobileFocus: "48% 45%",
  },
  {
    src: assetPath("escena-hero-02.webp"),
    title: "Archivo escénico",
    alt: "Intérpretes en escena con sudaderas amarillas, pantalones cortos claros y gestos abiertos.",
    focus: "50% 58%",
    mobileFocus: "54% 50%",
  },
  {
    src: assetPath("escena-hero-03.webp"),
    title: "Tres prácticas para habitar",
    alt: "Intérpretes con vestuario rojo y cañas de bambú sobre un escenario negro.",
    focus: "50% 48%",
    mobileFocus: "50% 45%",
  },
  {
    src: assetPath("escena-hero-04.webp"),
    title: "Archivo escénico",
    alt: "Grupo de intérpretes sosteniendo máscaras blancas alrededor de una figura con vestuario amarillo.",
    focus: "50% 48%",
    mobileFocus: "50% 45%",
  },
  {
    src: assetPath("escena-hero-05.webp"),
    title: "Festival Corona",
    alt: "Escenario nocturno del Festival Corona iluminado por un gran elemento radial con fuego.",
    focus: "50% 52%",
    mobileFocus: "50% 50%",
  },
  {
    src: assetPath("escena-hero-06.webp"),
    title: "Tensión Superficial",
    alt: "Composición colectiva de intérpretes con vestuario blanco en Tensión Superficial.",
    focus: "50% 48%",
    mobileFocus: "50% 45%",
  },
];

export const heroCopy = {
  ariaLabel: "Archivo escénico de Macarena Almeida",
  srTitle: "Pájaro Maca · Artes escénicas",
  author: "MACARENA ALMEIDA",
  explore: "EXPLORAR",
  expand: "Ver fotografía completa",
  viewerLabel: "Fotografía escénica completa",
  viewerKicker: "ARCHIVO ESCÉNICO / PÁJARO MACA",
  pause: "Pausar carrusel",
  resume: "Reanudar carrusel",
  previous: "Fotografía anterior",
  next: "Fotografía siguiente",
} as const;

export const heroSlideDuration = 7500;

export const sections = {
  works: {
    id: "obras",
    eyebrow: "01 / OBRAS SELECCIONADAS",
    note: "El movimiento también se construye con la mirada.",
    heading: "La escena, un cuerpo vivo.",
    intro: "Vestuario, máscaras y atmósferas que dialogan con quienes habitan el escenario.",
  },
  about: {
    id: "mirada",
    eyebrow: "02 / MI MIRADA",
    heading: "De las artes visuales al cuerpo en escena.",
    lead: "Soy Macarena Almeida, Pájaro Maca. Artista visual, bailarina y directora de arte.",
    paragraphs: [
      "Mi práctica cruza el dibujo, la pintura, la instalación y el movimiento. Desde Villarrica, diseño vestuario, máscaras y atmósferas para obras que interpreto y acompaño desde la dirección de arte, en Chile y Colombia.",
      "Más de una década de danza y yoga atraviesa mi manera de crear: comprender el cuerpo en el espacio para que la materia también sea intérprete.",
    ],
    quote:
      "«La escena deja de ilustrar un relato y empieza a construirlo junto a quienes la interpretan.»",
    link: { href: "#trayectoria", label: "Conocer mi trayectoria" },
    image: {
      src: assetPath("macarena.webp"),
      alt: "Silueta de una intérprete proyectada sobre una superficie iluminada en azul y naranja.",
    },
    imageCaption: "CUERPO · LUZ · MATERIALIDAD",
  },
  international: {
    id: "encuentros",
    eyebrow: "03 / ESCENARIOS & ENCUENTROS",
    noteBefore: "Chile",
    noteAfter: "Colombia",
    heading: "Un lenguaje que viaja.",
    intro: "Danza afro, creación colectiva y encuentros que amplían la experiencia del cuerpo.",
  },
  trajectory: {
    id: "trayectoria",
    eyebrow: "04 / FORMACIÓN & RECORRIDO",
    heading: "Una práctica en movimiento.",
    intro: "Artes visuales, danza y gestión cultural. Un recorrido construido entre disciplinas y territorios.",
    expandLabel: "Ver formación y trayectoria completa",
  },
  contact: {
    id: "contacto",
    eyebrow: "05 / CONTACTO",
    heading: "Hagamos escena.",
    intro: "Para proyectos escénicos, colaboraciones y nuevas conversaciones.",
    email: contact.email,
    sideName: contact.name.split(" - ")[0],
    sideCity: contact.city,
    instagram: {
      href: contact.instagramUrl,
      label: "Instagram",
      detail: contact.instagramHandle,
    },
    phone: {
      href: `tel:${contact.phoneE164}`,
      label: "Teléfono",
      detail: contact.phone,
    },
    portfolio: {
      href: portfolioPdf.href,
      label: "Portafolio escénico",
      detail: "Descargar PDF",
    },
  },
  footer: {
    eyebrow: "ARTES VISUALES & ESCÉNICAS",
    backToTop: "Volver arriba",
  },
} as const;

export type FeaturedWork = {
  work: ScenicWork;
  category: string;
  eyebrow: string;
  /** Role lines shown under the work title on the landing cards. */
  meta: string[];
  cover: PortfolioPhoto;
  photos: PortfolioPhoto[];
  /** Paragraphs shown under "SOBRE LA OBRA" in the work sheet. */
  intro: string[];
  artDirectionHeading?: string;
  artDirection?: string;
  extraCredit?: { role: string; person: string };
  feature?: boolean;
};

function splitSentences(text: string, markers: string[]): string[] {
  const pattern = new RegExp(`(?=${markers.join("|")})`);
  return text
    .split(pattern)
    .map((paragraph) => paragraph.trim())
    .filter(Boolean);
}

function summaryParagraphs(work: ScenicWork): string[] {
  return (work.summary ?? "")
    .split("\n\n")
    .map((paragraph) => paragraph.trim())
    .filter(Boolean);
}

const tension = works.find((work) => work.slug === "tension-superficial");
const tres = works.find((work) => work.slug === "tres-practicas-para-habitar");
const final = works.find((work) => work.slug === "el-final-de-mi-carrera");

if (!tension || !tres || !final) {
  throw new Error("The scenic portfolio is missing one of the three featured works");
}

export const featuredWorks: FeaturedWork[] = [
  {
    work: tension,
    category: "DANZA CONTEMPORÁNEA",
    eyebrow: "COMPAÑÍA LIQUÉN · 2025–2026",
    meta: ["Dirección de arte", "Creación e interpretación"],
    cover: {
      src: assetPath("tension-superficial.webp"),
      alt: "Tensión Superficial: intérpretes en movimiento con vestuario blanco y luz cálida.",
    },
    photos: [
      {
        src: assetPath("tension-exterior.webp"),
        alt: "Tensión Superficial — escena al aire libre.",
      },
      {
        src: assetPath("tension-collage.webp"),
        alt: "Tensión Superficial — collage de fotografías del portafolio.",
      },
    ],
    intro: summaryParagraphs(tension),
    artDirectionHeading: "LA DIRECCIÓN DE ARTE",
    artDirection: tension.artDirectionNote ?? undefined,
    feature: true,
  },
  {
    work: tres,
    category: "VESTUARIO & MÁSCARAS",
    eyebrow: "DIR. CARMEN PAZ · 2022",
    meta: ["Diseño de vestuario y máscaras · Interpretación"],
    cover: {
      src: assetPath("tres-practicas-movimiento.webp"),
      alt: "Intérpretes con vestuario rojo en una escena de Tres prácticas para habitar.",
    },
    photos: [
      {
        src: assetPath("tres-practicas.webp"),
        alt: "Tres prácticas para habitar — vestuario y máscaras.",
      },
      {
        src: assetPath("tres-practicas-escena.webp"),
        alt: "Tres prácticas para habitar — escena con vestuario rojo y cañas de bambú.",
      },
    ],
    intro: splitSentences(tres.artDirectionNote ?? "", [
      "El vestuario rojo",
      "La luz de foco",
    ]),
  },
  {
    work: final,
    category: "DIRECCIÓN DE ARTE",
    eyebrow: "SISMO COLECTIVO DE DANZA · 2026",
    meta: ["Un rito de pasaje hacia el disfrute colectivo."],
    cover: {
      src: assetPath("el-final.webp"),
      alt: "Figura con vestuario verde y un gran elemento de color naranja, imagen de El final de mi carrera.",
    },
    photos: [],
    intro: summaryParagraphs(final),
    extraCredit: {
      role: "Estreno anunciado en el portafolio",
      person: "1 de octubre de 2026",
    },
  },
];

export type OtherWork = {
  slug: string;
  period: string;
  title: string;
  detail: string;
  role: string;
};

const otherWorkCopy: Record<string, { detail: string; role: string }> = {
  atlas: { detail: "Plataforma Azul", role: "Dirección de arte" },
  kema: { detail: "Videoclip de Paz Quintana", role: "Dirección de arte" },
  "la-taller": { detail: "Arte, creación y tatuaje · Villarrica", role: "Creación y dirección" },
};

export const otherWorks: OtherWork[] = ["atlas", "kema", "la-taller"].flatMap((slug) => {
  const work = works.find((entry) => entry.slug === slug);
  const copy = otherWorkCopy[slug];
  if (!work || !copy) return [];

  return [
    {
      slug: work.slug,
      period: work.yearLabel,
      title: work.title,
      detail: copy.detail,
      role: copy.role,
    },
  ];
});

export type InternationalStage = {
  name: string;
  detail: string;
  place: string;
  role?: string;
  photo: PortfolioPhoto;
};

export const internationalStages: InternationalStage[] = [
  {
    name: "Afro Malanga",
    detail: `Festival Corona · ${stageWork[0].period.replace("-", "–")}`,
    place: "Cartagena, Santa Marta, Palomino y Medellín",
    role: stageWork[0].roles ?? undefined,
    photo: {
      src: assetPath("festival-corona.webp"),
      alt: "Escenario del Festival Corona con un gran elemento radial iluminado por fuego.",
    },
  },
  {
    name: "Olas Sonoras",
    detail: `Danza-circo con fuego · ${stageWork[1].period}`,
    place: stageWork[1].place ?? "",
    photo: {
      src: assetPath("olas-sonoras.webp"),
      alt: "Presentación de danza-circo con fuego en Olas Sonoras.",
    },
  },
];

export const sceneGallery: PortfolioPhoto[] = Array.from({ length: 8 }, (_, index) => ({
  src: assetPath(`en-escena-${index + 1}.webp`),
  alt: `Presentaciones en escena — fotografía ${index + 1} del portafolio de Pájaro Maca.`,
}));

export const galleryCopy = {
  heading: "Instantes en escena",
  intro: "Un archivo de movimiento",
  hint: "Selecciona una fotografía para verla completa.",
  counterLabel: "ARCHIVO ESCÉNICO",
} as const;

export type TimelineGroup = {
  period: string;
  title: string;
  detail: string;
};

export const mainTimeline: TimelineGroup[] = [
  {
    period: "2025–26",
    title: "Dirección de arte en escena",
    detail: "Tensión Superficial · Atlas · El final de mi carrera.",
  },
  {
    period: "2023–24",
    title: "Creación y encuentros en Colombia",
    detail:
      "Afro Malanga, Festival Corona. Diseño gráfico y difusión de Pies Descalzos, Palomino.",
  },
  {
    period: "2022",
    title: "Danza contemporánea en Liquén",
    detail:
      "Intérprete y diseño de vestuario en Tres prácticas para habitar, de Carmen Paz.",
  },
  {
    period: "2014",
    title: "Danza afro de Guinea",
    detail: "Formación con Tawel Camara en la Escuela Dakao Daka, Villarrica.",
  },
];

export const fullTimeline: TimelineGroup[] = [
  {
    period: "2025",
    title: "Encuentro en Villarrica",
    detail:
      "Organiza «57° Aniversario de Guinea» junto a Tawel Camara, Diarra Conde y Bangaly Syla, según el portafolio.",
  },
  {
    period: "2024",
    title: "Gestión cultural",
    detail: "Gestión de gira de la agrupación folclórica Candela y Tambo.",
  },
  {
    period: "2021",
    title: "Arte y espacios de creación",
    detail:
      "Dirección de arte del videoclip Kema, de Paz Quintana. Crea y dirige La Taller, espacio de arte, creación y tatuaje en Villarrica.",
  },
  {
    period: "2010",
    title: "Licenciatura en Artes",
    detail: "Pontificia Universidad Católica de Chile. Distinción máxima.",
  },
  {
    period: "2007–08",
    title: "Estudios en Artes Visuales",
    detail: "Universidade do Porto, Portugal.",
  },
];

/**
 * Credits for a work sheet: someone else's direction first, then Macarena's
 * art-direction role, then the remaining credits, and the duration last.
 */
export function workSheetCredits(work: ScenicWork): Array<{ role: string; person: string }> {
  const directionRole = /direcci[oó]n art[ií]stica|coreograf[ií]a/i;
  const foreignDirection = work.credits.filter((credit) => directionRole.test(credit.role));
  const foreignOther = work.credits.filter((credit) => !directionRole.test(credit.role));
  const artDirection = work.macarenaRoles.filter((role) => /direcci[oó]n de arte/i.test(role));
  const macarenaOther = work.macarenaRoles.filter((role) => !artDirection.includes(role));

  return [
    ...foreignDirection,
    ...artDirection.map((role) => ({ role, person: identity.name })),
    ...foreignOther,
    ...macarenaOther.map((role) => ({ role, person: identity.name })),
    ...(work.duration ? [{ role: "Duración", person: work.duration }] : []),
  ];
}
