import type {
  Article,
  ArticleCategorySlug,
  ArticleContentBlock,
} from "@/content/site";
import { articleCategorySlugs } from "@/content/site";

export function isArticleCategory(
  value: string | undefined,
): value is ArticleCategorySlug {
  return articleCategorySlugs.includes(value as ArticleCategorySlug);
}

export function formatArticleDate(value: string) {
  return new Intl.DateTimeFormat("vi-VN", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  }).format(new Date(value));
}

export function formatCompactArticleDate(value: string) {
  return new Intl.DateTimeFormat("vi-VN", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  }).format(new Date(value));
}

export function formatReadingTime(value: number) {
  return `${value} phút đọc`;
}

export type ArticleTocItem = {
  id: string;
  title: string;
};

export function getArticleTableOfContents(
  blocks: ArticleContentBlock[],
  readingTime: number,
): ArticleTocItem[] {
  const headings = blocks.flatMap((block) => {
    if (!("id" in block) || !block.id || !("title" in block) || !block.title) {
      return [];
    }

    return [{ id: block.id, title: block.title }];
  });

  return headings.length >= 3 && readingTime >= 4 ? headings : [];
}

export function resolveRelatedArticles(
  article: Article,
  articles: Article[],
) {
  const articlesBySlug = new Map(
    articles.map((candidate) => [candidate.slug, candidate]),
  );

  return article.relatedArticleSlugs.flatMap((slug) => {
    const related = articlesBySlug.get(slug);
    return related ? [related] : [];
  });
}

