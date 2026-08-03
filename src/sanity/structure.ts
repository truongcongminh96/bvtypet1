import {
  Article,
  FirstAidKit,
  House,
  Info,
  MapPin,
  Microscope,
  Star,
  Stethoscope,
} from "@phosphor-icons/react";
import type { StructureResolver } from "sanity/structure";

export const singletonSchemaTypes = new Set([
  "homePageSettings",
  "aboutPage",
]);

export const singletonDocumentActions = new Set([
  "publish",
  "discardChanges",
  "restore",
]);

export const studioStructure: StructureResolver = (structure) =>
  structure
    .list()
    .title("Nội dung Pet One")
    .items([
      structure
        .listItem()
        .id("homePageSettings")
        .title("Trang chủ")
        .icon(House)
        .child(
          structure
            .document()
            .schemaType("homePageSettings")
            .documentId("homePageSettings"),
        ),
      structure
        .listItem()
        .id("aboutPage")
        .title("Trang giới thiệu")
        .icon(Info)
        .child(
          structure.document().schemaType("aboutPage").documentId("aboutPage"),
        ),
      structure.divider(),
      structure
        .listItem()
        .title("Dịch vụ")
        .icon(FirstAidKit)
        .child(structure.documentTypeList("service").title("Dịch vụ")),
      structure
        .listItem()
        .title("Bài viết")
        .icon(Article)
        .child(structure.documentTypeList("article").title("Bài viết")),
      structure
        .listItem()
        .title("Bác sĩ")
        .icon(Stethoscope)
        .child(structure.documentTypeList("doctor").title("Bác sĩ")),
      structure.divider(),
      structure
        .listItem()
        .title("Cơ sở Pet One")
        .icon(MapPin)
        .child(
          structure.documentTypeList("clinicLocation").title("Cơ sở Pet One"),
        ),
      structure
        .listItem()
        .title("Trang thiết bị")
        .icon(Microscope)
        .child(
          structure.documentTypeList("equipment").title("Trang thiết bị"),
        ),
      structure
        .listItem()
        .title("Đánh giá khách hàng")
        .icon(Star)
        .child(
          structure
            .documentTypeList("customerReview")
            .title("Đánh giá khách hàng"),
        ),
    ]);
