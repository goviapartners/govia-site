import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="border-t border-[#dad4c4] bg-[#f5f2ea]">
      <div className="mx-auto flex max-w-5xl flex-col gap-2 px-6 py-8 text-sm text-[#0a1416]/70 sm:flex-row sm:items-center sm:justify-between">
        <p>© {new Date().getFullYear()} Govia Partners. La arquitectura de la confianza.</p>
        <div className="flex gap-4">
          <Link href="/privacidad" className="hover:text-[#0a1416]">
            Política de Privacidad
          </Link>
          <a href="mailto:contacto@goviapartners.com" className="hover:text-[#0a1416]">
            contacto@goviapartners.com
          </a>
        </div>
      </div>
    </footer>
  );
}
