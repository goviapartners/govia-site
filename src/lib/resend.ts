import { Resend } from "resend";

/**
 * Entrega del whitepaper por email transaccional (spec §3, opción b —
 * recomendada sobre descarga directa: valida que el email es real y abre
 * el canal de follow-up comercial).
 *
 * Modo sandbox (mientras goviapartners.com no esté verificado en Resend):
 * RESEND_FROM_EMAIL debe ser `onboarding@resend.dev`, y Resend solo entrega
 * a la dirección con la que se creó la cuenta de Resend. Una vez verificado
 * el dominio (requiere los mismos registros DNS que el punteo del sitio),
 * cambiar RESEND_FROM_EMAIL a algo en @goviapartners.com — sin más cambios
 * de código.
 */
export async function sendWhitepaperEmail(params: {
  nombre: string;
  email: string;
  downloadUrl?: string;
}) {
  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.RESEND_FROM_EMAIL;

  if (!apiKey || !from) {
    console.warn(
      "[resend] RESEND_API_KEY/RESEND_FROM_EMAIL no configurados — email no enviado."
    );
    return { sent: false as const, reason: "not_configured" as const };
  }

  const resend = new Resend(apiKey);
  const { nombre, email, downloadUrl } = params;

  const cuerpo = downloadUrl
    ? `<p>Hola ${nombre},</p>
       <p>Gracias por tu interés en <strong>Git para DataGovOps</strong>. Aquí tienes tu copia:</p>
       <p><a href="${downloadUrl}" style="display:inline-block;background:#c9952a;color:#0f1f4a;padding:12px 24px;text-decoration:none;font-weight:600;border-radius:2px;">Descargar el whitepaper</a></p>
       <p>— Govia Partners</p>`
    : `<p>Hola ${nombre},</p>
       <p>Gracias por tu interés en <strong>Git para DataGovOps</strong>. Estamos terminando de preparar el PDF — te lo hacemos llegar apenas esté listo.</p>
       <p>— Govia Partners</p>`;

  try {
    const { error } = await resend.emails.send({
      from,
      to: email,
      subject: "Tu whitepaper: Git para DataGovOps",
      html: cuerpo,
    });

    if (error) {
      console.error("[resend] Error al enviar:", error);
      return { sent: false as const, reason: "send_error" as const };
    }
    return { sent: true as const };
  } catch (err) {
    console.error("[resend] Excepción al enviar:", err);
    return { sent: false as const, reason: "exception" as const };
  }
}
