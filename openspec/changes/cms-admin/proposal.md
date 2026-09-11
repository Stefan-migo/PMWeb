# Proposal: Custom CMS Admin

## Intent

Provide an admin to curate arte, escénico, and tattoo in the Next.js 16 + Supabase stack. Make DB content authoritative without replacing public identity. Not Directus, Payload, or Sanity.

## Scope

### In Scope
- **Fase 0 (M, High):** reconcile migration, seed, and TypeScript contracts; export deployed data first so local resets work.
- **Auth/admin (M, High):** independent `/admin`, Supabase Auth, single-artist allowlist, and authorized writes.
- **Curation (M, High):** retain tables, relationships, and RLS; add `sort_order`, visibility, stable media fields, and CRUD.
- **Art (S, Medium):** replace gallery placeholders; fix `app/_lib/queries/artworks.ts` browser-client import.
- **Tattoo (M, Medium):** DB-first queries with local fallback; Instagram remains optional.
- **Escénico (M, Medium):** minimal image/video model and public `/escenico` route, resolving the landing-linked 404.
- **Media (M, High):** choose documented/allowlisted Cloudflare R2; validate uploads, keys, delivery URLs, and orphan handling.

### Out of Scope / Non-Goals

No polymorphic table, duplicated modules, third-party CMS, versioning, drafts/approvals, multi-editor roles, multi-language, WYSIWYG, bulk import, indexing, full media library, or performance-specific escénico fields.

## Capabilities

### New Capabilities
- `admin-auth`: artist-only access.
- `admin-curation`: CRUD and editorial controls.
- `scenic-works`: image/video content and route.
- `media-upload`: R2 contract.

### Modified Capabilities
- `art-gallery`: ordered/visible DB index and server query boundary.
- `tattoo-portfolio`: DB-first editorial content with migration fallback.

## Approach

Deliver five reviewable slices: schema/auth; admin/art; tattoo; escénico; R2. Use server components, Actions/handlers, Zod, auth checks, and server-only `getSupabaseAdmin()`, following `app/api/quote/route.ts`. Keep `/admin` outside `(art)`/`(tattoo)`. Follow `DESIGN.md` §§ Typography, Tokens, Inputs, Buttons, Layout, Do's and Don'ts, Responsive Behavior; UI is Spanish-first.

## Affected Areas

| Area | Impact | Effort / Risk |
|---|---|---|
| `supabase/`, auth clients/middleware | Schema/auth foundation | M / High |
| `app/admin/`, queries/actions | Admin CRUD | M / High |
| art/tattoo/scenic routes and adapters | DB reads, migration, `/escenico` | M / Medium |
| R2 upload boundary | Provider/lifecycle contract | M / High |

## Risks and Rollback

Risks: schema drift, service-role exposure, Auth-cookie defects, orphaned uploads, and tattoo loss. Mitigate with exports, auth tests, R2 configuration, import mapping, and fallback reads. Roll back slices independently; restore exports, retain fallback, and delete manifest keys.

## Dependencies

Confirm admin identity, Supabase data, R2 credentials/hostname, and escénico media shape. TDD: `npm run test`; auto-chain under 400 lines.

## Success Criteria

- [ ] Migration + seed reset succeeds with matching TypeScript contracts.
- [ ] Unauthenticated/non-allowlisted users cannot access admin or mutate data/media.
- [ ] Artist can curate ordered, visible art, tattoo, and escénico records.
- [ ] Public art/tattoo pages use DB content; `/escenico` is no longer 404.
- [ ] R2 uploads validate, persist, and never expose service credentials.
