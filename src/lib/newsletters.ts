import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { marked } from "marked";

const NEWSLETTERS_DIR = path.join(process.cwd(), "src/content/newsletters");

export type NewsletterMeta = {
  slug: string;
  title: string;
  description: string;
  date: string;
};

export type Newsletter = NewsletterMeta & {
  contentHtml: string;
};

function readSlugs(): string[] {
  if (!fs.existsSync(NEWSLETTERS_DIR)) return [];
  return fs
    .readdirSync(NEWSLETTERS_DIR)
    .filter((file) => file.endsWith(".md"))
    .map((file) => file.replace(/\.md$/, ""));
}

export function getAllNewsletters(): NewsletterMeta[] {
  return readSlugs()
    .map((slug) => {
      const raw = fs.readFileSync(path.join(NEWSLETTERS_DIR, `${slug}.md`), "utf8");
      const { data } = matter(raw);
      return {
        slug,
        title: data.title as string,
        description: data.description as string,
        date: data.date as string,
      };
    })
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getNewsletterBySlug(slug: string): Newsletter | null {
  const filePath = path.join(NEWSLETTERS_DIR, `${slug}.md`);
  if (!fs.existsSync(filePath)) return null;
  const raw = fs.readFileSync(filePath, "utf8");
  const { data, content } = matter(raw);
  return {
    slug,
    title: data.title as string,
    description: data.description as string,
    date: data.date as string,
    contentHtml: marked.parse(content, { async: false }) as string,
  };
}
