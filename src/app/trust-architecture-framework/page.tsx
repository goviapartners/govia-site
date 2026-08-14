import type { Metadata } from "next";
import Link from "next/link";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";

const title = "Trust Architecture Framework (TAF) | Govia Partners";
const description =
  "El TAF mide y eleva la madurez de confianza de datos de una organización en 4 pilares y 5 niveles. Conoce el Trust Maturity Score (TMS) de Govia Partners.";

export const metadata: Metadata = {
  title,
  description,
  openGraph: { title, description, images: ["/opengraph-image"] },
  twitter: { card: "summary_large_image", title, description, images: ["/opengraph-image"] },
};

const PILARES = [
  {
    nombre: "Fundación de Datos",
    descripcion:
      "La base técnica sin la cual todo lo demás es teatro: calidad, linaje, catálogo e integración de los activos de datos críticos.",
  },
  {
    nombre: "Motor de Gobierno",
    descripcion:
      "Los mecanismos que sostienen la confianza en el tiempo: roles con autoridad real, políticas con consecuencias, procesos que funcionan bajo presión.",
  },
  {
    nombre: "Escudo de Cumplimiento",
    descripcion:
      "La capa que protege la confianza frente al entorno regulatorio — LPDP, gobernanza de IA, auditoría — no como obligación, sino como señal de que se puede confiar en la organización.",
  },
  {
    nombre: "Capital de Confianza",
    descripcion:
      "El resultado que le importa a la dirección: cuánto confían clientes, reguladores, empleados e inversores en cómo la organización gestiona sus datos. Se mide con el Trust Maturity Score (TMS).",
  },
];

const NIVELES = [
  {
    nombre: "Datos Caóticos",
    score: "0–20",
    descripcion:
      "Nadie sabe exactamente qué datos tiene la organización ni de dónde vienen. Cada área tiene su propia \"verdad\".",
  },
  {
    nombre: "Datos Controlados",
    score: "21–40",
    descripcion:
      "Existen algunas reglas, pero nadie las sigue de forma consistente entre áreas.",
  },
  {
    nombre: "Datos Gobernados",
    score: "41–65",
    descripcion:
      "Hay un sistema de gobernanza funcionando, pero los datos aún no son un activo estratégico.",
  },
  {
    nombre: "Datos Confiables",
    score: "66–85",
    descripcion:
      "Los líderes usan sus datos para decisiones que importan, sin necesidad de \"validar primero\".",
  },
  {
    nombre: "Trust Architecture",
    score: "86–100",
    descripcion:
      "La confianza en los datos es un diferenciador competitivo medible, no solo un estado de cumplimiento.",
  },
];

const DEUDAS = [
  {
    nombre: "Deuda de Decisión",
    descripcion:
      "Decisiones equivocadas tomadas con datos incorrectos. El costo es invisible hasta que explota.",
  },
  {
    nombre: "Deuda Regulatoria",
    descripcion:
      "Incumplimientos que se acumulan en silencio. En Perú, la LPDP ya tiene mecanismos de sanción activos.",
  },
  {
    nombre: "Deuda de IA",
    descripcion:
      "Proyectos de inteligencia artificial que fracasan no porque la tecnología falle, sino porque los datos que los alimentan no son confiables.",
  },
];

