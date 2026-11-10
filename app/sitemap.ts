import { MetadataRoute } from 'next';
import { blogPosts } from '@/lib/blog-data';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://eltango.vercel.app';
  const lastModified = new Date();

  const staticRoutes = [
    {
      url: `${baseUrl}/ko`,
      lastModified,
      changeFrequency: 'weekly' as const,
      priority: 1.0,
    },
    {
      url: `${baseUrl}/en`,
      lastModified,
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/ko/blog`,
      lastModified,
      changeFrequency: 'daily' as const,
      priority: 0.9,
    },
  ];

  const blogRoutes = blogPosts.map((post) => ({
    url: `${baseUrl}/ko/blog/${post.slug}`,
    lastModified: new Date(post.date),
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }));

  return [...staticRoutes, ...blogRoutes];
}
