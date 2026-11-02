# Escénico — rediseño desde el paquete de referencia

Reemplaza el diseño actual de `/escenico` por la propuesta HTML/CSS/JS de `refs/pajaro-maca-escenico`, portada a Next.js con estilos aislados, interacciones nativas del framework y los recursos locales.

## Specs

- **S1** — Pedido del usuario, literal: «he creado esta version de la pagina escenico. necesito que utilicemos esta version. adaptemos el dise;o actual por este.»
- **S2** — Instrucción de integración del paquete, literal: «Conserva la composición visual, la paleta, las fotografías, el contenido y los créditos. Aísla los estilos para evitar cambios en otras páginas. Migra las interacciones de fichas, galería y menú a los patrones del framework. Ajusta las rutas de recursos y el enlace a la página principal. Verifica escritorio y móvil y ejecuta los controles pertinentes del repositorio.»
- **S3** — Conservar, literal: «las fichas de las tres obras, sus créditos, las galerías, la trayectoria desplegable, los enlaces de contacto y la descarga del PDF.»
- **S4** — Verificar, literal: «móvil y escritorio, navegación por teclado, cierre con Escape, bloqueo de scroll y retorno del foco al cerrar los diálogos.»
- **S5** — Conservar lo que no se rediseña: las rutas `/escenico` y `/escenico/[slug]`, los datos verificados de `app/_lib/scenic/content.ts` (créditos y fechas sin invención) y la galería opcional de `scenic_works` publicada por el CMS.

## Tasks

- [x] T1 — Recursos locales (imágenes, tipografías con licencia, PDF) y modelo de datos de presentación (`app/_lib/scenic/portfolio.ts`). (S2, S3) · `b61908a`
- [x] T2 — Layout escénico: tipografías locales, header con menú móvil accesible, footer y shell aislado. (S2, S4) · `d7c7439`
- [x] T3 — Portada: hero, obras seleccionadas, otras obras y «Mi mirada» en el nuevo lenguaje visual. (S2, S3) · `df9a988`
- [x] T4 — Escenarios, galería de escena, trayectoria desplegable y contacto; fusión de la galería del CMS. (S2, S3, S5) · `df9a988`
- [x] T5 — Diálogos de ficha de obra y visor de fotografías (teclado, Escape, scroll lock, retorno de foco). (S3, S4) · `df9a988`
- [x] T6 — Fichas `/escenico/[slug]` y metadatos con el nuevo lenguaje visual; enlaces desde la portada. (S5) · commit final
- [x] T7 — Tests unitarios de la portada/interacciones y actualización de `e2e/escenico.spec.ts` al nuevo diseño. (S4, S5) · commit final
- [x] T8 — Documentación: `docs/escenico-diseno.md` (paleta, tipografía, aislamiento y recursos). (S2) · commit final
- [ ] T9 — Controles: typecheck, lint, unit, build y e2e del recorrido escénico. (S2, S4, S5) · commit 5

## Log

- L1 — Pedido original, literal: «'/run/media/stefan/Nuevo vol/Proyectos/pajaroMacaWeb/refs/pajaro-maca-escenico' hey chat. he creado esta version de la pagina escenico. necesito que utilicemos esta version. adaptemos el dise;o actual por este.»
- L2 — El paquete de referencia incluye `index.html`, `style.css`, `script.js`, fotografías WebP extraídas del PDF, tres tipografías OTF con su licencia y el portafolio PDF. No tiene build ni framework.
- L3 — Línea base verificada: `main` en `5055adc`, typecheck limpio, 70/70 tests unitarios. El árbol trae cambios sin commitear de la tanda de tatuajes; esta feature no los toca y no los commitea.
- L4 — `DESIGN.md` quedó sin modificar: los hunks sin commitear que había en ese archivo eran de una tanda anterior de tatuajes (confirmado por la otra sesión), no de la feature de arte ni de esta; no se stagearon. La documentación del rediseño se registra en `docs/escenico-diseno.md`.
- L5 — También había trabajo de la sección de arte (`app/_lib/arte/`, `public/design/arte/`, `odd/tasks/arte-identidad.md`) y una tanda previa de tatuajes en el árbol; esta feature no stageó ni commiteó ninguno de esos archivos.
- L6 — Otra sesión activa cambió la worktree compartida a `feat/arte-identidad` y commiteó allí la identidad de arte. Mi primer commit quedó en esa rama por accidente; lo moví a `feat/escenico-rediseno` (`b61908a`) sin tocar los 5 commits de arte y restauré `feat/arte-identidad` a `e12927b`. Los cortes restantes se commitean a la rama de la feature con un índice temporal, para no volver a cambiar la worktree compartida.
- L7 — Evidencia de cierre: `npm run typecheck` y `eslint` sobre los archivos de la feature sin errores; 17 archivos / 86 tests unitarios; `npm run build` con 26 rutas; `e2e/escenico.spec.ts` 9/9. La revisión visual se hizo con capturas de escritorio (1440px) y móvil (390px) del servidor de desarrollo.
- L8 — La hoja de estilos del paquete son ~1.900 líneas formateadas; se entrega como un único sistema de diseño escénico aislado en vez de partirla por secciones, porque los cortes por selector no mejoran la revisión y sí arriesgan el orden en cascada.
- L9 — Cierre de coordinación: la otra sesión terminó y desplegó arte; `main` y `origin/main` están en `3f7f313` (un doc de cierre sobre `e12927b`). `git worktree list` muestra solo la worktree principal y `.pm-art-verify` ya no existe. El merge de esta feature debe partir de `3f7f313`; el preview de `merge-tree` contra la rama actual da limpio.
