import type { Metadata } from "next";

export const metadata: Metadata = {
title: "Privacy Policy | CryptoLab",
description: "Privacy Policy di CryptoLab",
};

export default function PrivacyPolicyPage() {
return (
<main className="relative z-10 min-h-screen px-6 py-20 text-white">
<div className="mx-auto max-w-4xl rounded-[28px] border border-white/10 bg-white/[0.04] p-8 shadow-2xl backdrop-blur-xl sm:p-12">
<h1 className="mb-4 text-4xl font-bold tracking-tight">Privacy Policy</h1>
<p className="mb-10 text-white/70">
Ultimo aggiornamento: <strong>[INSERISCI DATA]</strong>
</p>

<div className="space-y-8 text-white/80 leading-relaxed">
<section>
<h2 className="mb-3 text-2xl font-semibold text-white">1. Titolare del trattamento</h2>
<p>
Il presente sito è gestito da <strong>[INSERISCI NOME / RAGIONE SOCIALE]</strong>,
titolare del trattamento dei dati personali raccolti tramite il sito
CryptoLab.
</p>
<p className="mt-3">
Per qualsiasi informazione puoi contattarci a:
<br />
<strong>supportocryptolabitalia@gmail.com</strong>
</p>
</section>

<section>
<h2 className="mb-3 text-2xl font-semibold text-white">2. Dati raccolti</h2>
<p>Possiamo raccogliere le seguenti categorie di dati personali:</p>
<ul className="mt-3 list-disc space-y-2 pl-6">
<li>dati identificativi e di contatto, come nome ed email;</li>
<li>dati necessari per la gestione dell’acquisto del prodotto digitale;</li>
<li>dati tecnici di navigazione, come indirizzo IP, browser e dispositivo;</li>
<li>dati relativi alle transazioni e ai pagamenti gestiti tramite servizi di terze parti.</li>
</ul>
</section>

<section>
<h2 className="mb-3 text-2xl font-semibold text-white">3. Finalità del trattamento</h2>
<p>I dati personali vengono trattati per le seguenti finalità:</p>
<ul className="mt-3 list-disc space-y-2 pl-6">
<li>consentire l’acquisto e la consegna del prodotto digitale;</li>
<li>inviare email operative relative all’ordine e al download del PDF;</li>
<li>gestire eventuali richieste di supporto;</li>
<li>garantire sicurezza, funzionamento e manutenzione del sito;</li>
<li>adempiere ad obblighi di legge.</li>
</ul>
</section>

<section>
<h2 className="mb-3 text-2xl font-semibold text-white">4. Base giuridica</h2>
<p>
Il trattamento dei dati si basa sull’esecuzione di misure precontrattuali e contrattuali,
sull’adempimento di obblighi legali e, ove necessario, sul legittimo interesse del titolare
alla sicurezza e al corretto funzionamento del sito.
</p>
</section>

<section>
<h2 className="mb-3 text-2xl font-semibold text-white">5. Pagamenti e servizi di terze parti</h2>
<p>
I pagamenti vengono gestiti tramite provider esterni, tra cui <strong>Stripe</strong>.
L’invio delle email operative può essere gestito tramite <strong>Resend</strong>.
L’archiviazione e la generazione dei link temporanei per il download possono essere gestite
tramite <strong>Supabase</strong>.
</p>
<p className="mt-3">
Tali soggetti trattano i dati secondo le proprie informative privacy e in qualità di autonomi
titolari o responsabili del trattamento, a seconda del servizio fornito.
</p>
</section>

<section>
<h2 className="mb-3 text-2xl font-semibold text-white">6. Conservazione dei dati</h2>
<p>
I dati vengono conservati per il tempo strettamente necessario a perseguire le finalità
per cui sono raccolti e, ove richiesto, per il periodo previsto dalla normativa vigente.
</p>
</section>

<section>
<h2 className="mb-3 text-2xl font-semibold text-white">7. Diritti dell’interessato</h2>
<p>
In qualità di interessato, puoi richiedere l’accesso ai tuoi dati personali, la rettifica,
la cancellazione, la limitazione del trattamento, l’opposizione e, nei casi previsti,
la portabilità dei dati.
</p>
<p className="mt-3">
Per esercitare i tuoi diritti puoi scrivere a:
<br />
<strong>supportocryptolabitalia@gmail.com</strong>
</p>
</section>

<section>
<h2 className="mb-3 text-2xl font-semibold text-white">8. Sicurezza</h2>
<p>
Adottiamo misure tecniche e organizzative adeguate per proteggere i dati personali
da accessi non autorizzati, perdita, divulgazione o alterazione.
</p>
</section>

<section>
<h2 className="mb-3 text-2xl font-semibold text-white">9. Modifiche alla presente informativa</h2>
<p>
Ci riserviamo il diritto di aggiornare la presente Privacy Policy in qualsiasi momento.
Eventuali modifiche saranno pubblicate su questa pagina.
</p>
</section>
</div>
</div>
</main>
);
}
