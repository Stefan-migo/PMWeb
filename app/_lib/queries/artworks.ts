import "server-only";
import { getSupabaseServer } from "@/app/_lib/supabase/server";
import { getSupabaseAdmin } from "@/app/_lib/supabase/admin";

export interface Artwork {
  id: string;
  title: string;
  slug: string;
  description: string | null;
  image_path: string;
  thumbnail_path: string | null;
  medium: string | null;
  year: number | null;
  is_featured: boolean;
  is_for_sale: boolean;
  price_cents: number | null;
  sort_order: number;
  is_published: boolean;
  created_at: string;
}

export interface Exhibition {
  id: string;
  title: string;
  slug: string;
  description: string | null;
  venue: string | null;
  location: string | null;
  start_date: string | null;
  end_date: string | null;
  is_current: boolean;
}

export async function getArtworks(): Promise<Artwork[]> {
  const supabase = await getSupabaseServer();
  const { data } = await supabase
    .from("artworks")
    .select("*")
    .eq("is_published", true)
    .order("sort_order", { ascending: true });

  return data || [];
}

export async function getArtworkSlugs(): Promise<{ slug: string }[]> {
  const { data } = await getSupabaseAdmin()
    .from("artworks")
    .select("slug")
    .eq("is_published", true)
    .order("sort_order", { ascending: true });
  return data || [];
}

export async function getArtworkBySlug(slug: string): Promise<Artwork | null> {
  const supabase = await getSupabaseServer();
  const { data } = await supabase
    .from("artworks")
    .select("*")
    .eq("slug", slug)
    .eq("is_published", true)
    .maybeSingle();

  return data;
}

export async function getExhibitions(): Promise<Exhibition[]> {
  const supabase = await getSupabaseServer();
  const { data } = await supabase
    .from("exhibitions")
    .select("*")
    .order("start_date", { ascending: false });

  return data || [];
}
