import { NextResponse } from "next/server";
import { requireAdmin } from "@/app/_lib/supabase/auth";
import { createPresignedUpload } from "@/app/_lib/media/r2";

export async function POST(request: Request) {
  await requireAdmin();
  try {
    const input = await request.json();
    return NextResponse.json(await createPresignedUpload(input));
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : "Invalid upload" }, { status: 400 });
  }
}
