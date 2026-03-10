"use client";

import Image from "next/image";
import { useRef, useEffect, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Reveal } from "./Motion";

/* ── Lightweight particle canvas ── */
function ParticleCanvas() {
const canvasRef = useRef<HTMLCanvasElement>(null);

useEffect(() => {
const canvas = canvasRef.current;
if (!canvas) return;
const ctx = canvas.getContext("2d");
if (!ctx) return;

let animId: number;
const dpr = Math.min(window.devicePixelRatio, 2);

const resize = () => {
canvas.width = canvas.offsetWidth * dpr;
canvas.height = canvas.offsetHeight * dpr;
ctx.setTransform(1, 0, 0, 1, 0, 0);
ctx.scale(dpr, dpr);
};

resize();
window.addEventListener("resize", resize);

type Particle = {
x: number;
y: number;
vx: number;
vy: number;
r: number;
a: number;
};

const particles: Particle[] = Array.from({ length: 70 }, () => ({
x: Math.random() * canvas.offsetWidth,
y: Math.random() * canvas.offsetHeight,
vx: (Math.random() - 0.5) * 0.28,
vy: (Math.random() - 0.5) * 0.28,
r: Math.random() * 1.6 + 0.4,
a: Math.random() * 0.35 + 0.06,
}));

const draw = () => {
ctx.clearRect(0, 0, canvas.offsetWidth, canvas.offsetHeight);
const w = canvas.offsetWidth;
const h = canvas.offsetHeight;

for (const p of particles) {
p.x += p.vx;
p.y += p.vy;
if (p.x < 0) p.x = w;
if (p.x > w) p.x = 0;
if (p.y < 0) p.y = h;
if (p.y > h) p.y = 0;

ctx.beginPath();
ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
ctx.fillStyle = `rgba(119, 225, 253, ${p.a})`;
ctx.fill();
}

for (let i = 0; i < particles.length; i++) {
for (let j = i + 1; j < particles.length; j++) {
const dx = particles[i].x - particles[j].x;
const dy = particles[i].y - particles[j].y;
const dist = Math.sqrt(dx * dx + dy * dy);

if (dist < 110) {
ctx.beginPath();
ctx.moveTo(particles[i].x, particles[i].y);
ctx.lineTo(particles[j].x, particles[j].y);
ctx.strokeStyle = `rgba(77, 110, 227, ${0.07 * (1 - dist / 110)})`;
ctx.lineWidth = 0.55;
ctx.stroke();
}
}
}

animId = requestAnimationFrame(draw);
};

draw();

return () => {
cancelAnimationFrame(animId);
window.removeEventListener("resize", resize);
};
}, []);

return (
<canvas
ref={canvasRef}
className="absolute inset-0 w-full h-full pointer-events-none"
style={{ opacity: 0.7 }}
/>
);
}

/* ── Logo ── */
function Logo() {
return (
<div className="flex items-center gap-3">
<motion.div
initial={{ scale: 0.92, opacity: 0 }}
animate={{ scale: 1, opacity: 1 }}
transition={{ duration: 0.5 }}
className="relative flex items-center justify-center"
>
<div className="absolute inset-0 rounded-full bg-primary-gradient opacity-15 blur-xl" />
<Image
src="/logo/cryptolab-logo.png"
alt="CryptoLab logo"
width={54}
height={54}
className="relative z-10 h-[54px] w-[54px] object-contain drop-shadow-[0_0_18px_rgba(119,225,253,0.18)]"
/>
</motion.div>

<span className="font-display font-bold text-xl tracking-tight text-brand-text">
Crypto<span className="gradient-text">Lab</span>
</span>
</div>
);
}

function TrustItem({
icon,
children,
delay = 0,
}: {
icon: React.ReactNode;
children: React.ReactNode;
delay?: number;
}) {
return (
<motion.div
initial={{ opacity: 0, y: 14 }}
animate={{ opacity: 1, y: 0 }}
transition={{ duration: 0.45, delay }}
whileHover={{ y: -2, scale: 1.02 }}
className="flex items-center gap-2 rounded-full border border-white/6 bg-white/[0.025] px-3 py-2 backdrop-blur-sm"
>
{icon}
<span>{children}</span>
</motion.div>
);
}

