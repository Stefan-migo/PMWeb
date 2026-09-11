## Exploration: cms-admin

### Current State
The application is a Next.js 16 App Router portfolio with separate `(art)` and `(tattoo)` route groups, distinct visual themes, and Spanish-first visible content. There is no `/admin`, authentication flow, middleware, Server Action, or content-management UI. The only Supabase-backed public detail flow is the art artwork route: `generateStaticParams`, metadata, and the page call `getArtworks`/`getArtworkBySlug`; the art gallery index still renders local placeholder data. Tattoo portfolio images come from an Instagram adapter with local fallback data, while available tattoo designs are entirely local.

Supabase already has tables for art, exhibitions, tattoo styles/tattoos, aftercare, about content, and lead forms. Public read RLS policies exist; public form inserts are intentionally allowed. `getSupabaseAdmin()` provides a server-only service-role client and is already used by `/api/quote`, but it is not an authentication or authorization layer. The regular query module incorrectly imports the browser client for server-rendered functions (also documented as audit finding M3).

The schema is not a reliable current contract. The migration omits fields used by seed/code (`sort_order` on several entities, `icon_name`, exhibition `location`, artwork `thumbnail_path`), and the seed's `about_sections` shape is incompatible with the migration. The seed also inserts `sort_order` into `tattoo_styles` without the migration's required `category_id`. A local database reset therefore fails before an admin can be trusted to manage content. This schema/seed reconciliation is a prerequisite, not incidental CMS polish.

Media reality is mixed but implementation-light: project guidance and `next.config.ts` point to Cloudflare R2 for images, and `next/image` permits `*.r2.dev`; Supabase Storage is only represented by a permitted public render URL pattern. There is no R2 SDK, signed-upload route, Supabase Storage bucket policy, upload helper, or media table. Consequently an upload flow must choose and formalize a provider, validate file type/size, create a stable key, upload server-side or via a short-lived signed URL, persist the public/delivery URL, and handle orphaned files.

Escénico currently has no route despite landing links to `/escenico`, so it is a 404 teaser rather than a modeled domain. Existing media fields are image-only and cannot represent video, playback poster, external video URL, or performance metadata. No current DB table covers scenic works, performances, reels, or video.

### Affected Areas
- `supabase/migrations/20260501000000_initial_schema.sql` — existing content contract, RLS, indexes, and the place to reconcile fields and add the minimal scenic model.
- `supabase/seed.sql` — currently contradicts the migration and blocks reproducible local resets.
- `app/_lib/queries/artworks.ts` — server query pattern and types are already inconsistent with the migration; should become the shared public/admin data boundary.
- `app/_lib/supabase/admin.ts` — reusable server-only service-role client for trusted writes, but never a substitute for checking the signed-in user.
- `app/_lib/supabase/client.ts` and unused `@supabase/ssr` dependency — there is no cookie-aware server/browser auth client yet.
- `app/(art)/arte/galeria/page.tsx` and `app/(art)/arte/galeria/[slug]/page.tsx` — one uses placeholders, the other uses Supabase; both need one consistent content source and ordering/visibility rules.
- `app/_lib/tattoo/designs.ts`, `app/_lib/tattoo/instagram.ts`, and `app/(tattoo)/tatuajes/{page.tsx,portafolio/page.tsx,disenos-disponibles/page.tsx}` — local/Instagram content must be migrated or deliberately retained as a fallback while DB records become canonical.
- `app/(art)/layout.tsx`, `app/(tattoo)/layout.tsx`, `app/layout.tsx` — visual/layout conventions; both section layouts are client components because of navigation state and `PageTransition`, so `/admin` should have an independent layout rather than inherit either theme.
- `app/api/quote/route.ts` — precedent for server-side validated writes using Zod and the admin client; it has no reusable auth abstraction.
- `next.config.ts`, `app/globals.css`, `DESIGN.md`, `tsconfig.json` — R2/Supabase image allow-list, Tailwind/CSS tokens, accessibility expectations, and `@/*` alias.
- `app/_components/blocks/LandingTriSplit/LandingTriSplit.tsx` and `LandingTriSplitDistinct.tsx` — confirmed `/escenico` links that currently resolve to 404.

Graphify consulted `graphify-out/GRAPH_REPORT.md` plus these traversals: query `CMS admin content data layer Supabase auth middleware media storage arte escenico tattoo`; path `Supabase` → `ArtworkPage` (no directed path); path `Auth` → `Database` (no matching `Auth` node). Relevant graph nodes were `supabaseAdmin`, `admin.ts`, `client.ts`, `artworks.ts`, `getArtworks()`, `getArtworkBySlug()`, `ArtworkPage()`, `generateStaticParams()`, `generateMetadata()`, `TatuajesPage()`, `portafolio/page.tsx`, `Design System`, and `PajaroMacaWeb Context`. Relevant extracted/inferred edges were `ArtworkPage()` → `getArtworkBySlug()`, `ArtworkPage()` → `getArtworks()`, `generateMetadata()` → `getArtworkBySlug()`, and `generateStaticParams()` → `getArtworks()`; the graph has no auth/middleware/media-upload path, which corroborates the code search.

