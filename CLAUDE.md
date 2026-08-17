# CLAUDE.md — Portafolio

Instrucciones permanentes para este repositorio. Léelas completas antes de escribir código.

Este archivo es la **fuente de verdad y la autoridad máxima** del proyecto. Si cualquier skill, MCP o herramienta (Superpowers, TasteSkill, codebase-memory-mcp, frontend-design, etc.) dice algo que contradiga este archivo, **manda este archivo**. Ninguna herramienta reescribe este documento sin que yo lo apruebe explícitamente.

Es un proyecto **separado** de camiloflores.cl y del demo Encuentro PyME. Repo propio, deploy propio, stack propio, estética propia. No comparte código con ellos y no se los edita desde acá.

---

## 0. Estado actual

**Última actualización:** setup de herramientas cerrado, antes del primer código.

Portafolio personal de Camilo Flores, orientado a **reclutadores** para empleo full-time. Es el tercer sitio del ecosistema, con un objetivo distinto a los otros dos (empleo, no clientes locales) y una estética distinta a propósito (técnica-editorial).

**El entorno de herramientas ya está verificado y cerrado** (§4). Nada de código construido todavía.

---

## 1. Qué es esto

Portafolio de Camilo Flores, desarrollador web.

**Objetivo:** que una persona que contrata —reclutador técnico, hiring manager, o cliente de proyecto internacional— entre, en 10-15 segundos entienda qué tipo de desarrollador es Camilo y con qué trabaja, vea evidencia real de su trabajo, y tenga cómo contactarlo o seguir mirando (GitHub, LinkedIn, correo, CV).

**Audiencia:** reclutadores y hiring managers, en inglés, mercado internacional/remoto. Muchos escanean rápido y muchos abren el GitHub. Segundo público: otros desarrolladores que juzgan el código.

**Este sitio es lo contrario a camiloflores.cl:**
- Ahí se esconde la tecnología; **acá se muestra.** El stack visible y escaneable es un requisito.
- Ahí el idioma es español; **acá es inglés.**
- Ahí no importa el SEO; **acá sí** — un reclutador te googlea, y la consistencia de entidad importa (§10).
- Ahí el contacto es WhatsApp; **acá es correo**, más GitHub y LinkedIn.

**Discreción laboral (importante).** Camilo tiene trabajo full-time. El sitio **presenta su trabajo con seguridad, sin anunciar que busca pega.** Nada de "available for hire", "looking for opportunities" ni banners de disponibilidad. Un portafolio seguro no ruega. Y la empresa donde trabaja hoy **no se nombra** (ver §13), para no exponer una búsqueda frente al empleador actual.

---

## 2. Regla de oro

> Este sitio **es** la demostración. Cada decisión de código, rendimiento y diseño es parte del portafolio. Si algo haría que un ingeniero senior arrugue la nariz al abrir devtools, no va.

Corolario: acá la excelencia técnica **no** es invisible (como en el sitio de ventas). Se muestra —en las métricas, en el stack, en el "por qué" de cada proyecto— pero se muestra con oficio, no con humo.

### Honestidad — sigue siendo el pilar

- Ninguna cifra sin medir. Métricas del propio sitio y de cada proyecto: medidas con Lighthouse/PageSpeed, no estimadas.
- Nada de proyectos inflados, stacks que no domina, ni "experiencia" que no tuvo.
- Un proyecto cuyo sitio ya no existe (GVE) **no se presenta con un enlace en vivo roto**: se cuenta como experiencia con su testimonio (§13).
- Nunca se atribuye identidad falsa a personas reales (fotos de stock como "clientes/relatores").

---

## 3. Stack — fijo, no negociable

| Capa | Decisión |
|---|---|
| Framework | **Next.js (App Router)**, export estático (`output: 'export'`) |
| Librería UI | **React** + TypeScript `strict` |
| Estilos | TailwindCSS |
| Animación | CSS scroll-driven + scroll-snap nativo primero; Framer Motion solo si hace falta y con presupuesto (§7) |
| Tipografías | `next/font` (self-host automático, sin CLS), subset latino |
| Imágenes | Pre-optimizadas a AVIF a mano; `next/image` con `unoptimized` (el export estático no corre el optimizador) o `<img>` con tamaño declarado |
| Hosting | **Vercel**, deploy automático desde la rama de producción |
| Dominio | `TODO:` (para público internacional, un `.dev` se lee bien; a decidir) |
| Contacto | correo + GitHub + LinkedIn + CV en PDF. Sin formularios |

