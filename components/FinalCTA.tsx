"use client";

import { Reveal } from "./Motion";

export default function FinalCTA() {
  const handleBuy = async () => {
    try {
      const res = await fetch("/api/checkout", { method: "POST" });
      const data = await res.json();
      if (data.url) window.location.href = data.url;
    } catch (err) {
      console.error("Checkout error:", err);
    }
  };

  return (
    <section className="relative py-24 sm:py-32 px-6">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-px bg-gradient-to-r from-transparent via-brand-indigo/20 to-transparent" />

      {/* Background glow */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-brand-indigo/8 blur-[100px] rounded-full" />
      </div>

      <div className="relative max-w-2xl mx-auto text-center">
        <Reveal>
          <h2 className="font-display font-bold text-3xl sm:text-4xl md:text-5xl tracking-tight mb-6">
            Pronto a iniziare
            <br />
            <span className="gradient-text">il tuo percorso?</span>
          </h2>
        </Reveal>

        <Reveal delay={0.1}>
          <p className="text-brand-muted text-lg mb-10 max-w-lg mx-auto">
            Scarica Le Basi-TradingBook e inizia a fare trading crypto con metodo, strategia e consapevolezza.
          </p>
        </Reveal>

        <Reveal delay={0.2}>
          <button
            onClick={handleBuy}
            className="group relative px-10 py-5 rounded-2xl font-display font-semibold text-xl text-brand-bg btn-glow"
          >
            <span className="relative z-10 flex items-center gap-3">
              Acquista ora — 14.99€
              <svg className="w-5 h-5 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </span>
          </button>
        </Reveal>

        <Reveal delay={0.3}>
          <p className="mt-6 text-sm text-brand-muted/50">
            Pagamento unico · Nessun abbonamento · Rimborso entro 14 giorni
          </p>
        </Reveal>
      </div>
    </section>
  );
}
