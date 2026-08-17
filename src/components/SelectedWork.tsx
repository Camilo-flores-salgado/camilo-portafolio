type ProjectLink = {
  label: "Live";
  href: string;
};

type MetricRow = {
  label: string;
  value: string;
};

type ShippedProject = {
  kind: "shipped";
  number: string;
  year: string;
  title: string;
  badges?: string[];
  description: string;
  metrics: MetricRow[];
  links: ProjectLink[];
  diagram?: boolean;
};

type TestimonialProject = {
  kind: "testimonial";
  number: string;
  year: string;
  title: string;
  badges?: string[];
  description: string;
  quote: string;
  author: string;
  links: ProjectLink[];
};

type Project = ShippedProject | TestimonialProject;

// TODO(§13): year todavía no está definido -- TODO explícito a propósito,
// nunca un número inventado. Métricas (PageSpeed móvil, 16 ago 2026) ya
// están medidas y sincronizadas con CLAUDE.md §13.
const projects: Project[] = [
  {
    kind: "shipped",
    number: "01",
    year: "TODO",
    title: "camiloflores.cl",
    badges: ["Repo private"],
    description:
      "Sales site for a local web-dev practice. No UI framework, no client JS beyond a live load-time meter; the speed is the argument.",
    metrics: [
      { label: "Performance", value: "97" },
      { label: "CLS", value: "0" },
      { label: "JS", value: "Minimal" },
    ],
    links: [{ label: "Live", href: "https://www.camiloflores.cl/" }],
  },
  {
    kind: "shipped",
    number: "02",
    year: "TODO",
    title: "Encuentro PyME Aconcagua",
    badges: ["Demo", "Repo private"],
    description:
      "Demo event landing with a real registration form that works with no client JS (Cloudflare Worker + Resend, native POST).",
    metrics: [
      { label: "Performance", value: "100" },
      { label: "CLS", value: "0" },
      { label: "JS", value: "Minimal" },
    ],
    links: [
      { label: "Live", href: "https://landingdemo1.houdini-dev.workers.dev/" },
    ],
    diagram: true,
  },
  {
    kind: "testimonial",
    number: "03",
    year: "TODO",
    title: "GVE Sistemas",
    badges: ["Not currently live"],
    description: "Client website, built end-to-end.",
    quote: "Trabajar con Camilo Flores fue una experiencia excelente…",
    author: "Gonzalo Toro, CEO, ITQ Internacional",
    links: [],
  },
];

function ProjectLinks({ links }: { links: ProjectLink[] }) {
  if (links.length === 0) return null;
  return (
    <div className="mt-8 flex gap-6">
      {links.map((link) => (
        <a
          key={link.label}
          href={link.href}
          target="_blank"
          rel="noopener"
          className="font-mono text-meta text-ink underline decoration-line underline-offset-4 hover:decoration-ink focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
        >
          {link.label} <span aria-hidden="true">↗</span>
          <span className="sr-only"> (opens in a new tab)</span>
        </a>
      ))}
    </div>
  );
}

