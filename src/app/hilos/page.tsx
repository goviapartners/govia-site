import type { Metadata } from "next";
import Link from "next/link";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { getAllHilos } from "@/lib/hilos";

const title = "Hilos | Govia Partners";
const description =
  "Ideas de Govia Partners agrupadas por tema, cruzando LinkedIn, blog y video, a medida que van saliendo.";

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

export default function HilosIndexPage() {
  const hilos = getAllHilos();

  return (
    <>
      <SiteHeader />
      <main className="flex-1 bg-[#e8e3d6]">
        <div className="mx-auto max-w-5xl px-6 py-20">
          <p className="font-mono text-xs uppercase tracking-widest text-[#8f5022]">Hilos</p>
          <h1 className="mt-3 font-serif text-4xl leading-tight text-[#0a1416]">
            Ideas agrupadas por tema, no por fecha
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-[#0a1416]/70">
            Cada hilo reúne lo que hemos publicado sobre un mismo tema — en LinkedIn, en el blog o
            en video — a medida que va saliendo. No son series cerradas: crecen sin orden
            obligatorio.
          </p>

          {hilos.length === 0 ? (
            <div className="mt-12 rounded-sm border border-[#dad4c4] bg-[#f5f2ea] px-6 py-16 text-center">
              <p className="text-base text-[#0a1416]/70">Todavía no hay hilos activos.</p>
            </div>
          ) : (
            <div className="mt-12 grid gap-6 sm:grid-cols-2">
              {hilos.map((hilo) => (
                <Link
                  key={hilo.slug}
                  href={`/hilos/${hilo.slug}`}
                  className="block rounded-sm border border-[#dad4c4] bg-white p-6 transition-colors hover:border-[#ce7b45]"
                >
                  <p className="font-mono text-xs uppercase tracking-widest text-[#8f5022]">
                    Actualizado {formatDate(hilo.date)}
                  </p>
                  <h2 className="mt-2 font-serif text-xl text-[#0a1416]">{hilo.title}</h2>
                  <p className="mt-2 text-sm leading-relaxed text-[#0a1416]/70">
                    {hilo.description}
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
