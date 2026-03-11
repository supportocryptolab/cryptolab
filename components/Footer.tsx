"use client";

export default function Footer() {
  return (
    <footer className="relative border-t border-white/5 py-12 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
          {/* Brand */}
          <div className="flex items-center gap-2">
            <span className="font-display font-bold text-lg text-brand-text">
              Crypto<span className="gradient-text">Lab</span>
            </span>
            <span className="text-brand-muted/40 text-sm">
              © {new Date().getFullYear()}
            </span>
          </div>

          {/* Links */}
          <nav className="flex flex-wrap items-center gap-6 text-sm text-brand-muted/60">
            <a href="/privacy" className="hover:text-brand-text transition-colors duration-200">
              Privacy Policy
            </a>
            <a href="/terms" className="hover:text-brand-text transition-colors duration-200">
              Termini di Servizio
            </a>
          </nav>
        </div>

        <div className="mt-8 pt-6 border-t border-white/5 text-center text-xs text-brand-muted/30">
          CryptoLab non fornisce consulenza finanziaria. Il trading comporta rischi significativi.
          Investi solo ciò che puoi permetterti di perdere.
        </div>
      </div>
    </footer>
  );
}
