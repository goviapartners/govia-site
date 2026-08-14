import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { POLITICA_PRIVACIDAD_VERSION } from "@/lib/legal";

const title = "Política de Privacidad | Govia Partners";
const description = "Cómo Govia Partners trata los datos personales de quienes visitan e interactúan con este sitio.";

export const metadata = {
  title,
  description,
  openGraph: { title, description, images: ["/opengraph-image"] },
  twitter: { card: "summary_large_image", title, description, images: ["/opengraph-image"] },
};

/*
 * Fuente: ~/.govia/proyectos/_firma_govia/compliance/lpdp/politica-privacidad-goviapartners.md
 * Texto publish-ready confirmado por Edgar 2026-08-13. NO editar el
 * contenido legal aquí sin actualizar también el .md fuente en Drive —
 * es el documento de gobernanza, esta página es su espejo publicado.
 */
export default function PrivacidadPage() {
  return (
    <>
      <SiteHeader />
      <main className="flex-1 bg-[#fdfcf9]">
        <div className="mx-auto max-w-2xl px-6 py-16">
          <h1 className="font-serif text-3xl text-[#0f1f4a] sm:text-4xl">
            Política de Privacidad de Govia Partners
          </h1>
          <p className="mt-2 text-sm text-[#3a4866]">
            Última actualización: 13 de agosto de 2026
          </p>

          <p className="mt-8 text-base leading-relaxed text-[#3a4866]">
            En Govia Partners (&ldquo;Govia Partners&rdquo;, &ldquo;nosotros&rdquo;) respetamos tu
            privacidad y tratamos tus datos personales conforme a la Ley N.º
            29733, Ley de Protección de Datos Personales, y su Reglamento
            aprobado por Decreto Supremo N.º 016-2024-JUS. Esta política
            explica qué datos recopilamos en goviapartners.com, para qué los
            usamos, con quién los compartimos y cómo puedes ejercer tus
            derechos.
          </p>

          <Section title="1. ¿Quiénes somos?">
            <p>
              <strong>Responsable del tratamiento:</strong> GOVIA PARTNERS
              S.A.C.S. (Sociedad por Acciones Cerrada Simplificada)
              <br />
              <strong>RUC:</strong> 20615687082
              <br />
              <strong>Domicilio legal:</strong> Chincha, Ica, Perú
              <br />
              <strong>Contacto para temas de privacidad:</strong>{" "}
              <a href="mailto:privacidad@goviapartners.com" className="underline hover:text-[#0f1f4a]">
                privacidad@goviapartners.com
              </a>
            </p>
            <p>
              No se designa un Oficial de Protección de Datos (DPO) formal
              por el momento; el contacto de privacidad indicado arriba es el
              canal oficial para consultas y ejercicio de derechos. Esta
              decisión se revisará si Govia Partners escala su volumen de
              tratamiento o incorpora datos sensibles.
            </p>
            <p>
              Govia Partners es el titular y responsable del banco de datos
              personales descrito en esta política (ver sección 8).
            </p>
          </Section>

          <Section title="2. ¿Qué datos personales recopilamos y para qué?">
            <p>
              Cuando completas el formulario de descarga de nuestro
              whitepaper en goviapartners.com, recopilamos: nombre, correo
              electrónico y empresa.
            </p>
            <p>
              Usamos estos datos para las siguientes finalidades, que te
              informamos de forma previa y específica antes de que nos los
              entregues:
            </p>
            <ol className="list-decimal space-y-2 pl-5">
              <li>
                <strong>Enviarte el whitepaper solicitado</strong> por correo
                electrónico.
              </li>
              <li>
                <strong>Contactarte con comunicaciones comerciales</strong>{" "}
                de Govia Partners sobre sus servicios de gobierno de datos,
                cumplimiento normativo e inteligencia artificial — solo si
                diste tu autorización expresa para esta segunda finalidad
                (ver sección 3).
              </li>
            </ol>
            <p>
              No usamos estos datos para ninguna finalidad distinta a las
              aquí descritas. Si en el futuro quisiéramos usarlos para otro
              propósito, te lo informaremos y, de ser necesario, te
              pediremos un nuevo consentimiento.
            </p>
          </Section>

          <Section title="3. Base legal del tratamiento">
            <p>
              La base legal de este tratamiento es tu consentimiento previo,
              informado, expreso y libre. El formulario usa{" "}
              <strong>dos casillas separadas</strong>, para que el
              consentimiento a cada finalidad sea independiente y plenamente
              libre:
            </p>
            <ul className="list-disc space-y-2 pl-5">
              <li>
                <strong>Casilla 1 (obligatoria):</strong> aceptación de esta
                Política de Privacidad y consentimiento para el tratamiento
                necesario para enviarte el whitepaper. Sin marcarla, el
                formulario no puede enviarse.
              </li>
              <li>
                <strong>Casilla 2 (opcional):</strong> autorización específica
                para recibir comunicaciones comerciales de Govia Partners. No
                marcarla no te impide recibir el whitepaper.
              </li>
            </ul>
            <p>
              Ninguna de las dos casillas viene pre-marcada. Puedes{" "}
              <strong>revocar tu consentimiento en cualquier momento</strong>,
              sin necesidad de justificar el motivo, escribiendo a{" "}
              <a href="mailto:privacidad@goviapartners.com" className="underline hover:text-[#0f1f4a]">
                privacidad@goviapartners.com
              </a>
              . La revocación no afecta la licitud del tratamiento realizado
              antes de que la comuniques.
            </p>
          </Section>

          <Section title="4. ¿Por cuánto tiempo conservamos tus datos?">
            <p>
              Conservamos tus datos solo por el tiempo necesario para cumplir
              las finalidades descritas en la sección 2: mientras no
              revoques tu consentimiento y, en todo caso, por un máximo de{" "}
              <strong>24 meses desde tu último contacto</strong> con Govia
              Partners. Transcurrido ese plazo sin interacción, tus datos se
              eliminan o anonimizan automáticamente, salvo que exista una
              obligación legal que exija un plazo mayor.
            </p>
          </Section>

          <Section title="5. ¿Con quién compartimos tus datos?">
            <p>
              No vendemos ni cedemos tus datos personales a terceros para
              fines distintos a los descritos en esta política. Sí
              trabajamos con encargados de tratamiento por medios
              tecnológicos tercerizados:
            </p>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse text-sm">
                <thead>
                  <tr className="border-b border-[#ece6d6] text-left">
                    <th className="py-2 pr-4 font-semibold text-[#0f1f4a]">Proveedor</th>
                    <th className="py-2 pr-4 font-semibold text-[#0f1f4a]">Función</th>
                    <th className="py-2 font-semibold text-[#0f1f4a]">Ubicación</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-[#ece6d6]">
                    <td className="py-2 pr-4">Supabase</td>
                    <td className="py-2 pr-4">Almacenamiento de la base de datos de leads</td>
                    <td className="py-2">Estados Unidos</td>
                  </tr>
                  <tr className="border-b border-[#ece6d6]">
                    <td className="py-2 pr-4">Vercel</td>
                    <td className="py-2 pr-4">Hosting y funciones del sitio web</td>
                    <td className="py-2">Estados Unidos</td>
                  </tr>
                  <tr>
                    <td className="py-2 pr-4">Resend</td>
                    <td className="py-2 pr-4">Envío del correo transaccional con el whitepaper</td>
                    <td className="py-2">Estados Unidos</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <h3 className="font-serif text-lg text-[#0f1f4a]">
              Flujo transfronterizo de datos personales
            </h3>
            <p>
              Debido a que Vercel, Supabase y Resend alojan infraestructura
              fuera del Perú (principalmente en Estados Unidos), el
              tratamiento de tus datos implica un flujo transfronterizo de
              datos personales. Estados Unidos no cuenta con una declaración
              de &ldquo;nivel de protección adecuado&rdquo; reconocida de forma
              general por la Autoridad Nacional de Protección de Datos
              Personales del Perú. Por ello, garantizamos esta transferencia
              mediante:
            </p>
            <ul className="list-disc space-y-2 pl-5">
              <li>
                Tu <strong>consentimiento informado y específico</strong> a
                esta transferencia internacional, otorgado junto con el
                consentimiento descrito en la sección 3.
              </li>
              <li>
                <strong>Acuerdos de tratamiento de datos (DPA)</strong> con
                nuestros proveedores, que exigen contractualmente medidas de
                seguridad y confidencialidad equivalentes a las que exige la
                ley peruana.
              </li>
            </ul>
          </Section>

          <Section title="6. Tus derechos">
            <p>
              Como titular de tus datos personales, la Ley N.º 29733 te
              reconoce los siguientes derechos:
            </p>
            <ul className="list-disc space-y-2 pl-5">
              <li>
                <strong>Información:</strong> a ser informado, antes de
                recopilar tus datos, sobre la finalidad del tratamiento,
                quién los tratará, dónde se almacenan y cómo ejercer tus
                derechos — esta misma política cumple ese deber.
              </li>
              <li>
                <strong>Acceso:</strong> a obtener la información sobre ti
                mismo que tratamos, cómo la recopilamos y a quién la hemos
                transferido.
              </li>
              <li>
                <strong>Actualización, inclusión, rectificación y
                supresión:</strong> a corregir datos inexactos, incompletos o
                desactualizados, y a que se eliminen cuando ya no sean
                necesarios o cuando revoques tu consentimiento.
              </li>
              <li>
                <strong>Impedir el suministro:</strong> a impedir que tus
                datos sean entregados a terceros, especialmente cuando ello
                afecte tus derechos fundamentales.
              </li>
              <li>
                <strong>Oposición:</strong> a oponerte al tratamiento de tus
                datos cuando existan motivos fundados y legítimos relativos a
                tu situación personal.
              </li>
            </ul>
            <p>
              <strong>¿Cómo ejercer estos derechos?</strong> Escríbenos a{" "}
              <a href="mailto:privacidad@goviapartners.com" className="underline hover:text-[#0f1f4a]">
                privacidad@goviapartners.com
              </a>{" "}
              indicando tu nombre, el derecho que deseas ejercer y el correo
              con el que nos contactaste originalmente. Responderemos dentro
              del plazo que establece la normativa vigente.
            </p>
          </Section>

          <Section title="7. Medidas de seguridad">
            <p>
              Aplicamos medidas de seguridad técnicas y organizativas
              razonables y proporcionales a la naturaleza de los datos
              tratados, incluyendo cifrado en tránsito y en reposo provisto
              por nuestros proveedores de infraestructura, control de acceso
              restringido a la base de datos, y contratos de confidencialidad
              con los encargados de tratamiento.
            </p>
          </Section>

          <Section title="8. Banco de datos personales">
            <p>
              Tus datos forman parte del banco de datos personales{" "}
              <strong>&ldquo;Leads Comerciales — Govia Partners&rdquo;</strong>, de
              administración privada, creado y de titularidad de GOVIA
              PARTNERS S.A.C.S. Conforme al artículo 42 del Reglamento D.S.
              N.º 016-2024-JUS, este banco de datos está siendo inscrito ante
              el Registro Nacional de Protección de Datos Personales (RNPDP)
              mediante el trámite de aprobación automática previsto en el
              artículo 45.2 del mismo Reglamento.
            </p>
          </Section>

          <Section title="9. Uso por menores de edad">
            <p>
              Este sitio y el whitepaper están dirigidos a un público
              profesional B2B. No dirigimos intencionalmente esta landing a
              menores de edad y no recopilamos deliberadamente datos de
              menores de 18 años.
            </p>
          </Section>

          <Section title="10. Cambios a esta política">
            <p>
              Podemos actualizar esta política para reflejar cambios
              normativos, operativos o de nuestros proveedores. Publicaremos
              la fecha de la última actualización al inicio de este
              documento. Si el cambio es sustancial, te lo comunicaremos por
              correo electrónico si ya tenemos tu contacto.
            </p>
          </Section>

          <Section title="11. Contacto">
            <p>
              Para cualquier consulta sobre esta política o sobre el
              tratamiento de tus datos personales:
              <br />
              <strong>Govia Partners</strong>
              <br />
              Correo:{" "}
              <a href="mailto:privacidad@goviapartners.com" className="underline hover:text-[#0f1f4a]">
                privacidad@goviapartners.com
              </a>
            </p>
            <p>
              Si consideras que tus derechos no fueron atendidos
              adecuadamente, puedes presentar tu reclamo ante la Autoridad
              Nacional de Protección de Datos Personales (ANPD), adscrita al
              Ministerio de Justicia y Derechos Humanos.
            </p>
          </Section>

          <p className="mt-12 text-xs text-[#9c7a3a]">
            Versión de esta política: {POLITICA_PRIVACIDAD_VERSION}
          </p>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mt-10">
      <h2 className="font-serif text-2xl text-[#0f1f4a]">{title}</h2>
      <div className="mt-3 space-y-4 text-base leading-relaxed text-[#3a4866]">
        {children}
      </div>
    </section>
  );
}
