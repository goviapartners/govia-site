/**
 * Símbolo de marca Govia — arco "gobernanza" (300°) + arco "IA" (60°) +
 * travesaño "G" + punto central ("el dato"). Geometría es núcleo invariante
 * de Altiplano (sin cambios respecto a v1.0) — solo cambian las tintas.
 * Combo B (fondo Caliza claro, el que usa el header/footer del sitio):
 * mk-a (gobernanza) = Ink #0A1416, mk-b (IA) = Cobre-ink #8F5022.
 * Fuente: sistema-diseno/brand-book/Govia Logo System - Altiplano.html.
 */
export function GoviaMark({ size = 30, className }: { size?: number; className?: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="1 11 176 176"
      className={className}
      aria-hidden="true"
    >
      <path d="M 100 20 A 80 80 0 1 1 20.4 58" fill="none" stroke="#0A1416" strokeWidth="16" strokeLinecap="round" />
      <path d="M 20.4 58 A 80 80 0 0 1 100 20" fill="none" stroke="#8F5022" strokeWidth="16" strokeLinecap="round" />
      <line x1="100" y1="100" x2="150" y2="100" stroke="#0A1416" strokeWidth="14" strokeLinecap="round" />
      <line x1="150" y1="100" x2="150" y2="126" stroke="#0A1416" strokeWidth="14" strokeLinecap="round" />
      <circle cx="100" cy="100" r="16" fill="#8F5022" />
      <circle cx="150" cy="100" r="9" fill="#8F5022" />
    </svg>
  );
}
