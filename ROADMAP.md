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
- [x] Decisión: Hero lleva un uso mínimo de `--accent` (una palabra del h1: "hand"), mismo patrón que "Selected **work**". About ya tenía su propio uso (el span "close to the platform"). Las 4 secciones tienen ahora al menos un toque de acento, ninguna queda completamente silenciosa.

Navegación:
- [x] Scroll-snap por sección — **evaluado y descartado** tras investigación (ver IDEAS.md, cementerio). `scroll-snap-type: proximity` atrapa el scroll de rueda bajo uso normal; es un límite de la plataforma, no de la implementación. El revelado por scroll (fade + translateY) sigue siendo el mecanismo de navegación del sitio.

Calidad medida:
- [x] Presupuesto de JS respetado de punta a punta (~111,1 KB Brotli, Server Components puros)
- [x] PageSpeed real: 99/100 Rendimiento, CLS 0 (16 ago 2026)
- [x] Auditoría de frontend-design + TasteSkill en las 4 secciones, sin hallazgos bloqueantes
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