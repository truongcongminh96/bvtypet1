import { describe, expect, it } from "vitest";

import { serviceDirectoryGroups } from "@/content/service-directory";
import { services } from "@/content/site";

describe("service directory", () => {
  it("exposes the four approved service groups in directory order", () => {
    expect(serviceDirectoryGroups.map((group) => group.id)).toEqual([
      "kham-chua-benh",
      "phau-thuat",
      "spa-grooming",
      "pet-shop",
    ]);
  });

  it("only links to verified fallback service routes", () => {
    const verifiedSlugs = new Set(services.map((service) => service.slug));
    const directorySlugs = serviceDirectoryGroups.flatMap((group) =>
      group.items.map((item) => item.slug),
    );

    expect(new Set(directorySlugs).size).toBe(directorySlugs.length);
    expect(directorySlugs.every((slug) => verifiedSlugs.has(slug))).toBe(true);
  });

  it("keeps Pet Shop unavailable until routes are implemented", () => {
    const petShop = serviceDirectoryGroups.find(
      (group) => group.id === "pet-shop",
    );

    expect(petShop?.items).toEqual([]);
    expect(petShop?.unavailableMessage).toBeTruthy();
    expect(petShop?.cta.href).toBeUndefined();
  });

  it("alternates editorial panels and provides collage imagery", () => {
    expect(serviceDirectoryGroups.map((group) => group.layout)).toEqual([
      "media-left",
      "media-right",
      "media-left",
      "media-right",
    ]);

    expect(
      serviceDirectoryGroups.every(
        (group) =>
          group.collage.images.length >= 2 &&
          group.collage.images.every((image) => image.placeholder),
      ),
    ).toBe(true);
  });
});
