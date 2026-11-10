import type { MetadataRoute } from "next";
import { blogPosts } from "@/lib/blog-data";
import { routing } from "@/i18n/routing";
import { localizedAlternates, localizedUrl } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  return routing.locales.flatMap((locale) => [
    ...["/", "/sns", "/blog"].map((pathname) => ({
      url: localizedUrl(locale, pathname),
      changeFrequency: "weekly" as const,
      priority: pathname === "/" ? 1 : 0.8,
      alternates: { languages: localizedAlternates(pathname) },
    })),
    ...blogPosts.map((post) => ({
      url: localizedUrl(locale, `/blog/${post.slug}`),
      lastModified: new Date(post.date),
      changeFrequency: "monthly" as const,
      priority: 0.8,
      alternates: {
        languages: localizedAlternates(`/blog/${post.slug}`),
      },
    })),
  ]);
}