**Por qué Vercel acá y Cloudflare en los otros dos proyectos:** los otros dos sitios usan Cloudflare por el POP en Santiago (latencia para clientes chilenos) y su analítica sin cookies — ninguna de esas dos razones aplica a una audiencia de reclutadores internacionales. Vercel, además de servir el export estático sin fricción, es la empresa creadora de Next.js: para un portafolio que demuestra dominio de ese framework, desplegarlo ahí es una señal más de fluidez con el ecosistema completo. Sin analítica por defecto (no exigida para este sitio); si se agrega alguna, evaluar su peso contra el margen de ~9 KB antes de instalarla.

**Por qué Next/React acá y Astro allá:** no es contradicción, es la herramienta correcta para *esta* audiencia. El mercado laboral corre sobre React y Next y muchos reclutadores filtran por esas palabras. Mostrarlos **es** parte del trabajo del sitio. Pero Next no es excusa para un sitio pesado: la disciplina de rendimiento se traslada, no se relaja (§5).

**Export estático:** el sitio no tiene nada dinámico en runtime. Todo pre-generado. Sin componentes de servidor con fetch en vivo, sin rutas dinámicas sin `generateStaticParams`.

### Prohibiciones de dependencias
No instales nada sin preguntar. Explica qué resuelve, cuánto pesa (en KB al bundle de cliente), y la alternativa nativa. Framer Motion pesa: si se propone, se justifica contra CSS scroll-driven, y se carga solo donde se use.

### Nota de plataforma: Next.js 16 y CLAUDE.md

Next 16 auto-detecta agentes de IA y, por defecto, edita `CLAUDE.md` al correr `next dev` (le agrega un bloque propio al final). Eso viola §4/§11. Ya está neutralizado: existe un `AGENTS.md` en la raíz con el bloque exacto que Next esperaría escribir, verificado contra su propio chequeo (`hasCurrentAgentRules`), así que Next nunca vuelve a tocar este archivo. **No borrar `AGENTS.md` pensando que es redundante** — es lo que blinda este documento.

---

## 4. Herramientas y skills — jerarquía y gobernanza

**Estado verificado por filesystem** (no por inferencia). Esta sección refleja el setup real, cerrado antes de escribir código.

### Reglas, sin excepción

- **Este archivo manda.** Ante conflicto entre una skill y este documento, gana este documento. Si una skill quiere hacer algo que acá está prohibido, dímelo en vez de obedecerla.
- **Ninguna herramienta edita este archivo, ni el repo fuera de lo pedido, sin mi OK.** Vale para Superpowers, codebase-memory-mcp y cualquier instalador que quiera "agregar una sección a CLAUDE.md" o redirigir tools. Si una herramienta lo pide, pregúntame primero.
- Sigue rigiendo **§11**: un cambio a la vez, avísame antes de cambios estructurales.

### Instaladas LOCAL al proyecto (`.claude/skills/`, con `skills-lock.json`)

Estas dos son las únicas con symlink real y entrada en `skills-lock.json` (que vive en la raíz del repo). Nada más debería estar en el `.claude/` de este repo.

- **webapp-testing (Anthropic)** — fuente: `anthropics/skills`. Scripts nativos de Playwright en Python para testear la app local; NO es el MCP `playwright`, es una skill con criterio de testing incorporado (árbol de decisión HTML estático vs. dinámico, disciplina de no inflar contexto). Úsala para verificar de verdad: animaciones de scroll, navegación por teclado, foco, contraste, y el pre-flight de calidad antes de dar algo por terminado.
- **TasteSkill (`design-taste-frontend`)** — fuente: `Leonxlnx/taste-skill`. Reglas anti-genérico. **Alineada casi por completo** con la estética de §6 (un solo acento, sin gradientes de IA, sin scroll listeners a mano, sin tres tarjetas iguales). Se usa, **con estas sobrescrituras explícitas**, porque manda este archivo:
  - **Numeración de proyectos `01 / 02 / 03` SÍ se permite.** TasteSkill banea eyebrows numerados en general; acá es una secuencia real de proyectos y es parte del concepto de ficha técnica (§6). Excepción autorizada.
  - **Los guiones largos (em-dash) los decido yo.** La voz del sitio la define §8, no TasteSkill. Su prohibición de em-dash no aplica acá.
  - Su "hero discipline" (título ≤2 líneas, subtexto ≤20 palabras) se toma como **guía, no ley**; nuestro hero ya es corto, así que no debería chocar.

