import { defineField, defineType } from "sanity";

export const aboutPageType = defineType({
  name: "aboutPage",
  title: "Trang giới thiệu",
  type: "document",
  fields: [
    defineField({ name: "eyebrow", title: "Nhãn", type: "string", validation: (rule) => rule.required() }),
    defineField({ name: "title", title: "Tiêu đề", type: "string", validation: (rule) => rule.required() }),
    defineField({ name: "description", title: "Mô tả", type: "text", rows: 3, validation: (rule) => rule.required() }),
    defineField({ name: "storyTitle", title: "Tiêu đề câu chuyện", type: "string", validation: (rule) => rule.required() }),
    defineField({ name: "story", title: "Nội dung", type: "array", of: [{ type: "text" }], validation: (rule) => rule.required().min(1) }),
    defineField({
      name: "image",
      title: "Ảnh",
      type: "image",
      options: { hotspot: true },
      fields: [defineField({ name: "alt", title: "Mô tả ảnh", type: "string", validation: (rule) => rule.required() })],
    }),
    defineField({
      name: "principles",
      title: "Nguyên tắc",
      type: "array",
      of: [{
        type: "object",
        fields: [
          defineField({ name: "title", title: "Tiêu đề", type: "string", validation: (rule) => rule.required() }),
          defineField({ name: "description", title: "Mô tả", type: "text", rows: 3, validation: (rule) => rule.required() }),
        ],
      }],
    }),
  ],
  preview: { select: { title: "title", subtitle: "description", media: "image" } },
});
