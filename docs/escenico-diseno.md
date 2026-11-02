# Escénico — rediseño desde el paquete de referencia

El portafolio escénico usa la propuesta de `refs/pajaro-maca-escenico` portada a
Next.js. Este documento registra los valores visuales y las decisiones de
integración que no viven en el código.

## Alcance visual

- Fondo `#161410`; texto `#eee8dc`; líneas en blanco translúcido (`#ffffff1e`,
  `#ffffff24`).
- Acento dorado: `#c8b38b` (botón), `#ddbd83` (hover y foco), `#c3b08b`
  (cursivas), `#b9a47b` (selección).
- Superficies: `#211d17` (imagen), `#1c1813` (diálogo), `#12100e` (visor),
  `#242019` (contacto).
- Composición: hero fotográfico a pantalla completa (seis imágenes, sin título
  ni CTA superpuestos), header flotante con navegación en píldora, obras en una
  ficha grande más dos fichas en grilla, «Mi mirada» en dos columnas,
  escenarios internacionales, galería de ocho fotografías, trayectoria
  desplegable y cierre de contacto.
- El `h1` del hero es solo para lectores de pantalla («Pájaro Maca · Artes
  escénicas»); el contenido visible empieza en las obras.

## Tipografía

Las tres fuentes vienen del paquete y se cargan con `next/font/local` en
`app/(scenic)/escenico/layout.tsx`:

| Variable | Archivo | Uso |
| --- | --- | --- |
| `--font-escenico-editorial` | `fonts/editorial-regular.otf`, `fonts/editorial-italic.otf` | Títulos, wordmark, citas |
| `--font-escenico-sans` | `fonts/sans-regular.otf` | Cuerpo, etiquetas, navegación |

La licencia viaja junto a los archivos en `app/(scenic)/escenico/fonts/FONT-LICENSE.txt`
y en `public/escenico/assets/FONT-LICENSE.txt`.

## Marca

- El logo sale del `PAJARO_MACA_LOGO_PACK` (`02-lockups/pajaro-maca-horizontal-on-dark`),
  recortado y optimizado a `public/escenico/assets/pajaro-maca-logo.webp`.
- Se usa en el header (72 px, 54 px con scroll, 52 px en móvil) y en el footer
  (46 px), sobre el fondo oscuro.
- No se modificó el favicon, `app/favicon.ico` ni los metadatos de iconos: esa
  pieza pertenece al trabajo de arte que se mergea en `main`.
- El último ítem de la navegación es «Más», que vuelve a `/` (la selección de
  las tres páginas), y conserva el separador visual del ítem anterior.

## Aislamiento

- Todos los estilos viven en `app/(scenic)/escenico/escenico.module.css`, con
  clases locales bajo `.shell`. No se modificaron los tokens `--scenic-*` de
  `app/globals.css` para no alterar la tarjeta Escénico de la portada.
- Los tokens de la sección son locales a `.shell` (`--es-bg`, `--es-gold`,
  `--es-muted`, etc.).
- El único efecto sobre el documento es el bloqueo de scroll mientras hay un
  diálogo abierto, aplicado y restaurado por React.

## Recursos

- Fotografías y PDF: `public/escenico/assets/`, incluidas las seis del hero.
- Rutas públicas: `/escenico/assets/<archivo>`.
- El paquete de referencia no se copia como HTML/CSS/JS: la composición se
  reimplementó con componentes de React y las interacciones con estado nativo.

## Interacciones

- Header fijo que se compacta y opaca al pasar los 40px de scroll.
- Menú móvil con `aria-expanded`, cierre con Escape y retorno del foco.
- Ficha de obra en `<dialog>` nativo: foco devuelto al disparador, cierre con
  Escape, clic fuera y bloqueo de scroll.
- Visor de fotografías con flechas del teclado, contador y cierre con Escape.
- Las fichas de obra se enlazan con `/escenico/[slug]`; las tres obras
  secundarias también conservan su ruta.
- La galería de escena suma las imágenes publicadas por el CMS
  (`scenic_works`) cuando existen.

## Hero y movimiento

- Carrusel de seis fotografías (`escena-hero-01..06.webp`), 7.5s por imagen,
  con traspaso en fundido y zoom lento; encuadre distinto en escritorio y móvil.
- Controles: pausa/reanudar con `aria-pressed`, miniaturas con `aria-current` y
  barra de progreso, anterior/siguiente, flechas del teclado y swipe en móvil.
- El carrusel se pausa con un diálogo abierto, el menú móvil abierto, la pestaña
  oculta o el hero fuera de vista. En `prefers-reduced-motion` inicia pausado.
- Visor de foto completa en `<dialog>` a pantalla completa, con Escape y retorno
  del foco al botón de expansión.
- Entradas progresivas por sección con Web Animations e `IntersectionObserver`:
  una sola reproducción, escalonado de 85ms y contenido visible si no hay JS.
  Se omiten con `prefers-reduced-motion`.
