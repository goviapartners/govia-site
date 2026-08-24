/**
 * Curva de nivel — núcleo invariante de Altiplano ("misma geometría, misma
 * dirección, misma cadencia; varía la opacidad, nunca el trazado"). Los
 * trazados vienen literal del Brand Book (`Altiplano - Sistema de Modos.html`):
 * ContourLinesProfundo = ejemplo "Aplicación · Landing hero" (§03 Profundo);
 * ContourLinesCaliza = ejemplo "Aplicación · Propuesta / lectura larga" (§04
 * Caliza), reservado a cabecera/cierre — "en lectura sostenida la textura
 * estorba".
 */

export function ContourLinesProfundo({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 1200 420"
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      <g fill="none" stroke="#CE7B45" strokeOpacity=".28" strokeWidth="1.1">
        <path d="M-20 410 Q230 348 480 384 T940 350 T1220 376" />
        <path d="M-20 372 Q230 302 480 342 T940 306 T1220 334" />
        <path d="M-20 334 Q230 256 480 300 T940 262 T1220 292" />
        <path d="M-20 296 Q230 210 480 258 T940 218 T1220 250" />
        <path d="M-20 258 Q230 164 480 216 T940 174 T1220 208" />
        <path d="M-20 220 Q230 118 480 174 T940 130 T1220 166" />
        <path d="M-20 182 Q230 72 480 132 T940 86 T1220 124" />
        <path d="M-20 144 Q230 26 480 90 T940 42 T1220 82" />
      </g>
      <g stroke="#E8E3D6" strokeOpacity=".06" strokeWidth=".6">
        <line x1="200" y1="0" x2="200" y2="420" />
        <line x1="450" y1="0" x2="450" y2="420" />
        <line x1="700" y1="0" x2="700" y2="420" />
        <line x1="950" y1="0" x2="950" y2="420" />
      </g>
    </svg>
  );
}

export function ContourLinesCaliza({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 560 90"
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      <g fill="none" stroke="#8F5022" strokeOpacity=".16" strokeWidth="1">
        <path d="M-10 84 Q120 58 260 74 T520 56 T580 68" />
        <path d="M-10 66 Q120 38 260 56 T520 36 T580 50" />
        <path d="M-10 48 Q120 18 260 38 T520 16 T580 32" />
      </g>
    </svg>
  );
}
