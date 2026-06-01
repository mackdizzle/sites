# Rare Script — Deploy to Vercel

## One-command deploy (fastest)

```bash
cd rare-script
npx vercel
```

Follow the prompts. Vercel auto-detects Next.js — no config needed.

---

## Full setup with database

### 1. Create a Postgres database

**Option A — Vercel Postgres (easiest)**
1. Go to vercel.com → Storage → Create Database → Postgres
2. Copy the `DATABASE_URL` connection string

**Option B — Neon (free tier)**
1. neon.tech → New project
2. Copy the connection string

**Option C — Local (development only)**
```bash
# Requires PostgreSQL installed
createdb rarescript
DATABASE_URL="postgresql://localhost:5432/rarescript"
```

### 2. Configure environment variables

Copy `.env.example` to `.env.local` and fill in:

```env
DATABASE_URL="postgresql://..."           # from step 1
NEXTAUTH_SECRET="run: openssl rand -base64 32"
NEXTAUTH_URL="https://your-domain.vercel.app"
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY="pk_test_..."
STRIPE_SECRET_KEY="sk_test_..."
STRIPE_WEBHOOK_SECRET="whsec_..."        # from Stripe dashboard
```

### 3. Push schema & seed data

```bash
npm install
npx prisma db push          # creates all tables
npm run db:seed             # loads products, collections, coupons
```

### 4. Deploy

```bash
npx vercel --prod
```

Then in Vercel dashboard → Settings → Environment Variables, add the same
variables from your `.env.local`.

---

## Stripe setup

1. Create account at stripe.com
2. Get test keys from Developers → API keys
3. For webhooks: Developers → Webhooks → Add endpoint
   - URL: `https://your-domain.vercel.app/api/stripe/webhook`
   - Events: `checkout.session.completed`, `payment_intent.payment_failed`,
     `customer.subscription.created`, `customer.subscription.updated`,
     `customer.subscription.deleted`

---

## Run locally (no database)

The frontend renders fully without a database — all product data is
hardcoded in the page components for development.

```bash
npm install
npm run dev
# → http://localhost:3000
```

---

## Demo coupon codes

| Code          | Discount                         |
|---------------|----------------------------------|
| `WELCOME15`   | 15% off (first order)            |
| `SAVE20`      | $20 off orders over $80          |
| `FREESHIP`    | Free shipping                    |
| `BLESSED30`   | 30% off orders over $150         |
| `RARECIRCLE`  | 10% off (members, $100 min)      |
| `FOUNDERS20`  | 20% off (Founder's Circle)       |
