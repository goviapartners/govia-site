"use server";

import { headers } from "next/headers";
import { z } from "zod";
import { getSupabaseServerClient } from "@/lib/supabase-server";
import { sendTMSResultEmail } from "@/lib/resend";
import { POLITICA_PRIVACIDAD_VERSION } from "@/lib/legal";
import { calculateTMSScores, getGapProfile, TMS_QUESTIONS } from "@/lib/tms-data";
import type { TMSAnswers, TMSBenchmark, TMSScores } from "@/types/tms";

const RegistrationSchema = z.object({
  nombre: z.string().trim().min(2, "Ingresa tu nombre completo."),
  email: z.string().trim().email("Ingresa un email válido."),
  empresa: z.string().trim().min(2, "Ingresa el nombre de tu empresa."),
  industria: z.enum([
    "mining",
    "construction",
    "finance",
    "retail",
    "health",
    "education",
    "government",
    "other",
  ]),
  tamano_empresa: z.enum(["<50", "50-200", "201-1000", "1001-5000", ">5000"]),
  // Checkbox 1 — obligatorio, gatea el envío.
  consentimiento_lpdp: z.boolean().refine((v) => v === true, "Debes aceptar la Política de Privacidad para continuar."),
  // Checkbox 2 — opcional, NO gatea el envío.
  acepta_comunicaciones_comerciales: z.boolean(),
});

const SubmitSchema = z.object({
  registration: RegistrationSchema,
  answers: z.record(z.string(), z.number().min(1).max(5)),
});

export type SubmitTMSResult =
  | { status: "success"; scores: TMSScores; gapProfile: string; benchmark: TMSBenchmark }
  | { status: "error"; message: string };

export async function submitTMSAssessment(input: {
  registration: {
    nombre: string;
    email: string;
    empresa: string;
    industria: string;
    tamano_empresa: string;
    consentimiento_lpdp: boolean;
    acepta_comunicaciones_comerciales: boolean;
  };
  answers: TMSAnswers;
}): Promise<SubmitTMSResult> {
  const parsed = SubmitSchema.safeParse(input);
  if (!parsed.success) {
    return {
      status: "error",
      message: parsed.error.issues[0]?.message ?? "Revisa los datos del formulario.",
    };
  }

  const { registration, answers } = parsed.data;

  if (Object.keys(answers).length !== TMS_QUESTIONS.length) {
    return { status: "error", message: "Responde las 21 preguntas antes de continuar." };
  }

  // Scores calculados en el servidor — nunca se confía en un score enviado
  // por el cliente (podría manipularse antes del submit).
  const scores = calculateTMSScores(answers);
  const gapProfile = getGapProfile(scores);

  const requestHeaders = await headers();
  const consentimientoIp = requestHeaders.get("x-forwarded-for")?.split(",")[0]?.trim() ?? null;

  const supabase = getSupabaseServerClient();
  const { error: insertError } = await supabase.from("tms_assessments").insert({
    nombre: registration.nombre,
    email: registration.email,
    empresa: registration.empresa,
    industria: registration.industria,
    tamano_empresa: registration.tamano_empresa,
    fd_score: scores.fd_score,
    mg_score: scores.mg_score,
    ec_score: scores.ec_score,
    cc_score: scores.cc_score,
    fd_norm: scores.fd_norm,
    mg_norm: scores.mg_norm,
    ec_norm: scores.ec_norm,
    cc_norm: scores.cc_norm,
    tms: scores.tms,
    maturity_level: scores.maturity_level,
    gap_profile: gapProfile,
    respuestas: answers,
    consentimiento_lpdp: true,
    acepta_comunicaciones_comerciales: registration.acepta_comunicaciones_comerciales,
    politica_version: POLITICA_PRIVACIDAD_VERSION,
    consentimiento_ip: consentimientoIp,
  });

  if (insertError) {
    console.error("[tms/submit] Supabase error:", insertError.message);
    return {
      status: "error",
      message: "No pudimos guardar tu diagnóstico. Intenta de nuevo en unos minutos.",
    };
  }

  // Benchmark agregado — best-effort, un fallo no debe bloquear el resultado.
  let benchmark: TMSBenchmark = { overall_avg: 0, count: 0, industry_avg: null, industry_count: 0 };
  const { data: benchData, error: benchError } = await supabase.rpc("get_tms_benchmark", {
    p_industria: registration.industria,
  });
  if (!benchError && benchData?.[0]) {
    const row = benchData[0];
    benchmark = {
      overall_avg: Number(row.overall_avg ?? 0),
      count: Number(row.overall_count ?? 0),
      industry_avg: row.industria_avg !== null ? Number(row.industria_avg) : null,
      industry_count: Number(row.industria_count ?? 0),
    };
  }

  // Email de resultados — nunca bloquea el éxito de la captura (ya está en
  // Supabase, que es la parte crítica). Un fallo de Resend solo se loguea.
  await sendTMSResultEmail({
    nombre: registration.nombre,
    email: registration.email,
    scores,
    gapProfile,
  });

  return { status: "success", scores, gapProfile, benchmark };
}
