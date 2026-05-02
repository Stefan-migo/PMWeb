import { NextResponse } from "next/server";
import { z } from "zod";
import { supabaseAdmin } from "@/app/_lib/supabase/admin";

const quoteSchema = z.object({
  name: z.string().min(2),
  phone: z.string().min(8),
  email: z.string().email().optional(),
  description: z.string().min(10),
  placement: z.string().optional(),
  size_approx: z.string().optional(),
  honeypot: z.string().max(0).optional(),
});

export async function POST(request: Request) {
  const origin = request.headers.get("origin");
  const allowedOrigins = [
    process.env.NEXT_PUBLIC_SITE_URL,
    "http://localhost:3000",
  ];
  if (origin && !allowedOrigins.includes(origin)) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  try {
    const body = await request.json();

    const parsed = quoteSchema.safeParse(body);
    if (!parsed.success) {
      console.warn("Validation failed:", parsed.error.flatten());
      return NextResponse.json(
        { error: "Datos inválidos" },
        { status: 400 }
      );
    }

    if (parsed.data.honeypot) {
      return NextResponse.json({ success: true });
    }

    const { error } = await supabaseAdmin.from("quote_requests").insert({
      name: parsed.data.name,
      phone: parsed.data.phone,
      email: parsed.data.email || null,
      description: parsed.data.description,
      placement: parsed.data.placement || null,
      size_approx: parsed.data.size_approx || null,
      status: "pending",
    });

    if (error) {
      console.error("Supabase error:", error);
      return NextResponse.json(
        { error: "Error al guardar la solicitud" },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Server error:", err);
    return NextResponse.json(
      { error: "Error interno del servidor" },
      { status: 500 }
    );
  }
}
