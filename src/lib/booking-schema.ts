import { z } from "zod";

export const bookingSchema = z.object({
  ownerName: z
    .string()
    .trim()
    .min(2, "Vui lòng nhập tên người liên hệ.")
    .max(80, "Tên người liên hệ quá dài."),
  phone: z
    .string()
    .trim()
    .min(8, "Vui lòng nhập số điện thoại hợp lệ.")
    .max(20, "Số điện thoại quá dài.")
    .regex(/^[\d\s()+.-]+$/, "Số điện thoại chứa ký tự không hợp lệ."),
  email: z
    .string()
    .trim()
    .email("Email chưa đúng định dạng.")
    .or(z.literal("")),
  petName: z
    .string()
    .trim()
    .min(1, "Vui lòng nhập tên thú cưng.")
    .max(60, "Tên thú cưng quá dài."),
  petType: z.enum(["Chó", "Mèo", "Khác"]),
  preferredTime: z.enum([
    "Buổi sáng",
    "Buổi chiều",
    "Buổi tối",
    "Linh hoạt, PetOne liên hệ lại",
  ]),
  preferredDate: z.string().trim().max(20).optional(),
  concern: z
    .string()
    .trim()
    .min(10, "Hãy mô tả thêm một chút về tình trạng của bé.")
    .max(1200, "Nội dung mô tả quá dài."),
  consent: z
    .boolean()
    .refine((value) => value, "Bạn cần đồng ý để Pet One tiếp nhận thông tin."),
  turnstileToken: z
    .string()
    .min(1, "Vui lòng hoàn tất xác minh bảo mật trước khi gửi."),
  submissionId: z.string().min(8).max(120),
});

export type BookingInput = z.infer<typeof bookingSchema>;
