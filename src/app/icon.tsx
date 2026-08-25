import { ImageResponse } from "next/og";

// Mismo patrón que opengraph-image.tsx: generado una vez en build (requerido
// por `output: 'export'`), no en cada request.
export const dynamic = "force-static";
export const size = { width: 32, height: 32 };
export const contentType = "image/png";

// Mismos tokens de §6 (modo claro), literales -- ImageResponse no lee CSS
// custom properties.
const PAPER = "#f6f6f4";
const ACCENT = "#0b6670";

async function loadFont(url: string) {
  const res = await fetch(url);
  return res.arrayBuffer();
}

// Un solo glifo, no "CF": a 16x16 efectivos (el tamaño real de pestaña) dos
// letras se vuelven una mancha ilegible -- probado en el render final, no
// asumido (ver nota de verificación en la conversación). Migrado de Space
// Grotesk a Oswald 700 (25 ago 2026, CLAUDE.md §6) para seguir el sistema
// tipográfico del sitio; legibilidad a 16x16 re-verificada tras el cambio.
// Fondo --accent en vez de --ink/--paper porque acá el favicon actúa como
// marca, no como texto de sitio: es el mismo uso "de decisión" que ya tiene
// --accent en el resto del sitio, aplicado una sola vez.
export default async function Icon() {
  const oswald = await loadFont(
    "https://fonts.gstatic.com/s/oswald/v57/TK3_WkUHHAIjg75cFRf3bXL8LICs1xZogUE.ttf"
  );

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: ACCENT,
        }}
      >
        <div
          style={{
            display: "flex",
            fontFamily: "Oswald",
            fontWeight: 700,
            fontSize: 24,
            lineHeight: 1,
            color: PAPER,
          }}
        >
          C
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: "Oswald", data: oswald, weight: 700, style: "normal" },
      ],
    }
  );
}
