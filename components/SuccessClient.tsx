"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

export default function SuccessClient() {
const searchParams = useSearchParams();
const sessionId = searchParams.get("session_id") ?? "";

const [status, setStatus] = useState<"loading" | "ready" | "error">("loading");

useEffect(() => {
if (!sessionId) {
setStatus("ready");
return;
}

let cancelled = false;

async function checkOrder() {
try {
const res = await fetch(
`/api/order-status?session_id=${encodeURIComponent(sessionId)}`
);

if (!cancelled) {
if (res.ok) {
setStatus("ready");
} else {
setStatus("error");
}
}
} catch {
if (!cancelled) {
setStatus("error");
}
}
}

checkOrder();

return () => {
cancelled = true;
};
}, [sessionId]);

return (
<div className="relative z-10 min-h-screen flex items-center justify-center px-6">
<div className="w-full max-w-xl rounded-[28px] border border-white/10 bg-white/[0.04] p-8 sm:p-10 backdrop-blur-xl shadow-2xl text-center">
<div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full border border-white/10 bg-gradient-to-br from-[#77E1FD]/25 to-[#B3A7FB]/25">
<span className="text-3xl">✓</span>
</div>

<h1 className="mb-4 text-3xl font-bold text-white sm:text-4xl">
Grazie per l'acquisto!
</h1>

{status === "loading" && (
<p className="text-lg leading-relaxed text-white/70">
Stiamo verificando il pagamento e preparando il tuo accesso al PDF...
</p>
)}

{status === "ready" && (
<p className="text-lg leading-relaxed text-white/70">
Il tuo pagamento è in fase di elaborazione.
<br />
Riceverai l’email entro pochi minuti.
</p>
)}

{status === "error" && (
<p className="text-lg leading-relaxed text-red-300">
C’è stato un piccolo problema nel recupero dello stato ordine.
<br />
Se il pagamento è andato a buon fine, l’email dovrebbe comunque arrivare a breve.
</p>
)}

<div className="mt-8">
<Link
href="/"
className="inline-flex items-center justify-center rounded-2xl px-6 py-3 font-semibold text-brand-bg btn-glow"
>
← Torna alla home
</Link>
</div>
</div>
</div>
);
}
