import { NextResponse } from "next/server";
import { generateSignedUrl } from "@/lib/supabase";

export async function GET() {
  try {
    const url = await generateSignedUrl(60); // 60 secondi
    return NextResponse.json({ ok: true, url });
  } catch (e: any) {
    return NextResponse.json({ ok: false, error: e.message }, { status: 500 });
  }
}