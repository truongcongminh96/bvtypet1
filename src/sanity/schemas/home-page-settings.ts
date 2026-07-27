import { defineField, defineType } from "sanity";

export const homePageSettingsType = defineType({
  name: "homePageSettings",
  title: "Thiết lập trang chủ",
  type: "document",
  fields: [
    defineField({ name: "rating", title: "Điểm Google", type: "number", validation: (rule) => rule.min(1).max(5) }),
    defineField({ name: "reviewCount", title: "Số lượt đánh giá Google", type: "number", validation: (rule) => rule.integer().positive() }),
    defineField({ name: "googleMapsUrl", title: "Link Google Maps", type: "url" }),
    defineField({
      name: "reasons",
      title: "Lý do chọn Pet One",
      type: "array",
      validation: (rule) => rule.max(6),
      of: [{
        type: "object",
        fields: [
          defineField({ name: "title", title: "Tiêu đề", type: "string", validation: (rule) => rule.required() }),
          defineField({ name: "description", title: "Mô tả", type: "text", rows: 3, validation: (rule) => rule.required() }),
        ],
      }],
    }),
  ],
  preview: { prepare: () => ({ title: "Thiết lập trang chủ" }) },
});
