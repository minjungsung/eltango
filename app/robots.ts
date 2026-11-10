import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
      },
      {
        userAgent: [
          'GPTBot',
          'ChatGPT-User',
          'ClaudeBot',
          'Google-Extended',
          'PerplexityBot',
          'Applebot-Extended',
          'Yeti',
        ],
        allow: '/',
      },
    ],
    sitemap: 'https://eltango.vercel.app/sitemap.xml',
  };
}
