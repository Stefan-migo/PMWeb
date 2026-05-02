import { supabase } from "@/app/_lib/supabase/client";

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
  const { data } = await supabase
    .from("artworks")
    .select("*")
    .order("sort_order", { ascending: true });

  return data || [];
}

export async function getArtworkBySlug(slug: string): Promise<Artwork | null> {
  const { data } = await supabase
    .from("artworks")
    .select("*")
    .eq("slug", slug)
    .single();

  return data;
}

export async function getExhibitions(): Promise<Exhibition[]> {
  const { data } = await supabase
    .from("exhibitions")
    .select("*")
    .order("start_date", { ascending: false });

  return data || [];
}