import Link from "next/link";
import { GoviaMark } from "@/components/govia-mark";

export function SiteHeader() {
  return (
    <header className="border-b border-[#ece6d6] bg-[#fdfcf9]/80 backdrop-blur">
      <div className="mx-auto flex max-w-5xl items-center justify-between gap-3 px-4 py-4 sm:px-6 sm:py-5">
        <Link
          href="/"
          className="flex shrink-0 items-center gap-2 font-serif text-base tracking-tight whitespace-nowrap text-[#0f1f4a] sm:text-xl"
        >
          <GoviaMark size={30} className="hidden shrink-0 sm:block" />
          Govia Partners
        </Link>
        <nav className="flex items-center gap-2.5 text-xs font-medium text-[#3a4866] sm:gap-6 sm:text-sm">
          <Link href="/trust-architecture-framework" className="hover:text-[#0f1f4a]">
            Framework
          </Link>
          <Link href="/trust-maturity-score" className="hover:text-[#0f1f4a]">
            Diagnóstico
          </Link>
          <Link href="/whitepaper-git" className="hidden hover:text-[#0f1f4a] sm:inline">
            Whitepaper
          </Link>
          <Link href="/blog" className="hover:text-[#0f1f4a]">
            Blog
          </Link>
          <Link
            href="/#contacto"
            className="shrink-0 rounded-sm bg-[#0f1f4a] px-2.5 py-1.5 text-[#f4f0e6] transition-colors hover:bg-[#1a3a7a] sm:px-4 sm:py-2"
          >
            Contacto
          </Link>
        </nav>
      </div>
    </header>
  );
}
