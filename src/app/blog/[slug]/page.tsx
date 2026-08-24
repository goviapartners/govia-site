import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { ContourLinesCaliza } from "@/components/contour-lines";
import { getAllPosts, getPostBySlug } from "@/lib/blog";

export function generateStaticParams() {
  return getAllPosts().map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return {};

  const title = `${post.title} | Govia Partners`;
  return {
    title,
    description: post.description,
    openGraph: { title, description: post.description, images: ["/opengraph-image"] },
    twitter: {
      card: "summary_large_image",
      title,
      description: post.description,
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

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  return (
    <>
      <SiteHeader />
      <main className="relative flex-1 overflow-hidden bg-[#e8e3d6]">
        <ContourLinesCaliza className="absolute inset-x-0 top-0 h-24 w-full" />
        <article className="relative mx-auto max-w-2xl px-6 py-20">
          <p className="font-mono text-xs uppercase tracking-widest text-[#8f5022]">
            {formatDate(post.date)}
          </p>
          <h1 className="mt-3 font-serif text-3xl leading-tight text-[#0a1416] sm:text-4xl">
            {post.title}
          </h1>
          <div
            className="prose-govia mt-8 text-base leading-relaxed text-[#0a1416]/70"
            dangerouslySetInnerHTML={{ __html: post.contentHtml }}
          />
        </article>
      </main>
      <SiteFooter />
    </>
  );
}
