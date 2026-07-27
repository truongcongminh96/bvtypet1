"use server";

import { Resend } from "resend";

import { ConsultationRequestEmail } from "@/emails/consultation-request";
import { consultationSchema } from "@/lib/consultation-schema";

export type ConsultationActionResult = {
  success: boolean;
  message: string;
};

async function verifyTurnstile(token: string) {
  const secret = process.env.TURNSTILE_SECRET_KEY;
  if (!secret) return false;
  const body = new FormData();
  body.set("secret", secret);
  body.set("response", token);
  const response = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
    method: "POST",
    body,
    cache: "no-store",
  });
  if (!response.ok) return false;
  const result = (await response.json()) as { success?: boolean };
  return result.success === true;
}

export async function submitConsultation(input: unknown): Promise<ConsultationActionResult> {
  const parsed = consultationSchema.safeParse(input);
  if (!parsed.success) {
    return { success: false, message: "Vui lòng kiểm tra lại các thông tin bắt buộc." };
  }

  const recipient = process.env.BOOKING_EMAIL_TO;
  const apiKey = process.env.RESEND_API_KEY;
  if (!recipient || !apiKey || !process.env.TURNSTILE_SECRET_KEY) {
    return { success: false, message: "Biểu mẫu chưa sẵn sàng. Vui lòng liên hệ Pet One qua các kênh bên cạnh." };
  }

  try {
    if (!(await verifyTurnstile(parsed.data.turnstileToken))) {
      return { success: false, message: "Không thể xác minh yêu cầu. Vui lòng thử lại." };
    }
    const resend = new Resend(apiKey);
    const { error } = await resend.emails.send({
      from: process.env.RESEND_FROM_EMAIL ?? "Pet One <booking@example.invalid>",
      to: recipient,
      subject: `[Pet One] Yêu cầu tư vấn từ ${parsed.data.name}`,
      react: <ConsultationRequestEmail request={parsed.data} />,
      headers: { "Idempotency-Key": parsed.data.submissionId },
    });
    if (error) return { success: false, message: "Chưa thể gửi yêu cầu lúc này. Vui lòng thử lại sau." };
    return { success: true, message: "Pet One đã nhận thông tin và sẽ liên hệ lại." };
  } catch {
    return { success: false, message: "Chưa thể gửi yêu cầu lúc này. Vui lòng thử lại sau." };
  }
}
