"use server";

import { redirect } from "next/navigation";
import { isAdminEmail, requireAdmin } from "@/app/_lib/supabase/auth";
import { getSupabaseAdmin } from "@/app/_lib/supabase/admin";
import { getSupabaseServer } from "@/app/_lib/supabase/server";
import { artworkFormData } from "@/app/admin/artwork-form";
import { revalidatePath } from "next/cache";

export async function login(formData: FormData) {
  const email = String(formData.get("email") ?? "").trim();
  const password = String(formData.get("password") ?? "");
  const supabase = await getSupabaseServer();
  const { data, error } = await supabase.auth.signInWithPassword({ email, password });
  if (error || !isAdminEmail(data.user?.email)) {
    if (data.user) await supabase.auth.signOut();
    redirect("/admin/login?error=unauthorized");
  }
  redirect("/admin");
}

export async function logout() {
  const supabase = await getSupabaseServer();
  await supabase.auth.signOut();
  redirect("/admin/login");
}

export async function saveArtwork(formData: FormData) {
  await requireAdmin();
  const input = artworkFormData(formData);
  const id = String(formData.get("id") ?? "");
  const supabase = getSupabaseAdmin();
  const result = id
    ? await supabase.from("artworks").update(input).eq("id", id)
    : await supabase.from("artworks").insert(input);
  if (result.error) throw new Error("No se pudo guardar la obra");
  revalidatePath("/admin");
  revalidatePath("/arte/galeria");
  redirect("/admin");
}

export async function deleteArtwork(formData: FormData) {
  await requireAdmin();
  const id = String(formData.get("id") ?? "");
  if (!id) throw new Error("Obra inválida");
  const { error } = await getSupabaseAdmin().from("artworks").delete().eq("id", id);
  if (error) throw new Error("No se pudo eliminar la obra");
  revalidatePath("/admin");
  revalidatePath("/arte/galeria");
  redirect("/admin");
}
