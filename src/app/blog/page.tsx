import type { Metadata } from "next";
import Link from "next/link";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { getAllPosts } from "@/lib/blog";

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
  const posts = getAllPosts();

  return (
    <>
      <SiteHeader />
      <main className="flex-1 bg-[#f4f0e6]">
        <div className="mx-auto max-w-5xl px-6 py-20">
          <p className="font-mono text-xs uppercase tracking-widest text-[#0e8478]">Blog</p>
          <h1 className="mt-3 font-serif text-4xl leading-tight text-[#0f1f4a]">
            Ideas sobre gobierno de datos y confianza
          </h1>

          {posts.length === 0 ? (
            <div className="mt-12 rounded-sm border border-[#ece6d6] bg-[#fdfcf9] px-6 py-16 text-center">
              <p className="text-base text-[#3a4866]">
                Todavía no hay artículos publicados. Vuelve pronto.
              </p>
            </div>
          ) : (
            <div className="mt-12 grid gap-6 sm:grid-cols-2">
              {posts.map((post) => (
                <Link
                  key={post.slug}
                  href={`/blog/${post.slug}`}
                  className="block rounded-sm border border-[#ece6d6] bg-[#fdfcf9] p-6 transition-colors hover:border-[#c9952a]"
                >
                  <p className="font-mono text-xs uppercase tracking-widest text-[#0e8478]">
                    {formatDate(post.date)}
                  </p>
                  <h2 className="mt-2 font-serif text-xl text-[#0f1f4a]">{post.title}</h2>
                  <p className="mt-2 text-sm leading-relaxed text-[#3a4866]">
                    {post.description}
                  </p>
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
