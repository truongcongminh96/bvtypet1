import { defineField, defineType } from "sanity";

export const doctorType = defineType({
  name: "doctor",
  title: "Bác sĩ",
  type: "document",
  groups: [
    { name: "basic", title: "Thông tin", default: true },
    { name: "profile", title: "Hồ sơ chuyên môn" },
    { name: "display", title: "Hiển thị" },
  ],
  fields: [
    defineField({
      name: "name",
      title: "Họ và tên",
      type: "string",
      group: "basic",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Đường dẫn",
      type: "slug",
      group: "basic",
      options: { source: "name", maxLength: 96 },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "position",
      title: "Vị trí",
      type: "string",
      group: "basic",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "specialty",
      title: "Chuyên môn",
      type: "string",
      group: "basic",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "yearsOfExperience",
      title: "Số năm kinh nghiệm đã xác minh",
      type: "number",
      group: "profile",
      validation: (rule) => rule.integer().positive(),
    }),
    defineField({
      name: "schedule",
      title: "Lịch làm việc",
      type: "string",
      group: "profile",
    }),
    defineField({
      name: "biography",
      title: "Giới thiệu chuyên môn",
      type: "text",
      group: "profile",
      rows: 6,
    }),
    defineField({
      name: "credentials",
      title: "Chứng chỉ và bằng cấp",
      type: "array",
      group: "profile",
      of: [{ type: "string" }],
    }),
    defineField({
      name: "journey",
      title: "Hành trình nghề nghiệp",
      type: "array",
      group: "profile",
      of: [
        {
          type: "object",
          fields: [
            defineField({
              name: "year",
              title: "Năm / giai đoạn",
              type: "string",
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: "title",
              title: "Cột mốc",
              type: "string",
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: "description",
              title: "Mô tả",
              type: "text",
              rows: 3,
            }),
          ],
          preview: {
            select: { title: "title", subtitle: "year" },
          },
        },
      ],
    }),
    defineField({
      name: "image",
      title: "Ảnh hồ sơ",
      type: "image",
      group: "display",
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
      name: "verificationStatus",
      title: "Trạng thái xác minh",
      type: "string",
      group: "display",
      initialValue: "draft",
      options: {
        layout: "radio",
        list: [
          { title: "Đang kiểm tra", value: "draft" },
          { title: "Đã xác minh và được phép hiển thị", value: "verified" },
        ],
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "order",
      title: "Thứ tự",
      type: "number",
      group: "display",
      initialValue: 10,
    }),
  ],
  preview: {
    select: {
      title: "name",
      subtitle: "position",
      media: "image",
    },
  },
});
