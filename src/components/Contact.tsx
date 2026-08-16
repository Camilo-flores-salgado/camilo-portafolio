type ContactPoint = {
  label: string;
  value: string;
  href: string;
  external?: boolean;
  download?: boolean;
  emphasis?: boolean;
};

const contactPoints: ContactPoint[] = [
  {
    label: "Email",
    value: "houdini.dev@outlook.com",
    href: "mailto:houdini.dev@outlook.com",
    emphasis: true,
  },
  {
    label: "GitHub",
    value: "github.com/r3ckleszz1",
    href: "https://github.com/r3ckleszz1",
    external: true,
  },
  {
    label: "LinkedIn",
    value: "linkedin.com/in/camilo-flores",
    href: "https://linkedin.com/in/camilo-flores",
    external: true,
  },
  {
    label: "Resume",
    value: "Download CV (PDF)",
    href: "/cv-camilo-flores.pdf",
    download: true,
  },
];

export default function Contact() {
  return (
    // pb-32: sección de cierre de la página (§9) -- el revelado
    // (.project-reveal, animation-range: entry 0% contain 50%, ver
    // globals.css) necesita scroll disponible debajo para completarse, igual
    // que en Selected work y About.
    <section
      id="contact"
      aria-labelledby="contact-heading"
      className="project-reveal px-6 pt-20 pb-32 sm:px-10 sm:pt-28"
    >
      <h2
        id="contact-heading"
        className="font-display text-display mb-8 sm:mb-12"
      >
        Contact
      </h2>
      <p className="font-body text-body-lg text-ink max-w-2xl">
        No contact form. Every channel below goes straight through.
      </p>
      <dl className="mt-12 flex flex-col gap-8 sm:mt-16 sm:gap-10">
        {contactPoints.map((point) => (
          <div key={point.label} className="flex flex-col gap-1">
            <dt className="font-mono text-meta text-ink uppercase tracking-wide">
              {point.label}
            </dt>
            <dd>
              <a
                href={point.href}
                target={point.external ? "_blank" : undefined}
                rel={point.external ? "noopener" : undefined}
                download={point.download ? true : undefined}
                className={
                  point.emphasis
                    ? "font-body text-body-lg text-ink underline decoration-line underline-offset-4 hover:decoration-ink focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
                    : "font-mono text-meta text-ink underline decoration-line underline-offset-4 hover:decoration-ink focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
                }
              >
                {point.value}
                {point.external ? (
                  <>
                    {" "}
                    <span aria-hidden="true">↗</span>
                    <span className="sr-only"> (opens in a new tab)</span>
                  </>
                ) : null}
              </a>
            </dd>
          </div>
        ))}
      </dl>
      <p className="font-mono text-micro text-ink mt-16 border-t border-line pt-8 sm:mt-20">
        © {new Date().getFullYear()} Camilo Flores
      </p>
    </section>
  );
}
