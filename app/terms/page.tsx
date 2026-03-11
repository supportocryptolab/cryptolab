import type { Metadata } from "next";

export const metadata: Metadata = {
title: "Terms of Service | CryptoLab",
description: "Termini di Servizio di CryptoLab",
};

export default function TermsPage() {
return (
<main className="relative z-10 min-h-screen px-6 py-20 text-white">
<div className="mx-auto max-w-4xl rounded-[28px] border border-white/10 bg-white/[0.04] p-8 shadow-2xl backdrop-blur-xl sm:p-12">
<h1 className="mb-4 text-4xl font-bold tracking-tight">Termini di Servizio</h1>
<p className="mb-10 text-white/70">
Ultimo aggiornamento: <strong>[INSERISCI DATA]</strong>
</p>

<div className="space-y-8 text-white/80 leading-relaxed">
<section>
<h2 className="mb-3 text-2xl font-semibold text-white">1. Oggetto</h2>
<p>
I presenti Termini di Servizio disciplinano l’accesso e l’utilizzo del sito CryptoLab
e l’acquisto dei prodotti digitali offerti attraverso di esso.
</p>
</section>

<section>
<h2 className="mb-3 text-2xl font-semibold text-white">2. Prodotto</h2>
<p>
Il sito vende un prodotto digitale in formato PDF denominato
<strong> TradingBook</strong>.
</p>
<p className="mt-3">
Il prodotto viene consegnato tramite email o link di download successivamente al pagamento.
</p>
</section>

<section>
<h2 className="mb-3 text-2xl font-semibold text-white">3. Prezzi e pagamenti</h2>
<p>
I prezzi indicati sul sito sono espressi in euro e possono essere soggetti ad aggiornamento
senza preavviso. Il pagamento viene gestito tramite piattaforme esterne sicure, tra cui Stripe.
</p>
</section>

<section>
<h2 className="mb-3 text-2xl font-semibold text-white">4. Consegna del prodotto digitale</h2>
<p>
Dopo il completamento del pagamento, il cliente riceverà un’email contenente le istruzioni
e/o il link per scaricare il prodotto acquistato.
</p>
</section>

<section>
<h2 className="mb-3 text-2xl font-semibold text-white">5. Uso consentito</h2>
<p>
Il prodotto acquistato è destinato ad uso personale. È vietata la copia, distribuzione,
rivendita, pubblicazione o diffusione, totale o parziale, del contenuto senza autorizzazione
scritta del titolare.
</p>
</section>

<section>
<h2 className="mb-3 text-2xl font-semibold text-white">6. Proprietà intellettuale</h2>
<p>
Tutti i contenuti presenti sul sito, inclusi testi, design, logo, grafiche e prodotti digitali,
sono protetti da diritti di proprietà intellettuale e restano di esclusiva titolarità di
CryptoLab o dei rispettivi aventi diritto.
</p>
</section>

<section>
<h2 className="mb-3 text-2xl font-semibold text-white">7. Limitazione di responsabilità</h2>
<p>
I contenuti del prodotto digitale hanno finalità esclusivamente informative ed educative.
Non costituiscono consulenza finanziaria, di investimento o professionale.
</p>
</section>

<section>
<h2 className="mb-3 text-2xl font-semibold text-white">8. Rimborsi</h2>
<p>
Eventuali politiche di rimborso devono essere indicate espressamente sul sito o comunicate
dal titolare. In assenza di una specifica politica commerciale, le richieste saranno valutate
caso per caso.
</p>
</section>

<section>
<h2 className="mb-3 text-2xl font-semibold text-white">9. Modifiche ai termini</h2>
<p>
Ci riserviamo il diritto di aggiornare o modificare i presenti Termini di Servizio in qualsiasi
momento. Le modifiche saranno efficaci dalla pubblicazione sul sito.
</p>
</section>

<section>
<h2 className="mb-3 text-2xl font-semibold text-white">10. Contatti</h2>
<p>
Per qualsiasi richiesta o informazione puoi contattarci a:
<br />
<strong>supportocryptolabitalia@gmail.com</strong>
</p>
</section>
</div>
</div>
</main>
);
}
