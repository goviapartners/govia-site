/**
 * TMS Assessment — Type definitions
 * Trust Maturity Score: 21-question diagnostic across 4 pillars (TAF).
 * Source: proyectos/_firma_govia/categoria-trust-architects/06-instrumento-taf.md
 */

export type TMSIndustry =
  | "mining"
  | "construction"
  | "finance"
  | "retail"
  | "health"
  | "education"
  | "government"
  | "other";

export type TMSCompanySize =
  | "<50"
  | "50-200"
  | "201-1000"
  | "1001-5000"
  | ">5000";

export type TMSPilar = "FD" | "MG" | "EC" | "CC";

export interface TMSQuestion {
  id: string; // e.g. "FD-01"
  pilar: TMSPilar;
  text: string;
}

export interface TMSRegistrationData {
  nombre: string;
  email: string;
  empresa: string;
  industria: TMSIndustry;
  tamano_empresa: TMSCompanySize;
}

// Answers map: question ID → Likert value (1-5)
export type TMSAnswers = Record<string, number>;

export interface TMSScores {
  fd_score: number; // avg FD questions (1-5)
  mg_score: number; // avg MG questions (1-5)
  ec_score: number; // avg EC questions (1-5)
  cc_score: number; // avg CC questions (1-5)
  // Normalized 0-100
  fd_norm: number;
  mg_norm: number;
  ec_norm: number;
  cc_norm: number;
  // Weighted TMS
  tms: number;
  maturity_level: 1 | 2 | 3 | 4 | 5;
}

export interface TMSBenchmark {
  overall_avg: number;
  count: number;
  industry_avg: number | null;
  industry_count: number;
}

export const TMS_INDUSTRY_LABELS: Record<TMSIndustry, string> = {
  mining: "Minería",
  construction: "Construcción",
  finance: "Finanzas",
  retail: "Retail",
  health: "Salud",
  education: "Educación",
  government: "Gobierno",
  other: "Otro",
};

export const TMS_COMPANY_SIZE_LABELS: Record<TMSCompanySize, string> = {
  "<50": "Menos de 50 empleados",
  "50-200": "50 – 200 empleados",
  "201-1000": "201 – 1,000 empleados",
  "1001-5000": "1,001 – 5,000 empleados",
  ">5000": "Más de 5,000 empleados",
};

export const TMS_PILAR_LABELS: Record<TMSPilar, string> = {
  FD: "Fundación de Datos",
  MG: "Motor de Gobierno",
  EC: "Escudo de Cumplimiento",
  CC: "Capital de Confianza",
};

export const TMS_MATURITY_LABELS: Record<1 | 2 | 3 | 4 | 5, string> = {
  1: "Datos Caóticos",
  2: "Datos Controlados",
  3: "Datos Gobernados",
  4: "Datos Confiables",
  5: "Trust Architecture",
};
