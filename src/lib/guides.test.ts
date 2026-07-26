import { describe, expect, it } from "vitest";

import { articles } from "@/content/site";
import {
  getArticleTableOfContents,
  isArticleCategory,
  resolveRelatedArticles,
} from "@/lib/guides";

describe("guide helpers", () => {
  it("recognizes stable guide category query values", () => {
    expect(isArticleCategory("suc-khoe-hang-ngay")).toBe(true);
    expect(isArticleCategory("khong-ton-tai")).toBe(false);
  });

  it("shows a table of contents only for sufficiently long articles", () => {
    const longArticle = articles.find(
      (article) => article.slug === "dau-hieu-thu-cung-can-di-kham",
    );
    const shortArticle = articles.find(
      (article) => article.slug === "chuan-bi-truoc-buoi-kham",
    );

    expect(longArticle).toBeDefined();
    expect(shortArticle).toBeDefined();
    expect(
      getArticleTableOfContents(
        longArticle!.contentBlocks,
        longArticle!.readingTime,
      ),
    ).toHaveLength(4);
    expect(
      getArticleTableOfContents(
        shortArticle!.contentBlocks,
        shortArticle!.readingTime,
      ),
    ).toHaveLength(0);
  });

  it("resolves related articles in the authored order", () => {
    const article = articles[0];
    const related = resolveRelatedArticles(article, articles);

    expect(related.map((item) => item.slug)).toEqual(
      article.relatedArticleSlugs,
    );
  });

  it("keeps every placeholder image explicitly marked", () => {
    for (const article of articles) {
      expect(article.coverImage.placeholder).toBe(true);
      expect(article.thumbnailImage?.placeholder).toBe(true);
    }
  });
});

