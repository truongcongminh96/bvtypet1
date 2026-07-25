import { defineField, defineType } from "sanity";

export const serviceType = defineType({
  name: "service",
  title: "Dịch vụ",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Tên dịch vụ",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "shortTitle",
      title: "Tên ngắn",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Đường dẫn",
      type: "slug",
      options: { source: "title", maxLength: 96 },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "summary",
      title: "Mô tả ngắn",
      type: "text",
      rows: 3,
      validation: (rule) => rule.required().max(240),
    }),
    defineField({
      name: "description",
      title: "Nội dung giới thiệu",
      type: "text",
      rows: 6,
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "points",
      title: "Các bước chính",
      type: "array",
      of: [{ type: "string" }],
      validation: (rule) => rule.required().min(2).max(5),
    }),
    defineField({
      name: "accent",
      title: "Màu nhấn",
      type: "string",
      initialValue: "blue",
      options: {
        list: [
          { title: "Xanh y tế", value: "blue" },
          { title: "Đỏ chăm sóc", value: "red" },
          { title: "Xanh navy", value: "navy" },
          { title: "Xanh băng", value: "ice" },
        ],
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "order",
      title: "Thứ tự",
      type: "number",
      initialValue: 10,
    }),
  ],
  preview: {
    select: { title: "title", subtitle: "summary" },
  },
});