**frontend-design (Anthropic)** — NO instalada local a este repo (corrección tras auditoría): corre desde el plugin global (`frontend-design@claude-code-plugins`), no tiene symlink ni entrada en `skills-lock.json`. Funciona igual, pero su clasificación como "local" era incorrecta y quedó corregida. Guía de diseño distintivo, se usa normal.

**Uso proactivo, no solo cuando se recuerda.** Auditoría (16 ago 2026) encontró que TasteSkill y frontend-design solo se invocaron en Selected Work y About — nunca en Hero ni en Contact, porque nadie las pidió explícitamente esos turnos. La expectativa de este archivo es que se usen como parte normal de construir cualquier sección visual, no solo cuando se las nombra.

*Nota de duplicado pendiente:* `frontend-design` quedó instalada dos veces a nivel global desde dos marketplaces distintos (`claude-code-plugins` y `claude-plugins-official`). No afecta el funcionamiento; limpiar cuando haya un momento (`claude plugin remove frontend-design@claude-plugins-official`, dejando la otra copia).

### Instaladas GLOBAL (`~/.claude/`, decisión consciente: opción B)

Se evaluó migrar a scope local vs. dejar global (opción A vs. B) y **se optó por B**: más simple y rápido para empezar, a cambio de gobernanza explícita en cada `CLAUDE.md` del ecosistema (los tres proyectos, no solo este, llevan ahora la cláusula de gobernanza).

- **Superpowers** — capa de workflow (planificar, revisar). Disponible en los tres proyectos. Úsala para pensar y revisar, pero la **sustancia** (stack, presupuesto, estética, voz) la fija este archivo. No debe reescribir este `CLAUDE.md` ni cambiar el stack. Si su workflow choca con "un cambio a la vez / avísame antes", gana este archivo.
- **codebase-memory-mcp** — indexa el repo en un grafo. Realidad: los tres proyectos son chicos, así que su valor es marginal en todos; puede quedar prácticamente ocioso y está bien. No debe editar este archivo ni la config de otros agentes.

### Desactivada — evaluada y descartada

- **claude-mem** — evaluada en detalle (repo `thedotmack/claude-mem`) y **desactivada** (`claude plugin disable claude-mem`). Motivos: (1) instala Bun y `uv` por su cuenta y causó un error de hook al arrancar sesiones; (2) corre un worker service en segundo plano con fallos silenciosos por diseño (el hook de setup sale con código 0 aunque falle); (3) tiene un token cripto asociado al proyecto, señal que resta confianza para una herramienta con acceso al código; (4) su función (memoria de conversación entre sesiones) ya la cumple este mismo archivo, bien mantenido, de forma más simple y auditable; (5) está pensada para uso intensivo en repos grandes y de largo aliento, no para un portafolio de 4 secciones. Si algún día se reconsidera, que sea para un proyecto grande y sin el token de por medio.

### Herramientas nativas del CLI (no son skills/plugins instalados)

`run`, `review`, `security-review`, `simplify`, `init` y similares son funciones propias de Claude Code, no algo que alguien instaló. No requieren gobernanza especial; se usan cuando aplican, sin más.

### No usar en este proyecto

`context-mode`, `claude-in-chrome`, `dataviz`, `artifact-design`, `loop`, `schedule`, `claude-api`, y cualquier otra skill/plugin que aparezca disponible pero no esté en las listas de arriba. Que estén disponibles en el entorno no significa que apliquen acá — no se usan ni se mencionan salvo que se agreguen a propósito a este archivo.

Principio general: **menos skills bien gobernadas > muchas peleando.** Cada una suma contexto; este archivo es el que impone orden.

---

## 5. Presupuesto de rendimiento — React-aware pero estricto

Este sitio no va a ser 0 KB de JS como los de Astro, **a propósito** — su trabajo es demostrar dominio de React/Next a un reclutador. Pero sigue siendo la prueba de que Camilo hace sitios rápidos, así que los límites son duros y **se miden, no se estiman**.

