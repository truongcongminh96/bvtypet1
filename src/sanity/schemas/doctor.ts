import { defineField, defineType } from "sanity";

export const doctorType = defineType({
  name: "doctor",
  title: "Bác sĩ",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Họ và tên",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Đường dẫn",
      type: "slug",
      options: { source: "name", maxLength: 96 },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "position",
      title: "Vị trí",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "specialty",
      title: "Chuyên môn",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "yearsOfExperience",
      title: "Số năm kinh nghiệm đã xác minh",
      type: "number",
      validation: (rule) => rule.integer().positive(),
    }),
    defineField({
      name: "schedule",
      title: "Lịch làm việc",
      type: "string",
    }),
    defineField({
      name: "biography",
      title: "Giới thiệu chuyên môn",
      type: "text",
      rows: 6,
    }),
    defineField({
      name: "credentials",
      title: "Chứng chỉ và bằng cấp",
      type: "array",
      of: [{ type: "string" }],
    }),
    defineField({
      name: "journey",
      title: "Hành trình nghề nghiệp",
      type: "array",
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