export default function Hero() {
const [loading, setLoading] = useState(false);
const [mouse, setMouse] = useState({ x: 0, y: 0 });
const heroRef = useRef<HTMLElement>(null);

const { scrollYProgress } = useScroll();
const yParallax = useTransform(scrollYProgress, [0, 1], [0, 120]);

const handleBuy = async () => {
try {
setLoading(true);

const res = await fetch("/api/checkout", { method: "POST" });
const data = await res.json();

if (data?.url) {
window.location.href = data.url;
} else {
alert("Errore: Stripe URL non ricevuta");
setLoading(false);
}
} catch (err) {
console.error("Checkout error:", err);
alert("Errore nel checkout");
setLoading(false);
}
};

const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
const rect = heroRef.current?.getBoundingClientRect();
if (!rect) return;

const x = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
const y = ((e.clientY - rect.top) / rect.height - 0.5) * 2;

setMouse({ x, y });
};

return (
<section
ref={heroRef}
onMouseMove={handleMouseMove}
className="relative min-h-screen flex flex-col mesh-bg overflow-hidden"
>
{/* Base layers */}
<div className="absolute inset-0 grid-pattern opacity-40" />
<ParticleCanvas />

{/* Animated aurora glows */}
<motion.div
style={{
x: mouse.x * -18,
y: mouse.y * -18,
}}
animate={{
scale: [1, 1.08, 1],
opacity: [0.12, 0.18, 0.12],
}}
transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
className="absolute -top-28 left-1/4 w-[520px] h-[520px] rounded-full bg-brand-indigo/10 blur-[130px]"
/>
<motion.div
style={{
x: mouse.x * 14,
y: mouse.y * 14,
}}
animate={{
scale: [1, 1.06, 1],
opacity: [0.08, 0.14, 0.08],
}}
transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 0.6 }}
className="absolute top-10 right-[10%] w-[420px] h-[420px] rounded-full bg-brand-cyan/10 blur-[120px]"
/>
<motion.div
style={{ y: yParallax }}
animate={{
opacity: [0.07, 0.11, 0.07],
}}
transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
className="absolute bottom-[-140px] left-1/2 -translate-x-1/2 w-[680px] h-[280px] rounded-full bg-brand-violet/10 blur-[120px]"
/>

{/* animated light streak */}
<motion.div
animate={{ x: ["-10%", "110%"] }}
transition={{ duration: 6.5, repeat: Infinity, ease: "linear" }}
className="absolute top-0 left-0 w-[40%] h-full bg-gradient-to-r from-transparent via-white/[0.03] to-transparent skew-x-[-20deg] pointer-events-none"
/>

{/* Nav */}
<motion.nav
initial={{ opacity: 0, y: -20 }}
animate={{ opacity: 1, y: 0 }}
transition={{ duration: 0.5, delay: 0.1 }}
className="relative z-10 w-full max-w-6xl mx-auto px-6 pt-6 flex items-center justify-center"
>
<Logo />
</motion.nav>

{/* Hero Content */}
<div className="relative z-10 flex-1 flex items-center justify-center px-6 pb-20 pt-16">
<div className="max-w-3xl mx-auto text-center">
<Reveal>
<motion.div
whileHover={{ scale: 1.02 }}
className="relative inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/10 bg-white/[0.03] backdrop-blur-sm mb-8 overflow-hidden"
>
<motion.div
animate={{ x: ["-120%", "170%"] }}
transition={{ duration: 3.4, repeat: Infinity, ease: "easeInOut" }}
className="absolute inset-y-0 left-0 w-24 bg-white/10 blur-md pointer-events-none"
/>
<span className="relative z-10 w-2 h-2 rounded-full bg-brand-cyan animate-pulse" />
<span className="relative z-10 text-sm text-brand-muted font-medium">
PDF immediato via email
</span>
</motion.div>
</Reveal>

<Reveal delay={0.1}>
<motion.h1
initial={{ opacity: 0, y: 26 }}
animate={{ opacity: 1, y: 0 }}
transition={{ duration: 0.7, delay: 0.1 }}
className="font-display font-extrabold text-4xl sm:text-5xl md:text-6xl lg:text-[64px] leading-[1.08] tracking-tight mb-6"
>
Impara a fare trading
<br />
<span className="gradient-text">partendo da zero.</span>
</motion.h1>
</Reveal>

<Reveal delay={0.2}>
<motion.p
initial={{ opacity: 0, y: 18 }}
animate={{ opacity: 1, y: 0 }}
transition={{ duration: 0.65, delay: 0.2 }}
className="text-lg sm:text-xl text-brand-muted max-w-xl mx-auto mb-10 leading-relaxed"
>
Il TradingBook è la guida completa in italiano per capire le basi
dei mercati crypto, leggere i grafici e gestire il rischio come un
professionista.
</motion.p>
</Reveal>

