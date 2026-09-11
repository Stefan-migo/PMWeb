import { redirect } from "next/navigation";
import { getSupabaseServer } from "./server";

export function parseAdminAllowedEmails(value = process.env.ADMIN_ALLOWED_EMAILS ?? "") {
  return value
    .split(",")
    .map((email) => email.trim().toLowerCase())
    .filter(Boolean);
}

export function isAdminEmail(email: string | null | undefined, allowlist = parseAdminAllowedEmails()) {
  return Boolean(email && allowlist.includes(email.toLowerCase()));
}

export async function requireAdmin() {
  const supabase = await getSupabaseServer();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user || !isAdminEmail(user.email)) redirect("/admin/login?error=unauthorized");
  return user;
}
