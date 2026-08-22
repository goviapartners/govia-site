import type { Metadata } from "next";
import localFont from "next/font/local";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";

// Self-hosted (no build-time fetch to Google Fonts — avoids CDN flakiness
// on every Vercel deploy). Sistema Altiplano (vigente desde ago-2026):
// Bodoni Moda + Space Grotesk + IBM Plex Mono, reemplaza DM Sans + DM Serif
// Display + JetBrains Mono de Brand Book v1.0.
// Fuente: ~/.govia/.claude/skills/diseno-govia/SKILL.md §3.
const bodoniModa = localFont({
  variable: "--font-bodoni-moda",
  src: [
    { path: "../fonts/BodoniModa-Variable.woff2", weight: "400 900", style: "normal" },
    { path: "../fonts/BodoniModa-Italic-Variable.woff2", weight: "400 900", style: "italic" },
  ],
});

const spaceGrotesk = localFont({
  variable: "--font-space-grotesk",
  src: [{ path: "../fonts/SpaceGrotesk-Variable.woff2", weight: "300 700", style: "normal" }],
});

const ibmPlexMono = localFont({
  variable: "--font-ibm-plex-mono",
  src: [
    { path: "../fonts/IBMPlexMono-400.woff2", weight: "400", style: "normal" },
    { path: "../fonts/IBMPlexMono-500.woff2", weight: "500", style: "normal" },
  ],
});

const description =
  "DataGovOps y CDO Fraccional para convertir deuda de datos en activos estratégicos que habilitan IA confiable.";

export const metadata: Metadata = {
  metadataBase: new URL("https://goviapartners.com"),
  title: "Govia Partners — La arquitectura de la confianza",
  description,
  openGraph: {
    title: "Govia Partners — La arquitectura de la confianza",
    description,
    url: "https://goviapartners.com",
    siteName: "Govia Partners",
    locale: "es_PE",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Govia Partners — La arquitectura de la confianza",
    description,
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="es"
      className={`${bodoniModa.variable} ${spaceGrotesk.variable} ${ibmPlexMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-[#E8E3D6] text-[#0A1416] font-sans">
        {children}
        <Analytics />
      </body>
    </html>
  );
}
