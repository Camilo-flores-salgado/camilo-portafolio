import type { Metadata } from "next";

// Next ya inyecta su propio <meta name="robots" content="noindex"> en esta
// ruta especial, sin importar el metadata que se declare acá -- agregar un
// segundo `robots` propio solo duplicaba la etiqueta (verificado en el
// build, no asumido).
export const metadata: Metadata = {
  title: "Page not found — Camilo Flores",
  description: "This page doesn't exist. Back to camiloflores' portfolio.",
};

export default function NotFound() {
  return (
    <main className="flex min-h-svh flex-col items-center justify-center px-6 py-12 text-center sm:px-10">
      <p className="font-mono text-meta text-ink uppercase tracking-wide">
        HTTP 404
      </p>
      <h1 className="font-display text-display mt-4 max-w-2xl text-balance">
        This page doesn&apos;t exist.
      </h1>
      <p className="font-body text-body-lg text-ink mt-4 max-w-md">
        The link is broken, or the page moved. Everything else on the site
        is where it should be.
      </p>
      <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:gap-8">
        <a
          href="/"
          className="font-body text-body-lg text-ink underline decoration-line underline-offset-4 hover:decoration-ink focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
        >
          Back to home
        </a>
        <a
          href="/#work"
          className="font-mono text-meta text-ink underline decoration-line underline-offset-4 hover:decoration-ink focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
        >
          Selected work
        </a>
      </div>
    </main>
  );
}
