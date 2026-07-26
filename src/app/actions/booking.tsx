"use server";

import { Resend } from "resend";

import { BookingRequestEmail } from "@/emails/booking-request";
import { bookingSchema } from "@/lib/booking-schema";

export type BookingActionResult = {
  success: boolean;
  message: string;
  code:
    | "success"
    | "validation"
    | "unavailable"
    | "verification"
    | "delivery";
};

let resendClient: Resend | null = null;

function getResendClient() {
  const apiKey = process.env.RESEND_API_KEY;

  if (!apiKey) {
    throw new Error("RESEND_NOT_CONFIGURED");
  }

  resendClient ??= new Resend(apiKey);
  return resendClient;
}

async function verifyTurnstile(token?: string) {
  const secret = process.env.TURNSTILE_SECRET_KEY;

  if (!secret) {
    throw new Error("TURNSTILE_NOT_CONFIGURED");
  }

  if (!token) {
    return false;
  }

  const body = new FormData();
  body.set("secret", secret);
  body.set("response", token);

  const response = await fetch(
    "https://challenges.cloudflare.com/turnstile/v0/siteverify",
    {
      method: "POST",
      body,
      cache: "no-store",
    },
  );

  if (!response.ok) {
    return false;
  }

  const result = (await response.json()) as { success?: boolean };
  return result.success === true;
}

export async function submitBooking(
  input: unknown,
): Promise<BookingActionResult> {
  const parsed = bookingSchema.safeParse(input);

  if (!parsed.success) {
    return {
      success: false,
      message: "Một vài thông tin chưa hợp lệ. Vui lòng kiểm tra lại biểu mẫu.",
      code: "validation",
    };
  }

  const recipient = process.env.BOOKING_EMAIL_TO;
  const from =
    process.env.RESEND_FROM_EMAIL ?? "Pet One <booking@example.invalid>";

  if (!recipient || !process.env.RESEND_API_KEY) {
    return {
      success: false,
      message:
        "Biểu mẫu hiện chưa thể tiếp nhận yêu cầu. Vui lòng gọi phòng khám để được hỗ trợ.",
      code: "unavailable",
    };
  }

  if (
    !process.env.TURNSTILE_SECRET_KEY ||
    !process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY
  ) {
    return {
      success: false,
      message:
        "Biểu mẫu đang được hoàn thiện. Vui lòng gọi phòng khám để được hỗ trợ.",
      code: "unavailable",
    };
  }

  try {
    const verified = await verifyTurnstile(parsed.data.turnstileToken);

    if (!verified) {
      return {
        success: false,
        message:
          "Không thể xác minh yêu cầu. Vui lòng thử lại thao tác bảo mật.",
        code: "verification",
      };
    }

    const { error } = await getResendClient().emails.send({
      from,
      to: recipient,
      replyTo: parsed.data.email || undefined,
      subject: `[Pet One] Yêu cầu đặt lịch cho ${parsed.data.petName}`,
      react: <BookingRequestEmail booking={parsed.data} />,
      headers: {
        "Idempotency-Key": parsed.data.submissionId,
      },
    });

    if (error) {
      return {
        success: false,
        message:
          "Chưa thể gửi yêu cầu lúc này. Vui lòng liên hệ phòng khám để được hỗ trợ.",
        code: "delivery",
      };
    }

    return {
      success: true,
      message:
        "Phòng khám sẽ liên hệ lại để xác nhận lịch.",
      code: "success",
    };
  } catch {
    return {
      success: false,
      message:
        "Chưa thể gửi yêu cầu lúc này. Vui lòng liên hệ phòng khám để được hỗ trợ.",
      code: "delivery",
    };
  }
}
