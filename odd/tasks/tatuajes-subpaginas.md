# Tatuajes — subpáginas y reemplazo del asterisco

The five accessory pages of the tattoo section, imported from the approved bundle, plus the two
corrections the user asked for on top of them (message composer destination, and the asterisk that
becomes the brand mark). The cover already matches this bundle: `index.html` differs from the
previous one only in link destinations.

## Specs

S1 — Request (user, verbatim): "'/run/media/stefan/Nuevo vol/Proyectos/pajaroMacaWeb/refs/Tatuaje/PAJARO_MACA_TATUAJES_SUBPAGINAS' Estas son las subpaginas que deben ser tambien implementadas. con el nuevo dise;o." / "en la pagina contacto. hay un preparador de mensajey esta redise;ado para whatsapp. podriamos redirigirlo a instagram?" / "en este dise;o de tatuajes y sus subpaginas se utilizo mucho un asterisco como elemento visual. podemos cambiar ese asterisco por las versiones monocroma del logo? revisa en todas partes donde aparezca ese asterisco y reemplazalo por el logo"

S2 — Source of truth: `refs/Tatuaje/PAJARO_MACA_TATUAJES_SUBPAGINAS` — `index.html` (portada, already
implemented), `tatuajes/*/index.html` (five pages), `subpages.css`, `subpages.js`, `assets/`
(nine photographs, one of them new: `tattoo-detail.webp`).

S3 — Routes kept: `/tatuajes/portafolio`, `/tatuajes/disenos-disponibles`, `/tatuajes/sobre-mi`,
`/tatuajes/cuidados`, `/tatuajes/cotizar`. Real data wins: the CMS collections keep feeding the
portfolio and the designs catalogue, and the local collection stays the fallback.

S4 — One shell for the section: a single header (already shared) and a single footer. The landing
footer and the sub-page footer are the same component with the copy of each reference.

S5 — Cotizar keeps the reference's message composer (idea, placement, size → reviewable message),
the `diseno` and `variacion` query parameters, and the documented contact order. Instagram becomes
the first destination; it cannot receive prefilled text through a URL, so the composer offers the
message to copy before opening the profile's direct messages. WhatsApp keeps its prefill as the
second destination and the published email stays last.

S6 — Every decorative asterisk (`✳`) of the tattoo design becomes the monochrome mark from
`refs/PAJARO_MACA_LOGO_PACK/03-monochrome`: white silhouette on dark surfaces, dark silhouette on
the red footer, the red stamp and other filled surfaces. The mark is decorative (`alt=""`), so it
never adds noise to screen readers.

S7 — Interactions ported as client state with cleanup: portfolio filters and a viewer that walks
only the filtered pieces; catalogue availability filters and a design dialog that carries the
chosen piece into Cotizar; care-guide tabs with arrow keys and a print stylesheet that prints all
four stages; the composer that invalidates its own preview on edit; Escape and focus return on
every dialog; `prefers-reduced-motion` respected.

S8 — Styles stay scoped to the tattoo section and reuse `--tattoo-*`. No global selectors leak into
Arte or Escénico, and no page adds a second typographic system.

S9 — Content is the approved one: the reference's titles, categories, availability and care
instructions are used as given. The medical guidance of Cuidados is not rewritten.

## Tasks

| ID | Specs | Work | Route | Commit |
| --- | --- | --- | --- | --- |
| T1 | S4, S6, S8 | Shared shell: monochrome mark component, footer component, breadcrumb and page-intro, warm palette moved to the section wrapper, new photograph | inline | `refactor(tatuajes): one shell for the landing and the sub-pages` |
| T2 | S7 | Portafolio page: filters, gallery, viewer over the filtered set | delegated writer | see delivery |
| T3 | S7 | Diseños disponibles: availability filters, catalogue, design dialog with the quote parameters | delegated writer | see delivery |
| T4 | S7 | Sobre mí: artist story, studio data, philosophy, styles | inline | see delivery |
| T5 | S7 | Cuidados: guide index, four stages with tabs, signals, avoid list, print | inline | see delivery |
| T6 | S5, S7 | Cotizar: composer, message review, Instagram-first delivery | inline | see delivery |
| T7 | S6 | Replace every asterisk on the landing | inline | see delivery |
| T8 | S2-S9 | Unit coverage and the e2e of the five pages | inline | see delivery |
| T9 | S2 | Record the decisions | inline | see delivery |

## Log

L1 (user request, verbatim): see S1.

L2 (decision on the asterisk): the logo pack ships two monochrome silhouettes. The replacement
uses `pajaro-maca-silhouette-white.png` on dark surfaces and `pajaro-maca-silhouette-dark.png` on
the red footer, the red stamp and other filled surfaces. Both are 13-16 KB, so the decorative mark
is cheap enough to repeat. The `✳` stays nowhere in the tattoo section; the arte and escénico
sections keep theirs because this request is about the tattoo design only.

L3 (decision on the composer destination): Instagram's direct messages do not accept prefilled
text from a URL — only `https://ig.me/m/<user>` to open the conversation. So the composer keeps
building the message, shows it for review, offers a copy action, and then opens Instagram; the
visitor pastes. WhatsApp remains the one destination that accepts the prefill, and the email
remains last, exactly as the documented contact hierarchy.

L4 (decision on the palette): the warm palette the landing declared inside `.tatuajes-page-v2`
moves to the section wrapper in `app/(tattoo)/layout.tsx`, because the five sub-pages need it too.
Each page keeps its own stylesheet for its own layout.

L5 (routing): the five pages are independent units, so two of them were delegated to background
writers with disjoint edit surfaces while the shell and the other three pages were written inline.
The runtime refused to launch the second writer in parallel: every candidate surface under
`app/(tattoo)/...` was read as an extglob group, so it "overlapped" the live writer's paths. The
second page ran sequentially instead. Worth knowing for future parallel work in this repository:
route-group paths break the surface matcher.

L6 (data): the bundle carries the titles, styles and descriptors of the eight pieces, taken from the
artist's own reference. They now live in the local fallback collection (`title`, `style`, `tags`),
the CMS keeps winning when it has rows, and the portfolio filters are derived from that data with
the existing tested helpers. The landing captions and labels use the title; the descriptive alt
stays on the image for screen readers.

L7 (bug found by the e2e): the first run of the new suite failed on two details the unit tests
could not see — the landing still labelled pieces with their alt text after the collection gained
titles, and "Hablemos" matched both the header pill and the page CTA. Both fixed; the suite became
`12/12`.

L8 (checks, against a production build in the worktree on :3000): `tsc --noEmit` clean; eslint clean
on every touched path; unit suite 146/146 (26 files, was 133/23); `next build` green; the tattoo e2e
12/12. Screenshots reviewed at 1440x900 for the five pages, including the composer after submitting
and the care guide's stages.

## Delivery

| Slice | Content | Commit |
| --- | --- | --- |
| 1 | shared shell, monochrome mark, footer, warm palette on the section, collection metadata | `9dcd4da` |
| 2 | the five sub-pages, the composer and its tests | `40d8fcf` |
| 3 | caption fix found by the e2e | `2c23db1` |
| 4 | this record | see the closing report |
