import { describe, expect, it } from "vitest";

import { consultationSchema } from "@/lib/consultation-schema";

const validInput = {
  name: "Nguyễn An",
  phone: "090 123 4567",
  service: "Khám tổng quát",
  note: "",
  turnstileToken: "verified-token",
  submissionId: "pet-one-consult-123",
};

describe("consultation schema", () => {
  it("accepts a valid request", () => {
    expect(consultationSchema.safeParse(validInput).success).toBe(true);
  });

  it("rejects invalid phone characters", () => {
    expect(consultationSchema.safeParse({ ...validInput, phone: "call-me-now" }).success).toBe(false);
  });

  it("requires security verification", () => {
    expect(consultationSchema.safeParse({ ...validInput, turnstileToken: "" }).success).toBe(false);
  });
});
