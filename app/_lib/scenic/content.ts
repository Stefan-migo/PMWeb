/**
 * Content for the scenic portfolio.
 *
 * Every string here is copied verbatim from `docs/Escenico.md`, which is an
 * extraction of the artist's stage portfolio (PDF, 12 pages, 2014-2026).
 * That document carries its own editorial rules; they are encoded as types and
 * asserted in `__tests__/scenic-content.test.ts`:
 *
 *  - No invented training, awards, roles, dates, credits, links or work details.
 *  - Art direction and choreography, art direction, performance and costume
 *    design stay separate roles.
 *  - Macarena is never credited with someone else's artistic or choreographic
 *    direction.
 *
 * Section 9 of the source is editorial notes for whoever writes the page, not
 * content: it is deliberately absent from this module.
 */

export type ScenicIdentity = {
  name: string;
  artisticName: string;
  roles: string;
  tagline: string;
  profile: string;
  residence: string;
  scope: string;
  period: string;
};

export const identity: ScenicIdentity = {
  name: "Macarena Almeida",
  artisticName: "Pájaro Maca",
  roles: "Bailarina · Directora de arte escénico",
  tagline: "Artes visuales, dirección de arte y diseño escénico.",
  profile: "Artista visual y escénica: bailarina, intérprete y directora de arte",
  residence: "Villarrica, Chile",
  scope: "Villarrica, Chile - Colombia",
  period: "2014-2026",
};

export const bio: string[] = [
  "Macarena Almeida —Pájaro Maca— es artista visual y escénica: bailarina, intérprete y directora de arte. Licenciada en Artes por la Pontificia Universidad Católica de Chile con distinción máxima (2010), con estudios en Artes Visuales en la Universidade do Porto, Portugal. Reside en Villarrica desde 2013, tras un recorrido de vida y trabajo por Portugal, Perú, Rapa Nui, Argentina, India, Grecia, Francia y Colombia.",
  "Su cuerpo ha sido durante más de una década territorio de investigación: yoga en Buenos Aires, Rishikesh y Varanasi; danza afro de Guinea desde 2014 junto al maestro Tawel Camara en la Escuela Dakao Daka de Villarrica; danza contemporánea desde 2022 en el Centro Cultural Liquén.",
  "Su formación visual —dibujo, pintura, vitrofusión, instalación, tatuaje— se traduce hoy en escena, donde diseña vestuario, máscaras y atmósferas para las obras que interpreta y dirige artísticamente, en Chile y Colombia.",
  "En 2025 fue intérprete y directora de arte de «Tensión Superficial» (Compañía Liquén, dir. Kattya Soto), integrando por primera vez ambos roles sobre un mismo escenario.",
];

export const directionApproach: string[] = [
  "Mi trayectoria se define por un ojo creativo agudo, capaz de leer el entorno y traducirlo en propuestas plásticas con identidad propia. Entiendo la escena como un cuerpo vivo donde el vestuario, la luz y la materialidad dialogan en constante transformación.",
  "Con más de una década de práctica en danza, yoga y movimiento, diseño desde la comprensión profunda del cuerpo en el espacio, logrando que el lenguaje plástico potencie la narrativa del movimiento y la dramaturgia escénica, que se convierta en intérprete.",
  "Entiendo la atmósfera como la suma consciente de estos lenguajes —material, lumínico, espacial— trabajando en una misma dirección dramática, hasta que la escena deja de ilustrar un relato y empieza a construirla junto a quienes la interpretan.",
];

export type TimelineEntry = {
  period: string;
  entry: string;
};

/** Formation and trajectory, verbatim from section 4 of the source. */
export const timeline: TimelineEntry[] = [
  {
    period: "2007-2008",
    entry: "Estudios en Artes Visuales, Universidade do Porto, Portugal.",
  },
  {
    period: "2010",
    entry: "Licenciatura en Artes, Pontificia Universidad Católica de Chile, distinción máxima.",
  },
  {
    period: "2014",
    entry: "Inicia danza afro de Guinea con el maestro Tawel Camara, Escuela Dakao Daka, Villarrica.",
  },
  {
    period: "2021",
    entry: "Dirección de arte del videoclip «Kema», de la artista Paz Quintana.",
  },
  { period: "2021", entry: "Crea y dirige «La Taller», espacio de arte, creación y tatuaje en Villarrica." },
  {
    period: "2022",
    entry: "Integra la danza contemporánea del Centro Cultural Liquén. Intérprete y diseño de vestuario en «Tres Prácticas para Habitar», dir. Carmen Paz.",
  },
  {
    period: "2023-2024",
    entry:
      "Bailarina, coreógrafa y diseñadora de vestuario de «Afro Malanga», Festival Corona (Cartagena, Santa Marta, Palomino y Medellín, Colombia). Diseño gráfico y difusión del festival «Pies Descalzos», Palomino.",
  },
  { period: "2024", entry: "Gestión de gira de la agrupación folclórica «Candela y Tambo»." },
  {
    period: "2025",
    entry:
      "Organiza el encuentro «57° Aniversario de Guinea» junto a Tawel Camara, Diarra Conde y Bangaly Syla, Villarrica.",
  },
  {
    period: "2025-2026",
    entry:
      "Dirección de arte de «Tensión Superficial» (Compañía Liquén, dir. Kattya Soto), «Atlas» (Plataforma Azul) y «El Final de mi Carrera».",
  },
];

