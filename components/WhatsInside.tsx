"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import SectionHeading from "./SectionHeading";
import { Reveal, StaggerGroup, StaggerItem } from "./Motion";

const chapters = [
  { num: "01", title: "Psicologia", pages: "5 pagine" },
  { num: "02", title: "Modelli di candele", pages: "16 pagine" },
  { num: "03", title: "Strategie di trading", pages: "7 pagine" },
  { num: "04", title: "Modelli di grafici", pages: "30 pagine" },
];

function BookMockup() {
  return (
    <Reveal delay={0.15}>
      <div className="relative mx-auto w-64 sm:w-72">
        {/* Shadow */}
        <div className="absolute -bottom-6 left-1/2 h-8 w-4/5 -translate-x-1/2 rounded-full bg-brand-indigo/20 blur-2xl" />

        {/* Book */}
        <motion.div
          animate={{ y: [0, -8, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          className="relative"
        >
          {/* Back page */}
          <div className="absolute top-2 left-2 h-full w-full rounded-2xl border border-white/5 bg-brand-indigo/20" />

          {/* Front cover */}
          <div className="relative flex aspect-[3/4] flex-col justify-between overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-[#0c1225] via-[#0f1830] to-[#0a0f20] p-8">
            {/* Top glow */}
            <div className="absolute top-0 right-0 h-32 w-32 rounded-full bg-brand-cyan/10 blur-[60px]" />
            <div className="absolute bottom-0 left-0 h-24 w-24 rounded-full bg-brand-violet/10 blur-[50px]" />

            {/* Top content */}
            <div className="relative z-10">
              <div className="mb-2 text-xs font-mono uppercase tracking-[0.2em] text-brand-cyan/60">
                CryptoLab
              </div>
              <div className="mb-6 h-0.5 w-12 rounded-full bg-primary-gradient" />
            </div>

            {/* CENTER LOGO */}
            <div className="relative z-10 flex flex-1 items-center justify-center">
              <div className="relative">
                <div className="absolute inset-0 scale-110 rounded-full bg-[#77E1FD]/10 blur-2xl" />
                <Image
                  src="/logo/cryptolab-logo.png"
                  alt="CryptoLab logo"
                  width={150}
                  height={150}
                  className="relative z-10 mx-auto opacity-95 drop-shadow-[0_0_28px_rgba(119,225,253,0.18)]"
                />
              </div>
            </div>

            {/* Bottom content */}
            <div className="relative z-10">
              <h3 className="mb-2 font-display text-2xl font-bold leading-tight">
                Le Basi-
                <br />
                <span className="gradient-text">TradingBook</span>
              </h3>
              <p className="mt-3 text-xs text-brand-muted/60">
                60+ pagine · Edizione 2026
              </p>
            </div>

            {/* subtle inner shine */}
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-white/[0.05] via-transparent to-transparent" />
          </div>
        </motion.div>
      </div>
    </Reveal>
  );
}

export default function WhatsInside() {
  return (
    <section className="relative px-6 py-24 sm:py-32">
      <div className="absolute top-0 left-1/2 h-px w-1/2 -translate-x-1/2 bg-gradient-to-r from-transparent via-brand-indigo/20 to-transparent" />

      <div className="max-w-6xl mx-auto">
        <SectionHeading
          tag="Cosa trovi dentro"
          title="4 capitoli, 60+ pagine"
          subtitle="Ogni capitolo è progettato per costruire progressivamente le tue competenze."
        />

        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Chapter list */}
          <StaggerGroup className="space-y-3">
            {chapters.map((ch) => (
              <StaggerItem key={ch.num}>
                <motion.div
                  whileHover={{ x: 4, transition: { duration: 0.15 } }}
                  className="glass-card group flex cursor-default items-center gap-4 rounded-xl px-5 py-4 transition-colors duration-300"
                >
                  <span className="font-mono text-sm text-brand-cyan/50 transition-colors group-hover:text-brand-cyan">
                    {ch.num}
                  </span>
                  <span className="font-display flex-1 font-medium text-brand-text">
                    {ch.title}
                  </span>
                  <span className="font-mono text-xs text-brand-muted/50">
                    {ch.pages}
                  </span>
                </motion.div>
              </StaggerItem>
            ))}
          </StaggerGroup>

          {/* Book mockup */}
          <BookMockup />
        </div>
      </div>
    </section>
  );
}