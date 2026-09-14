import "server-only";
import { getSupabaseServer } from "@/app/_lib/supabase/server";

export type ScenicWork = {
  id: number | string;
  title: string;
  slug: string;
  description: string | null;
  media_kind: "image" | "video";
  media_key: string;
  media_url: string;
  poster_url: string | null;
  thumbnail_path: string | null;
  sort_order: number;
  is_featured: boolean;
  is_published: boolean;
  year: number | null;
  project_label: string | null;
  created_at?: string;
};

export async function getScenicWorks(): Promise<ScenicWork[]> {
  const { data, error } = await (await getSupabaseServer())
    .from("scenic_works")
    .select("*")
    .eq("is_published", true)
    .order("sort_order", { ascending: true });

  if (error) throw new Error("No se pudieron cargar las obras escénicas");
  return (data || []) as ScenicWork[];
}
