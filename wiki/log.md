# Wiki Log

Chronological record of all wiki activity. Append-only.

Entries are prefixed with date for grep-parseability:
`grep "^## \[" wiki/log.md | tail -5`

---

## [2026-05-01] init | Cortex Wiki Created
Initialized the Cortex wiki structure. Created index.md, log.md, and subdirectories.

## [2026-05-01] install | Graphify + GSD
Installed Graphify (graph extraction, 25 tree-sitter parsers) and GSD (65 commands, 33 subagents) as companion CLI tools. Updated USER-GUIDE.md with full GSD workflow documentation.

## [2026-05-01] docs | SYSTEM-MAP + Self-Maintenance
Added SYSTEM-MAP.md with visual architecture, component-by-component usage guide, and quick reference card.
Updated AGENTS.md with Self-Maintenance section: toolkit summary, proactive behavior rules, and maintenance schedule.

## [2026-05-01] install | Planning with Files
Installed Planning with Files (context discipline skill). Adds 3-file pattern, pre/post tool hooks, and completion verification. Integrated into SYSTEM-MAP.md, AGENTS.md, and Quick Reference Card. ECC excluded to avoid agent/command conflicts with GSD.

## [2026-05-01] feature | Bootstrap + Template System
Added bootstrap skill (.opencode/skills/bootstrap/SKILL.md) for self-adaptation. Added scripts/setup.sh for CLI initialization. Updated AGENTS.md with System Overview table and proactive bootstrap triggers. The template can now be cloned and adapted for any new project.

## [2026-05-01] docs | README.md
Created comprehensive README.md for the Cortex repository. Includes quick start, architecture diagram, capability matrix, component deep-dive, bootstrap workflow, daily workflow, and community documentation.

## [2026-05-01] feature | Intelligent Bootstrap
Rewrote bootstrap skill as 5-phase workflow: Discover → Research → Synthesize → Generate → Launch. Created /new-project command. Bootstrap now asks structured questions, spawns @researcher for internet research on tech stack/industry/competitors, analyzes reference URLs, and proposes a tailored project plan before generating files.

## [2026-05-01] ops | Install script + README clarity
Created scripts/install-deps.sh — one-command setup for Graphify, Planning with Files global install, and tool dependencies. Updated README with clear "already in repo vs needs install" table so users know exactly what to expect after cloning.

## [2026-05-01] feature | Professional Agent Team + Smart Bootstrap
Complete bootstrap rewrite: 5-phase intelligent system with pre-flight check, deep research, and agent team architecture. Created 6 role-based agent templates (backend, frontend, database, security, devops, qa). Bootstrap now creates custom primary agents ({ProjectName}Build, {ProjectName}Plan) and specialized subagent teams. Suggests MCP servers, skills, and tools based on project stack and domain.

## [2026-05-01] project | PajaroMacaWeb Initialized
Bootstrap complete for PajaroMacaWeb — a dual-identity artist/tattoo portfolio website.

**Stack confirmed**: Next.js 16 (App Router) + TypeScript + Tailwind CSS + shadcn/ui + Supabase (Docker local) + Cloudflare R2 + Vercel

**Architecture**: Route groups (art) + (tattoo) with separate root layouts, split landing page, Server Actions, ISR for galleries

**Agent team created**:
- Primary: PajaroMacaWebBuild, PajaroMacaWebPlan
- Specialized: @pajaroMacaWeb-frontend, @pajaroMacaWeb-backend, @pajaroMacaWeb-database, @pajaroMacaWeb-devops, @pajaroMacaWeb-qa, @pajaroMacaWeb-security

**MCP servers enabled**: context7 (docs search), sequential-thinking (reasoning)

**Key decisions**:
- Cloudflare R2 for image storage (10GB free, no egress — better than Supabase 1GB)
- wa.me for WhatsApp booking (WhatsApp Business API overkill for solo artist)
- No Supabase Auth (service role for admin only, simpler)
- Tattoo section: About, Quote, Portfolio, AfterCare (simplified 4-page structure)
- Chilean market: Mercado Pago for shop, WhatsApp primary booking channel

**Reference sites analyzed**: antumiranda.com (split landing model), davidrieratattoo.com (Chilean tattoo site), barrysantattoo.com, ginakirlew.com, graceblair.art, yukaidu.com

**Next action**: Run `npx supabase init && npx supabase start` to set up local Docker Supabase, then scaffold the Next.js app.
## [2026-05-01] phase4 | Polish & Quality
Phase 4 started and mostly completed:
- Created PageTransition.tsx (framer-motion AnimatePresence wrapper, 2 variants)
- Created Reveal.tsx (scroll-triggered animations via useInView)
- Added sitemap.ts and robots.ts for SEO
- Improved per-page metadata with OG tags across all 11 pages
- Added Vercel Analytics + Speed Insights to root layout
- Added functional mobile menus with hamburger toggles in both layouts
- Added ARIA labels, focus-visible, role="alert", prefers-reduced-motion
- All pages updated with Reveal animations and a11y improvements
- Build passes (22 routes, no type errors)

## [2026-05-01] phase4 | Security Audit + Responsive Fixes
- Security audit completed by @sec-auditor (risk: LOW-MEDIUM)
- Fixed: honeypot server-side validation in API route
- Fixed: RLS policy restricted to status='pending' only
- Fixed: security headers (CSP, HSTS, X-Content-Type-Options, X-Frame-Options, Referrer-Policy, Permissions-Policy)
- Fixed: origin/referer validation on API route
- Fixed: verbose error responses (removed details from client response)
- Fixed: touch targets on filter buttons (min-h-[44px])
- Fixed: responsive grid gaps (sm:gap-4 on mobile)
- Build + lint pass clean

## [2026-05-01] phase4 | Performance Audit Complete
- Removed unused JetBrains Mono font (saves ~50KB CSS)
- Dynamic import of yet-another-react-lightbox (code split, 80KB+ on demand)
- Added preconnect/dns-prefetch hints for R2 image CDN
- Added apple-touch-icon meta tag
- Cleaned up globals.css (removed unused font-mono refs)
- Added touch target sizing (min-h-[44px]) to filter buttons
- Added responsive grid gaps for mobile
- Build + lint pass clean
- **Phase 4 complete.** Ready for Phase 5.

## [2026-05-01] phase5 | Testing Infrastructure
- Installed Vitest + @testing-library/react + jsdom
- Created vitest.config.ts with proper excludes and setup
- Created 4 test files: quote schema, Reveal, PageTransition, Landing page
- All 20 tests passing
- Created Playwright E2E config + 3 spec files (17 test cases)
- Created GitHub Actions CI pipeline (quality + e2e)
- Added test scripts: test, test:watch, test:e2e, test:all
- Ready for deploy phase (blocked by accounts/domain)
