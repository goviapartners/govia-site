"use server";

import { z } from "zod";
import { getSupabaseServerClient } from "@/lib/supabase-server";

const LeadSchema = z.object({
  nombre: z.string().trim().min(2, "Ingresa tu nombre completo."),
  email: z.string().trim().email("Ingresa un email válido."),
  empresa: z.string().trim().min(2, "Ingresa el nombre de tu empresa."),
  consentimiento_lpdp: z
    .string()
    .refine((v) => v === "on", "Debes aceptar el consentimiento para continuar."),
});

export type SubmitLeadState = {
  status: "idle" | "success" | "error";
  message?: string;
  downloadUrl?: string;
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
  });

  if (!parsed.success) {
    return {
      status: "error",
      message: parsed.error.issues[0]?.message ?? "Revisa los datos del formulario.",
    };
  }

  const { nombre, email, empresa } = parsed.data;

  const supabase = getSupabaseServerClient();
  const { error } = await supabase.from("leads_whitepaper").insert({
    nombre,
    email,
    empresa,
    fuente: "LinkedIn-serie-git-datagovops",
    consentimiento_lpdp: true,
  });

  if (error) {
    // Unique violation on email → trátalo como éxito silencioso (ya tiene el PDF).
    if (error.code === "23505") {
      return {
        status: "success",
        downloadUrl: process.env.NEXT_PUBLIC_WHITEPAPER_URL,
      };
    }
    return {
      status: "error",
      message: "No pudimos registrar tu descarga. Intenta de nuevo en unos minutos.",
    };
  }

  // TODO (pre go-live): disparar email transaccional (Resend) con link firmado
  // en vez de exponer NEXT_PUBLIC_WHITEPAPER_URL directo — ver spec §3.
  return {
    status: "success",
    downloadUrl: process.env.NEXT_PUBLIC_WHITEPAPER_URL,
  };
}
