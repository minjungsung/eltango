import { getTranslations } from "next-intl/server";

export interface BlogPost {
  slug: string;
  title: string;
  description: string;
  date: string;
  category: string;
  tags: string[];
  content: string;
  faq: { question: string; answer: string }[];
}

export const blogPosts = [
  { slug: "cruise-2027-tango-preparation", date: "2026-11-10" },
  { slug: "latin-shoes-vs-jazz-sneakers", date: "2026-11-10" },
  { slug: "tango-lesson-cost-duration-guide", date: "2026-11-06" },
  { slug: "office-workers-posture-tango-wellness", date: "2026-11-09" },
] as const;

export async function getBlogPosts(locale: string): Promise<BlogPost[]> {
  const t = await getTranslations({ locale, namespace: "blog.posts" });
  return blogPosts
    .map((post) => ({
      ...post,
      ...(t.raw(post.slug) as Omit<BlogPost, "slug" | "date">),
    }))
    .sort((a, b) => b.date.localeCompare(a.date));
}
