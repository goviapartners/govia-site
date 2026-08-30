import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { ContourLinesCaliza } from "@/components/contour-lines";
import { getAllNewsletters, getNewsletterBySlug } from "@/lib/newsletters";
import { getPostsByNewsletter } from "@/lib/blog";

export function generateStaticParams() {
  return getAllNewsletters().map((newsletter) => ({ slug: newsletter.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const newsletter = getNewsletterBySlug(slug);
  if (!newsletter) return {};

  const title = `${newsletter.title} | Govia Partners`;
  return {
    title,
    description: newsletter.description,
    openGraph: { title, description: newsletter.description, images: ["/opengraph-image"] },
    twitter: {
      card: "summary_large_image",
      title,
      description: newsletter.description,
      images: ["/opengraph-image"],
    },
  };
}

function formatDate(date: string) {
  return new Date(`${date}T00:00:00`).toLocaleDateString("es-PE", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export default async function NewsletterPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const newsletter = getNewsletterBySlug(slug);
  if (!newsletter) notFound();

  const editions = getPostsByNewsletter(slug);

  return (
    <>
      <SiteHeader />
      <main className="relative flex-1 overflow-hidden bg-[#e8e3d6]">
        <ContourLinesCaliza className="absolute inset-x-0 top-0 h-24 w-full" />
        <article className="relative mx-auto max-w-2xl px-6 py-20">
          <p className="font-mono text-xs uppercase tracking-widest text-[#8f5022]">Newsletter</p>
          <h1 className="mt-3 font-serif text-3xl leading-tight text-[#0a1416] sm:text-4xl">
            {newsletter.title}
          </h1>
          <p className="mt-4 text-base leading-relaxed text-[#0a1416]/70">
            {newsletter.description}
          </p>
          <div
            className="prose-govia mt-8 text-base leading-relaxed text-[#0a1416]/70"
            dangerouslySetInnerHTML={{ __html: newsletter.contentHtml }}
          />

          <h2 className="mt-12 font-serif text-xl text-[#0a1416]">Ediciones</h2>
          {editions.length === 0 ? (
            <p className="mt-4 text-sm text-[#0a1416]/70">Todavía no hay ediciones publicadas.</p>
          ) : (
            <ul className="mt-4 space-y-3">
              {editions.map((edition) => (
                <li key={edition.slug}>
                  <Link
                    href={`/blog/${edition.slug}`}
                    className="flex items-center gap-4 rounded-sm border border-[#dad4c4] bg-white p-4 transition-colors hover:border-[#ce7b45]"
                  >
                    {edition.image ? (
                      <Image
                        src={edition.image}
                        alt={edition.title}
                        width={160}
                        height={90}
                        className="h-auto w-28 shrink-0 rounded-sm border border-[#dad4c4]"
                      />
                    ) : null}
                    <div>
                      <p className="font-mono text-xs uppercase tracking-widest text-[#8f5022]">
                        {formatDate(edition.date)}
                      </p>
                      <p className="mt-1 font-serif text-lg text-[#0a1416]">{edition.title}</p>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </article>
      </main>
      <SiteFooter />
    </>
  );
}
