"use client";

import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/cn";
import TMSRadarChart from "./tms-radar-chart";
import { TMS_QUESTIONS_BY_PILAR, TMS_QUESTIONS, LIKERT_LABELS, getTMSColor } from "@/lib/tms-data";
import { submitTMSAssessment, type SubmitTMSResult } from "@/app/trust-maturity-score/actions";
import type { TMSAnswers, TMSScores, TMSBenchmark, TMSIndustry, TMSCompanySize } from "@/types/tms";
import { TMS_PILAR_LABELS, TMS_MATURITY_LABELS, TMS_INDUSTRY_LABELS } from "@/types/tms";
import { ArrowRight, ArrowLeft, CheckCircle2, Loader2, BarChart3, Shield, Database, Users, TrendingUp, Calendar } from "lucide-react";

type FormStep = "register" | "questions" | "calculating" | "result";

const PILAR_ORDER = ["FD", "MG", "EC", "CC"] as const;

const PILAR_ICONS = { FD: Database, MG: Users, EC: Shield, CC: TrendingUp };
const PILAR_COLORS = {
  FD: "text-[#1a3a7a]",
  MG: "text-[#9c7a3a]",
  EC: "text-[#c9952a]",
  CC: "text-[#0e8478]",
};

const INDUSTRY_OPTIONS: { value: TMSIndustry; label: string }[] = [
  { value: "mining", label: "Minería" },
  { value: "construction", label: "Construcción" },
  { value: "finance", label: "Finanzas" },
  { value: "retail", label: "Retail" },
  { value: "health", label: "Salud" },
  { value: "education", label: "Educación" },
  { value: "government", label: "Gobierno" },
  { value: "other", label: "Otro" },
];

const SIZE_OPTIONS: { value: TMSCompanySize; label: string }[] = [
  { value: "<50", label: "Menos de 50 empleados" },
  { value: "50-200", label: "50 – 200 empleados" },
  { value: "201-1000", label: "201 – 1,000 empleados" },
  { value: "1001-5000", label: "1,001 – 5,000 empleados" },
  { value: ">5000", label: "Más de 5,000 empleados" },
];

interface Registration {
  nombre: string;
  email: string;
  empresa: string;
  industria: TMSIndustry;
  tamano_empresa: TMSCompanySize;
  consentimiento_lpdp: boolean;
  acepta_comunicaciones_comerciales: boolean;
}

const EMPTY_REGISTRATION: Registration = {
  nombre: "",
  email: "",
  empresa: "",
  industria: "other",
  tamano_empresa: "<50",
  consentimiento_lpdp: false,
  acepta_comunicaciones_comerciales: false,
};

