import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "Govia Partners — La arquitectura de la confianza";

export default async function OpengraphImage() {
  const [dmSerif, dmSansRegular, dmSansMedium] = await Promise.all([
    readFile(join(process.cwd(), "src/fonts/DMSerifDisplay-Regular.ttf")),
    readFile(join(process.cwd(), "src/fonts/DMSans-Regular.ttf")),
    readFile(join(process.cwd(), "src/fonts/DMSans-Medium.ttf")),
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
          background: "#F4F0E6",
          fontFamily: "DM Sans",
        }}
      >
        <svg width="88" height="88" viewBox="1 11 176 176" style={{ marginBottom: 28 }}>
          <path d="M 100 20 A 80 80 0 1 1 20.4 58" fill="none" stroke="#1A3A7A" strokeWidth="16" strokeLinecap="round" />
          <path d="M 20.4 58 A 80 80 0 0 1 100 20" fill="none" stroke="#C9952A" strokeWidth="16" strokeLinecap="round" />
          <line x1="100" y1="100" x2="150" y2="100" stroke="#1A3A7A" strokeWidth="14" strokeLinecap="round" />
          <line x1="150" y1="100" x2="150" y2="126" stroke="#1A3A7A" strokeWidth="14" strokeLinecap="round" />
          <circle cx="100" cy="100" r="16" fill="#C9952A" />
          <circle cx="150" cy="100" r="9" fill="#C9952A" />
        </svg>
        <div
          style={{
            fontFamily: "DM Serif Display",
            fontSize: 72,
            color: "#0F1F4A",
            letterSpacing: "-0.01em",
          }}
        >
          Govia Partners
        </div>
        <div
          style={{
            marginTop: 20,
            fontSize: 30,
            color: "#3A4866",
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
            color: "#9C7A3A",
            textTransform: "uppercase",
            letterSpacing: "0.12em",
          }}
        >
          <span>DataGovOps</span>
          <span style={{ color: "#C9952A" }}>·</span>
          <span>CDO Fraccional</span>
          <span style={{ color: "#C9952A" }}>·</span>
          <span>Trust Architecture</span>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: "DM Serif Display", data: dmSerif, weight: 400, style: "normal" },
        { name: "DM Sans", data: dmSansRegular, weight: 400, style: "normal" },
        { name: "DM Sans", data: dmSansMedium, weight: 500, style: "normal" },
      ],
    }
  );
}
