import { z } from "zod";

export const consultationSchema = z.object({
  name: z.string().trim().min(2, "Vui lòng nhập họ tên.").max(80, "Họ tên quá dài."),
  phone: z
    .string()
    .trim()
    .min(8, "Vui lòng nhập số điện thoại hợp lệ.")
    .max(20, "Số điện thoại quá dài.")
    .regex(/^[\d\s()+.-]+$/, "Số điện thoại chứa ký tự không hợp lệ."),
  service: z.string().trim().min(1, "Vui lòng chọn nhu cầu.").max(100),
  note: z.string().trim().max(500, "Ghi chú quá dài.").optional(),
  turnstileToken: z.string().min(1, "Vui lòng hoàn tất xác minh bảo mật."),
  submissionId: z.string().min(8).max(120),
});

export type ConsultationInput = z.infer<typeof consultationSchema>;
