import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { ContourLinesCaliza } from "@/components/contour-lines";
import { getBlogIndexPosts } from "@/lib/blog";

const title = "Blog | Govia Partners";
const description =
  "Ideas sobre gobierno de datos, IA confiable y arquitectura de la confianza, desde Govia Partners.";

export const metadata: Metadata = {
  title,
  description,
  openGraph: { title, description, images: ["/opengraph-image"] },
  twitter: { card: "summary_large_image", title, description, images: ["/opengraph-image"] },
};

function formatDate(date: string) {
  return new Date(`${date}T00:00:00`).toLocaleDateString("es-PE", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export default function BlogIndexPage() {
  const posts = getBlogIndexPosts();

  return (
    <>
      <SiteHeader />
      <main className="relative flex-1 overflow-hidden bg-[#e8e3d6]">
        <ContourLinesCaliza className="absolute inset-x-0 top-0 h-24 w-full" />
        <div className="relative mx-auto max-w-5xl px-6 py-20">
          <p className="font-mono text-xs uppercase tracking-widest text-[#8f5022]">Blog</p>
          <h1 className="mt-3 font-serif text-4xl leading-tight text-[#0a1416]">
            Ideas sobre gobierno de datos y confianza
          </h1>

          {posts.length === 0 ? (
            <div className="mt-12 rounded-sm border border-[#dad4c4] bg-[#f5f2ea] px-6 py-16 text-center">
              <p className="text-base text-[#0a1416]/70">
                Todavía no hay artículos publicados. Vuelve pronto.
              </p>
            </div>
          ) : (
            <div className="mt-12 grid gap-6 sm:grid-cols-2">
              {posts.map((post) => (
                <Link
                  key={post.slug}
                  href={`/blog/${post.slug}`}
                  className="block overflow-hidden rounded-sm border border-[#dad4c4] bg-white transition-colors hover:border-[#ce7b45]"
                >
                  {post.image ? (
                    <Image
                      src={post.image}
                      alt={post.title}
                      width={1600}
                      height={900}
                      className="h-auto w-full border-b border-[#dad4c4]"
                    />
                  ) : null}
                  <div className="p-6">
                    <p className="font-mono text-xs uppercase tracking-widest text-[#8f5022]">
                      {formatDate(post.date)}
                    </p>
                    <h2 className="mt-2 font-serif text-xl text-[#0a1416]">{post.title}</h2>
                    <p className="mt-2 text-sm leading-relaxed text-[#0a1416]/70">
                      {post.description}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
