"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import Link from "next/link";

type OrderStatus = "loading" | "paid" | "pending" | "error";

export default function SuccessPage() {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get("session_id");
  const [status, setStatus] = useState<OrderStatus>("loading");
  const [email, setEmail] = useState("");

  useEffect(() => {
    if (!sessionId) {
      setStatus("error");
      return;
    }

    const checkOrder = async () => {
      try {
        const res = await fetch(`/api/order-status?session_id=${sessionId}`);
        const data = await res.json();
        setStatus(data.status === "paid" ? "paid" : "pending");
        if (data.email) setEmail(data.email);
      } catch {
        setStatus("pending"); // Webhook might not have fired yet
      }
    };

    checkOrder();

    // Poll a few times in case webhook is slow
    const interval = setInterval(checkOrder, 3000);
    const timeout = setTimeout(() => clearInterval(interval), 30000);

    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, [sessionId]);

  return (
    <div className="min-h-screen flex items-center justify-center px-6 mesh-bg">
      <div className="absolute inset-0 grid-pattern opacity-30" />

      <motion.div
        initial={{ opacity: 0, y: 20, filter: "blur(8px)" }}
        animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        transition={{ duration: 0.6 }}
        className="relative glass-card rounded-3xl p-10 sm:p-14 max-w-lg w-full text-center animated-border"
      >
        {/* Success Icon */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
          className="w-20 h-20 rounded-full bg-brand-cyan/10 border border-brand-cyan/20 flex items-center justify-center mx-auto mb-8"
        >
          {status === "loading" ? (
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              className="w-8 h-8 border-2 border-brand-cyan/30 border-t-brand-cyan rounded-full"
            />
          ) : (
            <svg className="w-10 h-10 text-brand-cyan" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          )}
        </motion.div>

        <h1 className="font-display font-bold text-3xl sm:text-4xl mb-4">
          {status === "loading" ? "Verifico il pagamento..." : "Grazie per l'acquisto!"}
        </h1>

        <p className="text-brand-muted text-lg mb-2">
          {status === "paid" && email
            ? `Abbiamo inviato il link di download a:`
            : status === "pending"
            ? "Il tuo pagamento è in fase di elaborazione."
            : "Controlla la tua casella email."}
        </p>

        {status === "paid" && email && (
          <p className="font-mono text-brand-cyan text-sm mb-2">{email}</p>
        )}

        <p className="text-sm text-brand-muted/60 mb-10">
          {status === "paid"
            ? "Controlla anche la cartella spam. Il link è valido per 24 ore."
            : status === "pending"
            ? "Riceverai l'email entro pochi minuti."
            : "Se non ricevi nulla entro 10 minuti, contattaci a support@cryptolab.com."}
        </p>

        <Link
          href="/"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-display font-medium text-brand-bg btn-glow"
        >
          ← Torna alla home
        </Link>
      </motion.div>
    </div>
  );
}
