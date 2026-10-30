# Escénico page

Build the public `/escenico` portfolio from `docs/Escenico.md`. That document is the only content
source; every string on the page comes from it verbatim. Images are placeholders until the artist
provides the PDF's photographs.

## Specs

S1 — Request (user, verbatim): "quiero construir la pagina de escenico que aun no esta construida. es posible sacar como referencia este archivo y construir una pag a partir de ahi?" and "ese archivo tiene la informacion que vamos a mostrar en la pagina de escenico."

S2 — Images (user decision, verbatim): "Construí con placeholders y enchufamos después". Every missing photograph renders an explicit labelled placeholder naming its page in the source PDF. No stock or Wikimedia image stands in for her stage work.

S3 — Scope (user decision, verbatim): "Página + /escenico/[slug] por obra". One scroll page plus one detail route per work.

S4 — Premiere status (user decision, verbatim): "Ya se estrenó". "El final de mi carrera" is published as premiered; it must never read "próximo estreno".

S5 — (docs/Escenico.md §1.3) "No inventar formación, premios, funciones, fechas, créditos, enlaces ni detalles de obras ausentes del PDF."

S6 — (docs/Escenico.md §1.4) "Mantener separados los roles de dirección artística y coreografía, dirección de arte, interpretación y diseño de vestuario."

S7 — (docs/Escenico.md §1.5) "No atribuir a Macarena la dirección artística o coreográfica de una obra cuando el crédito corresponda a otra persona."

S8 — (docs/Escenico.md §1.6) "Consultar las observaciones de la sección 9 antes de producir una biografía actualizada, un CV, una web o material de difusión."

S9 — The page renders from its own content module; the `scenic_works` table is empty in production and a query error must degrade to an empty gallery, never a 500.

S10 — Scenic identity keeps its own accent token (`--scenic-accent`) instead of borrowing `--color-warning`, closing the TODO left by the landing blocks.

## Tasks

| ID | Specs | Route | Commit |
| --- | --- | --- | --- |
| T1 | S1, S3 | inline | aadb53b (e2e RED first, 5/5 failing) |
| T2 | S1, S5-S8 | inline | fb801d0 |
| T3 | S5-S8 | inline | fb801d0 |
| T4 | S2, S10 | inline | cefbbef |
| T5 | S1, S3 | inline | aadb53b |
| T6 | S3, S9 | inline | aadb53b |
| T7 | S1-S10 | inline | pending: clean full e2e run |

## Delivery

| Slice | Content | Commit |
| --- | --- | --- |
| 1 | home page renders the distinct-font landing variant | 36597d2 |
| 2 | source document, content module, editorial-rule tests | fb801d0 |
| 3 | scenic tokens, route-group layout, image placeholder, DESIGN.md | cefbbef |
| 4 | `/escenico` page, `/escenico/[slug]` detail route, e2e | aadb53b |

Slice 2 is the largest (~800 authored lines). The source document and the content module are
data, not logic, but they stay one slice because the tests only mean something next to the data
they assert. Deliver as chained PRs on these boundaries.

## Log

L1 (user request, verbatim): "3. respecto al handoff y al Escenico.md. ese archivo tiene la informacion que vamos a mostrar en la pagina de escenico. quiero construir la pagina de escenico que aun no esta construida. es posible sacar como referencia este archivo y construir una pag a partir de ahi?"

L2 (user decisions, in order): images → "Construí con placeholders y enchufamos después"; scope → "Página + /escenico/[slug] por obra"; premiere → "Ya se estrenó".

L3 (state at start): `app/escenico/page.tsx` exists (26 lines, CMS slice 4): a minimal `scenic_works` grid with a "Pronto compartiré nuevas obras escénicas" empty state, hardcoded hex colours, no layout of its own, and no `--scenic-accent` token. The route answers 200; the page is not built. Production `scenic_works` has 0 rows.

L4 (evidence): e2e RED before implementing — 5/5 new specs failed on the missing sections and routes. After implementing: 5/5 passed. Unit suite 53/53 (was 42). Full e2e 24 passed / 1 failed / 5 skipped, where the failure was `tatuajes › should navigate to cuidados`; a clean `.next` run then passed 30/30 with the same durations as `origin/main` (40.0s vs 40.1s on the tattoo spec), so it was the known Turbopack cache artifact, not a regression. Verified by running that spec on `origin/main` and on this branch under identical conditions.

L5 (decision): the media gallery still reads `scenic_works` but degrades to an empty list on query failure (`getScenicWorks().catch(() => [])`). Production has 0 rows today and the page must not 500 because of it.

L6 (pending): images. Every photograph is an explicit placeholder naming what it should be. Pending: cover, portrait, art-direction photo, 8 stage photographs, contact photo, and one image per work. The landing blocks still use `--color-warning` for the scenic accent; switching them to `--scenic-accent` is a separate visual decision.
