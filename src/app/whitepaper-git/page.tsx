import type { Metadata } from "next";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { LeadForm } from "./lead-form";

export const metadata: Metadata = {
  title: "Git para DataGovOps — Whitepaper | Govia Partners",
  description:
    "Cómo aplicar disciplina de control de versiones al gobierno de datos. Descarga el whitepaper de Govia Partners.",
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
    <section className="bg-[#f4f0e6]">
      <div className="mx-auto max-w-2xl px-6 py-28 text-center">
        <h1 className="font-serif text-3xl text-[#0f1f4a] sm:text-4xl">
          "Git para DataGovOps" — próximamente
        </h1>
        <p className="mt-6 text-base text-[#3a4866]">
          Estamos terminando el whitepaper. Escríbenos y te avisamos apenas
          esté disponible para descarga.
        </p>
        <a
          href="mailto:contacto@goviapartners.com?subject=Aviso%20whitepaper%20Git%20para%20DataGovOps"
          className="mt-8 inline-block rounded-sm bg-[#0f1f4a] px-6 py-3 font-semibold text-[#f4f0e6] transition-colors hover:bg-[#1a3a7a]"
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
      <section className="bg-[#f4f0e6]">
        <div className="mx-auto grid max-w-5xl gap-12 px-6 py-20 sm:grid-cols-2 sm:items-center">
          <div>
            <p className="font-mono text-xs uppercase tracking-widest text-[#0e8478]">
              Whitepaper gratuito
            </p>
            <h1 className="mt-3 font-serif text-4xl leading-tight text-[#0f1f4a]">
              Git para DataGovOps
            </h1>
            <p className="mt-4 text-base leading-relaxed text-[#3a4866]">
              Control de versiones no es solo para código. Aplica los mismos
              principios que hicieron a Git indispensable en ingeniería de
              software a tu gobierno de datos — y deja de tratar tus políticas
              como documentos que nadie versiona ni audita.
            </p>
            <ul className="mt-8 space-y-3">
              {IDEAS.map((idea) => (
                <li
                  key={idea}
                  className="flex gap-3 text-sm text-[#3a4866]"
                >
                  <span className="mt-0.5 font-mono text-[#c9952a]">→</span>
                  <span>{idea}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-sm border border-[#ece6d6] bg-[#fdfcf9] p-6">
            <LeadForm />
          </div>
        </div>
      </section>
    </>
  );
}
