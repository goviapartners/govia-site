import type { Metadata } from "next";
import localFont from "next/font/local";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";

// Self-hosted (no build-time fetch to Google Fonts — avoids CDN flakiness
// on every Vercel deploy). Brand Book v1.0: DM Sans + DM Serif Display +
// JetBrains Mono. Files: ~/.govia/.claude/skills/diseno-govia/SKILL.md §3.
const dmSans = localFont({
  variable: "--font-dm-sans",
  src: [
    { path: "../fonts/DMSans-Regular.ttf", weight: "400", style: "normal" },
    { path: "../fonts/DMSans-Italic.ttf", weight: "400", style: "italic" },
    { path: "../fonts/DMSans-Medium.ttf", weight: "500", style: "normal" },
    { path: "../fonts/DMSans-Bold.ttf", weight: "700", style: "normal" },
  ],
});

const dmSerifDisplay = localFont({
  variable: "--font-dm-serif-display",
  src: [
    { path: "../fonts/DMSerifDisplay-Regular.ttf", weight: "400", style: "normal" },
    { path: "../fonts/DMSerifDisplay-Italic.ttf", weight: "400", style: "italic" },
  ],
});

const jetBrainsMono = localFont({
  variable: "--font-jetbrains-mono",
  src: [
    { path: "../fonts/JetBrainsMono-400.ttf", weight: "400", style: "normal" },
    { path: "../fonts/JetBrainsMono-500.ttf", weight: "500", style: "normal" },
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
      className={`${dmSans.variable} ${dmSerifDisplay.variable} ${jetBrainsMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-[#F4F0E6] text-[#0F1F4A] font-sans">
        {children}
        <Analytics />
      </body>
    </html>
  );
}
