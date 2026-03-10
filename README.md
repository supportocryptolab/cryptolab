# CryptoLab — Le Basi-TradingBook

Landing page + checkout completo per vendere un PDF con Stripe, Supabase e Resend.

---

## Struttura progetto

```
cryptolab/
├── app/
│   ├── api/
│   │   ├── checkout/route.ts      # Crea Stripe Checkout Session
│   │   ├── webhook/route.ts       # Riceve evento da Stripe → salva ordine → invia email
│   │   └── order-status/route.ts  # Verifica stato ordine (per pagina /success)
│   ├── success/page.tsx           # Pagina post-pagamento
│   ├── layout.tsx                 # Layout root con metadata
│   ├── page.tsx                   # Landing page principale
│   └── globals.css                # Stili globali + Tailwind
├── components/
│   ├── Hero.tsx                   # Above the fold + particles canvas
│   ├── WhatYouLearn.tsx           # 6 bullet cards animate
│   ├── ForWho.tsx                 # Due colonne "fa per te / non fa per te"
│   ├── WhatsInside.tsx            # Indice capitoli + book mockup
│   ├── Trust.tsx                  # Garanzie (pagamento, email, supporto)
│   ├── FAQ.tsx                    # Accordion 8 domande
│   ├── FinalCTA.tsx               # CTA finale prima del footer
│   ├── Footer.tsx                 # Footer con link legali
│   ├── MobileCTA.tsx              # CTA sticky su mobile
│   ├── SectionHeading.tsx         # Heading riutilizzabile
│   └── Motion.tsx                 # Wrapper Framer Motion (Reveal, Stagger)
├── lib/
│   ├── stripe.ts                  # Client Stripe server-side
│   ├── supabase.ts                # Client Supabase + signed URL helper
│   └── email.ts                   # Resend + template email brandizzata
├── supabase-setup.sql             # Query SQL per creare tabella + bucket
├── .env.example                   # Template variabili d'ambiente
├── tailwind.config.ts
├── next.config.js
├── tsconfig.json
└── package.json
```

---

## Setup locale (passo-passo)

### 1. Clona e installa

```bash
cd cryptolab
cp .env.example .env.local
npm install
```

### 2. Configura Stripe

1. Vai su [dashboard.stripe.com](https://dashboard.stripe.com)
2. **Developers → API Keys**: copia `pk_test_...` e `sk_test_...`
3. Incollali in `.env.local`:
   - `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...`
   - `STRIPE_SECRET_KEY=sk_test_...`
4. **Webhook locale** con Stripe CLI:
   ```bash
   stripe listen --forward-to localhost:3000/api/webhook
   ```
   Copia il signing secret (`whsec_...`) e mettilo in:
   - `STRIPE_WEBHOOK_SECRET=whsec_...`

### 3. Configura Supabase

1. Crea un progetto su [supabase.com](https://supabase.com)
2. **Settings → API**: copia URL e `service_role` key
3. Incolla in `.env.local`:
   - `NEXT_PUBLIC_SUPABASE_URL=https://xxx.supabase.co`
   - `SUPABASE_SERVICE_ROLE_KEY=eyJ...`
4. **SQL Editor**: incolla ed esegui `supabase-setup.sql`
5. **Storage**:
   - Crea bucket `downloads` (privato, NON pubblico)
   - Carica `tradingbook.pdf` dentro il bucket

### 4. Configura Resend (email)

1. Registrati su [resend.com](https://resend.com)
2. **Domains**: verifica il tuo dominio (o usa il dominio test)
3. **API Keys**: crea una key e incollala:
   - `RESEND_API_KEY=re_...`
   - `RESEND_FROM_EMAIL=ordini@tuodominio.com`

### 5. Avvia

```bash
npm run dev
```

Visita [localhost:3000](http://localhost:3000) e testa il checkout con carta di test Stripe:
- **Numero**: `4242 4242 4242 4242`
- **Scadenza**: qualsiasi data futura
- **CVC**: qualsiasi 3 cifre

---

## Checklist Produzione

### Vercel Deploy

- [ ] Pusha il repo su GitHub
- [ ] Importa in [vercel.com](https://vercel.com) → New Project
- [ ] Framework preset: Next.js (auto-detect)
- [ ] Aggiungi TUTTE le env vars in Vercel → Settings → Environment Variables

### Stripe

- [ ] Passa a chiavi **live** (`sk_live_...`, `pk_live_...`)
- [ ] Crea webhook endpoint in Stripe Dashboard:
  - URL: `https://tuodominio.com/api/webhook`
  - Eventi: `checkout.session.completed`
  - Copia il nuovo `whsec_...` live nelle env vars di Vercel
- [ ] Verifica che il checkout punti al dominio corretto (`NEXT_PUBLIC_APP_URL`)

### Supabase

- [ ] Tabella `orders` creata con query SQL
- [ ] Bucket `downloads` creato e PDF caricato
- [ ] RLS abilitato (nessuna policy pubblica)
- [ ] Service role key nelle env vars di Vercel

### Resend

- [ ] Dominio verificato su Resend
- [ ] Email mittente impostata (`RESEND_FROM_EMAIL`)
- [ ] Testa invio email dopo checkout Stripe

### Generale

- [ ] `NEXT_PUBLIC_APP_URL` impostato al dominio di produzione
- [ ] Pagine legali create (`/privacy`, `/terms`, `/refund`)
- [ ] Test end-to-end: acquisto → ordine salvato → email ricevuta → download funzionante
- [ ] Monitora i log Vercel e Stripe per errori webhook
