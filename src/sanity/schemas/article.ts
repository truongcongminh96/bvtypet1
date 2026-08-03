import { defineArrayMember, defineField, defineType } from "sanity";

const imageFields = [
  defineField({
    name: "alt",
    title: "Mô tả ảnh",
    type: "string",
    validation: (rule) => rule.required(),
  }),
  defineField({
    name: "placeholder",
    title: "Ảnh minh hoạ tạm thời",
    description:
      "Bật khi ảnh chưa phải hình ảnh thực tế đã được PetOne xác minh.",
    type: "boolean",
    initialValue: true,
  }),
];

const contentBlockFields = [
  defineArrayMember({
    type: "object",
    name: "section",
    title: "Phần nội dung",
    fields: [
      defineField({
        name: "id",
        title: "ID liên kết",
        type: "string",
        validation: (rule) => rule.required(),
      }),
      defineField({
        name: "title",
        title: "Tiêu đề phần",
        type: "string",
        validation: (rule) => rule.required(),
      }),
      defineField({
        name: "paragraphs",
        title: "Đoạn văn",
        type: "array",
        of: [defineArrayMember({ type: "text", rows: 5 })],
        validation: (rule) => rule.required().min(1),
      }),
      defineField({
        name: "items",
        title: "Danh sách bổ sung",
        type: "array",
        of: [defineArrayMember({ type: "string" })],
      }),
    ],
  }),
  defineArrayMember({
    type: "object",
    name: "observationNote",
    title: "Ghi chú quan sát",
    fields: [
      defineField({ name: "id", title: "ID liên kết", type: "string" }),
      defineField({
        name: "title",
        title: "Tiêu đề",
        type: "string",
        validation: (rule) => rule.required(),
      }),
      defineField({
        name: "description",
        title: "Mô tả",
        type: "text",
        rows: 3,
      }),
      defineField({
        name: "items",
        title: "Điều cần quan sát",
        type: "array",
        of: [defineArrayMember({ type: "string" })],
        validation: (rule) => rule.required().min(1),
      }),
    ],
  }),
  defineArrayMember({
    type: "object",
    name: "preparationChecklist",
    title: "Danh sách chuẩn bị",
    fields: [
      defineField({ name: "id", title: "ID liên kết", type: "string" }),
      defineField({
        name: "title",
        title: "Tiêu đề",
        type: "string",
        validation: (rule) => rule.required(),
      }),
      defineField({
        name: "description",
        title: "Mô tả",
        type: "text",
        rows: 3,
      }),
      defineField({
        name: "items",
        title: "Các mục chuẩn bị",
        type: "array",
        of: [defineArrayMember({ type: "string" })],
        validation: (rule) => rule.required().min(1),
      }),
    ],
  }),
  defineArrayMember({
    type: "object",
    name: "importantCallout",
    title: "Lưu ý quan trọng",
    fields: [
      defineField({ name: "id", title: "ID liên kết", type: "string" }),
      defineField({ name: "title", title: "Tiêu đề", type: "string" }),
      defineField({
        name: "body",
        title: "Nội dung",
        type: "text",
        rows: 4,
        validation: (rule) => rule.required(),
      }),
    ],
  }),
  defineArrayMember({
    type: "object",
    name: "pullQuote",
    title: "Trích dẫn nổi bật",
    fields: [
      defineField({
        name: "quote",
        title: "Trích dẫn",
        type: "text",
        rows: 4,
        validation: (rule) => rule.required(),
      }),
      defineField({
        name: "attribution",
        title: "Nguồn đã xác minh",
        type: "string",
      }),
    ],
  }),
  defineArrayMember({
    type: "object",
    name: "imageWithCaption",
    title: "Ảnh có chú thích",
    fields: [
      defineField({
        name: "image",
        title: "Ảnh",
        type: "image",
        options: { hotspot: true },
        fields: imageFields,
        validation: (rule) => rule.required(),
      }),
      defineField({
        name: "caption",
        title: "Chú thích",
        type: "string",
      }),
    ],
  }),
];

