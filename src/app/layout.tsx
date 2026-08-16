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
        {children}
      </body>
    </html>
  );
}
