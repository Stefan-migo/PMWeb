# Tatuajes — finalización

User asked to finish the tattoo side: "hay cosas visuales, cosas de frontend principalmente". No
photographs: the portfolio must be ready for content to arrive through `/admin`.

This file tracks the defects found by a read-only audit of the six tattoo routes, and what is
fixed versus what still needs a product decision.

## Specs

S1 — Request (user, verbatim): "por ahora continuaremos con la finalizacion de la pagina tatuajes" and "si un poco de todas la verdad. hay cosas visuales, cosas de frontend principalmente."

S2 — Material (user decision, verbatim): "Sin fotos: dejá todo listo para cargar después". Nothing may depend on photographs that do not exist; real work arrives through the CMS.

S3 — No fabricated content. Style metadata, availability and descriptions of her work cannot be invented to make a filter or an empty state look full.

S4 — The tattoo section keeps its own identity: `--tattoo-*` tokens and `--font-display`, never raw hex or a literal family name.

S5 — Every control that renders must do something. No decorative tabs, fake toggles or links that lead nowhere.

S6 — Existing behaviour keeps working: the portfolio grid, the lightbox, and the WhatsApp and Instagram CTAs on `/tatuajes/cotizar` and `/tatuajes/cuidados`.

## Audit (read-only, verified from code)

| # | Location | Defect |
| --- | --- | --- |
| A1 | `tatuajes/portafolio/page.tsx:36-43` | Filter tabs are decorative: hardcoded `styles`, no state, no filtering, `aria-selected` fixed on "Todos". And the records have no style, so there was nothing to filter by. |
| A2 | `tatuajes/cotizar/page.tsx` | There is no quote form at all. `/api/quote` exists with Zod validation, a honeypot and a passing unit test, and no component consumes it. |
| B1 | `(tattoo)/layout.tsx` | 23 raw hex values instead of `--tattoo-*`; nav and footer use `var(--font-space-grotesk)` instead of `--font-display`. |
| B2 | `tatuajes/sobre-mi/page.tsx` | 11 raw hex values. |
| B3 | `tatuajes/portafolio/page.tsx` | 4 raw hex values plus a literal font family. |
| B4 | `tatuajes/disenos-disponibles/page.tsx` | 1 raw hex value. |
| B5 | `(tattoo)/layout.tsx:61` | Instagram link hovers to `#78716c` (the *art* muted colour) instead of `#f5f5f5` like its siblings: on a dark background the label gets darker on hover. |
| C1 | `_lib/queries/tattoos.ts:82` | `getAvailableDesigns()` decides "we are on the fallback" by sniffing `records[0].id.startsWith("local-")`: depends on query order. |
| C2 | `cotizar:40`, `cuidados:18` | `NEXT_PUBLIC_WHATSAPP_NUMBER \|\| "56912345678"` duplicated: a missing env renders a fake number. CI does not set that variable, so the fallback is load-bearing there. |
| C3 | `public/design/tattoo/Layer *.png` | Each source image is ~3 MB of PNG (20 MB for the page). Two tiles were still blank 1.2s after load because of it. |

## Tasks

| ID | Specs | Defect | Status |
| --- | --- | --- | --- |
| T1 | S4 | B1, B2, B3, B4, B5 — tokens and font variables | done (c19e8b7) |
| T2 | S3, S5 | A1 — real, data-driven filters | done (48a09ad) |
| T3 | S2 | C1 — source-aware fallback detection | done (48a09ad) |
| T4 | S6 | C2 — one WhatsApp helper, same behaviour | done (c19e8b7) |
| T5 | S1-S6 | tests: unit for the filter helpers and the source detection, e2e for the portfolio | done (48a09ad) |
| T6 | S1 | A2 — the quote form | resolved by decision: WhatsApp only, API retired (see L9) |
| T7 | S2 | C3 — 3 MB source images per piece | new, not fixed |

## Delivery

| Slice | Content | Commit |
| --- | --- | --- |
| 1 | tokens, font variables, WhatsApp helper (S4, S6) | c19e8b7 |
| 2 | real data-driven filters, source-aware fallback, tests (S3, S5, S2) | 48a09ad |
| 3 | audit record and the bug the screenshot caught | 842ea7b |
| 4 | retire the unused quote API (S1, decision L9) | 8260052 |

721 authored lines across four commits, past the ~400-line guidance. The slices are
independent by concern (design tokens, portfolio behaviour, delivery record, dead code), so
deliver them as chained PRs if this is reviewed rather than merged directly.

## Log

L1 (user request, verbatim): "por ahora continuaremos con la finalizacion de la pagina tatuajes" / "si un poco de todas la verdad. hay cosas visuales, cosas de frontend principalmente." / material: "Sin fotos: dejá todo listo para cargar después".

L2 (audit method): the delegated read-only explorer failed ("assistant reported an error") and this runtime exposes no native Agent tool, so the audit was done inline with targeted greps. It is evidence-based: every row above points at a file and line.

L3 (decision on A1): the filter options will be derived from the data instead of the hardcoded list. With no style metadata anywhere (today's local fallback) the control does not render, because inventing styles for her pieces would violate S3. It appears on its own as soon as works are loaded with a style through `/admin`.

L4 (decision on A2): not built. A quote form is new product surface (fields, success and error flow), not a defect fix; it needs the artist's decision. Recorded as blocked, not silently skipped.

L5 (risk on C2): removing the hardcoded WhatsApp fallback would break the existing e2e assertion on `/tatuajes/cotizar` because CI does not provide `NEXT_PUBLIC_WHATSAPP_NUMBER`. The helper keeps the same behaviour and the dependency on CI is recorded instead of changed.

L6 (bug found by looking, not by testing): extracting the gallery into `PortfolioGallery` dropped the grid container, so the eight buttons rendered with zero size and the page showed an empty area. The e2e test passed because it counted buttons instead of asserting visibility. Caught by taking a screenshot and reading it; the test now asserts the first button is visible. Lesson: a count is not a render.

L7 (C3, observed): two tiles were blank 1.2s after load. The files exist and answer 200; they are ~3 MB each. Recorded as a performance defect, not fixed: the real photographs will replace them.

L9 (user decision, quote form): "Solo WhatsApp: borro la API huérfana". `/api/quote` and its duplicated schema test are deleted. The `quote_requests` table is left in place: its migration is applied in production and dropping a table is destructive, so that belongs to a separate explicit step.

L10 (flake, again): after the deletion, a full-suite run failed two click-navigation tests while taking 3.6m instead of ~30s, with `rm -rf .next` and the build in the same command chain. `e2e/tatuajes.spec.ts` then passed 8/8 twice in a row (13.4s and 12.4s) with the disk idle. Same known flake, not a regression from the deletion.

L8 (checks): `tsc --noEmit` clean, eslint clean on every touched path, unit suite 65/65 (13 files, was 53), `npm run build` green, `e2e/tatuajes.spec.ts` 8/8 and `e2e/landing.spec.ts` 3/3 in CI mode against the production build.
