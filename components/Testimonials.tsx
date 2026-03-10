"use client";

import { Reveal } from "./Motion";
import { motion } from "framer-motion";

const testimonials = [
  {
    name: "Luca M.",
    role: "Studente",
    text: "Finalmente qualcuno che spiega il trading crypto in modo semplice. Ho capito concetti che prima mi sembravano impossibili.",
  },
  {
    name: "Marco R.",
    role: "Trader Principiante",
    text: "Il PDF è fatto benissimo. Strutturato, chiaro e pieno di esempi pratici. Vale molto più del prezzo.",
  },
  {
    name: "Andrea S.",
    role: "Investitore",
    text: "La parte sulla gestione del rischio da sola vale tutto il libro. Mi ha cambiato completamente il modo di vedere il trading.",
  },
];

export default function Testimonials() {
  return (
    <section className="relative px-6 py-24 sm:py-32">
      <div className="max-w-6xl mx-auto">

        <Reveal>
          <div className="text-center mb-16">
            <h2 className="font-display font-bold text-3xl sm:text-4xl md:text-5xl tracking-tight">
              Cosa dicono
              <span className="gradient-text"> i lettori</span>
            </h2>

            <p className="text-brand-muted text-lg mt-4 max-w-xl mx-auto">
              Migliaia di persone stanno imparando il trading crypto partendo da zero.
            </p>
          </div>
        </Reveal>

        <div className="grid md:grid-cols-3 gap-8">

          {testimonials.map((t, i) => (
            <Reveal key={i} delay={i * 0.1}>
              <motion.div
                whileHover={{ y: -8 }}
                className="relative p-6 rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-md shadow-lg"
              >

                {/* Stars */}
                <div className="flex mb-4 text-brand-cyan">
                  ★★★★★
                </div>

                {/* Text */}
                <p className="text-brand-muted leading-relaxed mb-6">
                  {t.text}
                </p>

                {/* Author */}
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-brand-indigo/30 flex items-center justify-center font-bold text-brand-text">
                    {t.name.charAt(0)}
                  </div>

                  <div>
                    <div className="font-semibold text-brand-text">
                      {t.name}
                    </div>
                    <div className="text-sm text-brand-muted">
                      {t.role}
                    </div>
                  </div>
                </div>

              </motion.div>
            </Reveal>
          ))}

        </div>
      </div>
    </section>
  );
}