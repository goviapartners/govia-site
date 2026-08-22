/**
 * TMS Assessment — preguntas, pesos y lógica de scoring.
 * Fuente: proyectos/_firma_govia/categoria-trust-architects/06-instrumento-taf.md (TAF v1.0)
 * Fórmula y pesos idénticos al instrumento — no cambiar sin actualizar la fuente.
 */

import type { TMSQuestion, TMSPilar, TMSAnswers, TMSScores } from "@/types/tms";

// ─── Preguntas ──────────────────────────────────────────────────────────────

export const TMS_QUESTIONS: TMSQuestion[] = [
  // PILAR 1 — FUNDACIÓN DE DATOS (FD) · Peso: 25%
  {
    id: "FD-01",
    pilar: "FD",
    text: "¿La organización tiene un inventario actualizado de sus activos de datos críticos (fuentes, sistemas, bases de datos)?",
  },
  {
    id: "FD-02",
    pilar: "FD",
    text: "¿Existen reglas de calidad de datos documentadas y activas para los dominios de datos más críticos (clientes, finanzas, operaciones)?",
  },
  {
    id: "FD-03",
    pilar: "FD",
    text: "¿La calidad de datos se monitorea de forma continua con métricas, alertas y reportes accesibles a los responsables del negocio?",
  },
  {
    id: "FD-04",
    pilar: "FD",
    text: "¿Existe trazabilidad documentada (linaje) del origen al consumo para los datos usados en decisiones estratégicas?",
  },
  {
    id: "FD-05",
    pilar: "FD",
    text: "¿Hay un catálogo de datos activo con definiciones de negocio, propietarios y contexto de uso, accesible a usuarios no técnicos?",
  },

  // PILAR 2 — MOTOR DE GOBIERNO (MG) · Peso: 30%
  {
    id: "MG-01",
    pilar: "MG",
    text: "¿Los Data Owners de los dominios críticos están formalmente designados, con responsabilidades documentadas y tiempo asignado para ejercerlas?",
  },
  {
    id: "MG-02",
    pilar: "MG",
    text: "¿Los Data Stewards tienen autoridad real para tomar decisiones sobre calidad, definición y uso de los datos bajo su custodia?",
  },
  {
    id: "MG-03",
    pilar: "MG",
    text: "¿Existe un Comité de Datos (o equivalente) con participación de negocio y TI que se reúne regularmente y tiene poder de decisión?",
  },
  {
    id: "MG-04",
    pilar: "MG",
    text: "¿Las políticas de datos están documentadas, son conocidas por los usuarios relevantes y se cumplen de forma verificable?",
  },
  {
    id: "MG-05",
    pilar: "MG",
    text: "¿Los incidentes de calidad de datos tienen un proceso de resolución con SLA definido y seguimiento medible?",
  },
  {
    id: "MG-06",
    pilar: "MG",
    text: "¿Existe evidencia de que las áreas de negocio (no solo TI) adoptan y cumplen los estándares de datos en su trabajo cotidiano?",
  },

  // PILAR 3 — ESCUDO DE CUMPLIMIENTO (EC) · Peso: 20%
  {
    id: "EC-01",
    pilar: "EC",
    text: "¿La organización tiene un inventario de datos personales documentado y cumple los principios de la Ley 29733 (LPDP Perú) y D.S. 016-2024-JUS?",
  },
  {
    id: "EC-02",
    pilar: "EC",
    text: "¿Existe un registro activo de riesgos de datos con planes de mitigación asignados a responsables y fechas de resolución?",
  },
  {
    id: "EC-03",
    pilar: "EC",
    text: "¿La organización puede demostrar el cumplimiento de sus políticas de datos en una auditoría externa en menos de 72 horas?",
  },
  {
    id: "EC-04",
    pilar: "EC",
    text: "¿Los proyectos de inteligencia artificial incluyen evaluación de riesgo ético y de gobernanza de datos antes de su despliegue?",
  },
  {
    id: "EC-05",
    pilar: "EC",
    text: "¿Existe un proceso formal para gestionar incidentes de seguridad o privacidad de datos, con capacidad de notificación a reguladores si aplica?",
  },

  // PILAR 4 — CAPITAL DE CONFIANZA (CC) · Peso: 25%
  {
    id: "CC-01",
    pilar: "CC",
    text: '¿Los líderes de la organización (C-suite, directores) usan datos de sus sistemas internos para tomar decisiones estratégicas sin necesidad de "validar primero" con analistas?',
  },
  {
    id: "CC-02",
    pilar: "CC",
    text: "¿La organización tiene un historial limpio de auditorías de datos o regulatorias sin observaciones materiales en los últimos 2 años?",
  },
  {
    id: "CC-03",
    pilar: "CC",
    text: "¿Los proyectos de inteligencia artificial o analítica avanzada de la organización llegan a producción y generan valor medible?",
  },
  {
    id: "CC-04",
    pilar: "CC",
    text: "¿La madurez de datos de la organización es reconocida o citada como diferenciador en conversaciones con clientes, socios o inversores?",
  },
  {
    id: "CC-05",
    pilar: "CC",
    text: "¿La dirección general tiene visibilidad periódica (al menos trimestral) de métricas de confianza de datos como parte de su agenda estratégica?",
  },
];