### Approaches
1. **Domain tables with a small shared curation contract (recommended)** — keep `artworks`, `exhibitions`, `tattoos`, tattoo taxonomies, aftercare, and about content as domain entities; add only the missing curation fields (`sort_order`, `is_published` or an equivalent visibility flag, stable media fields) and a focused `scenic_works`/`scenic_projects` table with image/video fields. Use one admin shell and domain-specific forms, queries, and validation.
   - Pros: preserves useful existing relationships and RLS; keeps forms understandable for one artist; supports domain-specific metadata (medium/year vs style/availability vs video); avoids a premature universal CMS abstraction.
   - Cons: several forms and migrations; shared behaviors must be kept consistent manually.
   - Effort: Medium

2. **Single polymorphic `content_items` table** — put arte, escénico, and tattoo entries behind one table with `domain`, common title/slug/media/order/published fields, and JSON metadata.
   - Pros: one list/query/upload abstraction and easy future domain navigation.
   - Cons: weak relational constraints, awkward validation/UI, JSON drift, harder public queries, and migration of existing foreign keys; likely over-generalized for one editor.
   - Effort: High

3. **Separate fully independent admin modules and schemas** — treat each domain as its own mini-CMS, including duplicated media, ordering, publication, and taxonomy behavior.
   - Pros: clear local ownership and domain-specific evolution.
   - Cons: duplicated security and CRUD code; inconsistent editing experience; more surface area than the current portfolio warrants.
   - Effort: High

### Recommendation
Choose approach 1 and make schema reconciliation the first work unit. The minimal Ponytail/YAGNI release should provide one artist-only `/admin` shell with: Supabase Auth login/logout; protected dashboard; CRUD for artworks, exhibitions, tattoos/available designs, tattoo styles/categories, aftercare/about sections; publish/feature/order controls; and a narrow media picker/upload flow. It should not include versioning, drafts/history, multi-editor roles, localization, rich WYSIWYG, workflow approvals, search indexing, bulk import, or third-party CMS integration.

Use a server component admin shell and server-side authorization on every mutation. A Server Action (or route handler where multipart upload is required) should validate with Zod, check the authenticated Supabase user, then use the service-role client for the narrowly scoped write. The service-role client must never be exposed to the browser. Add a cookie-aware Supabase SSR client and middleware only if required to refresh auth cookies; middleware is a new capability because none exists today. For a single artist, an allowlisted admin email/user ID is simpler and safer than inventing a role system, but the choice should be explicit.

Use an independent neutral admin visual system based on the existing spacing, typography, Tailwind tokens, semantic HTML, visible focus states, keyboard operation, and WCAG AA contrast. Visible labels/actions should remain Spanish; code and technical identifiers remain English. Keep the admin outside `(art)` and `(tattoo)` so it does not inherit their public navigation or dark/light identity.

For media, standardize on Cloudflare R2 because it is the documented production image store and already allowed by `next.config.ts`. Prefer server-generated presigned upload URLs (or a tightly scoped server upload route), then persist the resulting delivery URL/key in the domain record. Do not add a full media library until actual reuse/deletion requirements appear. If R2 credentials are unavailable, explicitly choose Supabase Storage instead and add its bucket/RLS contract; silently supporting both providers would create avoidable operational complexity.

Tattoo migration should first add/adapt DB fields for `image_path`, title/slug/description, style, `is_featured`, availability status, and `sort_order`; import the three available designs and portfolio records; then change public queries to DB-first with local fallback only during migration. Instagram can remain an optional external feed, but it cannot provide stable editorial metadata or availability and should not remain the CMS source of truth. Escénico should start with a minimal `scenic_works` model supporting title, slug, description, media kind (`image`/`video`), media URL, poster/thumbnail URL, order, featured/published flags, and optional year/project label. Defer performance-specific fields until concrete content requires them.

### Risks
- Schema reconciliation may be destructive if the paused/cloud database has data that differs from both migration and seed; inspect/export the real database before rewriting columns.
- Service-role writes bypass RLS, so missing server-side auth checks would turn `/admin` mutations into a data and media compromise.
- Supabase Auth is not currently wired for cookies or sessions; auth setup, redirect handling, and local/cloud configuration are open implementation work.
- R2 upload/delete consistency, public URL strategy, file limits, and orphan cleanup are currently undefined; uploads should not begin before these are decided.
- Converting tattoo content from local/Instagram data can break existing URLs or lose alt text, availability, and ordering unless an import/mapping step is explicit.
- Adding escénico as a generic content abstraction too early risks recreating a third-party CMS internally; keep its first schema deliberately small.
- Public pages currently mix placeholders, local data, Instagram, and Supabase, so the admin can appear successful while visitors still see non-admin sources unless each page is migrated.
- Existing `@supabase/ssr` and Supabase client setup suggest intended auth direction but do not prove a reusable implementation; verify current package APIs during design.

### Ready for Proposal
Yes. The proposal should make schema/seed reconciliation and auth protection explicit prerequisites, select Cloudflare R2 as the single media provider, define the minimal domain-table model, and split delivery into reviewable slices under the 400-line budget: (1) schema and auth foundation, (2) admin shell plus art CRUD, (3) tattoo migration and CRUD, (4) scenic model/route, and (5) media upload hardening. Confirm the production Supabase schema/data, admin identity, R2 credentials/delivery hostname, and the first real escénico media shape before design.
