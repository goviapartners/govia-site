/**
 * Símbolo de marca Govia — arco navy (gobernanza, 300°) + arco dorado (IA,
 * 60°) + travesaño "G" + punto dorado central ("el dato").
 * Fuente: _firma_govia/sistema-diseno/brand-book/Govia Brand Book.html §09.
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
      <path d="M 100 20 A 80 80 0 1 1 20.4 58" fill="none" stroke="#1A3A7A" strokeWidth="16" strokeLinecap="round" />
      <path d="M 20.4 58 A 80 80 0 0 1 100 20" fill="none" stroke="#C9952A" strokeWidth="16" strokeLinecap="round" />
      <line x1="100" y1="100" x2="150" y2="100" stroke="#1A3A7A" strokeWidth="14" strokeLinecap="round" />
      <line x1="150" y1="100" x2="150" y2="126" stroke="#1A3A7A" strokeWidth="14" strokeLinecap="round" />
      <circle cx="100" cy="100" r="16" fill="#C9952A" />
      <circle cx="150" cy="100" r="9" fill="#C9952A" />
    </svg>
  );
}
