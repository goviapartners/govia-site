"use client";

import { useEffect, useRef } from "react";
import type { TMSScores } from "@/types/tms";
import { TMS_PILAR_LABELS } from "@/types/tms";
import { cn } from "@/lib/cn";

interface TMSRadarChartProps {
  scores: TMSScores;
  benchmarkScores?: { fd: number; mg: number; ec: number; cc: number };
  size?: number;
}

const PILAR_ORDER = ["FD", "MG", "EC", "CC"] as const;

const SHORT_LABELS = {
  FD: "Fundación",
  MG: "Gobierno",
  EC: "Cumplimiento",
  CC: "Confianza",
};

function getPilarNorm(scores: TMSScores, pilar: (typeof PILAR_ORDER)[number]): number {
  switch (pilar) {
    case "FD":
      return scores.fd_norm;
    case "MG":
      return scores.mg_norm;
    case "EC":
      return scores.ec_norm;
    case "CC":
      return scores.cc_norm;
  }
}

function getColor(score: number): string {
  if (score >= 66) return "#22c55e";
  if (score >= 41) return "#eab308";
  if (score >= 21) return "#f97316";
  return "#ef4444";
}

function getBarClass(score: number): string {
  if (score >= 66) return "bg-green-500";
  if (score >= 41) return "bg-yellow-500";
  if (score >= 21) return "bg-orange-500";
  return "bg-red-500";
}

function getTextClass(score: number): string {
  if (score >= 66) return "text-green-600";
  if (score >= 41) return "text-yellow-700";
  if (score >= 21) return "text-orange-600";
  return "text-red-600";
}

