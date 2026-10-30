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
| T1 | S1, S3 | inline | e2e RED for the page and the detail route |
| T2 | S1, S5-S8 | inline | typed content module from docs/Escenico.md |
| T3 | S5-S8 | inline | unit tests turning the editorial rules into assertions |
| T4 | S2, S10 | inline | scenic route group, layout, accent token, image placeholder |
| T5 | S1, S3 | inline | `/escenico` page sections |
| T6 | S3, S9 | inline | `/escenico/[slug]` detail route with metadata |
| T7 | S1-S10 | inline | final checks: typecheck, lint, unit, e2e, build |

## Log

L1 (user request, verbatim): "3. respecto al handoff y al Escenico.md. ese archivo tiene la informacion que vamos a mostrar en la pagina de escenico. quiero construir la pagina de escenico que aun no esta construida. es posible sacar como referencia este archivo y construir una pag a partir de ahi?"

L2 (user decisions, in order): images → "Construí con placeholders y enchufamos después"; scope → "Página + /escenico/[slug] por obra"; premiere → "Ya se estrenó".

L3 (state at start): `app/escenico/page.tsx` exists (26 lines, CMS slice 4): a minimal `scenic_works` grid with a "Pronto compartiré nuevas obras escénicas" empty state, hardcoded hex colours, no layout of its own, and no `--scenic-accent` token. The route answers 200; the page is not built. Production `scenic_works` has 0 rows.
