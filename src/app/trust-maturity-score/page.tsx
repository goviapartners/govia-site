import type { Metadata } from "next";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import TMSAssessmentForm from "@/components/tms-assessment-form";

const title = "Trust Maturity Score — Diagnóstico gratuito de madurez de datos | Govia Partners";
const description =
  "21 preguntas. 4 pilares. Descubre tu Trust Maturity Score (TMS) y el cuello de botella de datos de tu organización. Diagnóstico gratuito basado en el TAF de Govia Partners.";

export const metadata: Metadata = {
  title,
  description,
  openGraph: { title, description, images: ["/opengraph-image"] },
  twitter: { card: "summary_large_image", title, description, images: ["/opengraph-image"] },
};

const isAssessmentLive = process.env.NEXT_PUBLIC_ASSESSMENT_LIVE === "true";

export default function TrustMaturityScorePage() {
  return (
    <>
      <SiteHeader />
      <main className="flex-1">{isAssessmentLive ? <TMSAssessmentForm /> : <ComingSoon />}</main>
      <SiteFooter />
    </>
  );
}

function ComingSoon() {
  return (
    <section className="bg-[#e8e3d6]">
      <div className="mx-auto max-w-2xl px-6 py-28 text-center">
        <h1 className="font-serif text-3xl text-[#0a1416] sm:text-4xl">
          Trust Maturity Score — próximamente
        </h1>
        <p className="mt-6 text-base text-[#0a1416]/70">
          Estamos afinando el diagnóstico. Escríbenos y te avisamos apenas esté disponible.
        </p>
        <a
          href="mailto:contacto@goviapartners.com?subject=Aviso%20Trust%20Maturity%20Score"
          className="mt-8 inline-block rounded-sm bg-[#8f5022] px-6 py-3 font-semibold text-[#f5f2ea] transition-colors hover:bg-[#ce7b45]"
        >
          Avísenme cuando esté listo
        </a>
      </div>
    </section>
  );
}
