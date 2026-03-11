import { NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";

export async function POST() {
  try {
    const appUrl =
      process.env.NEXT_PUBLIC_SITE_URL ||
      process.env.NEXT_PUBLIC_APP_URL ||
      "http://localhost:3000";

    const session = await stripe.checkout.sessions.create({
      mode: "payment",

      line_items: [
        {
          price_data: {
            currency: "eur",
            product_data: {
              name: "Le Basi-TradingBook",
              description:
                "La guida completa in italiano per il trading crypto — PDF 136+ pagine",
            },
            unit_amount: 1, // €14,99
          },
          quantity: 1,
        },
      ],

      // Stripe raccoglie sempre l'email in Checkout
      customer_creation: "always",

      // 🔥 metadata utilissima per il webhook
      metadata: {
        product_slug: "le-basi-tradingbook",
        product_name: "Le Basi-TradingBook",
      },

      success_url: `${appUrl}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${appUrl}/?canceled=1`,
    });

    return NextResponse.json({ url: session.url });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Unknown error";
    console.error("Checkout error:", message);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}