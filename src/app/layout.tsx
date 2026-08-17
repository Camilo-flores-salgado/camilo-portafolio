import type { Metadata } from "next";
import { IBM_Plex_Mono, IBM_Plex_Sans, Space_Grotesk } from "next/font/google";
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

// TODO: title y description finales (§13) — copy real llega en un prompt siguiente
export const metadata: Metadata = {
  title: "TODO: page title (§13)",
  description: "TODO: meta description (§13)",
};

// Gesto para quien abre devtools -- la audiencia técnica real del sitio.
// Inline, sin componente de cliente ni estado: es la única línea de JS
// propio del sitio, a propósito, y se mide en bytes exactos (§5).
const devConsoleScript = `
console.log("%cCamilo Flores — Web Developer", "font-size:14px;font-weight:700;color:#0B6670;");
console.log("Most of this page's JS is React itself, not mine. Check the Network tab.");
console.log("houdini.dev@outlook.com\\ngithub.com/r3ckleszz1");
`;

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Camilo Flores",
  jobTitle: "Web Developer",
  address: {
    "@type": "PostalAddress",
    addressLocality: "San Felipe",
    addressCountry: "CL",
  },
  email: "houdini.dev@outlook.com",
  sameAs: [
    "https://github.com/r3ckleszz1",
    "https://linkedin.com/in/camilo-flores",
  ],
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${spaceGrotesk.variable} ${ibmPlexSans.variable} ${ibmPlexMono.variable}`}
    >
      <body className="bg-paper text-ink font-body antialiased">
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
