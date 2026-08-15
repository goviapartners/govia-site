"use server";

import { headers } from "next/headers";
import { z } from "zod";
import { getDb, isPgError } from "@/lib/db";
import { sendWhitepaperEmail } from "@/lib/resend";
import { POLITICA_PRIVACIDAD_VERSION } from "@/lib/legal";

const LeadSchema = z.object({
  nombre: z.string().trim().min(2, "Ingresa tu nombre completo."),
  email: z.string().trim().email("Ingresa un email válido."),
  empresa: z.string().trim().min(2, "Ingresa el nombre de tu empresa."),
  // Checkbox 1 — obligatorio, gatea el envío (política de privacidad +
  // consentimiento para enviar el whitepaper).
  consentimiento_lpdp: z
    .string()
    .nullish()
    .refine((v) => v === "on", "Debes aceptar la Política de Privacidad para continuar."),
  // Checkbox 2 — opcional, NO gatea el envío (opt-in a comunicaciones comerciales).
  // .nullish() (no solo .optional()): un checkbox sin marcar NO aparece en
  // FormData, así que formData.get() devuelve null, no undefined.
  acepta_comunicaciones_comerciales: z.string().nullish(),
});

export type SubmitLeadState = {
  status: "idle" | "success" | "error";
  message?: string;
};

export async function submitLead(
  _prevState: SubmitLeadState,
  formData: FormData
): Promise<SubmitLeadState> {
  const parsed = LeadSchema.safeParse({
    nombre: formData.get("nombre"),
    email: formData.get("email"),
    empresa: formData.get("empresa"),
    consentimiento_lpdp: formData.get("consentimiento_lpdp"),
    acepta_comunicaciones_comerciales: formData.get("acepta_comunicaciones_comerciales"),
  });

  if (!parsed.success) {
    return {
      status: "error",
      message: parsed.error.issues[0]?.message ?? "Revisa los datos del formulario.",
    };
  }

  const { nombre, email, empresa, acepta_comunicaciones_comerciales } = parsed.data;

  // Evidencia de consentimiento (Reglamento D.S. 016-2024-JUS art. 9 — la
  // carga de la prueba del consentimiento recae en Govia, no en el titular).
  const requestHeaders = await headers();
  const consentimientoIp =
    requestHeaders.get("x-forwarded-for")?.split(",")[0]?.trim() ?? null;

  const sql = getDb();
  try {
    await sql`
      INSERT INTO leads_whitepaper
        (nombre, email, empresa, fuente, consentimiento_lpdp, acepta_comunicaciones_comerciales, politica_version, consentimiento_ip)
      VALUES
        (${nombre}, ${email}, ${empresa}, 'LinkedIn-serie-git-datagovops', true,
         ${acepta_comunicaciones_comerciales === "on"}, ${POLITICA_PRIVACIDAD_VERSION}, ${consentimientoIp})
    `;
  } catch (err) {
    // 23505 = email duplicado (ya tiene el PDF) → tratarlo como éxito silencioso,
    // cualquier otro error de Postgres sí se reporta al usuario.
    if (!isPgError(err) || err.code !== "23505") {
      return {
        status: "error",
        message: "No pudimos registrar tu descarga. Intenta de nuevo en unos minutos.",
      };
    }
  }

  // El envío de email nunca bloquea el éxito de la captura del lead — ya
  // está en la DB, que es la parte crítica. Un fallo de Resend solo se
  // loguea server-side (ver src/lib/resend.ts).
  await sendWhitepaperEmail({
    nombre,
    email,
    downloadUrl: process.env.WHITEPAPER_DOWNLOAD_URL,
  });

  return { status: "success" };
}
