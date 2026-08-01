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
      name: "group",
      title: "Nhóm dịch vụ",
      type: "string",
      initialValue: "kham-chua-benh",
      options: {
        list: [
          { title: "Pet Shop", value: "pet-shop" },
          { title: "Pet Hotel", value: "pet-hotel" },
          { title: "Khám chữa bệnh", value: "kham-chua-benh" },
          { title: "Spa / Grooming", value: "spa-grooming" },
          { title: "Phẫu thuật", value: "phau-thuat" },
        ],
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "cardImage",
      title: "Ảnh thẻ dịch vụ",
      type: "image",
      options: { hotspot: true },
      fields: [
        defineField({
          name: "alt",
          title: "Mô tả ảnh",
          type: "string",
          validation: (rule) => rule.required(),
        }),
      ],
    }),
    defineField({
      name: "featuredOnHome",
      title: "Hiển thị trong Top dịch vụ trang chủ",
      type: "boolean",
      initialValue: false,
    }),
    defineField({
      name: "homeOrder",
      title: "Thứ tự trên trang chủ",
      type: "number",
      initialValue: 10,
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