export default function TafPage() {
  return (
    <>
      <SiteHeader />
      <main className="flex-1">
        {/* Hero */}
        <section className="bg-[#f4f0e6]">
          <div className="mx-auto max-w-3xl px-6 py-24 text-center">
            <p className="font-mono text-xs uppercase tracking-widest text-[#0e8478]">
              Metodología propietaria de Govia Partners
            </p>
            <h1 className="mt-3 font-serif text-4xl leading-tight text-[#0f1f4a] sm:text-5xl">
              Trust Architecture Framework
            </h1>
            <p className="mx-auto mt-6 max-w-xl text-lg text-[#3a4866]">
              El TAF es el modelo que usamos para medir, diseñar y elevar la
              madurez de confianza de datos de una organización — en cuatro
              pilares y cinco niveles.
            </p>
            <div className="mt-10 flex flex-wrap justify-center gap-4">
              <Link
                href="#contacto"
                className="rounded-sm bg-[#c9952a] px-6 py-3 font-semibold text-[#0f1f4a] transition-colors hover:bg-[#e8b84a]"
              >
                Conversemos
              </Link>
              <Link
                href="/whitepaper-git"
                className="rounded-sm border border-[#0f1f4a] px-6 py-3 font-semibold text-[#0f1f4a] transition-colors hover:bg-[#0f1f4a] hover:text-[#f4f0e6]"
              >
                Leer el whitepaper
              </Link>
            </div>
          </div>
        </section>

        {/* Qué es un Trust Architect */}
        <section className="bg-[#fdfcf9]">
          <div className="mx-auto max-w-3xl px-6 py-20">
            <h2 className="font-serif text-3xl text-[#0f1f4a]">
              No gobernamos datos. Diseñamos organizaciones confiables.
            </h2>
            <p className="mt-6 text-base leading-relaxed text-[#3a4866]">
              La gobernanza de datos tradicional resuelve el problema de
              ayer: demasiados sistemas, demasiada confusión. El problema de
              hoy es distinto — es un problema de confianza. Un modelo de IA
              es tan confiable como los datos que lo alimentan, y la mayoría
              de organizaciones en LATAM acumulan Deuda de Confianza sin
              saberlo.
            </p>
            <p className="mt-4 text-base leading-relaxed text-[#3a4866]">
              Un Trust Architect no llega a revisar políticas y entregar un
              informe. Llega a preguntar por qué las personas de una
              organización no confían en sus propios datos — y qué tendría
              que cambiar en la cultura, los procesos, la tecnología y los
              incentivos para que sí confiaran. La confianza en los datos no
              es un estado técnico. Es un estado organizacional: requiere
              trazabilidad, responsabilidad, contexto y consistencia. No se
              logra con una herramienta. Se diseña.
            </p>
          </div>
        </section>

        {/* 4 Pilares */}
        <section className="bg-[#ece6d6]">
          <div className="mx-auto max-w-4xl px-6 py-20">
            <h2 className="font-serif text-3xl text-[#0f1f4a]">
              Los cuatro pilares del TAF
            </h2>
            <p className="mt-4 max-w-2xl text-base leading-relaxed text-[#3a4866]">
              Cada nivel de madurez se construye interviniendo los cuatro
              pilares al mismo tiempo. Avanzar en uno solo, sin los otros,
              crea una madurez frágil.
            </p>
            <div className="mt-10 grid gap-6 sm:grid-cols-2">
              {PILARES.map((pilar) => (
                <div
                  key={pilar.nombre}
                  className="rounded-sm border-t-4 border-[#c9952a] bg-[#fdfcf9] p-6"
                >
                  <h3 className="font-serif text-xl text-[#0f1f4a]">
                    {pilar.nombre}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-[#3a4866]">
                    {pilar.descripcion}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 5 Niveles de madurez */}
        <section className="bg-[#f4f0e6]">
          <div className="mx-auto max-w-3xl px-6 py-20">
            <h2 className="font-serif text-3xl text-[#0f1f4a]">
              Cinco niveles de madurez de confianza
            </h2>
            <p className="mt-4 text-base leading-relaxed text-[#3a4866]">
              El Trust Maturity Score (TMS) ubica a una organización en uno
              de cinco niveles, de 0 a 100 puntos.
            </p>
            <div className="mt-10 space-y-4">
              {NIVELES.map((nivel, i) => (
                <div
                  key={nivel.nombre}
                  className="flex flex-col gap-2 rounded-sm border border-[#ece6d6] bg-[#fdfcf9] p-6 sm:flex-row sm:items-center sm:gap-6"
                >
                  <div className="shrink-0 font-mono text-sm text-[#c9952a]">
                    {nivel.score}
                  </div>
                  <div>
                    <h3 className="font-serif text-lg text-[#0f1f4a]">
                      Nivel {i + 1} — {nivel.nombre}
                    </h3>
                    <p className="mt-1 text-sm leading-relaxed text-[#3a4866]">
                      {nivel.descripcion}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Deuda de Confianza */}
        <section className="bg-[#fdfcf9]">
          <div className="mx-auto max-w-3xl px-6 py-20">
            <h2 className="font-serif text-3xl text-[#0f1f4a]">
              La Deuda de Confianza
            </h2>
            <p className="mt-6 text-base leading-relaxed text-[#3a4866]">
              Cada vez que una organización decide con datos que no son
              confiables, acumula Deuda de Confianza. La mayoría de
              organizaciones en LATAM acumulan las tres formas a la vez — no
              por descuido, sino porque nadie les ha mostrado el costo real
              de no resolverlo.
            </p>
            <ul className="mt-8 space-y-4">
              {DEUDAS.map((deuda) => (
                <li key={deuda.nombre} className="flex gap-3 text-sm text-[#3a4866]">
                  <span className="mt-0.5 font-mono text-[#c9952a]">→</span>
                  <span>
                    <span className="font-semibold text-[#0f1f4a]">
                      {deuda.nombre}:
                    </span>{" "}
                    {deuda.descripcion}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* CTA final */}
        <section id="contacto" className="bg-[#ece6d6]">
          <div className="mx-auto max-w-2xl px-6 py-24 text-center">
            <h2 className="font-serif text-3xl text-[#0f1f4a]">
              ¿En qué nivel está tu organización?
            </h2>
            <p className="mt-4 text-base leading-relaxed text-[#3a4866]">
              Nuestra Trust Cartography mide el Trust Maturity Score de tu
              organización en 4 a 6 semanas y entrega una hoja de ruta
              priorizada para avanzar de nivel.
            </p>
            <a
              href="mailto:contacto@goviapartners.com"
              className="mt-8 inline-block rounded-sm bg-[#0f1f4a] px-8 py-3 font-semibold text-[#f4f0e6] transition-colors hover:bg-[#1a3a7a]"
            >
              contacto@goviapartners.com
            </a>
            <p className="mt-10 text-xs text-[#3a4866]/70">
              El Trust Architecture Framework (TAF) es una metodología
              propietaria de Govia Partners.
            </p>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
