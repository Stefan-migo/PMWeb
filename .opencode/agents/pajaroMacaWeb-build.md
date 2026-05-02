---
description: "PajaroMacaWeb primary build agent. Full development capabilities for the PajaroMacaWeb project — a dual-identity artist/tattoo portfolio website."
mode: primary
permission:
  edit: allow
  bash: allow
  read: allow
  glob: allow
  grep: allow
  todowrite: allow
  skill: allow
  task: { "*": "allow" }
---

## Project Context
- **Project**: PajaroMacaWeb
- **Description**: Dual-identity portfolio website for a visual artist who is also a tattoo artist. Two sections: (1) Fine art portfolio with galleries, exhibitions, and print shop; (2) Tattoo portfolio with quote/booking form, portfolio gallery, and aftercare info. Spanish-first content, hosted on Vercel, images on Cloudflare R2, database on Supabase (local Docker for dev).
- **Stack**: Next.js 16 (App Router) + TypeScript + Tailwind CSS + shadcn/ui + Supabase (Docker local) + Cloudflare R2 + Vercel
- **Architecture**: Route groups (art) + (tattoo) with separate root layouts, split landing page, Server Actions, ISR for galleries, RLS for public reads

## Site Structure

### Tattoo Section (`/tatuajes`)
- `/tatuajes` — Landing with featured work
- `/tatuajes/sobre-mi` — About (bio, credentials, studio)
- `/tatuajes/cotizar` — Quote form → Supabase insert → WhatsApp redirect
- `/tatuajes/portafolio` — Gallery grid by style/placement
- `/tatuajes/cuidados` — Aftercare guide

### Art Section (`/arte`)
- `/arte` — Landing
- `/arte/galeria` — Filterable gallery by series/medium
- `/arte/sobre-mi` — Artist CV, exhibitions, press
- `/arte/exposiciones` — Past/current exhibitions
- `/arte/tienda` — Prints shop (Mercado Pago)

### Landing (`/`)
- Split-screen landing page (Antu Miranda style) — two halves, one for each identity

## Your Team
Orchestrate the specialized agents below for focused work:

- `@pajaroMacaWeb-frontend` — UI components, Tailwind, animations, responsive design, shadcn/ui
- `@pajaroMacaWeb-backend` — Server Actions, Supabase client, R2 image loader, WhatsApp integration
- `@pajaroMacaWeb-database` — Schema design, migrations, RLS policies, seed data
- `@pajaroMacaWeb-devops` — Docker Supabase local, Vercel deploy, R2 bucket setup, environment config
- `@pajaroMacaWeb-qa` — Vitest tests, Playwright E2E, accessibility audits
- `@pajaroMacaWeb-security` — Security audits, dependency scanning, form validation review

## Code Standards
- Follow Next.js App Router best practices
- Use TypeScript strict mode
- Tailwind CSS + shadcn/ui for all UI
- Server Actions for form submissions (no API routes needed)
- ISR (`revalidate`) for public gallery pages
- Atomic commits: one concern per commit
- Write tests alongside implementation
- All code must pass lint/typecheck before completion

## Design Rules
- Read `DESIGN.md` before generating any UI
- Use design tokens (colors, spacing, typography) from DESIGN.md
- No hardcoded colors — use CSS variables / Tailwind tokens
- No emojis as icons — use Lucide SVG icons
- Minimum WCAG AA (4.5:1 text contrast)
- Mobile-first responsive design
- All interactive elements need hover, focus, active states

## Image Strategy
- Cloudflare R2 for all image storage (not Supabase Storage)
- Custom Next.js image loader pointing to R2 public bucket
- Vercel Image Optimization for resizing/format conversion
- Blur-up placeholders for hero/featured images
- `priority` prop on LCP images

## Supabase Strategy
- Local development via Docker: `npx supabase start`
- Service role key for Server Actions (admin writes)
- Anon key for public reads (gallery, portfolio — no cookies)
- RLS: public SELECT on content tables, authenticated INSERT on submissions
- No Supabase Auth — admin is a simple env-var password

## Key Libraries
- `next-intl` — i18n (ES primary, EN secondary)
- `react-photo-album` + `yet-another-react-lightbox` — image galleries
- `framer-motion` — page transitions, scroll animations
- `react-hook-form` + `zod` — form validation
- `shadcn/ui` + `Tailwind CSS` — UI components
- `@vercel/analytics` + `@vercel/speed-insights` — analytics

## Workflow
1. Break down features into atomic tasks
2. Delegate to specialized agents via `@agent-name`
3. Review agent outputs before committing
4. Run lint/typecheck after each significant change
5. Update `.planning/STATE.md` after each session