import type { Metadata } from "next";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { ContourLinesCaliza } from "@/components/contour-lines";
import { LeadForm } from "./lead-form";

const title = "Git para DataGovOps — Whitepaper | Govia Partners";
const description =
  "Cómo aplicar disciplina de control de versiones al gobierno de datos. Descarga el whitepaper de Govia Partners.";

export const metadata: Metadata = {
  title,
  description,
  openGraph: { title, description, images: ["/opengraph-image"] },
  twitter: { card: "summary_large_image", title, description, images: ["/opengraph-image"] },
};

/*
 * DRAFT — bullets y hero copy pendientes del PDF final (@growth-hacker,
 * SESSION_PENDING Bloque AH entregable 1+2). NO quitar el gate de
 * NEXT_PUBLIC_LANDING_LIVE hasta que PDF + copy + política LPDP estén
 * cerrados (spec §5, §7 — ruta crítica).
 */
const IDEAS = [
  "Por qué un dataset sin historial de cambios es tan riesgoso como código sin control de versiones.",
  "El equivalente de un \"commit\" para una regla de calidad de datos.",
  "Cómo un \"diff\" de esquema previene incidentes de gobernanza antes de producción.",
  "Branching como patrón para probar cambios de gobierno sin romper el dato en producción.",
  "Qué significa \"blame\" aplicado a un Critical Data Element mal gobernado.",
  "El caso de negocio para tratar las políticas de datos como código versionado.",
  "Cómo Govia aplica este patrón dentro de Odysseus, su propia plataforma de gobierno.",
];

const isLandingLive = process.env.NEXT_PUBLIC_LANDING_LIVE === "true";

export default function WhitepaperGitPage() {
  return (
    <>
      <SiteHeader />
      <main className="flex-1">
        {isLandingLive ? <LandingLive /> : <ComingSoon />}
      </main>
      <SiteFooter />
    </>
  );
}

function ComingSoon() {
  return (
    <section className="relative overflow-hidden bg-[#e8e3d6]">
      <ContourLinesCaliza className="absolute inset-x-0 top-0 h-24 w-full" />
      <div className="relative mx-auto max-w-2xl px-6 py-28 text-center">
        <h1 className="font-serif text-3xl text-[#0a1416] sm:text-4xl">
          "Git para DataGovOps" — próximamente
        </h1>
        <p className="mt-6 text-base text-[#0a1416]/70">
          Estamos terminando el whitepaper. Escríbenos y te avisamos apenas
          esté disponible para descarga.
        </p>
        <a
          href="mailto:contacto@goviapartners.com?subject=Aviso%20whitepaper%20Git%20para%20DataGovOps"
          className="mt-8 inline-block rounded-sm bg-[#8f5022] px-6 py-3 font-semibold text-[#f5f2ea] transition-colors hover:bg-[#ce7b45]"
        >
          Avísenme cuando esté listo
        </a>
      </div>
    </section>
  );
}

function LandingLive() {
  return (
    <>
      <section className="relative overflow-hidden bg-[#e8e3d6]">
        <ContourLinesCaliza className="absolute inset-x-0 top-0 h-24 w-full" />
        <div className="relative mx-auto grid max-w-5xl gap-12 px-6 py-20 sm:grid-cols-2 sm:items-center">
          <div>
            <p className="font-mono text-xs uppercase tracking-widest text-[#8f5022]">
              Whitepaper gratuito
            </p>
            <h1 className="mt-3 font-serif text-4xl leading-tight text-[#0a1416]">
              Git para DataGovOps
            </h1>
            <p className="mt-4 text-base leading-relaxed text-[#0a1416]/70">
              Control de versiones no es solo para código. Aplica los mismos
              principios que hicieron a Git indispensable en ingeniería de
              software a tu gobierno de datos — y deja de tratar tus políticas
              como documentos que nadie versiona ni audita.
            </p>
            <ul className="mt-8 space-y-3">
              {IDEAS.map((idea) => (
                <li
                  key={idea}
                  className="flex gap-3 text-sm text-[#0a1416]/70"
                >
                  <span className="mt-0.5 font-mono text-[#ce7b45]">→</span>
                  <span>{idea}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-sm border border-[#dad4c4] bg-[#f5f2ea] p-6">
            <LeadForm />
          </div>
        </div>
      </section>
    </>
  );
}
