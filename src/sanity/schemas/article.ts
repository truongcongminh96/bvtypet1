import { defineArrayMember, defineField, defineType } from "sanity";

export const articleType = defineType({
  name: "article",
  title: "Bài viết",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Tiêu đề",
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
      name: "excerpt",
      title: "Mô tả ngắn",
      type: "text",
      rows: 3,
      validation: (rule) => rule.required().max(240),
    }),
    defineField({
      name: "category",
      title: "Chuyên mục",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "readTime",
      title: "Thời gian đọc",
      type: "string",
      initialValue: "4 phút đọc",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "publishedAt",
      title: "Ngày xuất bản",
      type: "date",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "intro",
      title: "Đoạn mở đầu",
      type: "text",
      rows: 4,
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "sections",
      title: "Các phần nội dung",
      type: "array",
      of: [
        defineArrayMember({
          type: "object",
          name: "articleSection",
          title: "Phần nội dung",
          fields: [
            defineField({
              name: "title",
              title: "Tiêu đề phần",
              type: "string",
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: "body",
              title: "Nội dung",
              type: "text",
              rows: 6,
              validation: (rule) => rule.required(),
            }),
          ],
        }),
      ],
      validation: (rule) => rule.required().min(1),
    }),
  ],
  preview: {
    select: { title: "title", subtitle: "category" },
  },
});
