import { describe, expect, it } from "vitest";

import { articles, services } from "@/content/site";
import { normalizeSearchText, searchSite } from "@/lib/site-search";

describe("site search", () => {
  it("normalizes Vietnamese diacritics and spacing", () => {
    expect(normalizeSearchText("  Tiêm   Phòng ")).toBe("tiem phong");
    expect(normalizeSearchText("ĐI KHÁM")).toBe("di kham");
  });

  it("searches services without requiring accents", () => {
    const result = searchSite("tiem phong", services, articles);
    expect(result.services.some((service) => service.slug === "tiem-phong")).toBe(true);
  });

  it("searches article tags", () => {
    const result = searchSite("long van chuyen", services, articles);
    expect(result.articles.some((article) => article.slug === "chuan-bi-truoc-buoi-kham")).toBe(true);
  });

  it("returns no results for an empty query", () => {
    expect(searchSite(" ", services, articles)).toEqual({ services: [], articles: [] });
  });
});
