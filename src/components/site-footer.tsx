export function SiteFooter() {
  return (
    <footer className="border-t border-[#ece6d6] bg-[#fdfcf9]">
      <div className="mx-auto flex max-w-5xl flex-col gap-2 px-6 py-8 text-sm text-[#3a4866] sm:flex-row sm:items-center sm:justify-between">
        <p>© {new Date().getFullYear()} Govia Partners. La arquitectura de la confianza.</p>
        <div className="flex gap-4">
          <a href="mailto:contacto@goviapartners.com" className="hover:text-[#0f1f4a]">
            contacto@goviapartners.com
          </a>
        </div>
      </div>
    </footer>
  );
}
