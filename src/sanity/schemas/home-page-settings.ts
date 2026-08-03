import { defineField, defineType } from "sanity";

import { fallbackHomePageSettings } from "@/content/experience";

const imageField = (name: string, title: string) =>
  defineField({
    name,
    title,
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
  });

const editorialCopyFields = [
  defineField({
    name: "eyebrow",
    title: "Nhãn nhỏ",
    type: "string",
    validation: (rule) => rule.required(),
  }),
  defineField({
    name: "title",
    title: "Tiêu đề",
    type: "string",
    validation: (rule) => rule.required(),
  }),
  defineField({
    name: "titleAccent",
    title: "Phần tiêu đề màu xanh",
    type: "string",
    validation: (rule) => rule.required(),
  }),
];

export const homePageSettingsType = defineType({
  name: "homePageSettings",
  title: "Thiết lập trang chủ",
  type: "document",
  initialValue: {
    hero: {
      eyebrow: fallbackHomePageSettings.hero.eyebrow,
      title: fallbackHomePageSettings.hero.title,
      titleAccent: fallbackHomePageSettings.hero.titleAccent,
      description: fallbackHomePageSettings.hero.description,
      ctaLabel: fallbackHomePageSettings.hero.ctaLabel,
      ctaHref: fallbackHomePageSettings.hero.ctaHref,
    },
    why: {
      eyebrow: fallbackHomePageSettings.why.eyebrow,
      title: fallbackHomePageSettings.why.title,
      titleAccent: fallbackHomePageSettings.why.titleAccent,
      description: fallbackHomePageSettings.why.description,
      caption: fallbackHomePageSettings.why.caption,
    },
    servicesSection: fallbackHomePageSettings.servicesSection,
    equipmentSection: {
      eyebrow: fallbackHomePageSettings.equipmentSection.eyebrow,
      title: fallbackHomePageSettings.equipmentSection.title,
      titleAccent: fallbackHomePageSettings.equipmentSection.titleAccent,
      caption: fallbackHomePageSettings.equipmentSection.caption,
    },
    reviewsSection: fallbackHomePageSettings.reviewsSection,
    articlesSection: fallbackHomePageSettings.articlesSection,
    bookingCta: {
      eyebrow: fallbackHomePageSettings.bookingCta.eyebrow,
      title: fallbackHomePageSettings.bookingCta.title,
      description: fallbackHomePageSettings.bookingCta.description,
      ctaLabel: fallbackHomePageSettings.bookingCta.ctaLabel,
      ctaHref: fallbackHomePageSettings.bookingCta.ctaHref,
    },
    rating: fallbackHomePageSettings.rating,
    reviewCount: fallbackHomePageSettings.reviewCount,
    googleMapsUrl: fallbackHomePageSettings.googleMapsUrl,
    reasons: fallbackHomePageSettings.reasons,
    metrics: fallbackHomePageSettings.metrics,
  },
  fields: [
    defineField({
      name: "hero",
      title: "Hero trang chủ",
      type: "object",
      fields: [
        ...editorialCopyFields,
        defineField({
          name: "description",
          title: "Mô tả",
          type: "text",
          rows: 4,
          validation: (rule) => rule.required(),
        }),
        defineField({
          name: "ctaLabel",
          title: "Nhãn nút",
          type: "string",
          validation: (rule) => rule.required(),
        }),
        defineField({
          name: "ctaHref",
          title: "Đường dẫn nút",
          description: "Có thể dùng đường dẫn nội bộ, ví dụ /lien-he#dat-lich",
          type: "string",
          validation: (rule) => rule.required(),
        }),
        imageField("desktopImage", "Ảnh hero desktop"),
        imageField("mobileImage", "Ảnh hero mobile"),
      ],
    }),
    defineField({
      name: "why",
      title: "Khối lý do chọn Pet One",
      type: "object",
      fields: [
        ...editorialCopyFields,
        defineField({
          name: "description",
          title: "Mô tả",
          type: "text",
          rows: 4,
          validation: (rule) => rule.required(),
        }),
        defineField({
          name: "images",
          title: "Bốn ảnh collage",
          type: "array",
          validation: (rule) => rule.max(4),
          of: [
            {
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
            },
          ],
        }),
        defineField({
          name: "caption",
          title: "Chú thích ảnh",
          type: "string",
          validation: (rule) => rule.required(),
        }),
      ],
    }),
    defineField({
      name: "servicesSection",
      title: "Tiêu đề khối dịch vụ",
      type: "object",
      fields: editorialCopyFields,
    }),
    defineField({
      name: "equipmentSection",
      title: "Khối trang thiết bị",
      type: "object",
      fields: [
        ...editorialCopyFields,
        imageField("image", "Ảnh đại diện"),
        defineField({
          name: "caption",
          title: "Chú thích ảnh",
          type: "string",
          validation: (rule) => rule.required(),
        }),
      ],
    }),
    defineField({
      name: "reviewsSection",
      title: "Tiêu đề khối đánh giá",
      type: "object",
      fields: [
        defineField({ name: "eyebrow", title: "Nhãn nhỏ", type: "string" }),
        defineField({ name: "title", title: "Tiêu đề", type: "string" }),
        defineField({
          name: "description",
          title: "Mô tả",
          type: "text",
          rows: 3,
        }),
      ],
    }),
    defineField({
      name: "articlesSection",
      title: "Tiêu đề khối cẩm nang",
      type: "object",
      fields: [
        ...editorialCopyFields,
        defineField({
          name: "linkLabel",
          title: "Nhãn link xem thêm",
          type: "string",
        }),
      ],
    }),
    defineField({
      name: "bookingCta",
      title: "CTA đặt lịch cuối trang",
      type: "object",
      fields: [
        defineField({ name: "eyebrow", title: "Nhãn nhỏ", type: "string" }),
        defineField({ name: "title", title: "Tiêu đề", type: "string" }),
        defineField({
          name: "description",
          title: "Mô tả",
          type: "text",
          rows: 4,
        }),
        defineField({ name: "ctaLabel", title: "Nhãn nút", type: "string" }),
        defineField({
          name: "ctaHref",
          title: "Đường dẫn nút",
          type: "string",
        }),
        imageField("image", "Ảnh nền"),
      ],
    }),
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