/** A credit that belongs to someone other than Macarena. */
export type WorkCredit = {
  role: string;
  person: string;
};

export type WorkKind = "obra" | "videoclip" | "espacio";

export type WorkStatus = "premiered" | "none";

export type ScenicWork = {
  slug: string;
  title: string;
  kind: WorkKind;
  /** Period exactly as the source states it; never a date the source does not give. */
  yearLabel: string;
  /** Company, collective or commissioning artist. */
  entity: string | null;
  place: string | null;
  /** Credits held by other people. Separated from `macarenaRoles` by design. */
  credits: WorkCredit[];
  /** Macarena's own roles, verbatim from the source. */
  macarenaRoles: string[];
  duration: string | null;
  /** "premiered" only when the source or the artist confirms the premiere. */
  status: WorkStatus;
  summary: string | null;
  artDirectionNote: string | null;
  cast: string[];
  /** Page of the source PDF the description and images come from. */
  sourcePages: number[];
  /** What the photograph should be, until the artist provides the files. */
  mediaPlaceholder: string;
};

export const works: ScenicWork[] = [
  {
    slug: "tension-superficial",
    title: "Tensión Superficial",
    kind: "obra",
    yearLabel: "2025-2026",
    entity: "Compañía de Danza Contemporánea Liquén",
    place: null,
    credits: [
      { role: "Dirección artística y coreografía", person: "Kattya Soto" },
      { role: "Realizador audiovisual", person: "José Manuel Contreras" },
      { role: "Fotografía", person: "Cristobal Saavedra" },
    ],
    macarenaRoles: ["Dirección de arte", "Creadora intérprete"],
    duration: "42 minutos",
    status: "none",
    summary:
      "El punto de partida es la imagen de una superficie acuosa, frágil y cambiante. Tensión Superficial surge desde la idea del devenir: nada permanece fijo y toda forma existe en tránsito. Los cuerpos oscilan entre caída y contención, control y desborde, dialogando con la luz, las sombras, los objetos y la imagen audiovisual.\n\nToda forma que intenta fijarse pierde la posibilidad de devenir otra. La obra se instala en un estado de incertidumbre, donde permanecer en movimiento implica también sostener la posibilidad del cambio. ¿Qué somos cuando ya no podemos aferrarnos a ninguna forma?",
    artDirectionNote:
      "El diseño visual explora el agua como principio filosófico del cambio continuo. La gran tela de visillo funciona como membrana, útero y piel colectiva que deforma, fragmenta y multiplica las siluetas en escena.",
    cast: [
      "Macarena Almeida",
      "Cindy Anabalón",
      "Nathalie Donoso",
      "Sebastián Harambour",
      "Armin Krause",
      "Marcela Martínez",
      "Cristóbal Muñoz",
      "Daniel Opazo",
      "Nicole Ritz",
      "Carolina Rodríguez",
      "Scarlett Rodríguez",
      "Javier Saavedra",
      "Catalina Sanz",
      "Alyeth Valdebenito",
      "Javiera Yávar",
      "Carolina Zambrano",
    ],
    sourcePages: [2, 3, 6, 7, 8],
    mediaPlaceholder: "Fotografía escénica a página completa y collage de escenas de la obra",
  },
  {
    slug: "tres-practicas-para-habitar",
    title: "Tres prácticas para habitar",
    kind: "obra",
    yearLabel: "2022",
    entity: null,
    place: null,
    credits: [{ role: "Dirección", person: "Carmen Paz" }],
    macarenaRoles: ["Diseño de vestuario y máscaras", "Intérprete"],
    duration: null,
    status: "none",
    summary: null,
    artDirectionNote:
      "El diseño escénico persigue una atmósfera ritual —versátil en sus registros, profunda en su intención— capaz de trasladar al espectador a un espacio de rito compartido. El vestuario rojo, en contraste radical con el vacío del fondo negro, opera como umbral entre lo cotidiano y lo ceremonial; sus líneas dialogan con elementos orgánicos del entorno, como las cañas de bambú, que acentúan los ejes verticales de los cuerpos y evocan varas o bastones propios de una ceremonia. La luz de foco cenital esculpe cada movimiento, aislando a las intérpretes en su propio círculo de intimidad, mientras la oscuridad que las envuelve amplifica esa sensación de encuentro a la vez íntimo y colectivo. El resultado no ilustra un rito: lo construye para quien observa.",
    cast: [],
    sourcePages: [3, 9],
    mediaPlaceholder: "Tres fotografías con vestuario, máscaras y escenas de la obra",
  },
  {
    slug: "el-final-de-mi-carrera",
    title: "El final de mi carrera",
    kind: "obra",
    yearLabel: "2026",
    entity: "SISMO Colectivo de Danza",
    place: null,
    credits: [{ role: "Dirección artística y coreografía", person: "Isidora Aguirre" }],
    macarenaRoles: ["Dirección de arte"],
    duration: null,
    status: "premiered",
    summary:
      "¿Cómo es dar fin a lo que ya no nos representa?\n\n«El final de mi carrera» busca ser un rito de pasaje entre lo que se quiere dejar atrás —exigencia, competencia, individualismo— y lo nuevo que busca emerger: disfrute, encuentro colectivo, simpleza.\n\nA través de lo absurdo, la obra deconstruye la destreza como objetivo a lograr y retoma el disfrute como forma de agradecer estar vivo.",
    artDirectionNote: null,
    cast: [],
    sourcePages: [3, 10],
    mediaPlaceholder: "Fotografía de una figura con vestuario y elementos de color verde",
  },
  {
    slug: "atlas",
    title: "Atlas",
    kind: "obra",
    yearLabel: "2025-2026",
    entity: "Plataforma Azul",
    place: null,
    credits: [],
    macarenaRoles: ["Dirección de arte"],
    duration: null,
    status: "none",
    summary: null,
    artDirectionNote: null,
    cast: [],
    sourcePages: [3],
    mediaPlaceholder: "Imagen pendiente: el portafolio no incluye ficha gráfica de esta obra",
  },
  {
    slug: "kema",
    title: "Kema",
    kind: "videoclip",
    yearLabel: "2021",
    entity: "Paz Quintana",
    place: null,
    credits: [{ role: "Artista", person: "Paz Quintana" }],
    macarenaRoles: ["Dirección de arte"],
    duration: null,
    status: "none",
    summary: null,
    artDirectionNote: null,
    cast: [],
    sourcePages: [3],
    mediaPlaceholder: "Imagen pendiente: el portafolio no incluye material de este videoclip",
  },
  {
    slug: "la-taller",
    title: "La Taller",
    kind: "espacio",
    yearLabel: "2021",
    entity: null,
    place: "Villarrica",
    credits: [],
    macarenaRoles: ["Crea y dirige el espacio"],
    duration: null,
    status: "none",
    summary: "Espacio de arte, creación y tatuaje.",
    artDirectionNote: null,
    cast: [],
    sourcePages: [3],
    mediaPlaceholder: "Imagen pendiente: el portafolio no incluye material del espacio",
  },
];

