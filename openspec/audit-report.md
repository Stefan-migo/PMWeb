# Audit Report — PajaroMacaWeb

**Date**: 2026-06-30
**Project**: pajaro-maca-web
**Phase**: 5 — Testing & Launch
**Audit scope**: Architecture, code quality, testing, security, performance, accessibility, deployment readiness, dependencies

---

## How to read this report

Each finding has: **Area** | **Severity** | **Description** | **Recommendation** | **Effort**

- **🔴 Critical** — blocks local dev, security, or production readiness
- **🟡 Medium** — should fix before launch
- **🟢 Low** — nice-to-have, tech debt
- **ℹ️ Info** — observation, no action required

---

## 🔴 Critical

### C1. Seed SQL doesn't match migration schema

| | |
|---|---|
| **Area** | Database / Local Dev |
| **Description** | `supabase/seed.sql` inserts columns that don't exist in `supabase/migrations/20260501000000_initial_schema.sql`. 6 tables affected: `tattoo_styles`, `art_categories`, `aftercare_sections`, `about_sections`, `exhibitions`, `artworks`. Running `npx supabase db reset` locally will fail on every INSERT. |
| **Tables affected** | |
| | `tattoo_styles` — seed has `sort_order` (doesn't exist), missing `category_id` |
| | `art_categories` — seed has `sort_order` (doesn't exist) |
| | `aftercare_sections` — seed has `icon_name` (doesn't exist) |
| | `about_sections` — completely different schema (seed has `section_type, title, content, sort_order` vs migration `section, bio_text, image_path, style_tags`) |
| | `exhibitions` — seed has `location` (doesn't exist) |
| | `artworks` — seed has `sort_order` (doesn't exist) |
| **Note** | Cloud Supabase already has data from when it was active (paused now). This only affects local `supabase db reset`. |
| **Recommendation** | Align seed.sql columns with the migration schema. Two approaches: (a) fix seed columns to match migration, or (b) update migration to match seed if that represents the actual cloud schema. |
| **Effort** | Low |

### C2. 4 high-severity npm vulnerabilities

| | |
|---|---|
| **Area** | Dependencies / Security |
| **Description** | Next.js 16.2.4 has 4 high-severity advisories (DoS, XSS, cache poisoning, SSRF-related). Found in `npm audit`. |
| **Recommendation** | Run `npm audit fix` to bump Next.js to 16.2.9+ and transitive deps (undici, vite, ws). |
| **Effort** | Low |

---

## 🟡 Medium

### M1. Gallery filter buttons have no client state

| | |
|---|---|
| **Area** | Features |
| **Description** | Filter buttons in `/tatuajes/portafolio` and `/arte/galeria` render with `aria-selected` but have no `useState` or filtering logic. They're purely decorative — all images always show. |
| **Recommendation** | Add `useState` for active filter, filter the displayed images by category/style. |
| **Effort** | Low |

### M2. Layout forced to `"use client"` by PageTransition

| | |
|---|---|
| **Area** | Architecture / Performance |
| **Description** | Both `(tattoo)/layout.tsx` and `(art)/layout.tsx` are `"use client"` because they wrap content with `<PageTransition>`. This forces the entire layout subtree to be client-rendered, defeating server component benefits for static nav, footer, and SEO metadata. |
| **Recommendation** | Move `<PageTransition>` wrapper from the layout to only the page content slot, or use a client component that wraps only `{children}` while keeping the layout as a server component. |
| **Effort** | Medium |

### M3. Queries use browser client on server

| | |
|---|---|
| **Area** | Architecture / Data |
| **Description** | `app/_lib/queries/artworks.ts` uses the browser Supabase client (`supabase` from `client.ts`) instead of the admin client (`createAdminClient` from `admin.ts`) for server-side functions like `getArtworkBySlug()` and `generateStaticParams()`. Works in dev but may hit RLS restrictions in production. |
| **Recommendation** | Replace `supabase` import with `createAdminClient()` in server-side query functions. |
| **Effort** | Low |

### M4. No error boundaries or loading states

| | |
|---|---|
| **Area** | UX / Resilience |
| **Description** | No `error.tsx` or `global-error.tsx` files in any route group. No `loading.tsx` files. The only loading state is the Suspense boundary inside `ImageLightbox`. Network errors or slow loads will show blank pages or the Next.js default error screen. |
| **Recommendation** | Add `error.tsx` and `loading.tsx` to `(tattoo)/` and `(art)/` route groups. |
| **Effort** | Low |

### M5. No rate limiting on `/api/quote`

| | |
|---|---|
| **Area** | Security / Anti-spam |
| **Description** | The quote API endpoint (`/api/quote`) has honeypot and origin validation but no rate limiting. Susceptible to form spam. |
| **Recommendation** | Add a simple in-memory rate limiter (e.g., `express-rate-limiter` pattern, or Vercel's Edge Rate Limiting via Upstash). |
| **Effort** | Medium |

### M6. Missing public assets

| | |
|---|---|
| **Area** | SEO / Polish |
| **Description** | No `public/og-image.jpg`, `public/apple-touch-icon.png`, or placeholder images (`placeholder-tattoo-1.jpg`, `placeholder-art-1.jpg`). These are referenced in `layout.tsx` metadata and seed data. |
| **Recommendation** | Create SVG-based fallback placeholders for all missing assets. |
| **Effort** | Low |

### M7. No `.env.example`

| | |
|---|---|
| **Area** | DX / Onboarding |
| **Description** | No `.env.example` file. New developers have to guess which env vars are needed. |
| **Recommendation** | Create `.env.example` with placeholder values for all required variables (NEXT_PUBLIC_SUPABASE_URL, NEXT_PUBLIC_SUPABASE_ANON_KEY, SUPABASE_SERVICE_ROLE_KEY, CLOUDFLARE_R2_*, etc.). |
| **Effort** | Low |

### M8. 23 outdated packages

| | |
|---|---|
| **Area** | Dependencies |
| **Description** | 22 packages behind latest. Notable major-version gaps: `@hookform/resolvers` 3→5, `@supabase/ssr` 0.6→0.12, `@vercel/analytics` 1→2, `@vercel/speed-insights` 1→2, `lucide-react` 0.511→1.22, `zod` 3→4, `yet-another-react-lightbox` 3.21→3.32. Bumping requires checking for breaking changes. |
| **Recommendation** | Review changelogs for each major bump. Prioritize `zod` v4 (schema validation), `@supabase/ssr` 0.12 (auth improvements), and `lucide-react` v1 (new icons, tree-shaking). |
| **Effort** | Medium |

### M9. Hardcoded colors instead of CSS variables

| | |
|---|---|
| **Area** | Code Quality |
| **Description** | Several pages use hardcoded hex values like `text-[#ef4444]`, `bg-[#0a0a0a]` instead of the CSS custom properties defined in `globals.css` (`var(--tattoo-accent)`, `var(--tattoo-bg)`) or Tailwind v4 theme tokens. |
| **Recommendation** | Use Tailwind v4 `@theme` tokens or CSS var references. Search for `#` in TSX files and replace with theme tokens. |
| **Effort** | Medium |

### M10. ImageLightbox violates single responsibility

| | |
|---|---|
| **Area** | Architecture |
| **Description** | `ImageLightbox` renders the full thumbnail grid AND manages lightbox state. Grid rendering and lightbox should be separate components. |
| **Recommendation** | Split into a `GalleryGrid` component (thumbnails) + `Lightbox` trigger (image click opens lightbox). |
| **Effort** | Low |

### M11. Missing `sharp` dependency

| | |
|---|---|
| **Area** | Performance |
| **Description** | Next.js recommends `sharp` for production image optimization. It's not in `package.json`. |
| **Recommendation** | Add `sharp` as a production dependency. |
| **Effort** | Low |

### M12. No skip-to-content link

| | |
|---|---|
| **Area** | Accessibility |
| **Description** | No skip navigation link for keyboard users. Tab order starts with nav links, forcing keyboard users to tab through the entire nav before reaching main content. |
| **Recommendation** | Add a `#skip-to-content` link as the first focusable element in both layouts. |
| **Effort** | Low |

### M13. No `aria-current` on active nav links

| | |
|---|---|
| **Area** | Accessibility |
| **Description** | Active nav links don't have `aria-current="page"`. Screen readers don't announce which page the user is on. |
| **Recommendation** | Add `aria-current="page"` to the active nav link in both tattoo and art navigations. |
| **Effort** | Low |

---

## 🟢 Low

### L1. Empty component directories

| | |
|---|---|
| **Area** | Code Quality |
| **Description** | `app/_components/art/` and `app/_components/tattoo/` exist but are empty. All section-specific components are inline in pages. |
| **Recommendation** | Either remove empty dirs or extract inline sections into reusable components over time. |
| **Effort** | Low |

### L2. No bundle analysis

| | |
|---|---|
| **Area** | Performance |
| **Description** | No `@next/bundle-analyzer` configured. Unknown if there are large dependency issues. |
| **Recommendation** | Add `@next/bundle-analyzer` to analyze production bundle size. |
| **Effort** | Low |

### L3. No integration tests

| | |
|---|---|
| **Area** | Testing |
| **Description** | Only unit (Vitest) and E2E (Playwright). No integration tests for Server Actions, API route, or Supabase query layer. |
| **Recommendation** | Add integration tests using `msw` or direct Supabase calls against a test DB. |
| **Effort** | Medium |

### L4. No Playwright component tests

| | |
|---|---|
| **Area** | Testing |
| **Description** | Playwright is configured for E2E only. No component-level Playwright tests. |
| **Recommendation** | Add Playwright component tests for complex interactive components (ImageLightbox, quote form). |
| **Effort** | Low |

### L5. Placeholder WhatsApp number and Instagram URLs

| | |
|---|---|
| **Area** | Content |
| **Description** | WhatsApp number is `56912345678`. Instagram links point to `https://instagram.com` instead of the actual profile. |
| **Recommendation** | Replace with real business contact info before production deploy. |
| **Effort** | Low |

### L6. No coverage enforcement

| | |
|---|---|
| **Area** | Testing |
| **Description** | `coverage_threshold: 0` — tests pass even with 0% coverage. |
| **Recommendation** | Add `@vitest/coverage-v8` and set a minimum threshold (e.g., 50% for now, increase over time). |
| **Effort** | Low |

### L7. Hardcoded filter tabs in portfolio pages

| | |
|---|---|
| **Area** | Code Quality |
| **Description** | Gallery category tabs are hardcoded arrays in page components instead of being fetched from the database or a shared config. |
| **Recommendation** | Fetch categories from DB or extract to a shared constants file. |
| **Effort** | Low |

### L8. Tattoo landing — `featuredTattoos` filters server-side but all images are placeholders

| | |
|---|---|
| **Area** | Content |
| **Description** | `app/(tattoo)/tatuajes/page.tsx` filters `is_featured = true` but all seed images are `/placeholder-*` paths. |
| **Recommendation** | Replace with real images when available. |
| **Effort** | Low |

---

## ℹ️ Info (no action needed)

- `PageTransition` (Framer Motion) uses `animate={{ x: 0 }}` — **eye-candy-only, not an issue**. CSS `translate` is composited on GPU.
- CSP has `'unsafe-eval'` and `'unsafe-inline'` — **expected**. Required by Framer Motion and Next.js.
- E2E tests can't run locally without Supabase Cloud — **by design**, uses real DB. Could add local Supabase mock later.
- Service role key in `.env.local` is **covered by `.gitignore`** (`.env*` glob). Not committed. One-person project: fine.

---

## Priority Matrix

| Priority | Item | Effort | Dependencies |
|----------|------|--------|-------------|
| P0 | C1 — Fix seed.sql | Low | None |
| P0 | C2 — npm audit fix | Low | None |
| P1 | M1 — Gallery filter state | Low | None |
| P1 | M3 — Browser→admin client in queries | Low | None |
| P1 | M4 — error.tsx + loading.tsx | Low | None |
| P1 | M6 — Missing public assets | Low | None |
| P1 | M7 — .env.example | Low | None |
| P1 | M11 — Add sharp | Low | None |
| P1 | M12 + M13 — a11y fixes | Low | None |
| P2 | M2 — Client layout refactor | Medium | None |
| P2 | M5 — Rate limiting | Medium | None |
| P2 | M8 — Major dep bumps | Medium | Review changelogs |
| P2 | M9 — Hardcoded colors | Medium | None |
| P3 | M10 — ImageLightbox split | Low | None |
| P3 | L1-L8 — Tech debt | Low/Med | Varies |

---

## Immediate Next Actions (P0)

1. **Fix `supabase/seed.sql`** — align column names with migration schema
2. **`npm audit fix`** — resolve 4 high-severity advisories
3. **Create `.env.example`** with placeholder values
4. **Add `sharp`** dep for production image optimization
