import { describe, expect, it } from "vitest";

import {
  partitionHomeServices,
  type FeaturedHomeService,
} from "@/content/home-service-presentation";
import type { Service } from "@/content/site";

function service(slug: string): Service {
  return {
    slug,
    title: slug,
    shortTitle: slug,
    summary: `${slug} summary`,
    description: `${slug} description`,
    points: [],
    accent: "blue",
  };
}

function featuredSlugs(items: FeaturedHomeService[]) {
  return items.map(({ service: item }) => item.slug);
}

describe("home service presentation", () => {
  it("selects the three approved featured services in editorial order", () => {
    const result = partitionHomeServices([
      service("noi-khoa"),
      service("ngoai-khoa"),
      service("kham-tong-quat"),
      service("tiem-phong"),
    ]);

    expect(featuredSlugs(result.featured)).toEqual([
      "tiem-phong",
      "kham-tong-quat",
      "ngoai-khoa",
    ]);
    expect(result.featured.map(({ displayTitle }) => displayTitle)).toEqual([
      "Tiêm phòng",
      "Khám bệnh tổng quát",
      "Phẫu thuật",
    ]);
  });

  it("keeps other services in their existing order", () => {
    const result = partitionHomeServices([
      service("noi-khoa"),
      service("tiem-phong"),
      service("spa-grooming"),
      service("ngoai-khoa"),
      service("kham-tong-quat"),
      service("pet-hotel"),
    ]);

    expect(result.remaining.map((item) => item.slug)).toEqual([
      "noi-khoa",
      "spa-grooming",
      "pet-hotel",
    ]);
  });

  it("uses fallback content only to fill a missing featured slot", () => {
    const result = partitionHomeServices(
      [service("tiem-phong"), service("noi-khoa")],
      [service("kham-tong-quat"), service("ngoai-khoa")],
    );

    expect(featuredSlugs(result.featured)).toEqual([
      "tiem-phong",
      "kham-tong-quat",
      "ngoai-khoa",
    ]);
    expect(result.remaining.map((item) => item.slug)).toEqual(["noi-khoa"]);
  });
});
