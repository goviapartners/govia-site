import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";

/*
 * DRAFT — placeholder. La política real la redacta @especialista-lpdp
 * (spec-landing-whitepaper-git.md §5, §6 entregable 3: "NO existe → se crea
 * desde cero"). NO activar NEXT_PUBLIC_LANDING_LIVE hasta reemplazar esto.
 */
export default function PrivacidadPage() {
  return (
    <>
      <SiteHeader />
      <main className="flex-1 bg-[#fdfcf9]">
        <div className="mx-auto max-w-2xl px-6 py-20">
          <h1 className="font-serif text-3xl text-[#0f1f4a]">
            Política de privacidad
          </h1>
          <p className="mt-6 text-sm text-[#3a4866]">
            Esta página es un placeholder. La política de privacidad de Govia
            Partners (Ley 29733 + D.S. 016-2024-JUS, cláusula de
            consentimiento, derechos ARCO y flujo transfronterizo
            Vercel/Supabase) está en redacción por @especialista-lpdp. El
            formulario de la landing permanece deshabilitado
            (<code>NEXT_PUBLIC_LANDING_LIVE=false</code>) hasta que este
            contenido sea reemplazado por el texto final aprobado.
          </p>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
