const facts = [
  { label: "Focus", value: "performance & accessibility" },
  { label: "Stack", value: "Next.js · React · TypeScript" },
  { label: "Based in", value: "Chile · Open to remote work" },
];

export default function Hero() {
  return (
    <section className="hero-reveal flex flex-1 flex-col justify-center gap-8 px-6 py-12 sm:px-10">
      <p className="font-mono text-meta text-ink uppercase tracking-wide">
        Web Developer
      </p>
      <h1 className="font-display text-hero max-w-4xl text-balance">
        I build fast, accessible websites — by <span className="text-accent">hand</span>.
      </h1>
      <dl className="flex flex-col gap-6 sm:flex-row sm:gap-12">
        {facts.map((fact) => (
          <div key={fact.label} className="flex flex-col gap-1">
            <dt className="font-mono text-meta text-ink uppercase tracking-wide">
              {fact.label}
            </dt>
            <dd className="font-body text-body text-ink">{fact.value}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