export default function TMSRadarChart({ scores, benchmarkScores, size = 320 }: TMSRadarChartProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // El canvas es más ancho que el diagrama (maxR calculado sobre `size`)
    // para dejar margen a las etiquetas laterales ("Confianza"/"Gobierno")
    // sin que el borde del canvas las recorte.
    const canvasW = size + 130;
    const canvasH = size + 30;

    const dpr = window.devicePixelRatio || 1;
    canvas.width = canvasW * dpr;
    canvas.height = canvasH * dpr;
    canvas.style.width = `${canvasW}px`;
    canvas.style.height = `${canvasH}px`;
    ctx.scale(dpr, dpr);

    const cx = canvasW / 2;
    const cy = canvasH / 2;
    const maxR = size * 0.34;
    const n = 4;
    const angleStep = (Math.PI * 2) / n;

    ctx.clearRect(0, 0, canvasW, canvasH);

    // Anillos de referencia (banda de color por score)
    const rings = [20, 40, 60, 80, 100];
    for (const level of rings) {
      const r = maxR * (level / 100);
      ctx.beginPath();
      for (let i = 0; i <= n; i++) {
        const angle = (i % n) * angleStep - Math.PI / 2;
        const x = cx + r * Math.cos(angle);
        const y = cy + r * Math.sin(angle);
        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.closePath();
      ctx.strokeStyle =
        level <= 40 ? "rgba(239,68,68,0.14)" : level <= 65 ? "rgba(234,179,8,0.12)" : "rgba(34,197,94,0.12)";
      ctx.lineWidth = 1;
      ctx.stroke();

      ctx.save();
      ctx.fillStyle = "rgba(15,31,74,0.35)";
      ctx.font = `${Math.max(9, size * 0.024)}px system-ui,sans-serif`;
      ctx.textAlign = "right";
      ctx.textBaseline = "middle";
      ctx.fillText(`${level}`, cx - 5, cy - r);
      ctx.restore();
    }

    // Ejes
    for (let i = 0; i < n; i++) {
      const angle = i * angleStep - Math.PI / 2;
      ctx.beginPath();
      ctx.moveTo(cx, cy);
      ctx.lineTo(cx + maxR * Math.cos(angle), cy + maxR * Math.sin(angle));
      ctx.strokeStyle = "rgba(15,31,74,0.14)";
      ctx.lineWidth = 1;
      ctx.stroke();
    }

    // Polígono de benchmark (si viene)
    if (benchmarkScores) {
      const bValues = [benchmarkScores.fd, benchmarkScores.mg, benchmarkScores.ec, benchmarkScores.cc];
      ctx.beginPath();
      for (let i = 0; i <= n; i++) {
        const v = bValues[i % n] / 100;
        const angle = (i % n) * angleStep - Math.PI / 2;
        const x = cx + maxR * v * Math.cos(angle);
        const y = cy + maxR * v * Math.sin(angle);
        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.closePath();
      ctx.fillStyle = "rgba(15,31,74,0.04)";
      ctx.fill();
      ctx.strokeStyle = "rgba(15,31,74,0.35)";
      ctx.lineWidth = 1.5;
      ctx.setLineDash([4, 5]);
      ctx.stroke();
      ctx.setLineDash([]);
    }

    // Polígono del resultado (oro — marca)
    const values = PILAR_ORDER.map((p) => getPilarNorm(scores, p));
    ctx.beginPath();
    for (let i = 0; i <= n; i++) {
      const v = values[i % n] / 100;
      const angle = (i % n) * angleStep - Math.PI / 2;
      const x = cx + maxR * v * Math.cos(angle);
      const y = cy + maxR * v * Math.sin(angle);
      if (i === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    }
    ctx.closePath();
    const grad = ctx.createRadialGradient(cx, cy, 0, cx, cy, maxR);
    grad.addColorStop(0, "rgba(201,149,42,0.35)");
    grad.addColorStop(1, "rgba(201,149,42,0.10)");
    ctx.fillStyle = grad;
    ctx.fill();
    ctx.strokeStyle = "rgba(201,149,42,0.95)";
    ctx.lineWidth = 2.5;
    ctx.stroke();

    // Puntos + etiquetas
    const fontSize = Math.max(11, size * 0.03);
    const scoreFontSize = Math.max(10, size * 0.027);
    const labelPad = size * 0.1;

    for (let i = 0; i < n; i++) {
      const pilar = PILAR_ORDER[i];
      const norm = values[i];
      const angle = i * angleStep - Math.PI / 2;
      const v = norm / 100;
      const px = cx + maxR * v * Math.cos(angle);
      const py = cy + maxR * v * Math.sin(angle);
      const color = getColor(norm);

      ctx.beginPath();
      ctx.arc(px, py, 7, 0, Math.PI * 2);
      ctx.fillStyle = color + "30";
      ctx.fill();

      ctx.beginPath();
      ctx.arc(px, py, 4, 0, Math.PI * 2);
      ctx.fillStyle = color;
      ctx.fill();
      ctx.strokeStyle = "#fdfcf9";
      ctx.lineWidth = 1.5;
      ctx.stroke();

      const lRadius = maxR + labelPad;
      const lx = cx + lRadius * Math.cos(angle);
      const ly = cy + lRadius * Math.sin(angle);

      ctx.save();
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      if (Math.cos(angle) > 0.3) ctx.textAlign = "left";
      else if (Math.cos(angle) < -0.3) ctx.textAlign = "right";

      ctx.fillStyle = "rgba(15,31,74,0.75)";
      ctx.font = `600 ${fontSize}px system-ui,sans-serif`;
      ctx.fillText(SHORT_LABELS[pilar], lx, ly - 7);

      ctx.fillStyle = color;
      ctx.font = `700 ${scoreFontSize}px system-ui,sans-serif`;
      ctx.fillText(`${norm}`, lx, ly + 8);
      ctx.restore();
    }
  }, [scores, benchmarkScores, size]);

  return (
    <div className="flex flex-col items-center">
      <canvas ref={canvasRef} />

      <div className="mt-5 grid w-full max-w-xs grid-cols-2 gap-x-5 gap-y-2.5">
        {PILAR_ORDER.map((pilar) => {
          const norm = getPilarNorm(scores, pilar);
          return (
            <div key={pilar} className="flex flex-col gap-0.5">
              <div className="flex items-center justify-between gap-1">
                <span className="truncate text-[11px] text-[#3a4866]">{TMS_PILAR_LABELS[pilar]}</span>
                <span className={cn("shrink-0 text-[11px] font-bold tabular-nums", getTextClass(norm))}>
                  {norm}
                </span>
              </div>
              <div className="h-1 overflow-hidden rounded-full bg-[#ece6d6]">
                <div className={cn("h-full rounded-full transition-all", getBarClass(norm))} style={{ width: `${norm}%` }} />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