export type StageEntry = {
  name: string;
  detail: string | null;
  place: string | null;
  period: string;
  roles: string | null;
};

/** International stages and cultural management, from section 7 of the source. */
export const stageWork: StageEntry[] = [
  {
    name: "Afro Malanga · Festival Corona",
    detail: "Agrupación Afro Malanga",
    place: "Cartagena, Santa Marta, Palomino y Medellín, Colombia",
    period: "2023-2024",
    roles: "Bailarina, coreógrafa y diseñadora de vestuario",
  },
  {
    name: "Olas Sonoras",
    detail: "Danza-circo con fuego",
    place: "Tayrona, Colombia",
    period: "2023",
    roles: null,
  },
  {
    name: "Pies Descalzos",
    detail: "Festival",
    place: "Palomino",
    period: "2023-2024",
    roles: "Diseño gráfico y difusión",
  },
  {
    name: "Candela y Tambo",
    detail: "Agrupación folclórica",
    place: null,
    period: "2024",
    roles: "Gestión de gira",
  },
  {
    name: "57° Aniversario de Guinea",
    detail: "Junto a Tawel Camara, Diarra Conde y Bangaly Syla",
    place: "Villarrica",
    period: "2025",
    roles: "Organización del encuentro",
  },
];

export type ScenicContact = {
  name: string;
  instagramHandle: string;
  instagramUrl: string;
  email: string;
  phone: string;
  phoneE164: string;
  city: string;
};

export const contact: ScenicContact = {
  name: "Macarena Almeida - Pájaro Maca",
  instagramHandle: "@pajaro_maca",
  instagramUrl: "https://instagram.com/pajaro_maca",
  email: "pajaro.maca.arte@gmail.com",
  phone: "+56 9 2928 0024",
  phoneE164: "+56929280024",
  city: "Villarrica, Chile",
};

/**
 * Pending photograph slots, described as the source inventory describes them.
 * They are rendered as explicit placeholders until the artist provides files.
 */
export const imageSlots = {
  cover: "Fotografía escénica de portada",
  portrait: "Fotografía vertical con silueta proyectada en tonos azul y cálido",
  direction: "Fotografía vertical de una figura cubierta por una tela translúcida",
  contact: "Fotografía vertical de una escena con iluminación cenital",
  /** Section 4 of the source: a gallery of eight stage photographs. */
  stageGallery: {
    caption: "Danza - Presentaciones en escena",
    count: 8,
  },
} as const;

export function getWorkBySlug(slug: string): ScenicWork | undefined {
  return works.find((work) => work.slug === slug);
}