// Flujo real del formulario de inscripción del demo: <form> nativo, POST
// directo a un Cloudflare Worker, que dispara el correo vía Resend. SVG
// puro, cero JS -- el mismo hecho que ya cuenta la descripción del
// proyecto, mostrado como diagrama en vez de solo prosa. --accent marca
// el "0 client JS" porque es la decisión de ingeniería real detrás del
// diagrama, no decoración.
function FormFlowDiagram() {
  return (
    // viewBox pensado para el ancho real del contenedor en mobile (~310px,
    // 360px de viewport menos el padding de la sección), no un número
    // redondo arbitrario: a esa medida el factor de escala queda cerca de
    // 1:1 (294 unidades -> ~310px), así el texto se lee al tamaño real de
    // fuente, no reducido por el escalado del SVG. En desktop (max-w-md,
    // 448px) el mismo viewBox escala HACIA ARRIBA, nunca hacia abajo.
    <figure className="mt-8 max-w-md">
      <svg
        viewBox="0 0 294 85"
        role="img"
        aria-label="Diagram: native HTML form POST goes directly to a Cloudflare Worker, which sends the email through Resend. Zero client JavaScript."
        className="w-full"
      >
        <rect
          x="3"
          y="8"
          width="86"
          height="44"
          rx="2"
          vectorEffect="non-scaling-stroke"
          className="fill-none stroke-line"
        />
        {/* Marcador de origen: único punto --accent en los 3 nodos, marca
            dónde arranca el flujo (sin JS). No se repite en los otros dos. */}
        <circle cx="3" cy="8" r="2" className="fill-accent" />
        <text
          x="46"
          y="27"
          textAnchor="middle"
          className="fill-ink font-mono text-[11px] uppercase tracking-wide"
        >
          <tspan x="46" dy="0">Native</tspan>
          <tspan x="46" dy="14">&lt;form&gt; POST</tspan>
        </text>

        <text
          x="96.5"
          y="33"
          textAnchor="middle"
          className="fill-ink font-mono text-[11px]"
          aria-hidden="true"
        >
          →
        </text>

        <rect
          x="104"
          y="8"
          width="86"
          height="44"
          rx="2"
          vectorEffect="non-scaling-stroke"
          className="fill-none stroke-line"
        />
        <text
          x="147"
          y="27"
          textAnchor="middle"
          className="fill-ink font-mono text-[11px] uppercase tracking-wide"
        >
          <tspan x="147" dy="0">Cloudflare</tspan>
          <tspan x="147" dy="14">Worker</tspan>
        </text>

        <text
          x="197.5"
          y="33"
          textAnchor="middle"
          className="fill-ink font-mono text-[11px]"
          aria-hidden="true"
        >
          →
        </text>

        <rect
          x="205"
          y="8"
          width="86"
          height="44"
          rx="2"
          vectorEffect="non-scaling-stroke"
          className="fill-none stroke-line"
        />
        <text
          x="248"
          y="34"
          textAnchor="middle"
          className="fill-ink font-mono text-[11px] uppercase tracking-wide"
        >
          Resend
        </text>

        <line
          x1="3"
          y1="68"
          x2="20"
          y2="68"
          vectorEffect="non-scaling-stroke"
          className="stroke-accent"
        />
        <text
          x="26"
          y="72"
          className="fill-accent font-mono text-[11px] uppercase tracking-wide"
        >
          0 client JS
        </text>
      </svg>
    </figure>
  );
}

export default function SelectedWork() {
  return (
    <section
      id="work"
      aria-labelledby="selected-work-heading"
      className="px-6 pt-20 pb-20 sm:px-10 sm:pt-28 sm:pb-28"
    >
      <h2
        id="selected-work-heading"
        className="font-display text-display mb-12 sm:mb-16"
      >
        Selected work
      </h2>
      <ol className="flex flex-col gap-16 sm:gap-24">
        {projects.map((project) => (
          <li
            key={project.number}
            className="project-reveal border-t border-line pt-8 sm:pt-12"
          >
            <div className="flex flex-wrap items-baseline gap-4">
              <span className="font-mono text-project-number text-ink tabular-nums">
                {project.number}
              </span>
              <span className="font-mono text-meta text-ink uppercase tracking-wide">
                {project.year}
              </span>
              {project.badges?.map((badge) => (
                <span
                  key={badge}
                  className="rounded-sm border border-flag px-2 py-0.5 font-mono text-micro text-flag uppercase tracking-wide"
                >
                  {badge}
                </span>
              ))}
            </div>

            <h3 className="font-display text-display mt-6">
              {project.title}
            </h3>

            <p className="font-body text-body-lg text-ink mt-4 max-w-2xl">
              {project.description}
            </p>

            {project.kind === "shipped" ? (
              <dl className="mt-8 flex flex-col gap-6 sm:flex-row sm:gap-12">
                {project.metrics.map((metric) => (
                  <div key={metric.label} className="flex flex-col gap-1">
                    <dt className="font-mono text-meta text-ink uppercase tracking-wide">
                      {metric.label}
                    </dt>
                    <dd className="font-body text-body text-ink tabular-nums">
                      {metric.value}
                    </dd>
                  </div>
                ))}
              </dl>
            ) : (
              <blockquote className="mt-8 border-l-2 border-line pl-6">
                <p className="font-mono text-meta text-ink uppercase tracking-wide">
                  Client testimonial (original in Spanish):
                </p>
                <p className="font-body text-body-lg text-ink mt-2 italic">
                  “{project.quote}”
                </p>
                <cite className="mt-2 block font-mono text-meta text-ink not-italic">
                  — {project.author}
                </cite>
              </blockquote>
            )}

            <ProjectLinks links={project.links} />
            {project.kind === "shipped" && project.diagram ? (
              <FormFlowDiagram />
            ) : null}
          </li>
        ))}
      </ol>
    </section>
  );
}
