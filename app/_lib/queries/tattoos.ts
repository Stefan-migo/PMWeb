import { getSupabaseServer } from "@/app/_lib/supabase/server";
import { availableDesigns, portfolioImages, type AvailableDesign, type TattooImage } from "@/app/_lib/tattoo/designs";

export type Tattoo = {
  id: number | string;
  title: string;
  slug: string;
  description?: string | null;
  image_path: string;
  style?: string | null;
  is_featured?: boolean;
  is_available?: boolean | null;
  availability?: string | null;
  sort_order: number;
  is_published: boolean;
};

export function selectPublishedTattoos<T extends { is_published: boolean; sort_order: number }>(records: T[]) {
  return records.filter((record) => record.is_published).sort((a, b) => a.sort_order - b.sort_order);
}

export async function resolveTattooRecords<T>(
  fetchRecords: () => Promise<{ data: T[] | null; error: unknown }>,
  fallback: T[],
): Promise<T[]> {
  try {
    const result = await fetchRecords();
    return result.error || !result.data?.length ? fallback : result.data;
  } catch {
    return fallback;
  }
}

const localPortfolioRecords: Tattoo[] = portfolioImages.map((image, index) => ({
  id: `local-${index}`,
  title: image.alt,
  slug: `local-${index}`,
  description: null,
  image_path: image.src,
  sort_order: index,
  is_published: true,
}));

export async function getTattoos(): Promise<Tattoo[]> {
  try {
    const supabase = await getSupabaseServer();
    const { data, error } = await supabase
      .from("tattoos")
      .select("*")
      .eq("is_published", true)
      .order("sort_order", { ascending: true });
    return resolveTattooRecords(async () => ({ data: data as Tattoo[] | null, error }), localPortfolioRecords);
  } catch {
    return localPortfolioRecords;
  }
}

export function toPortfolioImages(records: Tattoo[]): TattooImage[] {
  return records.map(({ image_path, title }) => ({ src: image_path, alt: title }));
}

export function toAvailableDesigns(records: Tattoo[]): AvailableDesign[] {
  return records
    .filter((record) => record.is_available !== false && record.availability !== "Reservado")
    .map((record) => ({
      id: String(record.id),
      src: record.image_path,
      alt: record.title,
      name: record.title,
      status: "Disponible",
      detail: record.description || "Pieza adaptable a tu tamaño y ubicación.",
      style: record.style || undefined,
    }));
}

export async function getPortfolioImages(): Promise<TattooImage[]> {
  const records = await getTattoos();
  return records.length ? toPortfolioImages(records) : portfolioImages;
}

export async function getAvailableDesigns(): Promise<AvailableDesign[]> {
  const records = await getTattoos();
  return records[0]?.id.toString().startsWith("local-") ? availableDesigns : toAvailableDesigns(records);
}
