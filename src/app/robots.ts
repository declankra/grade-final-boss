// src/robots.ts
import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: [
        '/api/',
        '/(authenticated)/',
        '/dashboard/',
        '/settings/',
      ],
    },
    sitemap: `${process.env.NEXT_PUBLIC_BASE_URL}/sitemap.ts`,
  };
}   