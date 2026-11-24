import type { MetadataRoute } from "next";
import { blogPosts } from "@/lib/blog-data";
import { routing } from "@/i18n/routing";
import { SITE_URL, localizedAlternates, localizedUrl } from "@/lib/site";

/** Netlify 칼럼 빌드(elttango-site)에서 넘어온 정적 칼럼 — 로케일 접두사 없이 1개 URL만 존재한다. */
const STATIC_COLUMNS = ["/columns/gangnam-tango-first-month-cost.html"];

export default function sitemap(): MetadataRoute.Sitemap {
  const staticColumns: MetadataRoute.Sitemap = STATIC_COLUMNS.map((pathname) => ({
    url: `${SITE_URL}${pathname}`,
    lastModified: new Date("2026-11-24"),
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  return [
    ...staticColumns,
    ...routing.locales.flatMap((locale) => [
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
    ]),
  ];
}