<Reveal delay={0.3}>
<div className="flex flex-col sm:flex-row items-center justify-center gap-4">
<motion.div
animate={{
boxShadow: [
"0 0 0px rgba(119,225,253,0.00)",
"0 0 35px rgba(119,225,253,0.18)",
"0 0 0px rgba(119,225,253,0.00)",
],
}}
transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
className="rounded-2xl"
>
<motion.button
onClick={handleBuy}
disabled={loading}
whileHover={{ scale: 1.03, y: -2 }}
whileTap={{ scale: 0.98 }}
className="group relative overflow-hidden px-8 py-4 rounded-2xl font-display font-semibold text-lg text-brand-bg btn-glow disabled:opacity-70"
>
<motion.span
animate={{ x: ["-130%", "160%"] }}
transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut" }}
className="absolute inset-y-0 left-0 w-24 bg-white/20 blur-md pointer-events-none"
/>
<span className="relative z-10 flex items-center gap-2">
{loading ? "Apertura pagamento..." : "Compra ora - 14.99€"}
{!loading && (
<>

<svg
className="w-5 h-5 transition-transform group-hover:translate-x-1"
fill="none"
viewBox="0 0 24 24"
stroke="currentColor"
strokeWidth={2}
>
<path
strokeLinecap="round"
strokeLinejoin="round"
d="M13 7l5 5m0 0l-5 5m5-5H6"
/>
</svg>
</>
)}
</span>
</motion.button>
</motion.div>

<motion.a
whileHover={{ scale: 1.02, y: -1 }}
href="#cosa-impari"
className="group px-6 py-4 rounded-2xl font-display font-medium text-brand-muted border border-white/10 hover:border-white/20 hover:text-brand-text transition-all duration-300 bg-white/[0.02] hover:bg-white/[0.04]"
>
Guarda cosa include
<span className="inline-block ml-1 transition-transform group-hover:translate-y-0.5">
↓
</span>
</motion.a>
</div>
</Reveal>

{/* Trust badges */}
<Reveal delay={0.45}>
<div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 mt-12 text-sm text-brand-muted/70">
<TrustItem
delay={0.5}
icon={
<svg
className="w-4 h-4 text-brand-cyan/70"
fill="none"
viewBox="0 0 24 24"
stroke="currentColor"
strokeWidth={2}
>
<path
strokeLinecap="round"
strokeLinejoin="round"
d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
/>
</svg>
}
>
Pagamento sicuro Stripe
</TrustItem>

<TrustItem
delay={0.58}
icon={
<svg
className="w-4 h-4 text-brand-cyan/70"
fill="none"
viewBox="0 0 24 24"
stroke="currentColor"
strokeWidth={2}
>
<path
strokeLinecap="round"
strokeLinejoin="round"
d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
/>
</svg>
}
>
Consegna via email
</TrustItem>

<TrustItem
delay={0.66}
icon={
<svg
className="w-4 h-4 text-brand-cyan/70"
fill="none"
viewBox="0 0 24 24"
stroke="currentColor"
strokeWidth={2}
>
<path
strokeLinecap="round"
strokeLinejoin="round"
d="M13 10V3L4 14h7v7l9-11h-7z"
/>
</svg>
}
>
Download immediato
</TrustItem>
</div>
</Reveal>
</div>
</div>

{/* Scroll indicator */}
<motion.div
initial={{ opacity: 0 }}
animate={{ opacity: 1 }}
transition={{ delay: 1.5, duration: 0.8 }}
className="absolute bottom-8 left-1/2 -translate-x-1/2"
>
<motion.div
animate={{
y: [0, 8, 0],
boxShadow: [
"0 0 0px rgba(119,225,253,0.00)",
"0 0 14px rgba(119,225,253,0.18)",
"0 0 0px rgba(119,225,253,0.00)",
],
}}
transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
className="w-6 h-10 rounded-full border border-white/15 flex items-start justify-center pt-2 bg-white/[0.02] backdrop-blur-sm"
>
<motion.div
animate={{ y: [0, 10, 0], opacity: [0.5, 1, 0.5] }}
transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
className="w-1 h-2 rounded-full bg-brand-cyan/70"
/>
</motion.div>
</motion.div>
</section>
);
}