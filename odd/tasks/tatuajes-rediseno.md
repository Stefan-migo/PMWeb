# Tatuajes — rediseño de la landing

Approved redesign of the `/tatuajes` landing, imported from the design bundle the user shared.
The bundle is independent HTML/CSS/JS; the deliverable is the same design expressed as Next.js
components, with the routes and business logic of this repository intact.

## Specs

S1 — Request (user, verbatim): "en esta carpeta hay una reversion del dise;o de la pagina tatuajes. necesito que lo revises y que implementes el redise;o que se propone en el directorio compartido"

S2 — Source of truth: `refs/Tatuaje/PAJARO_MACA_TATUAJES_COMPLETO/index.html`, `style.css`,
`script.js` and `assets/`. This is the "versión aprobada con el hero simplificado" the bundle
README names (commit `7271dbf01f09420e69d14b3ee08194c30ab90d48`).

S3 — Elements that must survive the conversion (from `INTEGRACION.md`): a full-bleed
photographic hero with **no visible title, paragraph or central CTA**; the "Cotizar ↗" button at
the bottom-left of the hero, anchored to `#cotizar`; the carousel controls at the right with a
pause control; dark identity with red accents; the asymmetric gallery plus a viewer for the eight
works; the existing sections and their copy.

S4 — Routes and behaviour preserved: `/tatuajes/portafolio`, `/tatuajes/disenos-disponibles`,
`/tatuajes/cotizar`, `/tatuajes/cuidados`, `/tatuajes/sobre-mi`. The quote page keeps its contact
hierarchy (Instagram → WhatsApp → email, no form), the portfolio keeps the `portfolioImages`
prop fed by the CMS with the local collection as fallback, and no business logic changes.

S5 — Implementation follows repository conventions: `--tattoo-*` tokens and `--font-sans` /
`--font-serif` instead of the bundle's literal hex values and the external DM Sans/Georgia
`@import`; styles scoped under `.tatuajes-page-v2` (no global `body`, `h2`, `footer` rules);
`class` → `className`, `next/image`, metadata through the Next.js metadata API.

S6 — Interactions are client state with cleanup: carousel auto-advance with dots, index, pause and
document-visibility pause; mobile menu; "Ver más" expansion; lightbox with previous/next,
ArrowLeft/ArrowRight, Escape and focus return; `prefers-reduced-motion` honoured (carousel starts
paused and nothing animates).

S7 — The eight bundled photographs replace the ~3 MB PNG fallback set (`Layer 1..8.png`, 20 MB per
page; defect C3/T7 in `odd/tasks/tatuajes-finalizacion.md`). One collection feeds every tattoo
surface that reads `portfolioImages`.

S8 — The approved header is part of the redesign: wordmark `pájaro maca` + `ARTE EN LA PIEL`,
section navigation, and the "Hablemos ↗" pill. It stays a single shared header for the whole
section (S6 of `tatuajes-finalizacion.md`), so on a section page its labels open that page.

## Tasks

| ID | Specs | Work | Route | Commit |
| --- | --- | --- | --- | --- |
| T1 | S8 | Shared header with wordmark, approved nav and the "Hablemos" pill | inline | `feat(tatuajes): put the approved header in front of the section` |
| T2 | S3, S5, S6 | Landing rewrite: hero, intro line, gallery + "Ver más", designs, about, quote, care, red footer | inline | `feat(tatuajes): rebuild the landing on the approved design` |
| T3 | S6 | Lightbox viewer for the eight works | inline | same slice as T2 |
| T4 | S7 | Bundle photographs as the fallback collection | inline | `chore(tatuajes): replace the 20 MB fallback images with the bundled set` |
| T5 | S3-S6 | Unit coverage for the landing and the header | inline | with T2 |
| T6 | S3-S6 | E2E for hero, gallery, viewer and mobile menu | inline | with T2 |
| T7 | S2 | Record the design decisions and the mapped palette | inline | `docs(tatuajes): record the landing redesign` |

