/**
 * Arte section — trajectory.
 *
 * The approved content of the old `/arte/exposiciones` page (current and past
 * shows) plus the education and award entries that used to live in
 * `/arte/sobre-mi`. Trajectory owns both now, so the exhibitions list is the
 * single source for the timeline.
 */

export interface TrajectoryShow {
  title: string;
  venue: string;
  /** Year used for the timeline column. */
  year: string;
  /** Dates of the run, only for the show currently on view. */
  date?: string;
  current?: boolean;
}

export interface TrajectoryEntry {
  title: string;
  meta: string;
}

export const currentShows: TrajectoryShow[] = [
  {
    title: "Conexiones Contemporáneas",
    venue: "Galería Fundación, Santiago",
    year: "2026",
    date: "Marzo — Junio 2026",
    current: true,
  },
];

export const pastShows: TrajectoryShow[] = [
  {
    title: "Formas del Silencio",
    venue: "Centro Cultural La Moneda, Santiago",
    year: "2025",
  },
  {
    title: "Nuevas Narrativas",
    venue: "Galería Animal, Santiago",
    year: "2025",
  },
  {
    title: "Arte Joven Chileno",
    venue: "Museo de Arte Contemporáneo, Santiago",
    year: "2024",
  },
  {
    title: "Resonancias",
    venue: "Centro Cultural, Valparaíso",
    year: "2023",
  },
  {
    title: "Primera Muestra Individual",
    venue: "Galería Municipal, Providencia",
    year: "2022",
  },
];

export const education: TrajectoryEntry[] = [
  {
    title: "Licenciatura en Artes Visuales",
    meta: "2015 - 2019 · Universidad de Chile",
  },
];

export const awards: TrajectoryEntry[] = [
  { title: "Premio Artes Visuales", meta: "2024 · Institución" },
];

/** Every show, current first, then the others from newest to oldest. */
export const trajectoryShows: TrajectoryShow[] = [...currentShows, ...pastShows];
