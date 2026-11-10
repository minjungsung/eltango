import { getTranslations } from "next-intl/server";

export type BlogCta = "cruise" | "form";

export interface BlogPost {
  slug: string;
  title: string;
  description: string;
  date: string;
  category: string;
  tags: string[];
  content: string;
  faq: { question: string; answer: string }[];
  cta: BlogCta;
}

export const blogPosts = [
  { slug: "cruise-2027-tango-preparation", date: "2026-11-10", cta: "cruise" },
  { slug: "latin-shoes-vs-jazz-sneakers", date: "2026-11-10", cta: "form" },
  { slug: "tango-lesson-cost-duration-guide", date: "2026-11-06", cta: "form" },
  { slug: "office-workers-posture-tango-wellness", date: "2026-11-09", cta: "form" },
  { slug: "tango-vs-salsa-guide", date: "2026-11-11", cta: "form" },
  { slug: "tango-beginner-alone-guide", date: "2026-11-11", cta: "form" },
  { slug: "ballroom-vs-argentine-tango", date: "2026-11-11", cta: "form" },
  { slug: "tango-academy-vs-club-choice", date: "2026-11-11", cta: "form" },
  { slug: "milonga-cabeceo-etiquette", date: "2026-11-11", cta: "form" },
] as const;

export async function getBlogPosts(locale: string): Promise<BlogPost[]> {
  const t = await getTranslations({ locale, namespace: "blog.posts" });
  return blogPosts
    .map((post) => ({
      ...post,
      ...(t.raw(post.slug) as Omit<BlogPost, "slug" | "date" | "cta">),
    }))
    .sort((a, b) => b.date.localeCompare(a.date));
}
