import { defineField, defineType } from "sanity";

export const customerReviewType = defineType({
  name: "customerReview",
  title: "Đánh giá khách hàng",
  type: "document",
  fields: [
    defineField({ name: "author", title: "Tên hiển thị", type: "string", validation: (rule) => rule.required() }),
    defineField({ name: "rating", title: "Số sao", type: "number", validation: (rule) => rule.required().min(1).max(5) }),
    defineField({ name: "quote", title: "Nội dung đánh giá", type: "text", rows: 5, validation: (rule) => rule.required().max(800) }),
    defineField({ name: "reviewedAt", title: "Ngày đánh giá", type: "date" }),
    defineField({ name: "reviewedLabel", title: "Nhãn thời gian hiển thị", type: "string", description: "Ví dụ: 2 tháng trước" }),
    defineField({ name: "sourceUrl", title: "Link đánh giá Google Maps", type: "url", validation: (rule) => rule.required() }),
    defineField({
      name: "avatar",
      title: "Ảnh đại diện khách hàng",
      type: "image",
      options: { hotspot: true },
      fields: [
        defineField({ name: "alt", title: "Mô tả ảnh", type: "string" }),
      ],
    }),
    defineField({
      name: "image",
      title: "Ảnh nền story",
      type: "image",
      options: { hotspot: true },
      fields: [
        defineField({ name: "alt", title: "Mô tả ảnh", type: "string" }),
      ],
    }),
    defineField({
      name: "verificationStatus",
      title: "Trạng thái",
      type: "string",
      initialValue: "draft",
      options: { list: [{ title: "Đang kiểm tra", value: "draft" }, { title: "Đã xác minh", value: "verified" }] },
      validation: (rule) => rule.required(),
    }),
    defineField({ name: "order", title: "Thứ tự", type: "number", initialValue: 10 }),
  ],
  preview: { select: { title: "author", subtitle: "quote" } },
});
