import type { Article, Service } from "@/content/site";

export function normalizeSearchText(value: string) {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/đ/g, "d")
    .replace(/Đ/g, "d")
    .toLowerCase()
    .replace(/\s+/g, " ")
    .trim();
}

export function searchSite(
  query: string,
  services: Service[],
  articles: Article[],
) {
  const normalizedQuery = normalizeSearchText(query);
  if (!normalizedQuery) return { services: [], articles: [] };

  const matches = (values: Array<string | undefined>) =>
    normalizeSearchText(values.filter(Boolean).join(" ")).includes(normalizedQuery);

  return {
    services: services.filter((service) =>
      matches([
        service.title,
        service.shortTitle,
        service.summary,
        service.description,
        service.group,
      ]),
    ),
    articles: articles.filter((article) =>
      matches([
        article.title,
        article.excerpt,
        article.lead,
        article.category,
        ...article.tags,
      ]),
    ),
  };
}
