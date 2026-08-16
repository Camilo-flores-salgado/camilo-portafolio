const paragraphs = [
  <>
    Camilo builds{" "}
    <span className="font-medium text-accent">close to the platform</span>:
    native CSS before animation libraries, semantic HTML before ARIA
    patches, measured performance instead of assumed performance.
  </>,
  "This site follows the same rule. Every metric on it is measured, not estimated.",
  "He currently works full-time as a web developer at a Chilean technology company with international presence.",
  "Based in San Felipe, in Chile's Aconcagua valley.",
];

export default function About() {
  return (
    <section
      id="about"
      aria-labelledby="about-heading"
      className="project-reveal px-6 pt-20 pb-20 sm:px-10 sm:pt-28 sm:pb-28"
    >
      <h2 id="about-heading" className="font-display text-display mb-8 sm:mb-12">
        About
      </h2>
      <div className="flex max-w-2xl flex-col gap-4">
        {paragraphs.map((paragraph, index) => (
          <p key={index} className="font-body text-body-lg text-ink">
            {paragraph}
          </p>
        ))}
      </div>
    </section>
  );
}