export const TMS_QUESTIONS_BY_PILAR: Record<TMSPilar, TMSQuestion[]> = {
  FD: TMS_QUESTIONS.filter((q) => q.pilar === "FD"),
  MG: TMS_QUESTIONS.filter((q) => q.pilar === "MG"),
  EC: TMS_QUESTIONS.filter((q) => q.pilar === "EC"),
  CC: TMS_QUESTIONS.filter((q) => q.pilar === "CC"),
};

export const TMS_PILAR_WEIGHTS: Record<TMSPilar, number> = {
  FD: 0.25,
  MG: 0.3,
  EC: 0.2,
  CC: 0.25,
};

export const LIKERT_LABELS: Record<number, string> = {
  1: "No existe / No implementado",
  2: "Iniciando / Ad hoc",
  3: "En desarrollo / Con brechas",
  4: "Implementado / Brechas menores",
  5: "Optimizado / Estandarizado",
};

// ─── Scoring ────────────────────────────────────────────────────────────────

function avgForPilar(pilar: TMSPilar, answers: TMSAnswers): number {
  const questions = TMS_QUESTIONS_BY_PILAR[pilar];
  const values = questions.map((q) => answers[q.id] ?? 1);
  return values.reduce((sum, v) => sum + v, 0) / values.length;
}

function normalize(avg: number): number {
  return Math.round(((avg - 1) / 4) * 100);
}

function tmsMaturityLevel(tms: number): 1 | 2 | 3 | 4 | 5 {
  if (tms <= 20) return 1;
  if (tms <= 40) return 2;
  if (tms <= 65) return 3;
  if (tms <= 85) return 4;
  return 5;
}

export function calculateTMSScores(answers: TMSAnswers): TMSScores {
  const fd_score = avgForPilar("FD", answers);
  const mg_score = avgForPilar("MG", answers);
  const ec_score = avgForPilar("EC", answers);
  const cc_score = avgForPilar("CC", answers);

  const fd_norm = normalize(fd_score);
  const mg_norm = normalize(mg_score);
  const ec_norm = normalize(ec_score);
  const cc_norm = normalize(cc_score);

  const tms = Math.round(
    fd_norm * TMS_PILAR_WEIGHTS.FD +
      mg_norm * TMS_PILAR_WEIGHTS.MG +
      ec_norm * TMS_PILAR_WEIGHTS.EC +
      cc_norm * TMS_PILAR_WEIGHTS.CC
  );

  return {
    fd_score,
    mg_score,
    ec_score,
    cc_score,
    fd_norm,
    mg_norm,
    ec_norm,
    cc_norm,
    tms,
    maturity_level: tmsMaturityLevel(tms),
  };
}

// ─── Perfil de brecha ───────────────────────────────────────────────────────

export function getGapProfile(scores: TMSScores): string {
  const { fd_norm, mg_norm, ec_norm, cc_norm, tms } = scores;

  if (tms <= 20) {
    return "Punto de partida total — Trust Cartography recomendada";
  }
  if (fd_norm < 40 && (mg_norm + ec_norm + cc_norm) / 3 >= 40) {
    return "Tu cuello de botella es la Fundación de Datos";
  }
  if (mg_norm < 40 && fd_norm >= 40) {
    return "Los datos existen pero el gobierno es débil";
  }
  if (ec_norm < 40 && fd_norm + mg_norm >= 80) {
    return "Exposición regulatoria activa";
  }
  if (cc_norm < 40 && (fd_norm + mg_norm + ec_norm) / 3 >= 40) {
    return "El trabajo interno no llega a la dirección";
  }
  return "Madurez balanceada — el siguiente salto requiere integración entre pilares";
}

// ─── Colores por nivel (paleta Govia — teal editorial en el nivel 5) ───────

export function getMaturityColor(level: number): string {
  if (level >= 5) return "#0e8478"; // teal-editorial — Trust Architecture
  if (level >= 4) return "#22c55e"; // verde — Confiables
  if (level >= 3) return "#eab308"; // amarillo — Gobernados
  if (level >= 2) return "#f97316"; // naranja — Controlados
  return "#ef4444"; // rojo — Caóticos
}

export function getTMSColor(tms: number): string {
  // Nivel máximo (Trust Architecture) marcado con el acento de marca Altiplano
  // — alcanzar ese nivel es literalmente la promesa de la marca. Las demás
  // bandas (buena/regular/mala) son una rampa de severidad genérica, no de
  // marca — se mantienen como estaban.
  if (tms >= 86) return "#ce7b45";
  if (tms >= 66) return "#22c55e";
  if (tms >= 41) return "#eab308";
  if (tms >= 21) return "#f97316";
  return "#ef4444";
}
