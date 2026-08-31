import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { marked } from "marked";
import { getAllNewsletters } from "./newsletters";

const BLOG_DIR = path.join(process.cwd(), "src/content/blog");

export type BlogPostMeta = {
  slug: string;
  title: string;
  description: string;
  date: string;
  newsletter?: string;
  edicion?: number;
  // Portada — ruta root-relative a un archivo en public/ (ej. "/blog-covers/[slug].png").
  // Opcional: un artículo sin portada sigue renderizando sin imagen, sin romper nada.
  image?: string;
};

export type BlogPost = BlogPostMeta & {
  contentHtml: string;
};

function readSlugs(): string[] {
  if (!fs.existsSync(BLOG_DIR)) return [];
  return fs
    .readdirSync(BLOG_DIR)
    .filter((file) => file.endsWith(".md"))
    .map((file) => file.replace(/\.md$/, ""));
}

export function getAllPosts(): BlogPostMeta[] {
  return readSlugs()
    .map((slug) => {
      const raw = fs.readFileSync(path.join(BLOG_DIR, `${slug}.md`), "utf8");
      const { data } = matter(raw);
      return {
        slug,
        title: data.title as string,
        description: data.description as string,
        date: data.date as string,
        newsletter: data.newsletter as string | undefined,
        edicion: data.edicion as number | undefined,
        image: data.image as string | undefined,
      };
    })
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getPostsByNewsletter(newsletterSlug: string): BlogPostMeta[] {
  return getAllPosts()
    .filter((post) => post.newsletter === newsletterSlug)
    .sort((a, b) => (a.edicion ?? 0) - (b.edicion ?? 0));
}

// Para /blog: todos los posts EXCEPTO las ediciones de newsletters cuyo registro
// (src/content/newsletters/[slug].md, campo hideFromBlogIndex) marca su voz como
// lo bastante distinta del blog serio como para no mezclarse en el feed general
// — hoy Governance & Chill. Esas ediciones siguen viviendo en /blog/[slug] (link
// directo, LinkedIn, etc.) y siguen listadas en /newsletters/[slug]; solo no
// aparecen en el índice general de /blog.
export function getBlogIndexPosts(): BlogPostMeta[] {
  const hiddenSlugs = new Set(
    getAllNewsletters()
      .filter((n) => n.hideFromBlogIndex)
      .map((n) => n.slug),
  );
  return getAllPosts().filter((post) => !post.newsletter || !hiddenSlugs.has(post.newsletter));
}

export function getPostBySlug(slug: string): BlogPost | null {
  const filePath = path.join(BLOG_DIR, `${slug}.md`);
  if (!fs.existsSync(filePath)) return null;
  const raw = fs.readFileSync(filePath, "utf8");
  const { data, content } = matter(raw);
  return {
    slug,
    title: data.title as string,
    description: data.description as string,
    date: data.date as string,
    newsletter: data.newsletter as string | undefined,
    edicion: data.edicion as number | undefined,
    image: data.image as string | undefined,
    contentHtml: marked.parse(content, { async: false }) as string,
  };
}
