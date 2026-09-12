# Tasks: Custom CMS Admin

Ponytail: retain domain queries/actions; no CMS abstraction, media library, roles, or upload proxy. Merge validation with tests; use Supabase/R2. Graph: `admin.ts`→`getSupabaseAdmin()`, `artworks.ts`→`[slug]/page.tsx`, `(tattoo)/layout.tsx`→`PageTransition`, and CI quality/E2E nodes.

## Phase 1: Schema, Export, Auth (Slice 1)
- [x] 1.1 RED: Vitest tests for reset/seed contracts, category-first tattoo seed, draft anon denial/admin read, and unauthorized rejection in `__tests__/cms-schema-auth.test.ts` (graph: `admin.ts`).
- [x] 1.2 GREEN: Export/map live data; create `supabase/migrations/*_cms_admin.sql` and modify `supabase/seed.sql` for columns, scenic table, constraints, backfill, indexes, and published policies; verify reset.
- [x] 1.3 GREEN: Create/modify `app/_lib/supabase/{server,auth,admin}.ts` and `middleware.ts` for cookie refresh, `getUser()` allowlist, and server-only service role.
- [x] 1.4 RED→GREEN: Add `e2e/cms-admin-auth.spec.ts` for allowlisted login and denial, then protect `/admin` with Spanish login/logout UI.

## Phase 2: Admin Shell, Art (Slice 2)
- [x] 2.1 RED: Vitest tests for Zod mutation rejection, published/order filtering, server boundary, and media refs in `__tests__/cms-art-admin.test.ts` (graph: `artworks.ts`→`[slug]/page.tsx`).
- [x] 2.2 GREEN: Create `app/admin/**` shell/forms/actions with narrow authorized CRUD; update `app/_lib/queries/artworks.ts` to server-only published ordering.
- [x] 2.3 GREEN: Update `app/(art)/arte/galeria/**` detail, metadata, and params; preserve `ImageLightbox`/`Reveal`, tokens, keyboard/focus behavior.
- [x] 2.4 RED→GREEN: Add `e2e/cms-admin-art.spec.ts` for CRUD and hidden gallery/detail records; wire art actions.

## Phase 3: Tattoo (Slice 3)
- [x] 3.1 RED: Vitest tests for DB-first order, outage/empty fallback, and Instagram omission in `__tests__/cms-tattoo.test.ts` (graph: `(tattoo)/layout.tsx`).
- [x] 3.2 GREEN: Create/modify `app/_lib/queries/tattoos.ts` and tattoo admin forms/actions; fallback to local `designs.ts`, keep Instagram optional.
- [x] 3.3 RED→GREEN: Add `e2e/cms-admin-tattoo.spec.ts` for portfolio/designs DB rendering and fallback-safe public pages.

## Phase 4: Scenic (Slice 4)
- [ ] 4.1 RED: Vitest tests for media-kind validation, hidden exclusion, order, and optional fields in `__tests__/cms-scenic.test.ts`.
- [ ] 4.2 GREEN: Create `app/_lib/queries/scenic.ts`, scenic admin CRUD, and accessible Spanish-first `app/escenico/**` rendering.
- [ ] 4.3 RED→GREEN: Add `e2e/cms-scenic.spec.ts` for route resolution, ordered published works, draft hiding, and invalid media rejection.

## Phase 5: R2 Hardening (Slice 5)
- [ ] 5.1 RED: Vitest tests for MIME/size/key checks, exact HEAD/stat rejection, auth, cleanup/manifest, and server-only credentials in `__tests__/cms-r2.test.ts`.
- [ ] 5.2 GREEN: Create `app/_lib/media/r2.ts` and `app/api/admin/media/**`; presign, verify, associate, clean failures, and update `next.config.ts`/CSP for the configured host.
- [ ] 5.3 RED→GREEN: Add `e2e/cms-r2.spec.ts` for authorized success and failure without broken references; run `npm run test:all` and `npm run build`.

## Review Workload Forecast

Chained PRs recommended: Yes
400-line budget risk: High
Estimated changed lines: 850
Decision needed before apply: No
Recommended work units / slices:
- Slice 1 / PR 1, base `feature/cms-admin`: export, migration, seed, auth; `npm run test -- cms-schema-auth`; runtime `supabase db reset` + Playwright auth; rollback export/migration/auth files.
- Slice 2 / PR 2, base PR 1: admin/art; `npm run test -- cms-art-admin`; runtime Playwright CRUD; rollback `app/admin/**` and art adapter changes.
- Slice 3 / PR 3, base PR 2: tattoo; focused tattoo Vitest + Playwright; rollback tattoo query/route changes.
- Slice 4 / PR 4, base PR 3: scenic; focused scenic Vitest + Playwright; rollback scenic table/route changes.
- Slice 5 / PR 5, base PR 4: R2; focused R2 Vitest + Playwright; rollback media API/config and manifest keys/R2 objects.
