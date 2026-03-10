"use client";

import { Reveal } from "./Motion";

export default function SectionHeading({
  tag,
  title,
  subtitle,
}: {
  tag: string;
  title: string;
  subtitle?: string;
}) {
  return (
    <div className="text-center mb-16">
      <Reveal>
        <span className="inline-block px-3 py-1 rounded-full text-xs font-mono font-medium tracking-wider uppercase text-brand-cyan/80 border border-brand-cyan/15 bg-brand-cyan/[0.04] mb-4">
          {tag}
        </span>
      </Reveal>
      <Reveal delay={0.05}>
        <h2 className="font-display font-bold text-3xl sm:text-4xl md:text-5xl tracking-tight mb-4">
          {title}
        </h2>
      </Reveal>
      {subtitle && (
        <Reveal delay={0.1}>
          <p className="text-brand-muted text-lg max-w-2xl mx-auto">
            {subtitle}
          </p>
        </Reveal>
      )}
    </div>
  );
}