- **JS de primera carga: < 120 KB** comprimido (React + Next ya trae una base; mantén lo demás al mínimo). Si se usa Framer Motion, entra en este presupuesto y se carga solo donde se necesita, no global.
- **Peso total de la página: < 400 KB** comprimido, con fuentes e imágenes.
- **LCP: < 2,0 s** en móvil / 4G simulado.
- **CLS: < 0,01.** Toda imagen con tamaño declarado; `next/font` para las tipografías (evita el salto); nada que reflowee al hidratar.
- **INP: < 200 ms.** Las animaciones no bloquean el hilo principal.
- **Lighthouse móvil:** Rendimiento ≥ 95 (meta 100); Accesibilidad, Prácticas y SEO en 100.
- Sin banner de cookies (analítica sin cookies o ninguna). Sin fuentes de terceros por CDN. Sin embeds pesados.

Regla: tras cualquier cambio que toque animaciones, imágenes, fuentes o dependencias, **medir con PageSpeed contra el deploy.** El propio sitio es el primer proyecto del portafolio; sus métricas se muestran, así que tienen que ser reales y buenas.

### Línea base medida — margen real disponible

Medido contra el build de producción (Next 16 + React 19 + App Router, export estático), **no estimado**: first-load JS real es **~111 KB en Brotli** (~130 KB en gzip). Cloudflare sirve Brotli por defecto a navegadores modernos, que es lo que mide Lighthouse/PageSpeed — ese es el número que cuenta contra el límite de 120 KB de arriba.

De esos ~111 KB, ~102 KB son framework (React + ReactDOM + Scheduler ~61 KB, runtime del App Router ~41 KB) — no código de este proyecto, y no baja sin cambiar de router o de framework, lo cual está fuera de alcance (§3). El código propio (`layout.tsx` + `page.tsx` de prueba) pesa ~3,3 KB.

**Margen real disponible para todo el sitio (hero, selected work, about, contact, animaciones): ~9 KB.** Es apretado. Consecuencia directa: Framer Motion completo (~30-50 KB) no cabe sin recortar otra cosa — es una razón más, con número real detrás, para que CSS scroll-driven nativo (§7) sea la vía por defecto y no la preferencia.

*Nota aparte, no afecta el presupuesto:* el archivo de polyfills legacy (`nomodule`, 112.594 bytes sin comprimir, medido) se sube al deploy pero ningún navegador moderno lo descarga — no cuenta en ninguna métrica de Lighthouse. Es peso muerto en el hosting, de baja prioridad; ver §14.

