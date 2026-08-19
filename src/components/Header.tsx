import ThemeToggle from "@/components/ThemeToggle";

const links = [
  { label: "GitHub", href: "https://github.com/r3ckleszz1" },
  { label: "LinkedIn", href: "https://linkedin.com/in/camilo-flores" },
];

export default function Header() {
  return (
    <header className="flex items-center justify-between px-6 py-6 sm:px-10">
      <p className="font-display text-nav">Camilo Flores</p>
      <div className="flex items-center gap-6">
        <nav aria-label="External profiles">
          <ul className="flex gap-6">
            {links.map((link) => (
              <li key={link.label}>
                <a
                  href={link.href}
                  target="_blank"
                  rel="noopener"
                  className="font-mono text-meta text-ink underline decoration-line underline-offset-4 hover:decoration-ink focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
                >
                  {link.label} <span aria-hidden="true">↗</span>
                  <span className="sr-only"> (opens in a new tab)</span>
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <ThemeToggle />
      </div>
    </header>
  );
}
