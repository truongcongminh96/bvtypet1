import { describe, expect, it } from "vitest";

import { onlyVerified } from "@/lib/verified-content";

describe("verified content", () => {
  it("keeps only records approved for public display", () => {
    expect(
      onlyVerified([
        { id: "draft", verified: false },
        { id: "public", verified: true },
      ]),
    ).toEqual([{ id: "public", verified: true }]);
  });

  it("returns an empty fallback safely", () => {
    expect(onlyVerified([])).toEqual([]);
  });
});
