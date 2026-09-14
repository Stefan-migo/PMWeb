import { NextResponse } from "next/server";
import { requireAdmin } from "@/app/_lib/supabase/auth";
import { getSupabaseAdmin } from "@/app/_lib/supabase/admin";
import { deleteR2Object, mediaConfig, verifyR2Object } from "@/app/_lib/media/r2";

const targets = {
  art: { table: "artworks", url: "image_path" },
  tattoo: { table: "tattoos", url: "image_path" },
  scenic: { table: "scenic_works", url: "media_url" },
} as const;

export async function POST(request: Request) {
  await requireAdmin();
  const input = await request.json();
  const target = targets[input.domain as keyof typeof targets];
  if (!target || typeof input.key !== "string" || typeof input.id !== "string") return NextResponse.json({ error: "Invalid association" }, { status: 400 });
  const verified = await verifyR2Object(input.key, input.size, input.contentType);
  if (!verified.ok) return NextResponse.json(verified, { status: 422 });
  const result = await getSupabaseAdmin().from(target.table).update({ [target.url]: `${mediaConfig().publicUrl}/${input.key}`, ...(input.domain === "scenic" ? { media_key: input.key } : {}) }).eq("id", input.id);
  if (result.error) { await deleteR2Object(input.key).catch(() => undefined); return NextResponse.json({ error: "Association failed" }, { status: 400 }); }
  return NextResponse.json({ ok: true });
}
