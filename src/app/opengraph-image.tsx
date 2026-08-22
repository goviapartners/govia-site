import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "Govia Partners — La arquitectura de la confianza";

// next/og (Satori) no soporta woff2 (solo ttf/otf/woff) — a diferencia del
// resto del sitio, que sí puede usar los .woff2 de Altiplano vía next/font/local.
// Estos .ttf son una conversión local (fonttools) de los mismos archivos
// variables, solo para este generador de imagen.
export default async function OpengraphImage() {
  const [bodoniModa, spaceGroteskRegular, spaceGroteskMedium] = await Promise.all([
    readFile(join(process.cwd(), "src/fonts/BodoniModa-400.ttf")),
    readFile(join(process.cwd(), "src/fonts/SpaceGrotesk-400.ttf")),
    readFile(join(process.cwd(), "src/fonts/SpaceGrotesk-500.ttf")),
  ]);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "#E8E3D6",
          fontFamily: "Space Grotesk",
        }}
      >
        <svg width="88" height="88" viewBox="1 11 176 176" style={{ marginBottom: 28 }}>
          <path d="M 100 20 A 80 80 0 1 1 20.4 58" fill="none" stroke="#0A1416" strokeWidth="16" strokeLinecap="round" />
          <path d="M 20.4 58 A 80 80 0 0 1 100 20" fill="none" stroke="#8F5022" strokeWidth="16" strokeLinecap="round" />
          <line x1="100" y1="100" x2="150" y2="100" stroke="#0A1416" strokeWidth="14" strokeLinecap="round" />
          <line x1="150" y1="100" x2="150" y2="126" stroke="#0A1416" strokeWidth="14" strokeLinecap="round" />
          <circle cx="100" cy="100" r="16" fill="#8F5022" />
          <circle cx="150" cy="100" r="9" fill="#8F5022" />
        </svg>
        <div
          style={{
            fontFamily: "Bodoni Moda",
            fontSize: 72,
            color: "#0A1416",
            letterSpacing: "-0.01em",
          }}
        >
          Govia Partners
        </div>
        <div
          style={{
            marginTop: 20,
            fontSize: 30,
            color: "#0A1416",
            opacity: 0.7,
          }}
        >
          La arquitectura de la confianza.
        </div>
        <div
          style={{
            marginTop: 40,
            display: "flex",
            gap: 14,
            fontSize: 18,
            fontWeight: 500,
            color: "#8F5022",
            textTransform: "uppercase",
            letterSpacing: "0.12em",
          }}
        >
          <span>DataGovOps</span>
          <span style={{ color: "#CE7B45" }}>·</span>
          <span>CDO Fraccional</span>
          <span style={{ color: "#CE7B45" }}>·</span>
          <span>Trust Architecture</span>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: "Bodoni Moda", data: bodoniModa, weight: 400, style: "normal" },
        { name: "Space Grotesk", data: spaceGroteskRegular, weight: 400, style: "normal" },
        { name: "Space Grotesk", data: spaceGroteskMedium, weight: 500, style: "normal" },
      ],
    }
  );
}
