import { describe, expect, it } from "vitest";

import { bookingSchema } from "./booking-schema";

const validBooking = {
  ownerName: "Minh",
  phone: "090 123 4567",
  email: "",
  petName: "Milo",
  petType: "Chó" as const,
  preferredTime: "Linh hoạt, PetOne liên hệ lại" as const,
  preferredDate: "2026-07-30",
  concern: "Bé ăn ít hơn bình thường trong hai ngày gần đây.",
  consent: true,
  turnstileToken: "test-token",
  submissionId: "pet-one-test-123",
};

describe("bookingSchema", () => {
  it("accepts a complete booking request", () => {
    expect(bookingSchema.safeParse(validBooking).success).toBe(true);
  });

  it("requires privacy consent", () => {
    const result = bookingSchema.safeParse({
      ...validBooking,
      consent: false,
    });

    expect(result.success).toBe(false);
  });

  it("rejects an invalid phone number", () => {
    const result = bookingSchema.safeParse({
      ...validBooking,
      phone: "not-a-phone",
    });

    expect(result.success).toBe(false);
  });

  it("rejects the previous flexible-time value", () => {
    const result = bookingSchema.safeParse({
      ...validBooking,
      preferredTime: "Cần trao đổi thêm",
    });

    expect(result.success).toBe(false);
  });

  it("requires a Turnstile token", () => {
    const result = bookingSchema.safeParse({
      ...validBooking,
      turnstileToken: "",
    });

    expect(result.success).toBe(false);
  });
});
