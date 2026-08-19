import { ImageResponse } from "next/og";

// Requerido por `output: 'export'`: la imagen se genera una vez en build,
// como archivo estático -- no en cada request.
export const dynamic = "force-static";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Mismos tokens de §6 (modo claro) -- ImageResponse no puede leer las CSS
// custom properties del sitio, así que van literales acá.
const PAPER = "#f6f6f4";
const INK = "#16181d";
const LINE = "#e3e3e0";
const ACCENT = "#0b6670";

async function loadFont(url: string) {
  const res = await fetch(url);
  return res.arrayBuffer();
}

export default async function Image() {
  const [spaceGrotesk, ibmPlexMono] = await Promise.all([
    loadFont(
      "https://fonts.gstatic.com/s/spacegrotesk/v22/V8mQoQDjQSkFtoMM3T6r8E7mF71Q-gOoraIAEj4PVksj.ttf"
    ),
    loadFont(
      "https://fonts.gstatic.com/s/ibmplexmono/v20/-F6qfjptAgt5VM-kVkqdyU8n3twJ8lc.ttf"
    ),
  ]);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px 96px",
          backgroundColor: PAPER,
          color: INK,
        }}
      >
        <div
          style={{
            display: "flex",
            fontFamily: "IBM Plex Mono",
            fontSize: 22,
            fontWeight: 500,
            letterSpacing: 2,
            textTransform: "uppercase",
            color: INK,
            opacity: 0.6,
          }}
        >
          Web Developer
        </div>

        <div
          style={{
            display: "flex",
            fontFamily: "Space Grotesk",
            fontSize: 96,
            fontWeight: 700,
            lineHeight: 1.05,
            marginTop: 20,
          }}
        >
          Camilo Flores
        </div>

        <div
          style={{
            display: "flex",
            marginTop: 44,
            paddingTop: 32,
            borderTop: `1px solid ${LINE}`,
            fontFamily: "IBM Plex Mono",
            fontSize: 28,
            fontWeight: 500,
            color: ACCENT,
          }}
        >
          fast, accessible websites — by hand
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: "Space Grotesk", data: spaceGrotesk, weight: 700, style: "normal" },
        { name: "IBM Plex Mono", data: ibmPlexMono, weight: 500, style: "normal" },
      ],
    }
  );
}
