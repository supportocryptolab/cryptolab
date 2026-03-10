import { NextRequest, NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/lib/supabase";

export async function GET(req: NextRequest) {
  const sessionId = req.nextUrl.searchParams.get("session_id");

  if (!sessionId) {
    return NextResponse.json({ error: "Missing session_id" }, { status: 400 });
  }

  try {
    const supabase = getSupabaseAdmin();

    const { data, error } = await supabase
      .from("orders")
      .select("status, stripe_customer_email, product_name, created_at")
      .eq("stripe_session_id", sessionId)
      .single();

    if (error || !data) {
      return NextResponse.json({ status: "pending" });
    }

    return NextResponse.json({
      status: data.status,
      email: data.stripe_customer_email,
      product: data.product_name,
      date: data.created_at,
    });
  } catch {
    return NextResponse.json({ status: "error" }, { status: 500 });
  }
}
