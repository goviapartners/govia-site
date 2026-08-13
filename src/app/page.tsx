import Link from "next/link";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";

/*
 * DRAFT — copy placeholder pendiente de revisión por @growth-hacker.
 * Ver SESSION_PENDING Bloque AH — el home no tiene bloqueante LPDP (no captura
 * datos) y puede publicarse ya; solo falta que growth-hacker reemplace este
 * texto por el copy final de marca.
 */

const LINEAS = [
  {
    nombre: "Cartografía del Dato",
    descripcion:
      "Diagnóstico del territorio antes de proponer la ruta: linaje, calidad y propietarios de tus Critical Data Elements.",
  },
  {
    nombre: "DataGovOps",
    descripcion:
      "Gobierno de datos operado como disciplina continua, no como proyecto de una sola vez: reglas, circuit breakers de calidad y auditoría viva.",
  },
  {
    nombre: "CDO Fraccional",
    descripcion:
      "Liderazgo de datos senior a tiempo parcial para organizaciones que necesitan gobernanza real sin el costo de un CDO de planta.",
  },
];

export default function HomePage() {
  return (
    <>
      <SiteHeader />
      <main className="flex-1">
        {/* Hero */}
        <section className="bg-[#f4f0e6]">
          <div className="mx-auto max-w-3xl px-6 py-24 text-center">
            <h1 className="font-serif text-4xl leading-tight text-[#0f1f4a] sm:text-5xl">
              La arquitectura de la confianza.
            </h1>
            <p className="mx-auto mt-6 max-w-xl text-lg text-[#3a4866]">
              Convertimos deuda de datos en activos estratégicos que habilitan
              IA confiable — sin alucinaciones ni riesgos legales.
            </p>
            <div className="mt-10 flex justify-center gap-4">
              <Link
                href="/whitepaper-git"
                className="rounded-sm bg-[#c9952a] px-6 py-3 font-semibold text-[#0f1f4a] transition-colors hover:bg-[#e8b84a]"
              >
                Leer el whitepaper
              </Link>
              <Link
                href="#contacto"
                className="rounded-sm border border-[#0f1f4a] px-6 py-3 font-semibold text-[#0f1f4a] transition-colors hover:bg-[#0f1f4a] hover:text-[#f4f0e6]"
              >
                Conversemos
              </Link>
            </div>
          </div>
        </section>

        {/* Quiénes somos */}
        <section className="bg-[#fdfcf9]">
          <div className="mx-auto max-w-3xl px-6 py-20">
            <h2 className="font-serif text-3xl text-[#0f1f4a]">
              Quiénes somos
            </h2>
            <p className="mt-6 text-base leading-relaxed text-[#3a4866]">
              Govia Partners es una firma de gobierno de datos e IA. Trabajamos
              como el Cartógrafo del Dato: conocemos el territorio antes de
              proponer la ruta. Enseñamos antes de vender, y cuantificamos el
              riesgo antes de proponer la inversión — para directorios, CDOs y
              equipos de datos que necesitan que su IA sea auditable, no solo
              impresionante en demo.
            </p>
          </div>
        </section>

        {/* Propuesta de valor */}
        <section className="bg-[#ece6d6]">
          <div className="mx-auto max-w-4xl px-6 py-20">
            <h2 className="font-serif text-3xl text-[#0f1f4a]">
              Tres líneas, una arquitectura
            </h2>
            <div className="mt-10 grid gap-6 sm:grid-cols-3">
              {LINEAS.map((linea) => (
                <div
                  key={linea.nombre}
                  className="rounded-sm border-t-4 border-[#c9952a] bg-[#fdfcf9] p-6"
                >
                  <h3 className="font-serif text-xl text-[#0f1f4a]">
                    {linea.nombre}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-[#3a4866]">
                    {linea.descripcion}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Contacto */}
        <section id="contacto" className="bg-[#f4f0e6]">
          <div className="mx-auto max-w-2xl px-6 py-24 text-center">
            <h2 className="font-serif text-3xl text-[#0f1f4a]">Conversemos</h2>
            <p className="mt-4 text-base text-[#3a4866]">
              Cuéntanos en qué etapa de gobierno de datos está tu organización.
            </p>
            <a
              href="mailto:contacto@goviapartners.com"
              className="mt-8 inline-block rounded-sm bg-[#0f1f4a] px-8 py-3 font-semibold text-[#f4f0e6] transition-colors hover:bg-[#1a3a7a]"
            >
              contacto@goviapartners.com
            </a>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
