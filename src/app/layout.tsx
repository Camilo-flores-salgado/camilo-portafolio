import type { Metadata } from "next";
import { IBM_Plex_Mono, IBM_Plex_Sans, Space_Grotesk } from "next/font/google";
import { SITE_URL } from "@/lib/site";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-display",
  subsets: ["latin"],
  weight: "700",
});

const ibmPlexSans = IBM_Plex_Sans({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["400", "500"],
});

const ibmPlexMono = IBM_Plex_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: "500",
});

const title = "Camilo Flores — Web Developer";
const description =
  "Web developer building fast, accessible websites — by hand. Portfolio and selected work.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title,
  description,
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title,
    description,
    url: SITE_URL,
    siteName: "Camilo Flores",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
  },
};

// Anti-parpadeo del override manual de tema (§6, 19 ago 2026). Crudo, sin
// next/script, mismo criterio que el resto de los <script> de este archivo.
// Corre en <head>, antes que cualquier otra cosa: si hay preferencia
// guardada, aplica la clase ANTES de que el navegador pinte nada. Si no
// hay nada guardado, no toca el DOM y manda la media query de siempre.
const themeInitScript = `
try {
  var t = localStorage.getItem("theme");
  if (t) document.documentElement.classList.add(t);
} catch (e) {}
`;

// Gesto para quien abre devtools -- la audiencia técnica real del sitio.
// Inline, sin componente de cliente ni estado: es la única línea de JS
// propio del sitio, a propósito, y se mide en bytes exactos (§5).
const devConsoleScript = `
console.log("%cCamilo Flores — Web Developer", "font-size:14px;font-weight:700;color:#0B6670;");
console.log("Most of this page's JS is React itself, not mine. Check the Network tab.");
console.log("houdini.dev@outlook.com\\ngithub.com/Camilo-flores-salgado");
`;

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Camilo Flores",
  jobTitle: "Web Developer",
  url: SITE_URL,
  address: {
    "@type": "PostalAddress",
    addressCountry: "CL",
  },
  email: "houdini.dev@outlook.com",
  sameAs: [
    "https://github.com/Camilo-flores-salgado",
    "https://linkedin.com/in/camilo-flores",
  ],
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${spaceGrotesk.variable} ${ibmPlexSans.variable} ${ibmPlexMono.variable}`}
      suppressHydrationWarning
    >
      <head>
        <script
          id="theme-init"
          dangerouslySetInnerHTML={{ __html: themeInitScript }}
        />
      </head>
      <body className="bg-paper text-ink font-body antialiased">
        <a
          href="#main-content"
          className="sr-only focus-visible:not-sr-only focus-visible:fixed focus-visible:top-4 focus-visible:left-4 focus-visible:z-50 focus-visible:border focus-visible:border-line focus-visible:bg-paper focus-visible:px-4 focus-visible:py-2 focus-visible:font-mono focus-visible:text-meta focus-visible:text-ink focus-visible:uppercase focus-visible:tracking-wide focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
        >
          Skip to content
        </a>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
        <script dangerouslySetInnerHTML={{ __html: devConsoleScript }} />
        {children}
      </body>
    </html>
  );
}
