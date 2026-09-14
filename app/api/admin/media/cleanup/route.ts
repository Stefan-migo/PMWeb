import { NextResponse } from "next/server";
import { requireAdmin } from "@/app/_lib/supabase/auth";
import { deleteR2Object } from "@/app/_lib/media/r2";

export async function POST(request: Request) {
  await requireAdmin();
  try { const { key } = await request.json(); await deleteR2Object(key); return NextResponse.json({ ok: true }); }
  catch { return NextResponse.json({ error: "Cleanup failed" }, { status: 400 }); }
}
