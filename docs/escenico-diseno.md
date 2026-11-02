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
- Composición: hero a pantalla completa con la fotografía a la derecha, obras en
  una ficha grande más dos fichas en grilla, «Mi mirada» en dos columnas,
  escenarios internacionales, galería de ocho fotografías, trayectoria
  desplegable y cierre de contacto.

## Tipografía

Las tres fuentes vienen del paquete y se cargan con `next/font/local` en
`app/(scenic)/escenico/layout.tsx`:

| Variable | Archivo | Uso |
| --- | --- | --- |
| `--font-escenico-editorial` | `fonts/editorial-regular.otf`, `fonts/editorial-italic.otf` | Títulos, wordmark, citas |
| `--font-escenico-sans` | `fonts/sans-regular.otf` | Cuerpo, etiquetas, navegación |

La licencia viaja junto a los archivos en `app/(scenic)/escenico/fonts/FONT-LICENSE.txt`
y en `public/escenico/assets/FONT-LICENSE.txt`.

## Aislamiento

- Todos los estilos viven en `app/(scenic)/escenico/escenico.module.css`, con
  clases locales bajo `.shell`. No se modificaron los tokens `--scenic-*` de
  `app/globals.css` para no alterar la tarjeta Escénico de la portada.
- Los tokens de la sección son locales a `.shell` (`--es-bg`, `--es-gold`,
  `--es-muted`, etc.).
- El único efecto sobre el documento es el bloqueo de scroll mientras hay un
  diálogo abierto, aplicado y restaurado por React.

## Recursos

- Fotografías y PDF: `public/escenico/assets/`.
- Rutas públicas: `/escenico/assets/<archivo>`.
- El paquete de referencia no se copia como HTML/CSS/JS: la composición se
  reimplementó con componentes de React y las interacciones con estado nativo.

## Interacciones

- Menú móvil con `aria-expanded`, cierre con Escape y retorno del foco.
- Ficha de obra en `<dialog>` nativo: foco devuelto al disparador, cierre con
  Escape, clic fuera y bloqueo de scroll.
- Visor de fotografías con flechas del teclado, contador y cierre con Escape.
- Las fichas de obra se enlazan con `/escenico/[slug]`; las tres obras
  secundarias también conservan su ruta.
- La galería de escena suma las imágenes publicadas por el CMS
  (`scenic_works`) cuando existen.
