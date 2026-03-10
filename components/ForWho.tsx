"use client";

import { Reveal } from "./Motion";
import SectionHeading from "./SectionHeading";

const ideal = [
  "Sei curioso del mondo crypto ma non sai da dove iniziare",
  "Hai già comprato crypto ma operi senza strategia",
  "Vuoi capire davvero l'analisi tecnica e i grafici",
  "Cerchi un approccio strutturato e serio al trading",
];

const notIdeal = [
  "Cerchi schemi per \"diventare ricco subito\"",
  "Vuoi segnali di trading già pronti da copiare",
  "Non sei disposto a studiare e fare pratica",
  "Pensi che il trading sia un gioco d'azzardo",
];

function CheckIcon() {
  return (
    <svg className="w-5 h-5 text-brand-cyan shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
    </svg>
  );
}

function XIcon() {
  return (
    <svg className="w-5 h-5 text-rose-400/70 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
    </svg>
  );
}

export default function ForWho() {
  return (
    <section className="relative py-24 sm:py-32 px-6">
      {/* Subtle divider glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-px bg-gradient-to-r from-transparent via-brand-indigo/20 to-transparent" />

      <div className="max-w-5xl mx-auto">
        <SectionHeading
          tag="Per chi è"
          title="È il libro giusto per te?"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Ideal */}
          <Reveal>
            <div className="glass-card rounded-2xl p-8 h-full animated-border">
              <h3 className="font-display font-semibold text-xl mb-6 flex items-center gap-2">
                <span className="w-8 h-8 rounded-lg bg-brand-cyan/10 flex items-center justify-center">
                  <CheckIcon />
                </span>
                Fa per te se…
              </h3>
              <ul className="space-y-4">
                {ideal.map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-brand-muted">
                    <CheckIcon />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>

          {/* Not ideal */}
          <Reveal delay={0.1}>
            <div className="glass-card rounded-2xl p-8 h-full">
              <h3 className="font-display font-semibold text-xl mb-6 flex items-center gap-2">
                <span className="w-8 h-8 rounded-lg bg-rose-400/10 flex items-center justify-center">
                  <XIcon />
                </span>
                Non fa per te se…
              </h3>
              <ul className="space-y-4">
                {notIdeal.map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-brand-muted">
                    <XIcon />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