export const articleType = defineType({
  name: "article",
  title: "Bài viết",
  type: "document",
  groups: [
    { name: "basic", title: "Thông tin", default: true },
    { name: "images", title: "Hình ảnh" },
    { name: "content", title: "Nội dung" },
    { name: "relations", title: "Liên kết" },
  ],
  fields: [
    defineField({
      name: "title",
      title: "Tiêu đề",
      type: "string",
      group: "basic",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Đường dẫn",
      type: "slug",
      group: "basic",
      options: { source: "title", maxLength: 96 },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "excerpt",
      title: "Mô tả ngắn",
      type: "text",
      group: "basic",
      rows: 3,
      validation: (rule) => rule.required().max(240),
    }),
    defineField({
      name: "lead",
      title: "Đoạn dẫn",
      type: "text",
      group: "basic",
      rows: 4,
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "category",
      title: "Chuyên mục",
      type: "string",
      group: "basic",
      options: {
        list: [
          { title: "Sức khỏe hằng ngày", value: "suc-khoe-hang-ngay" },
          { title: "Đi khám cùng bé", value: "di-kham-cung-be" },
          { title: "Chăm sóc dự phòng", value: "cham-soc-du-phong" },
          { title: "Dinh dưỡng", value: "dinh-duong" },
          { title: "Da lông & vệ sinh", value: "da-long-ve-sinh" },
        ],
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "journeyStage",
      title: "Giai đoạn chăm sóc",
      type: "string",
      group: "basic",
      options: {
        list: [
          { title: "Nhận ra thay đổi", value: "notice" },
          { title: "Chuẩn bị khi cần khám", value: "prepare" },
          { title: "Theo dõi sau khám", value: "continue" },
        ],
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "readingTime",
      title: "Thời gian đọc (phút)",
      type: "number",
      group: "basic",
      validation: (rule) => rule.required().integer().min(1),
    }),
    defineField({
      name: "publishedAt",
      title: "Ngày xuất bản",
      type: "date",
      group: "basic",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "coverImage",
      title: "Ảnh bìa",
      type: "image",
      group: "images",
      options: { hotspot: true },
      fields: imageFields,
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "thumbnailImage",
      title: "Ảnh thu nhỏ",
      type: "image",
      group: "images",
      options: { hotspot: true },
      fields: imageFields,
    }),
    defineField({
      name: "contentBlocks",
      title: "Nội dung bài viết",
      type: "array",
      group: "content",
      of: contentBlockFields,
      validation: (rule) => rule.required().min(1),
    }),
    defineField({
      name: "disclaimer",
      title: "Lưu ý biên tập",
      type: "text",
      group: "content",
      rows: 3,
      initialValue:
        "Nội dung nhằm hỗ trợ quan sát và không thay thế đánh giá trực tiếp của bác sĩ thú y.",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "reviewedBy",
      title: "Người duyệt đã xác minh",
      type: "reference",
      group: "relations",
      to: [{ type: "doctor" }],
      options: {
        filter: "verificationStatus == $status",
        filterParams: { status: "verified" },
      },
    }),
    defineField({
      name: "relatedArticles",
      title: "Bài viết liên quan",
      type: "array",
      group: "relations",
      of: [
        defineArrayMember({
          type: "reference",
          to: [{ type: "article" }],
        }),
      ],
    }),
    defineField({
      name: "featured",
      title: "Bài viết nổi bật",
      type: "boolean",
      group: "basic",
      initialValue: false,
    }),
    defineField({
      name: "tags",
      title: "Thẻ nội dung",
      type: "array",
      group: "basic",
      of: [defineArrayMember({ type: "string" })],
      options: { layout: "tags" },
    }),
    defineField({
      name: "image",
      title: "Ảnh bài viết cũ",
      type: "image",
      options: { hotspot: true },
      fields: imageFields,
      hidden: true,
      readOnly: true,
    }),
    defineField({
      name: "intro",
      title: "Đoạn mở đầu cũ",
      type: "text",
      hidden: true,
      readOnly: true,
    }),
    defineField({
      name: "sections",
      title: "Các phần nội dung cũ",
      type: "array",
      hidden: true,
      readOnly: true,
      of: [
        defineArrayMember({
          type: "object",
          name: "articleSection",
          fields: [
            defineField({ name: "title", type: "string" }),
            defineField({ name: "body", type: "text" }),
          ],
        }),
      ],
    }),
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "category",
      media: "coverImage",
    },
  },
});
