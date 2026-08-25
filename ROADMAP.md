# ROADMAP — Portafolio

Estado real del proyecto, no aspiracional. Se actualiza en el mismo cambio que mueve una casilla (mismo criterio que CLAUDE.md §11). Si algo de acá lleva mucho tiempo sin marcarse, es una señal de que el alcance creció más rápido que el tiempo disponible — revisar contra la regla de 60/40 del ecosistema (60% conseguir oportunidades, 40% construir).

---

## Milestone 1 — Cierre de v1 (en curso)

Construcción base:
- [x] Andamiaje Next.js + tokens + tipografías
- [x] Hero
- [x] Selected Work (3 proyectos, revelado por scroll, sin scroll-jacking)
- [x] About
- [x] Contact
- [x] Ritmo de transición parejo entre las 4 secciones

Identidad visual:
- [x] Paleta definitiva: `--accent` teal (#0B6670) + `--flag` funcional (#8A6D0E), ambos verificados en código
- [x] Modo oscuro automático (`prefers-color-scheme`, cero JS, tokens propios verificados)
- [x] Toggle manual de tema (19 ago 2026): override sobre `prefers-color-scheme` vía `.dark`/`.light` en `globals.css` (misma especificidad que la media query, orden decide) + script anti-parpadeo crudo en `<head>` de `layout.tsx` + botón `ThemeToggle.tsx` en el Header. Persiste en `localStorage`, verificado tras reload (incluso en `domcontentloaded`, antes de `networkidle`, para confirmar que no hay ventana de parpadeo). Verificado: sistema claro/oscuro sin override, override manual en ambas direcciones, foco de teclado + Enter/Space, aria-label dinámico, 360px y desktop, cero errores de consola. Peso: ~630 B Brotli el botón, ~100 B el script inline (no cuenta en el first-load JS formal, reportado igual) — total ~730 B contra el margen de ~8,65 KB. `npm run build` limpio.
- [x] Decisión: Hero lleva un uso mínimo de `--accent` (una palabra del h1: "hand"), mismo patrón que "Selected **work**". About ya tenía su propio uso (el span "close to the platform"). Las 4 secciones tienen ahora al menos un toque de acento, ninguna queda completamente silenciosa.
- [x] **Migración tipográfica completa (25 ago 2026): Space Grotesk + IBM Plex Sans + IBM Plex Mono → Oswald + Newsreader (2 familias, no 3).** Hecha en 4 fases, un cambio a la vez:
  - Fase 1 — base: `next/font` (Oswald 600/700, Newsreader `weight: "variable"` con eje `opsz` activo). `--font-mono` como alias transicional a `--font-display` mientras se migraban los componentes, borrado al final de la Fase 4 (cero usos de la clase `font-mono` en el código, verificado por grep).
  - Fase 2 — Header + Hero: salto de línea del `h1` con Oswald (condensada) verificado en 360px y desktop, sin overflow. Pesos explícitos (`font-bold`/`font-semibold`) en vez de depender del *font matching* implícito del navegador — con dos pesos cargados (antes uno solo) el peso sin especificar es ambiguo entre navegadores.
  - Fase 3 — Selected Work: los 3 proyectos + el diagrama SVG del demo. `viewBox` revisado, no hizo falta ajustarlo (Oswald condensada ocupa menos ancho, no más).
  - Fase 4 — About + Contact + 404 + skip-link (encontrado con `font-mono` sin migrar, corregido en la misma fase). Contraste del span `--accent` en About **remedido en código, no asumido**: mismos 6,16:1/6,27:1 (el color no cambió; tamaño/peso renderizado — 21,28px, 500 — tampoco).
  - Verificación final: `npm run build` limpio; `npm run test:e2e` — los 3 tests siguen pasando (animación, no tipografía); axe-core 0 violaciones reales (mismo falso positivo de siempre por timing del scroll-reveal, descartado con `prefers-reduced-motion`); first-load JS sin cambio (112,1 KB Brotli — las fuentes no cuentan ahí); peso real de fuentes en `/` medido: 79,6 KB (un archivo Oswald + uno Newsreader; Oswald resultó compartir un solo woff2 entre los pesos 600 y 700 para el rango de caracteres usado — más liviano de lo esperado). Página completa ~201 KB, dentro del presupuesto de 400 KB de CLAUDE.md §5.
  - `src/app/icon.tsx` y `opengraph-image.tsx` quedaron fuera a propósito (cargan fuentes a mano vía `next/og`, no vía `next/font`, no estaban en el alcance).
  - CLAUDE.md §6 reescrito completo con el nuevo sistema, el historial de la decisión, y por qué se evitó repetir Source Serif 4 de camiloflores.cl.

Navegación:
- [x] Scroll-snap por sección — **evaluado y descartado** tras investigación (ver IDEAS.md, cementerio). `scroll-snap-type: proximity` atrapa el scroll de rueda bajo uso normal; es un límite de la plataforma, no de la implementación. El revelado por scroll (fade + translateY) sigue siendo el mecanismo de navegación del sitio.

Calidad medida:
- [x] Presupuesto de JS respetado de punta a punta (~111,1 KB Brotli, Server Components puros)
- [x] PageSpeed real: 99/100 Rendimiento, CLS 0 (16 ago 2026)
- [x] Auditoría de frontend-design + TasteSkill en las 4 secciones, sin hallazgos bloqueantes
- [x] Métricas reales de camiloflores.cl y Encuentro PyME sincronizadas en Selected Work (Performance/CLS/JS, tomadas de CLAUDE.md §13) — ya no quedan placeholders "TODO" en la fila de métricas de esos dos proyectos. GVE sigue sin fila (nunca tuvo, se presenta con testimonio).
- [x] Año de los 3 proyectos de Selected Work (25 ago 2026): el campo `year` llevaba el valor literal `"TODO"` desde el principio (deliberado, CLAUDE.md §11 — nunca inventar una cifra), pero se estaba **pintando en pantalla** tal cual junto al número de cada proyecto. Se ocultó el `<span>` condicionalmente mientras se confirmaban los años reales, y se reemplazó apenas Camilo los dio: camiloflores.cl 2026, Encuentro PyME Aconcagua 2026, GVE Sistemas 2025. Condición temporal revertida (ya no aplica con datos reales). CLAUDE.md §13 actualizado con los 3 años. Verificado: cero apariciones de "TODO" en `out/index.html`, build limpio, 4 combinaciones sin errores de consola ni overflow.
- [x] Página 404 propia (`src/app/not-found.tsx`, prevista en CLAUDE.md §9 desde el alcance original, nunca implementada): Server Component puro, mismo lenguaje visual del sitio (paper/ink, Space Grotesk/IBM Plex Mono/Sans, sin elementos nuevos), "404" tratado como dato de ficha técnica, un CTA primario ("Back to home") + uno secundario ("Selected work"). `<title>`/`description` propios; sin `robots` explícito porque Next ya inyecta `noindex` en esta ruta especial de forma incondicional (verificado en build: agregar uno propio solo duplicaba la etiqueta). Confirmado en `output: 'export'`: genera `out/404.html` y `out/_not-found.html` con el contenido nuevo. Verificado en las 4 combinaciones claro/oscuro × desktop/360px, foco de teclado visible en ambos enlaces, cero errores de consola propios (el único "error" que reporta Playwright es el 404 de red esperado de la navegación misma, no un bug). First-load JS de "/" sin cambios: 111,5 KB Brotli, idéntico a antes.
- [x] SEO/GEO/AEO de CLAUDE.md §10 completo: `robots.txt`, `sitemap.xml`, `llms.txt`, OG image estática generada en build (`next/og`, tokens del sitio, sin fotos nuevas), meta tags OG/Twitter, canonical + `metadataBase`, JSON-LD `Person` con `url`. Todo sobre `NEXT_PUBLIC_SITE_URL` (hoy el deploy `*.vercel.app`), verificado generándose en `out/` (no solo dev). First-load JS: 111,5 KB Brotli (antes 111,1 KB; +0,4 KB por el manifest de rutas del App Router al registrar `/opengraph-image`, `/robots.txt`, `/sitemap.xml` — nada de JS propio nuevo). Pendiente de acción manual tuya: configurar `NEXT_PUBLIC_SITE_URL` en Vercel (Project Settings → Environment Variables) para que el deploy real no dependa solo del fallback hardcodeado en `src/lib/site.ts`.
- [x] GitHub actualizado (24 ago 2026): `github.com/r3ckleszz1` → `github.com/Camilo-flores-salgado` en los 4 lugares donde aparecía (Header, Contact, JSON-LD `sameAs`, gesto de consola). Badges `--flag` "Repo private" de camiloflores.cl y Encuentro PyME retirados — ambos repos ya son públicos — y reemplazados por enlaces "Code" reales (mismo tratamiento que "Live": `target="_blank"` + `rel="noopener"` + aviso `sr-only`). GVE sigue sin "Code" (nunca tuvo repo propio). `llms.txt` y CLAUDE.md §13/§14 sincronizados.
- [x] Enfoque remoto (24 ago 2026): "Based in: San Felipe, Chile" del Hero → "Chile · Open to remote work"; frase de About → "Based in Chile, open to remote roles worldwide."; JSON-LD `Person.address` pierde `addressLocality`, queda solo `addressCountry: "CL"`. Sin zona horaria ni disponibilidad de solapamiento horario (no inventado). Confirmado por grep: cero menciones de "San Felipe" en código o contenido renderizado. First-load JS sin cambio real (112,1 KB Brotli, +8 B por longitud de texto en el payload de RSC, no lógica nueva).
- [x] Auditoría de calidad técnica (24-25 ago 2026) — 4 correcciones, una a la vez:
  - **Favicon:** `src/app/icon.tsx` (patrón `next/og`, igual que `opengraph-image.tsx`) reemplaza el `favicon.ico` default de `create-next-app` (borrado). Monograma "C" en Space Grotesk sobre `--accent`, legibilidad confirmada con downscale real a 16×16 vía canvas, no solo en preview grande.
  - **Skip-link:** `<a href="#main-content">` primer elemento del `<body>` (`layout.tsx`), `sr-only` hasta foco, mismos tokens del sitio al hacerse visible. `<main id="main-content">` en `page.tsx` y `not-found.tsx` (mismo destino en las dos rutas). Verificado: primer Tab de la página, outline `--accent`, activa con Enter, 0 errores de consola en las 4 combinaciones claro/oscuro × desktop/360px.
  - **`vercel.json`:** headers de seguridad (nosniff, X-Frame-Options, Referrer-Policy, HSTS, CSP acotado a `'self'`). Solo tienen efecto en el deploy real.
- [x] **Incidente (25 ago 2026): CSP rompió la hidratación en producción.** El deploy con `script-src 'self'` (sin `'unsafe-inline'`) bloqueó los scripts inline de Next.js necesarios para hidratar React — reportado por el usuario como "el toggle de tema no funciona", pero el alcance real era sitio-wide: ningún componente de cliente quedaba interactivo. Confirmado en vivo con `curl -I` + consola de Playwright contra la URL de producción (4 violaciones de CSP + React error #412). Root cause investigado antes de tocar código (no fix a ciegas). Fix: `script-src 'self' 'unsafe-inline'` — única vía viable sin servidor para nonces (`output: 'export'`) y sin poder fijar hashes (el payload de hidratación cambia en cada build). Push a `origin/main` para redeploy. Ver CLAUDE.md §3 para el detalle completo.
  - **Suite de tests:** `npm run test:e2e` (nuevo script, sin dependencias nuevas) levanta `next dev`, corre los 3 tests existentes en secuencia vía `tests/run_all.py`, y lo tira abajo — antes no existía forma de correrlos juntos. `tests/README.md` nuevo documenta el patrón y qué verifica cada test. Corrida limpia confirmada (exit code 0, los 3 pasan).
  - Auditoría con axe-core 4.13.0 (ya en `node_modules`, sin instalar nada) contra el export estático: 0 violaciones reales. Un hallazgo de `color-contrast` en el primer proyecto de Selected Work resultó falso positivo del momento del escaneo (mitad del fade de `.project-reveal`) — descartado al re-correr con `prefers-reduced-motion: reduce` (0 violaciones).
  - `npm run build` limpio en cada paso. First-load JS sin cambio real: 112,1 KB Brotli (favicon y skip-link son HTML/CSS/imagen de build, sin JS de cliente nuevo).
- [ ] **Punto 7 de CLAUDE.md §12 — validación humana.** Mostrarle el sitio a alguien (idealmente perfil reclutador) y confirmar que en 15 segundos entiende quién eres, con qué trabajas, y cómo contactarte. Es el único chequeo que de verdad importa; nada de lo demás lo reemplaza.

Consistencia externa:
- [ ] Consistencia de entidad: mismo nombre/descripción/foto en GitHub y LinkedIn (CLAUDE.md §10/§14)
- [ ] Dominio propio (hoy en `*.vercel.app`)

**v1 no se considera cerrado hasta que las casillas de arriba estén todas marcadas — sobre todo la validación humana.**

---

## Milestone 2 — Versión en español

No empieza hasta que Milestone 1 esté cerrado.

- [ ] Copy propio en español (no traducción literal) — Hero, About, los 3 proyectos, Contact
- [ ] Estrategia de ruta: `/es` con enlace simple, sin JS (a confirmar)
- [ ] `hreflang` y metadata SEO para las dos versiones
- [ ] Medir presupuesto de nuevo tras duplicar contenido — un sitio bilingüe estático no debería costar JS, pero sí peso de HTML; confirmar que sigue dentro de rango

---

## Milestone 3 — Pulido técnico (después de validar, no antes)

Todo esto es mejora, no bloqueante. No tocar hasta que Milestone 1 esté validado por una persona real — agrandar el sitio antes de confirmar que funciona es exactamente el error que este proyecto ha evitado hasta ahora.

- [x] ~~Recortar el polyfill legacy~~ — investigado (17 ago 2026), no es posible vía `browserslist`. Se configuró `browserslist` en `package.json` (Chrome/Edge/Firefox/Safari evergreen, sin IE) de todos modos, por ser correcto para otras herramientas del build — pero el chunk de polyfill (`static/chunks/0cz1d0mv5g_q7.js`) midió **112.594 bytes sin comprimir, idéntico antes y después**, byte por byte. Es un problema conocido de Next.js 16: el polyfill-nomodule viene hardcodeado y no respeta `browserslist` ([discusión #85815 en vercel/next.js](https://github.com/vercel/next.js/discussions/85815)). No hay forma de desactivarlo desde configuración del proyecto — solo ejectar el pipeline de build o esperar un fix de Next. Cerrado como "investigado, no accionable" en vez de "hecho".
- [ ] Investigar la caída de camiloflores.cl (100→97 Rendimiento) y su hallazgo de accesibilidad en `<dl>` — en el repo de camiloflores.cl, no en este
- [ ] Limpiar el duplicado global de `frontend-design`
- [ ] Verificar en Safari real el rango `entry 0% contain 50%` de las animaciones (hoy solo probado en Chromium vía Playwright)

---

## Principios que gobiernan este roadmap

- **CLAUDE.md manda siempre.** Este roadmap organiza el trabajo; no redefine reglas que ya están en CLAUDE.md.
- **No se abre un milestone nuevo antes de validar el anterior con algo real** (medición, o en el caso del punto 7, una persona real).
- Todo cambio que mueva una casilla también actualiza CLAUDE.md si tocó algo estructural (§11).