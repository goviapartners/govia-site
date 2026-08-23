import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { getAllHilos, getHiloBySlug } from "@/lib/hilos";

export function generateStaticParams() {
  return getAllHilos().map((hilo) => ({ slug: hilo.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const hilo = getHiloBySlug(slug);
  if (!hilo) return {};

  const title = `${hilo.title} | Govia Partners`;
  return {
    title,
    description: hilo.description,
    openGraph: { title, description: hilo.description, images: ["/opengraph-image"] },
    twitter: {
      card: "summary_large_image",
      title,
      description: hilo.description,
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

export default async function HiloPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const hilo = getHiloBySlug(slug);
  if (!hilo) notFound();

  return (
    <>
      <SiteHeader />
      <main className="flex-1 bg-[#e8e3d6]">
        <article className="mx-auto max-w-2xl px-6 py-20">
          <p className="font-mono text-xs uppercase tracking-widest text-[#8f5022]">
            Hilo · Actualizado {formatDate(hilo.date)}
          </p>
          <h1 className="mt-3 font-serif text-3xl leading-tight text-[#0a1416] sm:text-4xl">
            {hilo.title}
          </h1>
          <p className="mt-4 text-base leading-relaxed text-[#0a1416]/70">{hilo.description}</p>
          <div
            className="prose-govia mt-10 text-base leading-relaxed text-[#0a1416]/70"
            dangerouslySetInnerHTML={{ __html: hilo.contentHtml }}
          />
        </article>
      </main>
      <SiteFooter />
    </>
  );
}
