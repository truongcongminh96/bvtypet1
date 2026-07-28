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
      name: "metrics",
      title: "Số liệu đã xác minh",
      description: "Chỉ số chỉ hiển thị trên trang chủ khi được đánh dấu đã xác minh.",
      type: "array",
      validation: (rule) => rule.max(3),
      of: [{
        type: "object",
        fields: [
          defineField({ name: "value", title: "Giá trị", type: "string", validation: (rule) => rule.required() }),
          defineField({ name: "label", title: "Nhãn", type: "string", validation: (rule) => rule.required() }),
          defineField({ name: "detail", title: "Ghi chú nguồn", type: "string" }),
          defineField({
            name: "verificationStatus",
            title: "Trạng thái",
            type: "string",
            initialValue: "draft",
            options: {
              list: [
                { title: "Đang kiểm tra", value: "draft" },
                { title: "Đã xác minh", value: "verified" },
              ],
            },
            validation: (rule) => rule.required(),
          }),
        ],
      }],
    }),
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
