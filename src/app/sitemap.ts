import type { MetadataRoute } from "next";

import { siteConfig } from "@/lib/site-config";
import { getArticles, getServices } from "@/sanity/content";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [services, articles] = await Promise.all([
    getServices(),
    getArticles(),
  ]);
  const pages = ["", "/dich-vu", "/bac-si", "/cam-nang", "/lien-he"];

  return [
    ...pages.map((path) => ({
      url: `${siteConfig.url}${path}`,
      lastModified: new Date(),
      changeFrequency: path === "" ? ("weekly" as const) : ("monthly" as const),
      priority: path === "" ? 1 : 0.8,
    })),
    ...services.map((service) => ({
      url: `${siteConfig.url}/dich-vu/${service.slug}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
    ...articles.map((article) => ({
      url: `${siteConfig.url}/cam-nang/${article.slug}`,
      lastModified: new Date(article.publishedAt),
      changeFrequency: "monthly" as const,
      priority: 0.65,
    })),
  ];
}
