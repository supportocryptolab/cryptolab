import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { stripe } from "@/lib/stripe";
import { getSupabaseAdmin, generateSignedUrl } from "@/lib/supabase";
import { sendDownloadEmail } from "@/lib/email";

// Stripe webhooks need raw body
export const runtime = "nodejs";

export async function POST(req: NextRequest) {
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

  if (!webhookSecret) {
    console.error("❌ Missing STRIPE_WEBHOOK_SECRET in .env.local");
    return NextResponse.json({ error: "Missing webhook secret" }, { status: 500 });
  }

  const signature = req.headers.get("stripe-signature");
  if (!signature) {
    console.error("❌ Missing stripe-signature header");
    return NextResponse.json({ error: "Missing signature" }, { status: 400 });
  }

  // RAW body
  const rawBody = await req.text();

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(rawBody, signature, webhookSecret);
  } catch (err: any) {
    console.error("❌ Webhook signature verification failed:", err?.message);
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  console.log("✅ Stripe event received:", event.type);

  // We only care about checkout.session.completed
  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;

    const email = session.customer_details?.email || session.customer_email || "";
    console.log("ℹ️ Session:", session.id);
    console.log("ℹ️ Email:", email || "(missing)");

    try {
      // 1) Generate signed URL (24h)
      const downloadUrl = await generateSignedUrl(86400);
      console.log("✅ Signed URL generated");

      // 2) Save order to Supabase (best effort)
      try {
        const supabase = getSupabaseAdmin();
        const { error: dbError } = await supabase.from("orders").insert({
          stripe_session_id: session.id,
          stripe_customer_email: email,
          amount_cents: session.amount_total ?? 1499,
          currency: session.currency ?? "eur",
          status: "paid",
          download_url: downloadUrl,
          product_name: "Le Basi-TradingBook",
        });

        if (dbError) {
          console.error("⚠️ Supabase insert error:", dbError.message);
        } else {
          console.log("✅ Order saved to Supabase");
        }
      } catch (dbErr: any) {
        console.error("⚠️ Supabase error (client/env/table?):", dbErr?.message || dbErr);
      }

      // 3) Send email (best effort)
      if (!email) {
        console.warn("⚠️ No email in Stripe session, cannot send delivery email.");
      } else {
        try {
          const res = await sendDownloadEmail({ to: email, downloadUrl });
          console.log("✅ Email sent via Resend:", res?.id || "(no id)");
        } catch (mailErr: any) {
          console.error("❌ Email send failed:", mailErr?.message || mailErr);
        }
      }
    } catch (err: any) {
      console.error("❌ Webhook processing error:", err?.message || err);
      // IMPORTANT: still return 200 so Stripe doesn't retry endlessly while you debug
    }
  }

  // Always ACK
  return NextResponse.json({ received: true });
}