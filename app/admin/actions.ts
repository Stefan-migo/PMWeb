"use server";

import { redirect } from "next/navigation";
import { isAdminEmail, requireAdmin } from "@/app/_lib/supabase/auth";
import { getSupabaseAdmin } from "@/app/_lib/supabase/admin";
import { getSupabaseServer } from "@/app/_lib/supabase/server";
import { artworkFormData } from "@/app/admin/artwork-form";
import { tattooFormData } from "@/app/admin/tattoo-form";
import { scenicFormData } from "@/app/admin/scenic-form";
import { revalidatePath } from "next/cache";
import { deleteR2Object, verifyR2Object } from "@/app/_lib/media/r2";

async function verifyMedia(formData: FormData, fallbackType: string) {
  const key = String(formData.get("media_key") ?? "");
  const size = Number(formData.get("media_size"));
  if (!key || !Number.isInteger(size)) return;
  const result = await verifyR2Object(key, size, String(formData.get("media_type") || fallbackType));
  if (!result.ok) { await deleteR2Object(key); throw new Error("No se pudo verificar el archivo"); }
  return key;
}

async function cleanup(key: string | undefined) {
  if (key) await deleteR2Object(key).catch(() => undefined);
}

function publicKey(value: string | null | undefined) {
  const prefix = `${process.env.NEXT_PUBLIC_R2_PUBLIC_URL ?? ""}/`;
  return value?.startsWith(prefix) ? value.slice(prefix.length) : undefined;
}

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
  const mediaKey = await verifyMedia(formData, "image/jpeg");
  const id = String(formData.get("id") ?? "");
  const supabase = getSupabaseAdmin();
  const result = id
    ? await supabase.from("artworks").update(input).eq("id", id)
    : await supabase.from("artworks").insert(input);
  if (result.error) { await cleanup(mediaKey); throw new Error("No se pudo guardar la obra"); }
  revalidatePath("/admin");
  revalidatePath("/arte/galeria");
  redirect("/admin");
}

export async function deleteArtwork(formData: FormData) {
  await requireAdmin();
  const id = String(formData.get("id") ?? "");
  if (!id) throw new Error("Obra inválida");
  const admin = getSupabaseAdmin();
  const { data: artwork } = await admin.from("artworks").select("image_path").eq("id", id).maybeSingle();
  const { error } = await admin.from("artworks").delete().eq("id", id);
  await cleanup(publicKey(artwork?.image_path));
  if (error) throw new Error("No se pudo eliminar la obra");
  revalidatePath("/admin");
  revalidatePath("/arte/galeria");
  redirect("/admin");
}

export async function saveTattoo(formData: FormData) {
  await requireAdmin();
  const input = tattooFormData(formData);
  const mediaKey = await verifyMedia(formData, "image/jpeg");
  const id = String(formData.get("id") ?? "");
  const supabase = getSupabaseAdmin();
  const result = id
    ? await supabase.from("tattoos").update(input).eq("id", id)
    : await supabase.from("tattoos").insert(input);
  if (result.error) { await cleanup(mediaKey); throw new Error("No se pudo guardar el tatuaje"); }
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
  const admin = getSupabaseAdmin();
  const { data: tattoo } = await admin.from("tattoos").select("image_path").eq("id", id).maybeSingle();
  const { error } = await admin.from("tattoos").delete().eq("id", id);
  await cleanup(publicKey(tattoo?.image_path));
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
  const mediaKey = await verifyMedia(formData, input.media_kind === "video" ? "video/mp4" : "image/jpeg");
  const id = String(formData.get("id") ?? "");
  const supabase = getSupabaseAdmin();
  const result = id
    ? await supabase.from("scenic_works").update(input).eq("id", id)
    : await supabase.from("scenic_works").insert(input);
  if (result.error) { await cleanup(mediaKey); throw new Error("No se pudo guardar la obra escénica"); }
  revalidatePath("/admin");
  revalidatePath("/escenico");
  redirect("/admin");
}

export async function deleteScenic(formData: FormData) {
  await requireAdmin();
  const id = String(formData.get("id") ?? "");
  if (!id) throw new Error("Obra escénica inválida");
  const admin = getSupabaseAdmin();
  const { data: work } = await admin.from("scenic_works").select("media_key").eq("id", id).maybeSingle();
  const { error } = await admin.from("scenic_works").delete().eq("id", id);
  await cleanup(work?.media_key);
  if (error) throw new Error("No se pudo eliminar la obra escénica");
  revalidatePath("/admin");
  revalidatePath("/escenico");
  redirect("/admin");
}
