import { NextResponse } from "next/server";
import { requireAdmin } from "@/app/_lib/supabase/auth";
import { verifyR2Object } from "@/app/_lib/media/r2";

export async function POST(request: Request) {
  await requireAdmin();
  try {
    const { key, size, contentType } = await request.json();
    const result = await verifyR2Object(key, size, contentType);
    return NextResponse.json(result, { status: result.ok ? 200 : 422 });
  } catch { return NextResponse.json({ error: "Invalid upload" }, { status: 400 }); }
}