**Investigado (17 ago 2026):** se configuró `browserslist` en `package.json` (evergreen Chrome/Edge/Firefox/Safari, sin IE) para intentar recortarlo. **No tuvo ningún efecto — el archivo midió exactamente los mismos 112.594 bytes antes y después.** Es un problema conocido de Next.js 16: el polyfill-nomodule viene hardcodeado internamente y no respeta `browserslist` ([vercel/next.js discusión #85815](https://github.com/vercel/next.js/discussions/85815)). No hay forma de eliminarlo desde configuración del proyecto. El `browserslist` se dejó igual (es correcto para otras herramientas del build, como autoprefixer), pero el archivo de polyfills sigue siendo peso muerto inevitable con esta versión de Next.

---

## 6. Dirección visual — "técnica-editorial"

**Concepto:** documento de ingeniería de precisión. Grilla, tipografía fuerte, monoespaciada usada con bisturí (etiquetas y metadatos, no en todo), datos y métricas presentados como ficha técnica. Distinta a propósito de los otros dos sitios (letrero pintado / evento cálido). Le habla a un ojo de ingeniero.

La identidad la da el **tratamiento** (grilla, mono, tabular, reglas finas, numeración de secciones), no el color. Por eso comparte poco con los otros dos aunque haya un azul de por medio.

**Prohibido** (esto es el portafolio de dev genérico, que hay que evitar porque el sitio *es* la prueba de gusto):
- Fondo oscuro + monoespaciada en todo + verde terminal (el "hacker portfolio" trillado).
- Gradientes violeta/mesh de IA, glassmorphism, neumorphism.
- Tres tarjetas iguales de proyectos.
- Scroll-jacking, marquesinas, cursores custom decorativos, blobs.
- Inter/Poppins/Montserrat.
- `window.addEventListener('scroll')` a mano para animaciones (usa scroll-driven nativo o IntersectionObserver).

### Tokens

```css
--paper:   #F6F6F4;  /* fondo — casi blanco frío */
--ink:     #16181D;  /* texto — casi negro azulado */
--grey:    #70747C;  /* texto secundario, metadatos */
--line:    #E3E3E0;  /* hairlines */
--accent:  #0B6670;  /* acento único de marca — teal técnico. 6,16:1 sobre --paper (medido) */
--flag:    #8A6D0E;  /* color FUNCIONAL, no decorativo — solo para etiquetas de estado (Demo, sitio no disponible). ~4,54:1 sobre --paper, verificar en código antes de usar */
```

**Regla de los dos colores, sin excepción:** `--accent` es el único color de decisión visual — enlaces, títulos destacados, foco de teclado, cualquier cosa interactiva o de marca. `--flag` tiene un rol estrictamente funcional y acotado — únicamente etiquetas de estado de proyecto (ej. "Demo", "Sitio ya no disponible"). Nunca se usan de forma intercambiable ni compiten por el mismo elemento. Mismo patrón que `--parra`/`--rojo` en camiloflores.cl: el color de marca decide, el color funcional informa.

**Historial de la decisión (16 ago 2026):** el acento original era cobalto (`#2B4AF2`), elegido para diferenciarse del ámbar/terra del demo Encuentro PyME. Se revisó porque (a) se sentía plano en uso, y (b) coincidía en familia (azul sobre claro) con el `--azul` de camiloflores.cl — coincidencia no detectada en la decisión original. Se evaluaron 5 direcciones (cobalto más denso, teal, magenta, lima, solo-tipografía-sin-color) y se eligió teal por diferenciarse de las otras dos paletas del ecosistema y por buen contraste medido.

El resto es tinta sobre papel. Sin sombras dramáticas. Bordes hairline. Radios pequeños o rectos.

### Modo oscuro (automático, 16 ago 2026)

Implementado vía `@media (prefers-color-scheme: dark)` sobre `:root` en `globals.css` — 100% CSS, cero JS, sin toggle. Reacciona solo a la preferencia del sistema.

```css
--paper:   #16181D;  /* = --ink del modo claro, invertido */
--ink:     #F6F6F4;  /* = --paper del modo claro, invertido — 16,41:1 entre ambos */
--grey:    #999DA5;  /* 6,53:1 sobre --paper oscuro (medido); sin uso real en componentes hoy */
--line:    #282B32;  /* 1,25:1 sobre --paper oscuro — misma sutileza que el hairline claro (1,19:1) */
--accent:  #12A9BA;  /* 6,27:1 sobre --paper oscuro (medido) */
--flag:    #B99213;  /* 6,08:1 sobre --paper oscuro (medido) */
```

`--accent`/`--flag` del modo claro **no sirven invertidos tal cual** (verificado en código: `#0B6670` da 2,66:1 y `#8A6D0E` da 3,61:1 sobre el nuevo fondo oscuro, ambos bajo AA) — se aclararon en el mismo matiz (mismo H/S en HSL, solo sube L) hasta superar AA con margen real. `paper`/`ink` sí son una inversión literal de los mismos dos valores del modo claro, sin colores nuevos.

### Tipografía (vía `next/font`, subset latino)

- **Display / titulares:** Space Grotesk (700) — grotesca con carácter técnico.
- **Cuerpo:** IBM Plex Sans (400 / 500).
- **Etiquetas y metadatos:** IBM Plex Mono (500) — mono solo para labels, cifras de ficha, años, "01/02".
- Cifras tabulares (`tabular-nums`) en métricas y numeración.
- Escala tipográfica explícita en el theme de Tailwind. Nada de tamaños arbitrarios.

### Piso de calidad
Responsive hasta 360px. Foco de teclado visible. `prefers-reduced-motion` respetado (§7). Contraste AA mínimo, AAA en cuerpo; verifica los ratios reales (el cobalto sobre papel y el gris sobre papel se calculan, no se estiman). Enlaces que abren pestaña nueva lo avisan con `sr-only`. Todo indexable y semántico (§10).

**Contraste de `--accent`, medido (16-17 ago 2026, con el teal actual):** `#0B6670` sobre `--paper` claro da **6,16:1**; `#12A9BA` (versión dark, ver más abajo) sobre `--paper` oscuro da **6,27:1**. Dos casos distintos, según el tamaño del texto donde se use:
- **Texto de cuerpo** (`text-body-lg`, 18-22px, ej. el span de About en §13): el umbral exigido es AAA normal (7:1) — **no se alcanza, en ningún peso**, con ninguno de los dos valores. Es un límite matemático del color, no de la implementación. Excepción documentada y a propósito: ahí el estándar exigido baja a **AA (4,5:1)**, que sí se cumple con margen — mantenerlo a spans cortos (2-4 palabras), nunca párrafos completos en ese color.
- **Texto grande** (≥24px por tamaño, sin importar el peso — WCAG lo clasifica como "texto grande" solo por tamaño a partir de ahí; ej. la palabra "hand" en el `<h1>` del Hero, verificado en 8 breakpoints entre 41,4px y 80px): el umbral es AAA de texto grande (4,5:1) — **se cumple limpio, sin excepción**, con los dos valores medidos arriba.

Los usos de `--accent` como elemento de UI (tags de proyecto, outline de foco) no están sujetos a ninguna de estas dos reglas de cuerpo/texto grande.

---

## 7. Animaciones — el efecto de "pantallas verticales"

El efecto pedido: cada proyecto se siente como una pantalla vertical que se revela al hacer scroll, en secuencia. Bien hecho es un flex; mal hecho ahuyenta al reclutador.

**Hazlo así:**
- **Scroll-driven nativo primero:** CSS `animation-timeline: view()` / `scroll()` e `IntersectionObserver` para el revelado. Cero JS de scroll a mano. Es más rápido, accesible, y demuestra que conoces la plataforma moderna — que es exactamente el punto ante un reclutador técnico.
- **Scroll-snap con criterio:** si se usa snap entre pantallas de proyecto, `scroll-snap-type` en modo **proximity**, no `mandatory`. El snap obligatorio de viewport completo secuestra el scroll y enfurece a quien escanea rápido. La barra de scroll, la rueda y el teclado deben funcionar siempre; nadie queda atrapado.
- **NADA de scroll-jacking destructivo.** No secuestrar la rueda para forzar un recorrido.
- **Solo `transform` y `opacity`** en las animaciones (GPU, sin reflow). No animar propiedades que disparen layout.
- **`prefers-reduced-motion`: obligatorio.** Si el usuario lo pide, se muestra todo el contenido estático, sin revelado ni snap. El contenido nunca depende de la animación para ser legible.
- Si Framer Motion resuelve algo que el CSS nativo no, se usa acotado y dentro del presupuesto de §5 — no como default para todo.

---

## 8. Voz y copy

**Inglés**, en todo el sitio. Seguro, técnico pero claro, sin jerga vacía.

- **Presenta, no ruega.** Declaraciones de oficio ("I build fast, accessible websites"), nunca "hire me" / "available for work" / "open to opportunities".
- Cada proyecto se cuenta por su **decisión de ingeniería y su resultado medido**, no por adjetivos. "No UI framework; the speed is the argument" pesa más que "a beautiful, modern website".
- Frases cortas, verbos activos.
- Los enlaces dicen qué son: "Live", "Code", "Download CV".
- **Guiones largos (em-dash): permitidos.** Es decisión de voz de este proyecto (sobrescribe a TasteSkill, §4).
- Nada de cifras sin medir.

---

## 9. Alcance — v1

**Rutas. Solo estas:**
1. `/` — el portafolio (una sola página larga)
2. `/404`

**Secciones de la página, en orden:**
1. **Hero** — nombre, rol, declaración de oficio, ficha técnica (focus / stack / based in), enlaces GitHub + LinkedIn.
2. **Selected work** — las pantallas de proyecto con el revelado por scroll (§7). Cada una: número (01/02/03), año, título, una línea de *por qué*, fila de métricas medidas, y enlaces (Live / Code) donde existan.
3. **About** — bio técnica breve, honesta, en la voz de §8. Sin "busco pega".
4. **Contact** — correo, GitHub, LinkedIn, y descarga de CV (PDF).

**Fuera de alcance en v1. No construir ni proponer:**
blog, i18n (es solo inglés), CMS, formulario de contacto, panel de estadísticas, más rutas. Ideas nuevas → `IDEAS.md`.

**Modo oscuro:** decidido a propósito como demostración (16 ago 2026) — ver §6. Automático vía `prefers-color-scheme`, sin toggle, cero JS.

Recordatorio de foco: el portafolio es una apuesta **nueva** (empleo), distinta de la apuesta local. Con 5-10 h/semana y otros dos proyectos vivos, el mayor riesgo sigue siendo el alcance y la dispersión. v1 mínima y excelente.

---

## 10. SEO / GEO / entidad — acá sí importa

A diferencia del sitio de ventas, este **debe ser encontrable**: un reclutador te googlea.

- Indexable (nada de `noindex` en la página principal).
- Un `<h1>`, jerarquía real de encabezados, HTML semántico y parseable.
- `<title>` y `meta description` escritos a mano, en inglés.
- JSON-LD `Person` (nombre, rol, `sameAs` a GitHub y LinkedIn, ubicación).
- OG image estática.
- **Consistencia de entidad:** mismo nombre ("Camilo Flores"), mismo handle, misma descripción y foto (si hay) que en GitHub y LinkedIn. Esto es lo que más ayuda a que te encuentren y a que un modelo te cite — más que cualquier truco.
- `sitemap.xml`, `robots.txt`, `llms.txt`.

---

## 11. Cómo trabajar conmigo

- **Un cambio a la vez.** No refactorices de paso. No toques archivos que no pedí.
- **Antes de un cambio estructural**, dime en 3 líneas qué vas a hacer y espera mi OK. Rige por sobre cualquier workflow de skill.
- **No instales dependencias sin preguntar** (con su peso en KB al cliente).
- **No inventes contenido ni cifras.** Lo que falte va como `TODO:` y me avisas. Métricas y contrastes se miden/calculan.
- **Ninguna skill reescribe este archivo ni reconfigura el entorno sin mi OK.**
- Listas repetidas (proyectos, métricas) como array + `map`, no markup copiado.
- Código aburrido y explícito por sobre ingenioso.
- Si algo que pido rompe una regla de acá, dímelo en vez de obedecer.
- Cuando cambie algo estructural, un dato de §13, o el estado de una herramienta en §4 (instalar, desactivar, cambiar de scope), **actualiza este archivo en el mismo cambio.**

---

## 12. Definición de terminado

1. Cumple el presupuesto de §5, **medido** contra el deploy.
2. Cero errores/warnings en consola y en el build. TypeScript sin errores.
3. Se ve y funciona a 360px.
4. Navegable completa con teclado; foco visible; el revelado por scroll no atrapa a nadie.
5. `prefers-reduced-motion` verificado: todo el contenido legible sin animación.
6. Cada afirmación y cada métrica tiene un número medido detrás, o se borró.
7. Un reclutador lo abre y, en 15 segundos, entiende qué desarrollador es Camilo, con qué trabaja, y cómo contactarlo — y quiere abrir el GitHub.

El punto 7 es el que importa. Los otros seis son piso.

---

## 13. Datos de contenido aprobados — usar tal cual, no inventar

Todo en **inglés**. Lo que falte es `TODO:` y se pregunta.

### Hero
- Nombre: **Camilo Flores** · Rol: **Web Developer**
- Titular (declaración de oficio): **"I build fast, accessible websites — by hand."**
- Ficha técnica (mono):
  - Focus: performance & accessibility
  - Stack: Next.js · React · TypeScript
  - Based in: San Felipe, Chile
- Enlaces: GitHub `https://github.com/r3ckleszz1` · LinkedIn `https://linkedin.com/in/camilo-flores`

### Selected work (3)
1. **camiloflores.cl** — sales site for a local web-dev practice. No UI framework, no client JS beyond a live load-time meter; the speed is the argument. Live: `https://www.camiloflores.cl/`. Code: repo privado por ahora — badge `--flag` "Repo private" en vez de enlace, sin nada roto que abrir. Métricas (PageSpeed móvil, 16 ago 2026): Performance 97 · CLS 0 · JS mínimo.
2. **Encuentro PyME Aconcagua** — demo event landing with a real registration form that works with **no client JS** (Cloudflare Worker + Resend, native POST). Rotulado como **Demo** + **Repo private** (dos badges `--flag`, 17 ago 2026: se verificó que no se aprietan a 360px). Live: `https://landingdemo1.houdini-dev.workers.dev/`. Además lleva un diagrama SVG estático (cero JS) del flujo real `<form> nativo → Cloudflare Worker → Resend`, junto a la ficha del proyecto. Métricas (PageSpeed móvil, 16 ago 2026): Performance 100 · CLS 0 · JS mínimo.
3. **GVE Sistemas** — client website (built end-to-end). **La empresa cerró y el sitio ya no está en línea: NO poner enlace "Live" roto.** Badge `--flag` "Not currently live" junto al número/año. Nunca tuvo "Code" (proyecto de cliente). Se presenta como experiencia con el testimonio (permiso concedido): *"Trabajar con Camilo Flores fue una experiencia excelente…"* — **Gonzalo Toro, CEO, ITQ Internacional.** (Traducir al inglés con cuidado o mantener la cita en español con nota; a decidir.)

### About / empleo
- Referir la experiencia actual como "a Chilean technology company with international presence". **Sin nombrar la empresa** (discreción frente al empleo actual, §1). `TODO:` decidir si en el CV privado se nombra.
- Nada de "looking for work".

### Contact
- Correo: `houdini.dev@outlook.com`
- GitHub: `https://github.com/r3ckleszz1` · LinkedIn: `https://linkedin.com/in/camilo-flores`
- CV: PDF, descargable. Archivo: `public/cv-camilo-flores.pdf` (colocarlo ahí antes de correr el prompt de Contact — Claude Code no debe inventar el archivo ni un placeholder de contenido, solo enlazarlo). Es descarga directa, no abre pestaña nueva: no necesita el aviso `sr-only` de pestaña externa, pero sí un texto claro tipo "Download CV (PDF)".

### Dominio
- `TODO:` confirmar (posible `.dev` para público internacional).

---

## 14. Qué falta — antes y después de construir

Antes de que el sitio sirva de verdad, cosas que **solo tú** resuelves y no son código:
1. **Consistencia de entidad** (§10): las URLs ya están confirmadas (GitHub `r3ckleszz1`, LinkedIn `camilo-flores`). Falta verificar que el nombre, la descripción y la foto (si hay) coincidan entre las tres plataformas — eso sigue pendiente de tu parte.
2. **El CV en PDF** al día.
3. **Decidir el dominio** y si nombras (o no) tu empleo actual.
4. **Medir** las métricas reales de los tres proyectos para no publicar cifras sin medir. ✅ Hecho (PageSpeed móvil, 16 ago 2026): portafolio 99/100 Rendimiento (LCP 2,0s, CLS 0, TBT 20ms), camiloflores.cl 97/100 (LCP 1,8s, CLS 0), demo Encuentro PyME 100/100 (LCP 1,4s, CLS 0). Quedan dos hallazgos anotados abajo, aceptados como pendientes no urgentes.
5. **Limpiar el duplicado de `frontend-design`** a nivel global (§4) — no urgente, cosmético.
6. **Recortar el archivo de polyfills legacy** (~110 KB sin comprimir, vía `browserslist` más moderno) en el propio portafolio. PageSpeed ya lo señala con números concretos: "JavaScript antiguo" (~14 KiB) y "JS que no se usa" (~56 KiB), y es la causa más probable de los 20ms de TBT (único de los tres proyectos con TBT > 0). Decisión: publicar v1 tal cual (99/100 sigue siendo sobresaliente) y arreglar después — no bloquea el lanzamiento.
7. **camiloflores.cl bajó de 100 a 97** entre mediciones (Speed Index subió a 3,9s desde 1,5s; probablemente por la imagen de la sección "Ejemplo" agregada después). Además, PageSpeed marca un problema de accesibilidad ahí: los `<dl>` no contienen solo grupos `<dt>`/`<dd>` ordenados correctamente (posible causa: la ficha técnica de Sobre mí o las métricas de "Ejemplo"). Decisión: anotado, no urgente con 97/91 — revisar cuando haya tiempo, en el repo de camiloflores.cl, no en este.

Y el recordatorio de fondo: este es tu tercer proyecto activo más un trabajo full-time. Es una apuesta legítima pero nueva. Constrúyela sabiendo que compite por tus 5-10 horas con lo demás; mínima y excelente antes que grande y a medias.