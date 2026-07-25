import { articles as fallbackArticles, services as fallbackServices } from "@/content/site";
import type { Article, Service } from "@/content/site";
import { sanityClient } from "@/sanity/client";
import { isSanityConfigured } from "@/sanity/env";

const servicesQuery = `*[_type == "service"] | order(order asc) {
  "slug": slug.current,
  title,
  shortTitle,
  summary,
  description,
  points,
  accent
}`;

const articlesQuery = `*[_type == "article"] | order(publishedAt desc) {
  "slug": slug.current,
  title,
  excerpt,
  category,
  readTime,
  publishedAt,
  intro,
  sections[]{title, body}
}`;

export async function getServices(): Promise<Service[]> {
  if (!isSanityConfigured) {
    return fallbackServices;
  }

  try {
    const data = await sanityClient.fetch<Service[]>(
      servicesQuery,
      {},
      { next: { revalidate: 300 } },
    );

    return data.length > 0 ? data : fallbackServices;
  } catch {
    return fallbackServices;
  }
}

export async function getArticles(): Promise<Article[]> {
  if (!isSanityConfigured) {
    return fallbackArticles;
  }

  try {
    const data = await sanityClient.fetch<Article[]>(
      articlesQuery,
      {},
      { next: { revalidate: 300 } },
    );

    return data.length > 0 ? data : fallbackArticles;
  } catch {
    return fallbackArticles;
  }
}
