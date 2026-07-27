import { defineField, defineType } from "sanity";

export const clinicLocationType = defineType({
  name: "clinicLocation",
  title: "Cơ sở Pet One",
  type: "document",
  fields: [
    defineField({ name: "name", title: "Tên cơ sở", type: "string", validation: (rule) => rule.required() }),
    defineField({ name: "address", title: "Địa chỉ", type: "string", validation: (rule) => rule.required() }),
    defineField({ name: "phone", title: "Số điện thoại", type: "string" }),
    defineField({ name: "email", title: "Email", type: "string" }),
    defineField({ name: "openingHours", title: "Giờ hoạt động", type: "string" }),
    defineField({ name: "mapUrl", title: "Link Google Maps", type: "url", validation: (rule) => rule.required() }),
    defineField({ name: "mapEmbedUrl", title: "Link nhúng Google Maps", type: "url" }),
    defineField({
      name: "verificationStatus",
      title: "Trạng thái",
      type: "string",
      initialValue: "draft",
      options: { list: [{ title: "Đang kiểm tra", value: "draft" }, { title: "Đã xác minh", value: "verified" }] },
      validation: (rule) => rule.required(),
    }),
    defineField({ name: "order", title: "Thứ tự", type: "number", initialValue: 10 }),
  ],
  preview: { select: { title: "name", subtitle: "address" } },
});
