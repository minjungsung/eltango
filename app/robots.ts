import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";

/**
 * AI 검색·답변 엔진 봇을 명시적으로 허용한다 (AEO).
 * - 일반 검색봇: Googlebot, Bingbot
 * - AI 크롤러/검색: GPTBot, OAI-SearchBot, ChatGPT-User, ClaudeBot, Claude-SearchBot,
 *   PerplexityBot, Perplexity-User, Google-Extended, Applebot-Extended, Amazonbot, Yeti
 */
const AI_CRAWLERS = [
  "GPTBot",
  "OAI-SearchBot",
  "ChatGPT-User",
  "ClaudeBot",
  "Claude-SearchBot",
  "PerplexityBot",
  "Perplexity-User",
  "Google-Extended",
  "Applebot-Extended",
  "Amazonbot",
  "Yeti",
  "Googlebot",
  "Bingbot",
];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: "*", allow: "/", disallow: "/api/" },
      {
        userAgent: AI_CRAWLERS,
        allow: "/",
        disallow: "/api/",
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
