type ProjectLink = {
  label: "Live" | "Code";
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
  badge?: string;
  description: string;
  metrics: MetricRow[];
  links: ProjectLink[];
};

type TestimonialProject = {
  kind: "testimonial";
  number: string;
  year: string;
  title: string;
  description: string;
  quote: string;
  author: string;
  links: ProjectLink[];
};

type Project = ShippedProject | TestimonialProject;

// TODO(§13): href="TODO" — reemplazar por las URLs reales de Live/Code de
// cada proyecto. Los años y las métricas (Performance/CLS/JS) tampoco están
// medidos todavía — TODO explícito a propósito, nunca un número inventado.
const projects: Project[] = [
  {
    kind: "shipped",
    number: "01",
    year: "TODO",
    title: "camiloflores.cl",
    description:
      "Sales site for a local web-dev practice. No UI framework, no client JS beyond a live load-time meter; the speed is the argument.",
    metrics: [
      { label: "Performance", value: "TODO" },
      { label: "CLS", value: "TODO" },
      { label: "JS", value: "TODO" },
    ],
    links: [
      { label: "Live", href: "TODO" },
      { label: "Code", href: "TODO" },
    ],
  },
  {
    kind: "shipped",
    number: "02",
    year: "TODO",
    title: "Encuentro PyME Aconcagua",
    badge: "Demo",
    description:
      "Demo event landing with a real registration form that works with no client JS (Cloudflare Worker + Resend, native POST).",
    metrics: [
      { label: "Performance", value: "TODO" },
      { label: "CLS", value: "TODO" },
      { label: "JS", value: "TODO" },
    ],
    links: [
      { label: "Live", href: "TODO" },
      { label: "Code", href: "TODO" },
    ],
  },
  {
    kind: "testimonial",
    number: "03",
    year: "TODO",
    title: "GVE Sistemas",
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

export default function SelectedWork() {
  return (
    // pb-64: el revelado del último proyecto (animation-range: ... contain
    // 50%, ver globals.css) necesita ~150px de scroll disponibles debajo de
    // él para completarse. Sin esto es la última sección de la página, así
    // que no hay contenido después que le dé ese margen. Se puede angostar
    // o quitar cuando "About"/"Contact" queden debajo.
    <section
      id="work"
      aria-labelledby="selected-work-heading"
      className="px-6 pt-20 pb-64 sm:px-10 sm:pt-28"
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
              {project.kind === "shipped" && project.badge ? (
                <span className="rounded-sm border border-accent px-2 py-0.5 font-mono text-micro text-accent uppercase tracking-wide">
                  {project.badge}
                </span>
              ) : null}
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
          </li>
        ))}
      </ol>
    </section>
  );
}
