# Project — PajaroMacaWeb

## Overview

PajaroMacaWeb is a dual-identity portfolio website for a visual artist who is also a tattoo artist. The site serves two distinct audiences with separate visual identities and user journeys:

1. **Fine Art** — Artist portfolio with galleries, exhibitions, CV, and print shop
2. **Tattoo** — Tattoo artist portfolio with work gallery, quote/booking form, and aftercare info

## Problem It Solves

The artist maintains two separate professional identities that need to coexist without diluting either. The tattoo side is commercial (booking, quotes, WhatsApp contact), while the art side is more curated (galleries, exhibitions, shop). A single site with clear visual separation lets both audiences find what they need without confusion.

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 16 (App Router) + TypeScript |
| Styling | Tailwind CSS + shadcn/ui |
| Database | Supabase (PostgreSQL) — local Docker for dev |
| Image Storage | Cloudflare R2 (not Supabase Storage) |
| Hosting | Vercel |
| i18n | next-intl (ES primary, EN secondary) |
| Forms | react-hook-form + zod + Server Actions |
| Galleries | react-photo-album + yet-another-react-lightbox |
| Animations | framer-motion |
| Analytics | @vercel/analytics + @vercel/speed-insights |

## Architecture

### Route Groups
```
app/
├── (art)/           # Fine art — light theme, elegant typography
│   ├── layout.tsx   # Art root layout with art navigation
│   ├── page.tsx     # /arte
│   ├── galeria/
│   ├── exposiciones/
│   ├── sobre-mi/
│   └── tienda/
├── (tattoo)/        # Tattoo — dark theme, bold sans-serif
│   ├── layout.tsx    # Tattoo root layout with tattoo navigation
│   ├── page.tsx     # /tatuajes
│   ├── portafolio/
│   ├── cotizar/
│   ├── cuidados/
│   └── sobre-mi/
├── page.tsx         # / — split landing page
└── _components/     # Private: shared + section-specific components
```

### Why Route Groups with Separate Root Layouts?
Next.js route groups allow each section to have its own `<html>`, `<body>`, navigation, and metadata. Navigating between sections triggers a full page reload — which is actually correct here since the art and tattoo sections are visually distinct "brands" even though they share the same person.

### Image Strategy
- **Cloudflare R2** for all image storage (10GB free, no egress fees)
- Custom Next.js image loader pointing to R2 public bucket
- Vercel Image Optimization for resizing/format conversion (WebP/AVIF)
- Blur-up placeholders for hero/featured images

### Database Strategy
- **Local Docker** for development: `npx supabase start`
- **Supabase Cloud** for production
- Service role key for Server Actions (admin writes)
- Anon key for public reads (gallery content — no cookies = ISR works)
- RLS: public SELECT on content tables, anonymous INSERT on submissions
- **No Supabase Auth** — admin is a simple env-var password

### Forms
- Server Actions handle all form submissions
- Zod validation on both client and server
- Quote form → Supabase insert → WhatsApp wa.me redirect
- Contact form → Supabase insert → email notification (optional)

## Site Structure

### Landing (`/`)
Split-screen landing page (Antu Miranda style):
- Left half: Tattoo section — dark background, featured tattoo image, "Ver Tatuajes" CTA
- Right half: Art section — light background, featured artwork, "Ver Arte" CTA
- Persistent header with section switcher

### Tattoo Section (`/tatuajes`)

| Route | Page | Description |
|-------|------|-------------|
| `/tatuajes` | Inicio | Tattoo landing with featured work, quick nav to sections |
| `/tatuajes/sobre-mi` | About | Bio, credentials, studio info, Instagram link |
| `/tatuajes/cotizar` | Quote | Form → Supabase insert → WhatsApp redirect |
| `/tatuajes/portafolio` | Portfolio | Masonry gallery, filterable by style/placement |
| `/tatuajes/cuidados` | AfterCare | Aftercare guide, downloadable PDF, signs of infection |

### Art Section (`/arte`)

| Route | Page | Description |
|-------|------|-------------|
| `/arte` | Inicio | Art landing with featured works |
| `/arte/galeria` | Gallery | Filterable by series/medium, masonry grid |
| `/arte/sobre-mi` | About | Artist CV, exhibitions, press |
| `/arte/exposiciones` | Exhibitions | Past/current shows with installation photos |
| `/arte/tienda` | Shop | Prints via Mercado Pago |

