import Link from "next/link";

export function SiteHeader() {
  return (
    <header className="border-b border-[#ece6d6] bg-[#fdfcf9]/80 backdrop-blur">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-5">
        <Link
          href="/"
          className="font-serif text-xl tracking-tight text-[#0f1f4a]"
        >
          Govia Partners
        </Link>
        <nav className="flex items-center gap-6 text-sm font-medium text-[#3a4866]">
          <Link href="/whitepaper-git" className="hover:text-[#0f1f4a]">
            Whitepaper
          </Link>
          <Link
            href="#contacto"
            className="rounded-sm bg-[#0f1f4a] px-4 py-2 text-[#f4f0e6] transition-colors hover:bg-[#1a3a7a]"
          >
            Contacto
          </Link>
        </nav>
      </div>
    </header>
  );
}
