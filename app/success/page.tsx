import { Suspense } from "react";
import SuccessClient from "@/components/SuccessClient";

export default function SuccessPage() {
return (
<Suspense
fallback={
<div className="relative z-10 min-h-screen flex items-center justify-center px-6">
<div className="w-full max-w-xl rounded-[28px] border border-white/10 bg-white/[0.04] p-8 sm:p-10 backdrop-blur-xl shadow-2xl text-center">
<div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-[#77E1FD]/25 to-[#B3A7FB]/25 border border-white/10">
<span className="text-3xl">✓</span>
</div>

<h1 className="text-3xl sm:text-4xl font-bold text-white mb-4">
Grazie per l'acquisto!
</h1>

<p className="text-white/70 text-lg leading-relaxed">
Stiamo caricando i dettagli del tuo ordine...
</p>
</div>
</div>
}
>
<SuccessClient />
</Suspense>
);
}
