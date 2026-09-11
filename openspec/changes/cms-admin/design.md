# Design: Custom CMS Admin

## Technical Approach

Keep domain tables and RLS; add the editorial contract (`sort_order`, `is_published`, stable media fields), not a polymorphic CMS. Public Server Components query published rows; `/admin` actions/handlers validate with Zod, recheck the user, and perform narrow service-role writes. `/admin` stays Spanish-first and outside `(art)` and `(tattoo)`.

## Architecture Decisions

| Decision | Alternatives / rationale |
|---|---|
| Reconcile schema first, then CRUD | Additive migration and mapping are safer than rewriting the paused database; `supabase db reset` is a gate. |
| Domain tables with shared curation columns | A polymorphic JSON table weakens relations and validation; duplicated mini-CMS modules duplicate security. |
| SSR cookie clients + middleware refresh; `getUser()` allowlist guard | `getSession()` trusts cookies; service-role bypasses RLS and is not authorization. Every operation rechecks identity. |
| R2 presigned upload, then server association | Short-lived signed URLs keep credentials server-only and avoid proxy body pressure; no media library. |

## Data Flow

Schema reconciliation: export → map columns → migrate → import mapped rows → `supabase db reset` and contract tests. Add `sort_order`/`is_published`; add `icon_name`, `location`, `thumbnail_path`; map `about_sections`; seed tattoo categories before styles. Replace affected anon policies using `USING (true)` with `USING (is_published = true)` on `artworks`, `tattoos`, `exhibitions`, and `scenic_works` (or equivalent). Backfill flags first; verify anon cannot read drafts while admin can.

Auth:
```text
Browser → middleware(createServerClient, refresh cookies) → /admin
       → server guard(getUser + allowlist) → admin read/write
       → getSupabaseAdmin() → Supabase (service key never client-side)
```

Media:
```text
Admin form → authorize + validate MIME/size → signed PUT URL → R2
           → server HEAD/stat verifies exact key exists, byte size and content-type → domain UPDATE → published delivery URL
           └─ association failure → delete object (or cleanup manifest)
```

## File Changes

| File | Action | Description |
|---|---|---|
| `supabase/migrations/*_cms_admin.sql` | Create | Columns, scenic table, constraints/indexes, RLS policies. |
| `supabase/seed.sql` | Modify | Match exact schema, category-first tattoo seeds, deterministic IDs/order. |
| `app/_lib/supabase/{server,auth,admin}.ts`, `middleware.ts` | Create/modify | SSR cookies, allowlist, trusted client. |
| `app/_lib/queries/{artworks,tattoos,scenic}.ts` | Create/modify | Published/order queries and DB-backed art. |
| `app/admin/**` | Create | Shell, login, dashboard, forms/actions. |
| `app/(art)/arte/galeria/**`, `app/(tattoo)/tatuajes/**`, `app/escenico/**` | Modify/create | DB rendering, fallback, scenic route. |
| `app/_lib/media/r2.ts`, `app/api/admin/media/**` | Create | Presign, verify, association, cleanup. |
| `next.config.ts`, `__tests__/**`, `e2e/**` | Modify | R2 allowlist/CSP and TDD coverage. |

## Interfaces / Contracts

```ts
type Curation = { sort_order: number; is_published: boolean };
type MediaRef = { media_key: string; media_url: string; thumbnail_path?: string | null };
type ScenicWork = Curation & MediaRef & {
  title: string; slug: string; description: string | null;
  media_kind: "image" | "video"; poster_url: string | null;
  is_featured: boolean; year: number | null; project_label: string | null;
};
```

R2 keys are `{domain}/{record-id-or-uuid}/{slug}-{random}.{ext}`. Validate MIME/size before presigning and server `HEAD`/stat the exact key before writing: require existence, max bytes, and allowlisted `Content-Type`. Persist only after success. Delete failed uploads, or record key/reason/time in a bounded manifest; scheduled cleanup reconciles aged and never-associated keys. Extend `next.config.ts`/CSP only for the configured hostname.

Tattoo queries are DB-first; local `designs.ts` is returned on query error or empty import, and Instagram remains optional/non-authoritative.

## Testing Strategy

Strict RED-GREEN tests accompany each slice: Vitest for schema/seed, anon RLS visibility, admin draft reads, Zod/guards, query filtering, fallback, key validation, R2 HEAD/stat rejection, orphan reconciliation, and authorization; Playwright Chrome for login denial/allowlist, CRUD visibility, `/escenico`, and upload failure/success. Run `npm run test` per slice and `npm run test:all` plus build at verification.

## Threat Matrix

All matrix rows are `N/A`: no documentation execution, Git selection, commit/push, or PR command boundary; routing/auth/media use the auth/upload RED tests above.

## Migration / Rollout

Five chained review slices: (1) schema/export/auth; (2) admin shell + art; (3) tattoo; (4) scenic; (5) R2 hardening. Each is revertible by restoring the export/migration, removing admin routes, restoring public adapters, hiding scenic, or deleting manifest keys/R2 objects. Before migration, export data, reconcile live columns, backfill flags, replace anon policies, import through staging, retain rollback data, and validate anon/admin policy behavior; never reset production.

## Open Questions

- [ ] Confirm allowlisted artist email/user ID, live schema export, R2 account/bucket, delivery hostname, and MIME/size limits before apply.

## Ponytail Review

`Section "Architecture": cut: generic media library, polymorphic content, roles, versioning, and approval workflow. Keep domain tables, one artist guard, and one narrow upload association.`

**Next step / handoff**: Proceed to `sdd-tasks` after confirming the live Supabase data/schema, artist allowlist email or user ID, R2 delivery hostname, and upload MIME/size limits; these are the only open questions blocking task planning.
