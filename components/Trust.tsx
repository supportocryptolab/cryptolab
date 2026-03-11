"use client";

import SectionHeading from "./SectionHeading";
import { StaggerGroup, StaggerItem } from "./Motion";

const guarantees = [
  {
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
      </svg>
    ),
    title: "Pagamento 100% sicuro",
    desc: "Checkout crittografato gestito da Stripe. Non salviamo i dati della tua carta.",
  },
  {
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
      </svg>
    ),
    title: "Consegna immediata via email",
    desc: "Ricevi il link di download nella tua casella email entro pochi secondi dal pagamento.",
  },
  {
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 8.511c.884.284 1.5 1.128 1.5 2.097v4.286c0 1.136-.847 2.1-1.98 2.193-.34.027-.68.052-1.02.072v3.091l-3-3c-1.354 0-2.694-.055-4.02-.163a2.115 2.115 0 01-.825-.242m9.345-8.334a2.126 2.126 0 00-.476-.095 48.64 48.64 0 00-8.048 0c-1.131.094-1.976 1.057-1.976 2.192v4.286c0 .837.46 1.58 1.155 1.951m9.345-8.334V6.637c0-1.621-1.152-3.026-2.76-3.235A48.455 48.455 0 0011.25 3c-2.115 0-4.198.137-6.24.402-1.608.209-2.76 1.614-2.76 3.235v6.226c0 1.621 1.152 3.026 2.76 3.235.577.075 1.157.14 1.74.194V21l4.155-4.155" />
      </svg>
    ),
    title: "Supporto dedicato",
    desc: "Hai domande? Scrivici a supportocryptolab@gmail.com e ti rispondiamo entro 24 ore.",
  },
];

export default function Trust() {
  return (
    <section className="relative py-24 sm:py-32 px-6">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-px bg-gradient-to-r from-transparent via-brand-indigo/20 to-transparent" />

      <div className="max-w-5xl mx-auto">
        <SectionHeading
          tag="Perché fidarti"
          title="Acquisto sicuro, senza rischi"
        />

        <StaggerGroup className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {guarantees.map((g, i) => (
            <StaggerItem key={i}>
              <div className="glass-card rounded-2xl p-7 text-center h-full">
                <div className="w-14 h-14 rounded-2xl bg-brand-cyan/[0.06] border border-brand-cyan/10 flex items-center justify-center mx-auto mb-5 text-brand-cyan">
                  {g.icon}
                </div>
                <h3 className="font-display font-semibold text-lg mb-2">
                  {g.title}
                </h3>
                <p className="text-sm text-brand-muted leading-relaxed">
                  {g.desc}
                </p>
              </div>
            </StaggerItem>
          ))}
        </StaggerGroup>
      </div>
    </section>
  );
}
