import { defineField, defineType } from "sanity";

export const equipmentType = defineType({
  name: "equipment",
  title: "Trang thiết bị",
  type: "document",
  groups: [
    { name: "basic", title: "Thông tin", default: true },
    { name: "display", title: "Hiển thị" },
  ],
  fields: [
    defineField({ name: "name", title: "Tên thiết bị", type: "string", group: "basic", validation: (rule) => rule.required() }),
    defineField({ name: "summary", title: "Thông tin cơ bản", type: "text", group: "basic", rows: 4, validation: (rule) => rule.required() }),
    defineField({ name: "supports", title: "Hỗ trợ đánh giá / điều trị", type: "array", group: "basic", of: [{ type: "string" }], validation: (rule) => rule.required().min(1) }),
    defineField({
      name: "image",
      title: "Ảnh thiết bị",
      type: "image",
      group: "display",
      options: { hotspot: true },
      fields: [defineField({ name: "alt", title: "Mô tả ảnh", type: "string", validation: (rule) => rule.required() })],
    }),
    defineField({
      name: "verificationStatus",
      title: "Trạng thái",
      type: "string",
      group: "display",
      initialValue: "draft",
      options: { list: [{ title: "Đang kiểm tra", value: "draft" }, { title: "Đã xác minh", value: "verified" }] },
      validation: (rule) => rule.required(),
    }),
    defineField({ name: "order", title: "Thứ tự", type: "number", group: "display", initialValue: 10 }),
  ],
  preview: { select: { title: "name", subtitle: "summary", media: "image" } },
});
