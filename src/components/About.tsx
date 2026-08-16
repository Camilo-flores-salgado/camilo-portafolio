const paragraphs = [
  "Camilo builds close to the platform: native CSS before animation libraries, semantic HTML before ARIA patches, measured performance instead of assumed performance.",
  "This site follows the same rule. Every metric on it is measured, not estimated.",
  "He currently works full-time as a web developer at a Chilean technology company with international presence.",
  "Based in San Felipe, in Chile's Aconcagua valley.",
];

export default function About() {
  return (
    // pb-64: misma razón que en SelectedWork.tsx — About es la última
    // sección hasta que exista "Contact", y su revelado (.project-reveal,
    // animation-range: entry 0% contain 50%) necesita ~100px de scroll
    // disponibles después de ella para completarse. Se puede angostar o
    // quitar cuando "Contact" quede debajo.
    <section
      id="about"
      aria-labelledby="about-heading"
      className="project-reveal px-6 pt-20 pb-64 sm:px-10 sm:pt-28"
    >
      <h2 id="about-heading" className="font-display text-display mb-8 sm:mb-12">
        About
      </h2>
      <div className="flex max-w-2xl flex-col gap-4">
        {paragraphs.map((paragraph) => (
          <p key={paragraph} className="font-body text-body-lg text-ink">
            {paragraph}
          </p>
        ))}
      </div>
    </section>
  );
}
