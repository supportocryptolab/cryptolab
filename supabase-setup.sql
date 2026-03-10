-- ============================================================
-- CryptoLab — Supabase Setup
-- Esegui queste query nel SQL Editor di Supabase Dashboard
-- ============================================================

-- 1) Tabella orders
-- ──────────────────
CREATE TABLE IF NOT EXISTS public.orders (
  id              uuid        PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at      timestamptz NOT NULL    DEFAULT now(),
  stripe_session_id    text   UNIQUE NOT NULL,
  stripe_customer_email text  NOT NULL DEFAULT '',
  amount_cents    integer     NOT NULL DEFAULT 1499,
  currency        text        NOT NULL DEFAULT 'eur',
  status          text        NOT NULL DEFAULT 'pending'
                              CHECK (status IN ('pending', 'paid', 'failed', 'refunded')),
  download_url    text,
  product_name    text        NOT NULL DEFAULT 'Le Basi-TradingBook'
);

-- Indice per lookup rapido via session_id (il webhook lo usa)
CREATE INDEX IF NOT EXISTS idx_orders_session_id
  ON public.orders (stripe_session_id);

-- Indice per ricerche per email (utile per supporto)
CREATE INDEX IF NOT EXISTS idx_orders_email
  ON public.orders (stripe_customer_email);

-- 2) Row Level Security (RLS)
-- ──────────────────────────────
-- Abilitiamo RLS ma non creiamo policies pubbliche.
-- Solo il service_role key (server-side) può leggere/scrivere.
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;

-- Nessuna policy = solo service_role ha accesso.
-- Se in futuro vuoi dare accesso agli utenti autenticati:
-- CREATE POLICY "Users can view own orders"
--   ON public.orders FOR SELECT
--   USING (stripe_customer_email = auth.jwt() ->> 'email');


-- 3) Storage Bucket
-- ──────────────────
-- NOTA: Questo si fa dalla Dashboard → Storage → New Bucket
--       oppure via SQL con l'estensione storage:
--
-- INSERT INTO storage.buckets (id, name, public)
-- VALUES ('downloads', 'downloads', false);
--
-- Dopo, carica il file "tradingbook.pdf" nel bucket "downloads"
-- dalla Dashboard → Storage → downloads → Upload.
--
-- Il bucket è PRIVATO: nessun accesso pubblico.
-- Il server genera signed URLs on-demand dopo il pagamento.