## Log

L1 (user request, verbatim): "en esta carpeta hay una reversion del dise;o de la pagina tatuajes. necesito que lo revises y que implementes el redise;o que se propone en el directorio compartido"

L2 (state found): branch `feat/arte-identidad` had uncommitted work from an earlier session — the
shared `TattooHeader` extraction and the contact hierarchy on `/tatuajes/cotizar`, with passing
unit tests (100/100). It is kept and committed as its own slice instead of being reverted; S8
builds on it.

L3 (decision on the palette): the bundle's literal values (`#111110`, `#edece5`, `#d35849`,
`#252522`, `#d25748`) are declared as `--tattoo-*` overrides **inside `.tatuajes-page-v2`**, so the
landing gets the approved warm palette while `/tatuajes/portafolio`, `/disenos-disponibles`,
`/cotizar` and the rest keep the current tokens. Two tokens that the token set lacked are added to
`app/globals.css`: `--tattoo-panel` (the quote panel) and `--tattoo-footer-bg` (the red footer).

L4 (decision on the fonts): the bundle loads DM Sans plus Georgia for the italic accent, and its
`style.css` is a page-global sheet. The conversion keeps the project's own families — Inter for
sans (`--font-sans`) and Cormorant Garamond for the italic accent (`--font-serif`) — so the landing
adds no external font request and no second typographic system to the site.

L5 (decision on content): captions come from the real `alt` of each photograph plus its index
(`01 / TATUAJE`). No style labels ("COLOR", "BOTÁNICO", "FIGURATIVO") are invented for the
gallery, per S3 of `tatuajes-finalizacion.md`: the CMS carries no style metadata today.

L6 (decision on the fallback images): the bundled WebP set replaces `Layer 1..8.png` in
`app/_lib/tattoo/designs.ts`, and the PNGs are removed from `public/`. They remain in git history;
leaving 20 MB of unreferenced PNGs in `public/` would keep shipping them to every visitor.

L6b (bug found by looking, not by testing): the first render put the section layout classes on
`Reveal`'s **outer** div. `Reveal` wraps its children in a `motion.div`, so the class that was
supposed to lay out two columns ended up on a container with a single child: the portfolio heading
stacked instead of sitting beside its aside, and the quote steps rendered as three columns instead
of three rows. Fixed by keeping the layout class on an inner element and giving the body
paragraphs an explicit `__body-text` class instead of `:last-of-type` chains. Lesson: a wrapper
component owns its wrapper; never hang a grid or flex container on it.

L7 (checks, against a production build on :3100): `tsc --noEmit` clean; eslint clean on every
touched path; unit suite 112/112 (21 files, was 100/19); `npm run build` green;
`e2e/tatuajes.spec.ts` 11/11 (was 9, +2 for the hero and the viewer). Screenshots at 1440x900 and
390x844 reviewed section by section.

L8 (concurrent work in the same worktree): while this was running, another session added the site
icons work (`app/_lib/site-icons.ts`, `__tests__/site-icons.test.ts`, `public/favicon.ico`,
`public/android-chrome-192x192.png`, `app/layout.tsx`, `e2e/landing.spec.ts`). Those files are
**not** part of this feature and were left unstaged. The build that validated the redesign
included them; they are metadata and viewport only, so they do not change the landing's rendering.

L9 (delivery): the redesign is one page, so it lands as one code slice; the review split is a
chained PR over the header, the interactive pieces and the page composition if it is reviewed
rather than merged.

## Delivery

| Slice | Content | Commit |
| --- | --- | --- |
| 0 | shared header and contact hierarchy found in the tree | `2f8ce9f` |
| 1 | the bundled photographs replace the 20 MB PNG fallback | `810e204` |
| 2 | landing redesign, header, viewer, tests | `a85ce58` |
| 3 | this record and the DESIGN.md palette | `ff2c0d3` |
