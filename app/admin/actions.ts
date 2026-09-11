"use server";

import { redirect } from "next/navigation";
import { isAdminEmail } from "@/app/_lib/supabase/auth";
import { getSupabaseServer } from "@/app/_lib/supabase/server";

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
