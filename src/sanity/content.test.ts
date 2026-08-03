import { describe, expect, it } from "vitest";

import { fallbackHomePageSettings } from "@/content/experience";
import { services as fallbackServices } from "@/content/site";
import {
  resolveHomePageSettings,
  resolveServices,
} from "@/sanity/content";

describe("service content resolution", () => {
  it("keeps CMS services first and fills missing verified fallback services", () => {
    const cmsService = {
      ...fallbackServices[0],
      title: "Tên dịch vụ từ CMS",
    };

    const resolved = resolveServices([cmsService]);

    expect(resolved[0].title).toBe("Tên dịch vụ từ CMS");
    expect(resolved.map((service) => service.slug)).toContain("pet-hotel");
    expect(resolved).toHaveLength(fallbackServices.length);
  });
});

describe("home page settings resolution", () => {
  it("uses CMS copy while preserving fallback fields and images", () => {
    const resolved = resolveHomePageSettings({
      hero: { title: "Tiêu đề từ Sanity" },
      reviewsSection: { title: "Đánh giá mới" },
    });

    expect(resolved.hero.title).toBe("Tiêu đề từ Sanity");
    expect(resolved.hero.description).toBe(
      fallbackHomePageSettings.hero.description,
    );
    expect(resolved.hero.desktopImage).toEqual(
      fallbackHomePageSettings.hero.desktopImage,
    );
    expect(resolved.reviewsSection.title).toBe("Đánh giá mới");
  });

  it("normalizes Sanity image hotspots and keeps unverified metrics hidden", () => {
    const resolved = resolveHomePageSettings({
      equipmentSection: {
        image: {
          src: "https://cdn.sanity.io/images/project/production/image.jpg",
          alt: "Ảnh thiết bị mới",
          hotspot: { x: 0.25, y: 0.75 },
        },
      },
      metrics: [
        {
          value: "10+",
          label: "Năm kinh nghiệm",
          verified: false,
        },
      ],
    });

    expect(resolved.equipmentSection.image.focalPoint).toBe("25% 75%");
    expect(resolved.metrics).toEqual([]);
  });
});
