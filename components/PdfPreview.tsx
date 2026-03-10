"use client";

import Image from "next/image";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Reveal } from "./Motion";

const pages = [
  "/preview/page-1.jpg",
  "/preview/page-2.jpg",
  "/preview/page-3.jpg",
  "/preview/page-4.jpg",
  "/preview/page-5.jpg",
];

const spreadPositions = [
  { x: -260, y: 30, rotate: -18, z: 10 },
  { x: -130, y: 10, rotate: -10, z: 20 },
  { x: 0, y: 0, rotate: 0, z: 30 },
  { x: 130, y: 10, rotate: 10, z: 20 },
  { x: 260, y: 30, rotate: 18, z: 10 },
];

export default function PdfPreview() {
  const [isOpen, setIsOpen] = useState(false);
  const [activePage, setActivePage] = useState<string | null>(null);

  return (
    <section className="relative overflow-hidden px-6 py-24 sm:py-32">
      <div className="max-w-6xl mx-auto">
        <Reveal>
          <div className="text-center mb-14">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/10 bg-white/[0.03] backdrop-blur-sm mb-5">
              <span className="w-2 h-2 rounded-full bg-brand-cyan animate-pulse" />
              <span className="text-sm text-brand-muted font-medium">
                Anteprima gratuita
              </span>
            </div>

            <h2 className="font-display font-bold text-3xl sm:text-4xl md:text-5xl tracking-tight">
              Sfoglia le prime
              <span className="gradient-text"> 5 pagine </span>
              del PDF
            </h2>

            <p className="text-brand-muted text-lg mt-5 max-w-2xl mx-auto leading-relaxed">
              Dai un’occhiata concreta a come è strutturato il{" "}
              <span className="text-brand-text font-semibold">
                TradingBook
              </span>
              : chiaro, ordinato e pensato per chi vuole capire davvero il
              trading crypto partendo da zero.
            </p>
          </div>
        </Reveal>

        {/* STACK / FAN PREVIEW */}
        <Reveal delay={0.08}>
          <div className="relative flex h-[540px] sm:h-[600px] md:h-[680px] items-center justify-center">
            {/* ambient glow */}
            <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
              <div className="h-[320px] w-[620px] rounded-full bg-[#4D6EE3]/10 blur-[120px]" />
            </div>

            <div className="relative flex h-full w-full max-w-[900px] items-center justify-center">
              {pages.map((src, i) => {
                const spread = spreadPositions[i];

                return (
                  <motion.button
                    key={src}
                    type="button"
                    onClick={() => {
                      if (!isOpen) {
                        setIsOpen(true);
                      } else {
                        setActivePage(src);
                      }
                    }}
                    initial={false}
                    animate={{
                      x: isOpen ? spread.x : i * 6,
                      y: isOpen ? spread.y : i * 2,
                      rotate: isOpen ? spread.rotate : i % 2 === 0 ? -4 + i : 4 - i,
                      scale: isOpen ? 1 : 1 - i * 0.02,
                    }}
                    transition={{
                      type: "spring",
                      stiffness: 120,
                      damping: 18,
                      mass: 0.8,
                    }}
                    whileHover={{
                      y: isOpen ? spread.y - 16 : -12,
                      scale: 1.03,
                    }}
                    className="absolute focus:outline-none"
                    style={{ zIndex: isOpen ? spread.z : 50 - i }}
                  >
                    <div className="relative aspect-[3/4] w-[240px] overflow-hidden rounded-[24px] border border-white/10 bg-white/[0.04] shadow-[0_20px_60px_rgba(0,0,0,0.35)] backdrop-blur-sm sm:w-[290px] md:w-[330px]">
                      <Image
                        src={src}
                        alt={`Anteprima pagina ${i + 1}`}
                        fill
                        className="object-cover"
                      />

                      <div className="absolute inset-0 bg-gradient-to-t from-[#070B16]/35 via-transparent to-transparent" />

                      <div className="absolute top-4 left-4 rounded-full border border-white/10 bg-[#070B16]/70 px-3 py-1 text-xs font-medium text-white/80 backdrop-blur-md">
                        Pagina {i + 1}
                      </div>
                    </div>
                  </motion.button>
                );
              })}
            </div>
          </div>
        </Reveal>

        {/* controls */}
        <Reveal delay={0.14}>
          <div className="mt-4 flex flex-col items-center justify-center gap-4">
            {!isOpen ? (
              <button
                onClick={() => setIsOpen(true)}
                className="inline-flex items-center justify-center rounded-2xl px-6 py-3 font-display font-semibold text-brand-bg btn-glow"
              >
                Apri anteprima
              </button>
            ) : (
              <button
                onClick={() => setIsOpen(false)}
                className="inline-flex items-center justify-center rounded-2xl border border-white/10 bg-white/[0.03] px-6 py-3 font-medium text-brand-text transition-all hover:bg-white/[0.05]"
              >
                Richiudi anteprima
              </button>
            )}

            <p className="max-w-xl text-center text-sm text-brand-muted/70">
              Clicca una volta per aprire le pagine a ventaglio, clicca una pagina
              per vederla ingrandita.
            </p>
          </div>
        </Reveal>

        {/* CTA */}
        <Reveal delay={0.22}>
          <div className="mt-12 text-center">
            <p className="text-brand-muted mb-6">Ti piace come è strutturato?</p>

            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                const buyButtons = document.querySelectorAll("button");
                const target = Array.from(buyButtons).find((btn) =>
                  btn.textContent?.toLowerCase().includes("compra ora")
                );
                if (target) {
                  (target as HTMLButtonElement).click();
                }
              }}
              className="inline-flex items-center justify-center rounded-2xl px-8 py-4 font-display font-semibold text-brand-bg btn-glow"
            >
              Sblocca il PDF completo
            </a>
          </div>
        </Reveal>
      </div>

      {/* FULLSCREEN MODAL */}
      <AnimatePresence>
        {activePage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[120] flex items-center justify-center bg-[#070B16]/92 p-6 backdrop-blur-md"
            onClick={() => setActivePage(null)}
          >
            <motion.div
              initial={{ scale: 0.92, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.96, opacity: 0 }}
              transition={{ duration: 0.22 }}
              className="relative w-full max-w-4xl"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setActivePage(null)}
                className="absolute -top-12 right-0 text-white/70 transition-colors hover:text-white"
              >
                Chiudi ✕
              </button>

              <div className="relative mx-auto w-full max-w-[485px]">
                <div className="relative aspect-[3/4] w-full overflow-hidden rounded-[28px] border border-white/10 bg-[#0A1020] shadow-2xl">
                  <Image
                    src={activePage}
                    alt="Anteprima PDF fullscreen"
                    fill
                    className="object-contain p-4"
                  />
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}