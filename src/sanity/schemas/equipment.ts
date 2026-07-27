import { defineField, defineType } from "sanity";

export const equipmentType = defineType({
  name: "equipment",
  title: "Trang thiết bị",
  type: "document",
  fields: [
    defineField({ name: "name", title: "Tên thiết bị", type: "string", validation: (rule) => rule.required() }),
    defineField({ name: "summary", title: "Thông tin cơ bản", type: "text", rows: 4, validation: (rule) => rule.required() }),
    defineField({ name: "supports", title: "Hỗ trợ đánh giá / điều trị", type: "array", of: [{ type: "string" }], validation: (rule) => rule.required().min(1) }),
    defineField({
      name: "image",
      title: "Ảnh thiết bị",
      type: "image",
      options: { hotspot: true },
      fields: [defineField({ name: "alt", title: "Mô tả ảnh", type: "string", validation: (rule) => rule.required() })],
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
  preview: { select: { title: "name", subtitle: "summary", media: "image" } },
});
