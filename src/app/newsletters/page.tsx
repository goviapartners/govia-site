import type { Metadata } from "next";
import Link from "next/link";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { ContourLinesCaliza } from "@/components/contour-lines";
import { getAllNewsletters } from "@/lib/newsletters";
import { getPostsByNewsletter } from "@/lib/blog";

const title = "Newsletters | Govia Partners";
const description =
  "Los newsletters de Edgar Pazos sobre gobierno de datos, retomados como ediciones del blog de Govia Partners.";

export const metadata: Metadata = {
  title,
  description,
  openGraph: { title, description, images: ["/opengraph-image"] },
  twitter: { card: "summary_large_image", title, description, images: ["/opengraph-image"] },
};

export default function NewslettersIndexPage() {
  const newsletters = getAllNewsletters();

  return (
    <>
      <SiteHeader />
      <main className="relative flex-1 overflow-hidden bg-[#e8e3d6]">
        <ContourLinesCaliza className="absolute inset-x-0 top-0 h-24 w-full" />
        <div className="relative mx-auto max-w-5xl px-6 py-20">
          <p className="font-mono text-xs uppercase tracking-widest text-[#8f5022]">Newsletters</p>
          <h1 className="mt-3 font-serif text-4xl leading-tight text-[#0a1416]">
            Dos series, dos formas de acercarse al gobierno de datos
          </h1>

          {newsletters.length === 0 ? (
            <div className="mt-12 rounded-sm border border-[#dad4c4] bg-[#f5f2ea] px-6 py-16 text-center">
              <p className="text-base text-[#0a1416]/70">Todavía no hay newsletters activos.</p>
            </div>
          ) : (
            <div className="mt-12 grid gap-6 sm:grid-cols-2">
              {newsletters.map((newsletter) => {
                const editionCount = getPostsByNewsletter(newsletter.slug).length;
                return (
                  <Link
                    key={newsletter.slug}
                    href={`/newsletters/${newsletter.slug}`}
                    className="block rounded-sm border border-[#dad4c4] bg-white p-6 transition-colors hover:border-[#ce7b45]"
                  >
                    <p className="font-mono text-xs uppercase tracking-widest text-[#8f5022]">
                      {editionCount === 0
                        ? "Sin ediciones todavía"
                        : editionCount === 1
                          ? "1 edición"
                          : `${editionCount} ediciones`}
                    </p>
                    <h2 className="mt-2 font-serif text-xl text-[#0a1416]">{newsletter.title}</h2>
                    <p className="mt-2 text-sm leading-relaxed text-[#0a1416]/70">
                      {newsletter.description}
                    </p>
                  </Link>
                );
              })}
            </div>
          )}
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
