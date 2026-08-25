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
// letras en Space Grotesk se vuelven una mancha ilegible -- probado en el
// render final, no asumido (ver nota de verificación en la conversación).
// Fondo --accent en vez de --ink/--paper porque acá el favicon actúa como
// marca, no como texto de sitio: es el mismo uso "de decisión" que ya tiene
// --accent en el resto del sitio, aplicado una sola vez.
export default async function Icon() {
  const spaceGrotesk = await loadFont(
    "https://fonts.gstatic.com/s/spacegrotesk/v22/V8mQoQDjQSkFtoMM3T6r8E7mF71Q-gOoraIAEj4PVksj.ttf"
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
            fontFamily: "Space Grotesk",
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
        { name: "Space Grotesk", data: spaceGrotesk, weight: 700, style: "normal" },
      ],
    }
  );
}