## Design System

### Dual Identity
The site has two distinct visual identities:

**Tattoo (dark)**:
- Background: near-black (`#0a0a0a` or similar)
- Text: off-white (`#f5f5f5`)
- Accent: bold, high-contrast (e.g., red or gold)
- Typography: bold sans-serif (e.g., Inter, Space Grotesk)

**Art (light)**:
- Background: white or warm off-white (`#fafaf9`)
- Text: dark gray (`#1c1917`)
- Accent: muted, sophisticated (e.g., muted earth tones)
- Typography: elegant serif or clean sans (e.g., Cormorant Garamond + Inter)

Both share the same base spacing system, border radius, and shadow tokens from DESIGN.md.

## Chilean/LATAM Specifics

- **WhatsApp** is the primary booking channel — prominent wa.me CTA on all tattoo pages
- **Mercado Pago** for shop payments (Chilean pesos, local cards, bank transfer)
- **Spanish-first** content, formal tone (usted), DD/MM/YYYY dates
- **"Healed work" galleries** valued in LATAM tattoo culture
- **Instagram** integration on both sections (follow button, embedded feed optional)
- Privacy policy required under Chilean data law (Ley 19.628)

## Reference Sites Analyzed

| Site | Type | Key Takeaway |
|------|------|-------------|
| antumiranda.com | Dual split landing | THE model — two halves, minimalist, one for each identity |
| davidrieratattoo.com | Tattoo (Chile) | Cotizar form, WhatsApp CTA, cuidados section, diseños disponibles |
| barrysantattoo.com | Tattoo | Bio → Appointments → Portfolio → Aftercare as 5 clear nav items |
| ginakirlew.com | Artist | Home/Art/Shop/Events/About/Contact — bright, friendly, shop section |
| graceblair.art | Artist | Thesis/Undergrad work separation, resumé, contact |
| yukaidu.com | Artist | Animation + Illustration + Shop — diversified revenue, heavy visuals |

## Development Workflow

1. `npx supabase start` — start local Supabase (Docker)
2. `npm run dev` — start Next.js dev server
3. Create migrations in `supabase/migrations/`
4. `npx supabase db reset` — apply migrations to local DB
5. Build features using specialized agents (`@pajaroMacaWeb-frontend`, etc.)
6. `npm run lint && npm run typecheck` — verify code quality
7. `vercel deploy` — deploy to Vercel preview

## Environment Variables

```bash
# Supabase (local Docker)
NEXT_PUBLIC_SUPABASE_URL=http://localhost:54321
NEXT_PUBLIC_SUPABASE_ANON_KEY=<from supabase status>
SUPABASE_SERVICE_ROLE_KEY=<from supabase status>

# Cloudflare R2
NEXT_PUBLIC_R2_PUBLIC_URL=https://<account>.r2.dev/pajaro-maca-web-images
R2_ACCOUNT_ID=<your-account-id>
R2_ACCESS_KEY_ID=<your-access-key-id>
R2_SECRET_ACCESS_KEY=<your-secret-key>

# WhatsApp
NEXT_PUBLIC_WHATSAPP_NUMBER=56912345678

# Site
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

## Key Decisions

| Decision | Rationale |
|----------|-----------|
| R2 instead of Supabase Storage | 10GB free vs 1GB, no egress fees, better for image-heavy portfolio |
| No Supabase Auth | Solo artist, no user accounts, simpler = fewer attack surfaces |
| Route groups with separate layouts | Each section feels like a distinct "site" with its own visual identity |
| Server Actions for forms | Simpler than API routes, built-in CSRF, progressive enhancement |
| ISR for galleries | Content changes occasionally, but needs to be fresh |
| wa.me for WhatsApp | WhatsApp Business API is overkill for solo artist, wa.me is free and instant |

## Future Considerations

- Bilingual (ES/EN) support — data model supports it, but adds i18n complexity
- Mercado Pago integration for print shop
- Email notifications via Resend or Supabase Edge Functions
- Cal.com or similar for tattoo appointment scheduling
- Cloudflare Image Resizing Worker for on-the-fly transformations