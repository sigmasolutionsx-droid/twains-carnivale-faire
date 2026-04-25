# 🎪 TWAIN's Carnivale Faire
> Where stories don't sit on shelves… they come alive and take the stage.

A full-stack book marketplace built with Next.js, Supabase, and Stripe.

---

## Setup Guide

### Step 1 — Database (Supabase)

1. Go to your Supabase project: https://supabase.com/dashboard/project/otohmqkqhtepmvlzumgc
2. Click **SQL Editor**
3. Paste the entire contents of `database-schema.sql` and run it
4. Go to **Settings → API** and copy:
   - Project URL
   - anon/public key

### Step 2 — Environment Variables

Create a `.env.local` file (copy from `.env.example`):

```
NEXT_PUBLIC_SUPABASE_URL=https://otohmqkqhtepmvlzumgc.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=<your anon key>
SUPABASE_SERVICE_ROLE_KEY=<your service role key — for webhooks only>

NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
STRIPE_SECRET_KEY=sk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...

NEXT_PUBLIC_APP_URL=https://your-vercel-url.vercel.app
```

### Step 3 — Run Locally

```bash
npm install
npm run dev
```

Visit http://localhost:3000

### Step 4 — Deploy to Vercel

1. Push this folder to a GitHub repo
2. Go to vercel.com → New Project → Import your repo
3. Add all environment variables from Step 2
4. Deploy!

### Step 5 — Stripe Webhook

1. In Stripe Dashboard → Developers → Webhooks
2. Add endpoint: `https://your-vercel-url.vercel.app/api/webhook`
3. Select events: `checkout.session.completed`
4. Copy the webhook signing secret → add to Vercel env vars as `STRIPE_WEBHOOK_SECRET`

### Step 6 — Add Your First Book

In Supabase SQL Editor:

```sql
-- First get your author ID
SELECT id FROM authors LIMIT 1;

-- Then insert your book
INSERT INTO books (title, subtitle, author_id, description, genre, featured, cover_url)
VALUES (
  'F*ck What When & Where',
  'Your Answer Is Why!',
  '<paste author id>',
  'Your book description here...',
  'Non-Fiction',
  true,
  'https://your-cover-image-url.jpg'
);

-- Get the book ID, then add formats
SELECT id FROM books WHERE title = 'F*ck What When & Where';

INSERT INTO book_formats (book_id, format, price) VALUES
  ('<book_id>', 'digital', 9.99),
  ('<book_id>', 'physical', 24.99),
  ('<book_id>', 'audio', 14.99);
```

---

## Pages

| Page | Route | Description |
|------|-------|-------------|
| Home | `/` | Grand entrance with hero, spotlight, featured |
| Enter the Faire | `/enter-the-faire` | Full catalogue with filters |
| The Spotlight | `/the-spotlight` | Weekly featured event |
| Book Detail | `/book/[id]` | Individual book page |
| Your Programme | `/programme` | Shopping cart |
| Order Success | `/order-success` | Post-checkout confirmation |

## Tech Stack

- **Next.js 14** — App Router, Server Components
- **Supabase** — PostgreSQL database + storage
- **Stripe** — Payments + webhooks
- **Zustand** — Cart state management
- **Tailwind CSS** — Styling
- **Vercel** — Hosting + deployment
