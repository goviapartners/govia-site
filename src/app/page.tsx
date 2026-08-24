import Link from "next/link";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { ContourLinesProfundo } from "@/components/contour-lines";

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
        {/* Hero — Modo Profundo: la landing es el único registro del sitio
            donde la marca abre en Altiplano a máxima presencia (Altiplano -
            Sistema de Modos §10, tabla de decisión: "Landing ·
            goviapartners.com → Profundo — persuade en tres segundos, la
            textura es el argumento"). El resto de la página vuelve a Caliza:
            es contenido de lectura, no la apertura. */}
        <section className="relative isolate overflow-hidden bg-[#081619]">
          <div className="absolute inset-y-0 left-0 w-1 bg-[#ce7b45]" />
          <ContourLinesProfundo className="absolute inset-0 h-full w-full" />
          <div className="relative mx-auto max-w-3xl px-6 py-24 text-center">
            <h1 className="font-serif text-4xl leading-tight text-[#e8e3d6] sm:text-5xl">
              La arquitectura de la confianza.
            </h1>
            <p className="mx-auto mt-6 max-w-xl text-lg text-[#93a5a3]">
              Convertimos deuda de datos en activos estratégicos que habilitan
              IA confiable — sin alucinaciones ni riesgos legales.
            </p>
            <div className="mt-10 flex justify-center gap-4">
              <Link
                href="/whitepaper-git"
                className="rounded-sm bg-[#ce7b45] px-6 py-3 font-semibold text-[#081619] transition-colors hover:bg-[#e09a63]"
              >
                Leer el whitepaper
              </Link>
              <Link
                href="#contacto"
                className="rounded-sm border border-[#93a5a3] px-6 py-3 font-semibold text-[#e8e3d6] transition-colors hover:bg-[#e8e3d6] hover:text-[#081619]"
              >
                Conversemos
              </Link>
            </div>
          </div>
        </section>

        {/* Quiénes somos */}
        <section className="bg-[#f5f2ea]">
          <div className="mx-auto max-w-3xl px-6 py-20">
            <h2 className="font-serif text-3xl text-[#0a1416]">
              Quiénes somos
            </h2>
            <p className="mt-6 text-base leading-relaxed text-[#0a1416]/70">
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
        <section className="bg-[#dad4c4]">
          <div className="mx-auto max-w-4xl px-6 py-20">
            <h2 className="font-serif text-3xl text-[#0a1416]">
              Tres líneas, una arquitectura
            </h2>
            <div className="mt-10 grid gap-6 sm:grid-cols-3">
              {LINEAS.map((linea) => (
                <div
                  key={linea.nombre}
                  className="rounded-sm border-t-4 border-[#ce7b45] bg-[#f5f2ea] p-6"
                >
                  <h3 className="font-serif text-xl text-[#0a1416]">
                    {linea.nombre}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-[#0a1416]/70">
                    {linea.descripcion}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Portafolio — FlowPrep (producto distinto, audiencia distinta) */}
        <section className="bg-[#f5f2ea]">
          <div className="mx-auto max-w-3xl px-6 py-16">
            <div className="rounded-sm border border-[#dad4c4] p-8 text-center sm:p-10">
              <p className="font-mono text-xs uppercase tracking-widest text-[#8f5022]">
                También en el portafolio de Govia
              </p>
              <h2 className="mt-3 font-serif text-2xl text-[#0a1416]">
                Certificación DAMA-DMBOK para tu equipo
              </h2>
              <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-[#0a1416]/70">
                FlowPrep prepara a profesionales de datos para la certificación
                CDMP — el mismo estándar DAMA-DMBOK que gobierna nuestro
                trabajo de consultoría. Es un producto propio, separado de
                nuestros servicios de gobierno de datos.
              </p>
              <a
                href={process.env.NEXT_PUBLIC_FLOWPREP_URL ?? "https://flowprep-data.vercel.app"}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 inline-block rounded-sm border border-[#0a1416] px-6 py-2.5 text-sm font-semibold text-[#0a1416] transition-colors hover:bg-[#0a1416] hover:text-[#e8e3d6]"
              >
                Conocer FlowPrep
              </a>
            </div>
          </div>
        </section>

        {/* Contacto */}
        <section id="contacto" className="bg-[#e8e3d6]">
          <div className="mx-auto max-w-2xl px-6 py-24 text-center">
            <h2 className="font-serif text-3xl text-[#0a1416]">Conversemos</h2>
            <p className="mt-4 text-base text-[#0a1416]/70">
              Cuéntanos en qué etapa de gobierno de datos está tu organización.
            </p>
            <a
              href="mailto:contacto@goviapartners.com"
              className="mt-8 inline-block rounded-sm bg-[#8f5022] px-8 py-3 font-semibold text-[#f5f2ea] transition-colors hover:bg-[#ce7b45]"
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
