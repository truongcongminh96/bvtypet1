import { describe, expect, it } from "vitest";

import { services as fallbackServices } from "@/content/site";
import { resolveServices } from "@/sanity/content";

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
