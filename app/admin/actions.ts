"use server";

import { redirect } from "next/navigation";
import { isAdminEmail, requireAdmin } from "@/app/_lib/supabase/auth";
import { getSupabaseAdmin } from "@/app/_lib/supabase/admin";
import { getSupabaseServer } from "@/app/_lib/supabase/server";
import { artworkFormData } from "@/app/admin/artwork-form";
import { tattooFormData } from "@/app/admin/tattoo-form";
import { scenicFormData } from "@/app/admin/scenic-form";
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

export async function saveTattoo(formData: FormData) {
  await requireAdmin();
  const input = tattooFormData(formData);
  const id = String(formData.get("id") ?? "");
  const supabase = getSupabaseAdmin();
  const result = id
    ? await supabase.from("tattoos").update(input).eq("id", id)
    : await supabase.from("tattoos").insert(input);
  if (result.error) throw new Error("No se pudo guardar el tatuaje");
  revalidatePath("/admin");
  revalidatePath("/tatuajes");
  revalidatePath("/tatuajes/portafolio");
  revalidatePath("/tatuajes/disenos-disponibles");
  redirect("/admin");
}

export async function deleteTattoo(formData: FormData) {
  await requireAdmin();
  const id = String(formData.get("id") ?? "");
  if (!id) throw new Error("Tatuaje inválido");
  const { error } = await getSupabaseAdmin().from("tattoos").delete().eq("id", id);
  if (error) throw new Error("No se pudo eliminar el tatuaje");
  revalidatePath("/admin");
  revalidatePath("/tatuajes");
  revalidatePath("/tatuajes/portafolio");
  revalidatePath("/tatuajes/disenos-disponibles");
  redirect("/admin");
}

export async function saveScenic(formData: FormData) {
  await requireAdmin();
  const input = scenicFormData(formData);
  const id = String(formData.get("id") ?? "");
  const supabase = getSupabaseAdmin();
  const result = id
    ? await supabase.from("scenic_works").update(input).eq("id", id)
    : await supabase.from("scenic_works").insert(input);
  if (result.error) throw new Error("No se pudo guardar la obra escénica");
  revalidatePath("/admin");
  revalidatePath("/escenico");
  redirect("/admin");
}

export async function deleteScenic(formData: FormData) {
  await requireAdmin();
  const id = String(formData.get("id") ?? "");
  if (!id) throw new Error("Obra escénica inválida");
  const { error } = await getSupabaseAdmin().from("scenic_works").delete().eq("id", id);
  if (error) throw new Error("No se pudo eliminar la obra escénica");
  revalidatePath("/admin");
  revalidatePath("/escenico");
  redirect("/admin");
}
