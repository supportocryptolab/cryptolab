"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SectionHeading from "./SectionHeading";
import { Reveal } from "./Motion";

const faqs = [
  {
    q: "In che formato ricevo il libro?",
    a: "Riceverai un PDF ad alta qualità, ottimizzato per la lettura su qualsiasi dispositivo: PC, tablet, smartphone e e-reader.",
  },
  {
    q: "Come ricevo il PDF dopo l'acquisto?",
    a: "Subito dopo il pagamento, riceverai un'email con il link per scaricare il PDF. Il link è valido per 24 ore ma puoi richiederlo nuovamente contattandoci.",
  },
  {
    q: "Serve esperienza pregressa nel trading?",
    a: "No, il libro parte dalle basi assolute. È pensato per chi vuole iniziare da zero ma anche per chi già opera e vuole consolidare le proprie conoscenze.",
  },
  {
    q: "Il pagamento è sicuro?",
    a: "Assolutamente sì. Il checkout è gestito da Stripe, leader mondiale nei pagamenti online. Non memorizziamo i dati della tua carta.",
  },
  {
    q: "Il libro viene aggiornato?",
    a: "Sì. Gli acquirenti ricevono gli aggiornamenti futuri gratuitamente via email quando disponibili.",
  },
  {
    q: "Posso condividere il PDF con altri?",
    a: "Il PDF è destinato ad uso personale. Ti chiediamo di non redistribuirlo. Se vuoi regalarlo, puoi acquistare una seconda copia.",
  },
  {
    q: "Come posso contattarvi?",
    a: "Puoi scriverci a supportocryptolab@gmail.com. Rispondiamo entro 24 ore nei giorni lavorativi.",
  },
];

function FAQItem({ q, a, isOpen, onToggle }: { q: string; a: string; isOpen: boolean; onToggle: () => void }) {
  return (
    <div className="glass-card rounded-xl overflow-hidden transition-colors duration-300">
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between gap-4 p-5 text-left"
      >
        <span className="font-display font-medium text-brand-text">{q}</span>
        <motion.div
          animate={{ rotate: isOpen ? 45 : 0 }}
          transition={{ duration: 0.2 }}
          className="shrink-0 w-6 h-6 rounded-full border border-white/10 flex items-center justify-center text-brand-muted"
        >
          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
          </svg>
        </motion.div>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div className="px-5 pb-5 text-sm text-brand-muted leading-relaxed">
              {a}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section id="faq" className="relative py-24 sm:py-32 px-6">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-px bg-gradient-to-r from-transparent via-brand-indigo/20 to-transparent" />

      <div className="max-w-3xl mx-auto">
        <SectionHeading
          tag="FAQ"
          title="Domande frequenti"
        />

        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <Reveal key={i} delay={i * 0.03}>
              <FAQItem
                q={faq.q}
                a={faq.a}
                isOpen={openIndex === i}
                onToggle={() => setOpenIndex(openIndex === i ? null : i)}
              />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
