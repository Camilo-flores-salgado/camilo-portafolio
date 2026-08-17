# IDEAS.md — Portafolio

Todo lo que no entra a v1 (o que está en evaluación) vive acá. Mismo criterio
que en los otros dos proyectos: si algo tienta a agrandar el alcance, se
escribe acá y se sigue. v1 recién quedó funcionalmente completo — antes de
sumar alcance nuevo, corresponde el punto 7 de §12 (validación con una
persona real, idealmente perfil reclutador) y cerrar los pendientes de §14.

---

## En evaluación activa (esta ronda)

- **Revisión de paleta.** El feedback es que el cobalto/papel se siente
  plano. Pendiente diagnosticar si es el matiz o la densidad de uso antes
  de tocar tokens — ver conversación. No tocar código hasta decidir.
- **Scroll-snap por sección** (además del revelado ya existente). Se agrega
  como mejora aditiva, sin JS, en cuanto se confirme — no reemplaza el
  revelado, lo complementa.
- **Toggle claro/oscuro.** Dos versiones muy distintas en costo:
  - *Automático* (`prefers-color-scheme`, sin control manual): costo casi
    cero, cero JS nuevo, respeta la preferencia del sistema.
  - *Toggle manual* (con persistencia): necesita un componente cliente con
    estado + un script inline en `<head>` para evitar parpadeo. JS real,
    aunque chico, contra un margen de presupuesto que ya está casi
    agotado (~8.9 KB libres de 120 KB). CLAUDE.md §9 hoy excluye modo
    oscuro de v1 por defecto. Decisión pendiente.
- **Toggle de idioma inglés/español.** El sitio es 100% inglés por diseño
  (audiencia: reclutadores internacionales). Una versión bilingüe real
  (rutas `/en` `/es` con enlace simple, sin JS) es técnicamente barata,
  pero duplica todo el contenido para siempre — mismo riesgo que se evaluó
  y se descartó para camiloflores.cl. ¿Quién es el lector en español acá?
  Si es un público real (clientes chilenos, reclutadores locales), vale la
  pena; si es solo "por si acaso", no. Decisión pendiente.

## Fase 2 (después de validar v1 con una persona real)

- Recortar el polyfill legacy (~110 KB sin comprimir) — ver CLAUDE.md §14.
- Investigar la caída de rendimiento de camiloflores.cl (100→97) y el
  hallazgo de accesibilidad en sus `<dl>` — ver CLAUDE.md §14. Se resuelve
  en el repo de camiloflores.cl, no en este.
- Dominio propio para el portafolio (hoy en `*.vercel.app`).
- Limpiar el duplicado global de `frontend-design`.
- Medir en Safari real el rango `entry 0% contain 50%` de las animaciones
  de scroll (hoy sin verificar, solo probado en Chromium vía Playwright).

## Ideas sueltas (sin evaluar)

- Analítica ligera (Vercel Analytics) si algún día se quiere saber cuánta
  gente entra — no exigida por CLAUDE.md, evaluar peso antes de sumarla.
- Micro-interacción de hover en los enlaces "Live"/"Code" de cada proyecto.

---

## Cementerio (descartadas, y por qué)

- **Plantillas de referencia visual para copiar estructura** (mismo
  criterio que en el demo Encuentro PyME): inspiración sí, código base no.
- **Paleta naranjo/oliva** (evaluada al definir la dirección visual):
  descartada por quedar demasiado cerca de la familia cromática del demo
  Encuentro PyME (crema/ámbar/espresso). Ver CLAUDE.md §6 para el
  razonamiento completo.
- **Scroll-snap por sección** (`scroll-snap-type: y proximity`), evaluado e
  implementado, luego revertido tras investigación exhaustiva. Causa:
  Chromium/Firefox pueden atrapar el scroll de rueda en una franja angosta
  (~15-20px) justo antes de cada punto de anclaje, cuando el usuario
  scrollea con pausas entre gestos — el patrón normal de una rueda de mouse
  tradicional, no un caso raro. Confirmado con una página HTML mínima sin
  framework (descarta que fuera algo del proyecto) y con reportes
  independientes de Firefox Bugzilla #1753188, issues de Chrome/TanStack,
  y discusiones de Tailwind/Webflow — es un límite documentado de la
  plataforma, sin ninguna propiedad CSS que lo corrija. Viola directamente
  la regla de §7 ("el usuario controla el scroll en todo momento, sin
  excepción"). El revelado por scroll (fade + translateY, sin snap) es el
  techo real de lo que CSS nativo puede ofrecer sin arriesgar
  scroll-jacking — cualquier snap "más inteligente" requeriría JS y
  probablemente reintroduciría el mismo problema que se evitó desde el
  planteamiento original del sitio.