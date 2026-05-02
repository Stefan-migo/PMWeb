# Roadmap — PajaroMacaWeb

## Phase 1: Foundation [done]
**Goal**: Set up project infrastructure, local Supabase, Next.js scaffold, and core routing

| Step | Task | Status | Notes |
|------|------|--------|-------|
| 1.1 | Install Supabase CLI + run `npx supabase init && npx supabase start` | [x] | |
| 1.2 | Create Next.js app with TypeScript, Tailwind, App Router | [x] | |
| 1.3 | Configure shadcn/ui | [–] | Skipped — raw Tailwind is sufficient |
| 1.4 | Set up Supabase client lib (`_lib/supabase/`) | [x] | |
| 1.5 | Create database migrations (all tables) | [x] | |
| 1.6 | Set up Cloudflare R2 bucket and image loader | [–] | Deferred — no account yet |
| 1.7 | Create route group scaffold: `(art)/` and `(tattoo)/` | [x] | |
| 1.8 | Build split landing page (`/`) | [x] | |
| 1.9 | Set up next-intl for i18n | [–] | Deferred |
| 1.10 | Configure environment variables | [x] | |

---

## Phase 2: Tattoo Section [done]
**Goal**: Complete the tattoo portfolio section with all 4 pages

| Step | Task | Status | Notes |
|------|------|--------|-------|
| 2.1 | Tattoo root layout + navigation (dark theme) | [x] | |
| 2.2 | Tattoo landing page (`/tatuajes`) | [x] | |
| 2.3 | Tattoo portafolio gallery with lightbox | [x] | |
| 2.4 | Quote form with Server Action + Zod validation | [x] |
| 2.5 | WhatsApp redirect after successful quote | [x] | |
| 2.6 | Aftercare page (`/tatuajes/cuidados`) | [x] | |
| 2.7 | About page (`/tatuajes/sobre-mi`) | [x] | |
| 2.8 | Seed data: 8 styles, 5 categories, 4 aftercare, 2 bios | [x] | |

---

## Phase 3: Art Section [done]
**Goal**: Complete the fine art portfolio section

| Step | Task | Status | Notes |
|------|------|--------|-------|
| 3.1 | Art root layout + navigation (light theme) | [x] | |
| 3.2 | Art landing page (`/arte`) | [x] | |
| 3.3 | Art gallery with filter + lightbox | [x] | |
| 3.4 | Individual artwork page with lightbox | [x] | |
| 3.5 | About page (`/arte/sobre-mi`) with CV | [x] | |
| 3.6 | Exhibitions page | [x] | |
| 3.7 | Shop page (Mercado Pago integration) | [x] | Scaffolded, needs Mercado Pago config |
| 3.8 | Seed data: exhibitions + sample artworks | [x] | |

---

## Phase 4: Polish & Quality [done]
**Goal**: Animations, SEO, performance, accessibility

| Step | Task | Status |
|------|------|--------|
| 4.1 | Framer Motion page transitions | [x] |
| 4.2 | Scroll reveal animations | [x] |
| 4.3 | SEO: metadata, OG images, sitemap, robots.txt | [x] |
| 4.4 | Vercel Analytics + Speed Insights | [x] |
| 4.5 | Accessibility audit (WCAG AA) | [x] |
| 4.6 | Mobile responsive QA | [x] |
| 4.7 | Security audit | [x] |
| 4.8 | Performance audit (LCP, CLS optimization) | [x] |

---

## Phase 5: Testing & Launch [planned]
**Goal**: Test suite, CI/CD, production deploy

| Step | Task | Status |
|------|------|--------|
| 5.1 | Vitest unit + integration tests | [ ] |
| 5.2 | Playwright E2E tests | [ ] |
| 5.3 | GitHub Actions CI pipeline | [ ] |
| 5.4 | Vercel production deploy | [ ] |
| 5.5 | Domain configuration | [ ] |
| 5.6 | Cloudflare R2 production bucket | [ ] |
| 5.7 | Supabase Cloud (production DB) | [ ] |
| 5.8 | Launch | [ ] |

---

## Milestones

| Milestone | Target | Status |
|-----------|--------|--------|
| v0.1 Local Dev | Week 1 | [x] |
| v0.2 Tattoo Section | Week 2 | [x] |
| v0.3 Art Section | Week 3 | [x] |
| v0.4 Polish | Week 4 | [x] |
| v1.0 Launch | Week 5 | [ ] |

## Status Legend
- `[planned]` — Not yet started
- `[active]` — Currently in progress
- `[done]` — Completed
- `[blocked]` — Blocked (see STATE.md)
