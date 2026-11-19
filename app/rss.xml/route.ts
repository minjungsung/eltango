import { getBlogPosts } from "@/lib/blog-data";
import { SCHOOL } from "@/lib/school-info";
import { SITE_URL } from "@/lib/site";

/**
 * /rss.xml — RSS 2.0 피드
 * 네이버·다음 등 국내 수집기와 RSS 리더, AI 검색엔진이 새 글을 빠르게 발견합니다.
 */
export const dynamic = "force-static";

function escapeXml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

export async function GET() {
  const posts = await getBlogPosts("ko");
  const latest = posts[0]?.date ?? new Date().toISOString().slice(0, 10);

  const items = posts
    .map((post) => {
      const url = `${SITE_URL}/blog/${post.slug}`;
      const pubDate = new Date(`${post.date}T09:00:00+09:00`).toUTCString();
      return [
        "    <item>",
        `      <title>${escapeXml(post.title)}</title>`,
        `      <link>${url}</link>`,
        `      <description>${escapeXml(post.description)}</description>`,
        `      <category>${escapeXml(post.category)}</category>`,
        `      <pubDate>${pubDate}</pubDate>`,
        `      <guid isPermaLink="true">${url}</guid>`,
        "    </item>",
      ].join("\n");
    })
    .join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${escapeXml(SCHOOL.name)} · 칼럼</title>
    <link>${SITE_URL}/blog</link>
    <description>${escapeXml(`${SCHOOL.alternateName} — ${SCHOOL.description}`)}</description>
    <language>ko</language>
    <lastBuildDate>${new Date(`${latest}T09:00:00+09:00`).toUTCString()}</lastBuildDate>
    <atom:link href="${SITE_URL}/rss.xml" rel="self" type="application/rss+xml" />
${items}
  </channel>
</rss>`;

  return new Response(xml, {
    headers: {
      "content-type": "application/rss+xml; charset=utf-8",
      "cache-control": "public, max-age=3600",
    },
  });
}