export default function TMSAssessmentForm() {
  const [step, setStep] = useState<FormStep>("register");
  const [registration, setRegistration] = useState<Registration>(EMPTY_REGISTRATION);
  const [answers, setAnswers] = useState<TMSAnswers>({});
  const [activePilarIndex, setActivePilarIndex] = useState(0);
  const [scores, setScores] = useState<TMSScores | null>(null);
  const [gapProfile, setGapProfile] = useState("");
  const [benchmark, setBenchmark] = useState<TMSBenchmark | null>(null);
  const [submitError, setSubmitError] = useState("");

  const regErrors: Partial<Record<keyof Registration, string>> = {};
  if (!registration.nombre.trim()) regErrors.nombre = "Nombre requerido";
  if (!registration.email.includes("@")) regErrors.email = "Email inválido";
  if (!registration.empresa.trim()) regErrors.empresa = "Empresa requerida";
  if (!registration.consentimiento_lpdp) regErrors.consentimiento_lpdp = "Debes aceptar para continuar";
  const regValid = Object.keys(regErrors).length === 0;

  const currentPilar = PILAR_ORDER[activePilarIndex];
  const currentQuestions = TMS_QUESTIONS_BY_PILAR[currentPilar];
  const answeredInPilar = currentQuestions.filter((q) => answers[q.id] !== undefined).length;
  const pilarComplete = answeredInPilar === currentQuestions.length;
  const totalAnswered = TMS_QUESTIONS.filter((q) => answers[q.id] !== undefined).length;
  const allAnswered = totalAnswered === TMS_QUESTIONS.length;

  const handleAnswer = useCallback((questionId: string, value: number) => {
    setAnswers((prev) => ({ ...prev, [questionId]: value }));
  }, []);

  const handleStartQuestions = () => {
    if (!regValid) return;
    setStep("questions");
    setActivePilarIndex(0);
  };

  const handleNextPilar = () => {
    if (activePilarIndex < PILAR_ORDER.length - 1) {
      setActivePilarIndex((i) => i + 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handlePrevPilar = () => {
    if (activePilarIndex > 0) {
      setActivePilarIndex((i) => i - 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handleSubmit = async () => {
    if (!allAnswered) return;
    setStep("calculating");
    setSubmitError("");

    const result: SubmitTMSResult = await submitTMSAssessment({ registration, answers });

    if (result.status === "error") {
      setSubmitError(result.message);
      setStep("questions");
      return;
    }

    setScores(result.scores);
    setGapProfile(result.gapProfile);
    setBenchmark(result.benchmark);
    setStep("result");
  };

  return (
    <div className="bg-[#f4f0e6]">
      <div className="mx-auto max-w-2xl px-6 py-16">
        <AnimatePresence mode="wait">
          {/* ── PASO: REGISTRO ─────────────────────────────────────────── */}
          {step === "register" && (
            <motion.div key="register" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -16 }} transition={{ duration: 0.3 }}>
              <div className="mb-10 text-center">
                <p className="font-mono text-xs uppercase tracking-widest text-[#0e8478]">
                  Diagnóstico gratuito — 5 minutos
                </p>
                <h1 className="mt-3 font-serif text-3xl leading-tight text-[#0f1f4a] sm:text-4xl">
                  ¿Cuánto confías en los datos de tu organización?
                </h1>
                <p className="mx-auto mt-4 max-w-lg text-base leading-relaxed text-[#3a4866]">
                  21 preguntas. 4 pilares. Un score de 0 a 100 que revela dónde estás y cuál es tu
                  cuello de botella — basado en el Trust Architecture Framework de Govia Partners.
                </p>
              </div>

              <div className="mb-8 grid grid-cols-2 gap-3">
                {PILAR_ORDER.map((pilar) => {
                  const Icon = PILAR_ICONS[pilar];
                  const count = TMS_QUESTIONS_BY_PILAR[pilar].length;
                  return (
                    <div key={pilar} className="flex items-start gap-3 rounded-sm border border-[#ece6d6] bg-[#fdfcf9] p-3.5">
                      <Icon className={cn("mt-0.5 h-4 w-4 shrink-0", PILAR_COLORS[pilar])} />
                      <div>
                        <div className="text-xs font-semibold text-[#0f1f4a]">{TMS_PILAR_LABELS[pilar]}</div>
                        <div className="mt-0.5 text-[11px] text-[#3a4866]">{count} preguntas</div>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="space-y-4 rounded-sm border border-[#ece6d6] bg-[#fdfcf9] p-6">
                <h2 className="mb-1 text-sm font-semibold uppercase tracking-wide text-[#0f1f4a]/80">Tus datos</h2>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className="mb-1.5 block text-xs text-[#3a4866]">Nombre completo *</label>
                    <input
                      type="text"
                      value={registration.nombre}
                      onChange={(e) => setRegistration((r) => ({ ...r, nombre: e.target.value }))}
                      placeholder="María García"
                      className="w-full rounded-sm border border-[#ece6d6] bg-white px-3 py-2.5 text-sm text-[#0f1f4a] placeholder:text-[#3a4866]/40 focus:border-[#c9952a] focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="mb-1.5 block text-xs text-[#3a4866]">Email corporativo *</label>
                    <input
                      type="email"
                      value={registration.email}
                      onChange={(e) => setRegistration((r) => ({ ...r, email: e.target.value }))}
                      placeholder="maria@empresa.com"
                      className="w-full rounded-sm border border-[#ece6d6] bg-white px-3 py-2.5 text-sm text-[#0f1f4a] placeholder:text-[#3a4866]/40 focus:border-[#c9952a] focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="mb-1.5 block text-xs text-[#3a4866]">Empresa *</label>
                  <input
                    type="text"
                    value={registration.empresa}
                    onChange={(e) => setRegistration((r) => ({ ...r, empresa: e.target.value }))}
                    placeholder="Nombre de tu organización"
                    className="w-full rounded-sm border border-[#ece6d6] bg-white px-3 py-2.5 text-sm text-[#0f1f4a] placeholder:text-[#3a4866]/40 focus:border-[#c9952a] focus:outline-none"
                  />
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className="mb-1.5 block text-xs text-[#3a4866]">Industria</label>
                    <select
                      value={registration.industria}
                      onChange={(e) => setRegistration((r) => ({ ...r, industria: e.target.value as TMSIndustry }))}
                      className="w-full rounded-sm border border-[#ece6d6] bg-white px-3 py-2.5 text-sm text-[#0f1f4a] focus:border-[#c9952a] focus:outline-none"
                    >
                      {INDUSTRY_OPTIONS.map((opt) => (
                        <option key={opt.value} value={opt.value}>{opt.label}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="mb-1.5 block text-xs text-[#3a4866]">Tamaño de empresa</label>
                    <select
                      value={registration.tamano_empresa}
                      onChange={(e) => setRegistration((r) => ({ ...r, tamano_empresa: e.target.value as TMSCompanySize }))}
                      className="w-full rounded-sm border border-[#ece6d6] bg-white px-3 py-2.5 text-sm text-[#0f1f4a] focus:border-[#c9952a] focus:outline-none"
                    >
                      {SIZE_OPTIONS.map((opt) => (
                        <option key={opt.value} value={opt.value}>{opt.label}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <p className="pt-2 text-xs leading-relaxed text-[#3a4866]">
                  Al enviar este formulario, GOVIA PARTNERS S.A.C.S. tratará tu nombre, correo,
                  empresa, industria y tamaño de empresa para calcular tu diagnóstico y enviarte
                  los resultados. Los scores agregados y anonimizados podrán usarse en el reporte
                  sectorial &ldquo;Estado de la Madurez de Datos en Empresas Peruanas&rdquo;. Tus
                  datos se almacenan en Supabase y se procesan a través de Vercel y Resend, con
                  infraestructura fuera del Perú (Estados Unidos), bajo garantías contractuales de
                  protección de datos. Puedes ejercer tus derechos de acceso, rectificación,
                  supresión y oposición escribiendo a{" "}
                  <a href="mailto:privacidad@goviapartners.com" className="underline hover:text-[#0f1f4a]">
                    privacidad@goviapartners.com
                  </a>
                  . Más información en nuestra{" "}
                  <a href="/privacidad" target="_blank" rel="noopener noreferrer" className="underline hover:text-[#0f1f4a]">
                    Política de Privacidad
                  </a>
                  .
                </p>

                <label className="flex items-start gap-2 text-xs text-[#3a4866]">
                  <input
                    type="checkbox"
                    checked={registration.consentimiento_lpdp}
                    onChange={(e) => setRegistration((r) => ({ ...r, consentimiento_lpdp: e.target.checked }))}
                    className="mt-0.5"
                  />
                  <span>
                    He leído y acepto la{" "}
                    <a href="/privacidad" target="_blank" rel="noopener noreferrer" className="underline hover:text-[#0f1f4a]">
                      Política de Privacidad
                    </a>
                    . Autorizo a Govia Partners a tratar mis datos para calcular y enviarme mi
                    Trust Maturity Score. *
                  </span>
                </label>

                <label className="flex items-start gap-2 text-xs text-[#3a4866]">
                  <input
                    type="checkbox"
                    checked={registration.acepta_comunicaciones_comerciales}
                    onChange={(e) => setRegistration((r) => ({ ...r, acepta_comunicaciones_comerciales: e.target.checked }))}
                    className="mt-0.5"
                  />
                  <span>
                    Además, quiero recibir comunicaciones comerciales de Govia Partners sobre sus
                    servicios de gobierno de datos y cumplimiento normativo. Puedo darme de baja
                    cuando quiera.
                  </span>
                </label>

                <button
                  onClick={handleStartQuestions}
                  disabled={!regValid}
                  className={cn(
                    "mt-2 flex w-full items-center justify-center gap-2 rounded-sm px-6 py-3 text-sm font-semibold transition-all",
                    regValid
                      ? "bg-[#c9952a] text-[#0f1f4a] hover:bg-[#e8b84a] active:scale-[0.98]"
                      : "cursor-not-allowed bg-[#ece6d6] text-[#3a4866]/60"
                  )}
                >
                  Iniciar Assessment
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            </motion.div>
          )}

          {/* ── PASO: PREGUNTAS ────────────────────────────────────────── */}
          {step === "questions" && (
            <motion.div key={`questions-${activePilarIndex}`} initial={{ opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -24 }} transition={{ duration: 0.25 }}>
              <div className="mb-8">
                <div className="mb-3 flex items-center justify-between">
                  <span className="text-xs text-[#3a4866]">
                    {totalAnswered} de {TMS_QUESTIONS.length} preguntas respondidas
                  </span>
                  <span className="text-xs font-medium text-[#0f1f4a]/60">
                    Pilar {activePilarIndex + 1} de {PILAR_ORDER.length}
                  </span>
                </div>
                <div className="h-1.5 overflow-hidden rounded-full bg-[#ece6d6]">
                  <div className="h-full rounded-full bg-[#c9952a] transition-all duration-500" style={{ width: `${(totalAnswered / TMS_QUESTIONS.length) * 100}%` }} />
                </div>
              </div>

              {(() => {
                const Icon = PILAR_ICONS[currentPilar];
                return (
                  <div className="mb-6 flex items-center gap-3 rounded-sm border border-[#ece6d6] bg-[#fdfcf9] p-4">
                    <Icon className={cn("h-5 w-5 shrink-0", PILAR_COLORS[currentPilar])} />
                    <div>
                      <div className="text-xs uppercase tracking-wide text-[#3a4866]">Pilar {activePilarIndex + 1}</div>
                      <div className="text-sm font-semibold text-[#0f1f4a]">{TMS_PILAR_LABELS[currentPilar]}</div>
                    </div>
                  </div>
                );
              })()}

              <div className="space-y-6">
                {currentQuestions.map((q) => {
                  const answered = answers[q.id];
                  return (
                    <div key={q.id} className="rounded-sm border border-[#ece6d6] bg-[#fdfcf9] p-5">
                      <div className="mb-4 flex items-start gap-3">
                        <span className="mt-0.5 w-8 shrink-0 font-mono text-[11px] font-bold tabular-nums text-[#3a4866]/60">{q.id}</span>
                        <p className="text-sm leading-relaxed text-[#0f1f4a]">{q.text}</p>
                      </div>
                      <div className="space-y-2">
                        {[1, 2, 3, 4, 5].map((val) => (
                          <button
                            key={val}
                            onClick={() => handleAnswer(q.id, val)}
                            className={cn(
                              "flex w-full items-center gap-3 rounded-sm border px-3.5 py-2.5 text-left text-sm transition-all",
                              answered === val
                                ? "border-[#c9952a] bg-[#c9952a]/10 text-[#0f1f4a]"
                                : "border-[#ece6d6] bg-white/60 text-[#3a4866] hover:border-[#c9952a]/40 hover:text-[#0f1f4a]"
                            )}
                          >
                            <span
                              className={cn(
                                "flex h-6 w-6 shrink-0 items-center justify-center rounded-full border-2 text-[11px] font-bold transition-colors",
                                answered === val ? "border-[#c9952a] bg-[#c9952a] text-[#0f1f4a]" : "border-[#ece6d6] text-[#3a4866]"
                              )}
                            >
                              {val}
                            </span>
                            <span className="leading-snug">{LIKERT_LABELS[val]}</span>
                          </button>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>

              {submitError && (
                <div className="mt-4 rounded-sm border border-red-300 bg-red-50 p-3 text-xs text-red-700">{submitError}</div>
              )}

              <div className="mt-8 flex gap-3">
                {activePilarIndex > 0 && (
                  <button onClick={handlePrevPilar} className="flex items-center gap-2 rounded-sm border border-[#0f1f4a]/30 px-5 py-3 text-sm text-[#0f1f4a]/70 transition-all hover:border-[#0f1f4a] hover:text-[#0f1f4a]">
                    <ArrowLeft className="h-4 w-4" />
                    Anterior
                  </button>
                )}

                {activePilarIndex < PILAR_ORDER.length - 1 ? (
                  <button
                    onClick={handleNextPilar}
                    disabled={!pilarComplete}
                    className={cn(
                      "flex flex-1 items-center justify-center gap-2 rounded-sm px-5 py-3 text-sm font-semibold transition-all",
                      pilarComplete ? "bg-[#c9952a] text-[#0f1f4a] hover:bg-[#e8b84a]" : "cursor-not-allowed bg-[#ece6d6] text-[#3a4866]/60"
                    )}
                  >
                    Siguiente pilar
                    <ArrowRight className="h-4 w-4" />
                  </button>
                ) : (
                  <button
                    onClick={handleSubmit}
                    disabled={!allAnswered}
                    className={cn(
                      "flex flex-1 items-center justify-center gap-2 rounded-sm px-5 py-3 text-sm font-semibold transition-all",
                      allAnswered ? "bg-[#c9952a] text-[#0f1f4a] hover:bg-[#e8b84a]" : "cursor-not-allowed bg-[#ece6d6] text-[#3a4866]/60"
                    )}
                  >
                    Calcular mi TMS
                    <BarChart3 className="h-4 w-4" />
                  </button>
                )}
              </div>
            </motion.div>
          )}

          {/* ── PASO: CALCULANDO ───────────────────────────────────────── */}
          {step === "calculating" && (
            <motion.div key="calculating" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex min-h-[400px] flex-col items-center justify-center gap-5">
              <Loader2 className="h-10 w-10 animate-spin text-[#c9952a]" />
              <p className="text-sm text-[#3a4866]">Calculando tu Trust Maturity Score…</p>
            </motion.div>
          )}

          {/* ── PASO: RESULTADO ────────────────────────────────────────── */}
          {step === "result" && scores && (
            <motion.div key="result" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
              <div className="mb-8 text-center">
                <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-[#c9952a]/40 bg-[#c9952a]/10 px-3 py-1 text-xs font-medium text-[#9c7a3a]">
                  <CheckCircle2 className="h-3.5 w-3.5" />
                  Assessment completado
                </div>

                <div className="mb-2 text-7xl font-black tabular-nums sm:text-8xl" style={{ color: getTMSColor(scores.tms) }}>
                  {scores.tms}
                </div>
                <div className="mb-3 text-sm text-[#3a4866]">Trust Maturity Score (0–100)</div>

                <div
                  className="inline-block rounded-full border px-4 py-1.5 text-sm font-semibold"
                  style={{ color: getTMSColor(scores.tms), borderColor: getTMSColor(scores.tms) + "50", backgroundColor: getTMSColor(scores.tms) + "15" }}
                >
                  Nivel {scores.maturity_level} — {TMS_MATURITY_LABELS[scores.maturity_level]}
                </div>
              </div>

              <div className="mb-5 rounded-sm border border-[#ece6d6] bg-[#fdfcf9] p-6">
                <h2 className="mb-5 text-center text-sm font-semibold uppercase tracking-wide text-[#0f1f4a]/70">Scores por pilar</h2>
                <div className="flex justify-center">
                  <TMSRadarChart
                    scores={scores}
                    benchmarkScores={
                      benchmark && benchmark.count >= 5
                        ? { fd: benchmark.overall_avg, mg: benchmark.overall_avg, ec: benchmark.overall_avg, cc: benchmark.overall_avg }
                        : undefined
                    }
                    size={300}
                  />
                </div>
              </div>

              <div className="mb-5 rounded-sm border border-[#c9952a]/40 bg-[#fdfcf9] p-5">
                <div className="mb-2 text-xs font-medium uppercase tracking-wide text-[#9c7a3a]">Perfil de brecha</div>
                <p className="text-sm font-medium leading-relaxed text-[#0f1f4a]">{gapProfile}</p>
              </div>

              <div className="mb-5 rounded-sm border border-[#ece6d6] bg-[#fdfcf9] p-5">
                <div className="mb-3 text-xs font-medium uppercase tracking-wide text-[#3a4866]">Benchmark: empresas peruanas</div>
                {benchmark && benchmark.count >= 5 ? (
                  <div className="space-y-3">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-[#3a4866]">Promedio general ({benchmark.count} empresas)</span>
                      <span className="font-bold tabular-nums text-[#0f1f4a]">{Math.round(benchmark.overall_avg)}</span>
                    </div>
                    {benchmark.industry_count >= 5 && benchmark.industry_avg !== null && (
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-[#3a4866]">Tu industria ({TMS_INDUSTRY_LABELS[registration.industria]})</span>
                        <span className="font-bold tabular-nums text-[#0f1f4a]">{Math.round(benchmark.industry_avg)}</span>
                      </div>
                    )}
                    <div className="flex items-center justify-between border-t border-[#ece6d6] pt-1 text-sm">
                      <span className="font-medium text-[#0f1f4a]/70">Tu TMS</span>
                      <span className="text-base font-black tabular-nums" style={{ color: getTMSColor(scores.tms) }}>{scores.tms}</span>
                    </div>
                  </div>
                ) : (
                  <p className="text-xs text-[#3a4866]">
                    El benchmark estará disponible cuando tengamos datos de al menos 5 empresas. Sé
                    parte de los primeros en conocer el estado real de la madurez de datos en Perú.
                  </p>
                )}
              </div>

              <div className="rounded-sm border border-[#c9952a]/40 bg-[#ece6d6] p-6 text-center">
                <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#c9952a]/40 bg-[#fdfcf9] px-3 py-1 text-xs font-medium text-[#9c7a3a]">
                  <Calendar className="h-3.5 w-3.5" />
                  30 minutos · Sin costo
                </div>
                <h3 className="mb-2 text-lg font-bold text-[#0f1f4a]">¿Quieres un plan de mejora detallado?</h3>
                <p className="mx-auto mb-5 max-w-sm text-sm text-[#3a4866]">
                  Solicita una Trust Cartography gratuita de 30 minutos. Revisamos tu TMS en
                  detalle y definimos los 3 próximos pasos concretos.
                </p>
                <a
                  href={process.env.NEXT_PUBLIC_CALENDLY_URL ?? "https://calendly.com/goviapartners/trust-cartography"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-sm bg-[#c9952a] px-6 py-3 text-sm font-semibold text-[#0f1f4a] transition-all hover:bg-[#e8b84a] active:scale-[0.98]"
                >
                  Solicitar Trust Cartography
                  <ArrowRight className="h-4 w-4" />
                </a>
              </div>

              <p className="mt-5 text-center text-xs text-[#3a4866]">
                Te enviamos tus resultados a <span className="text-[#0f1f4a]/70">{registration.email}</span>. Revisa tu carpeta de spam si no llega en 5 minutos.
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
