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
        .child(
          structure.document().schemaType("aboutPage").documentId("aboutPage"),
        ),
      structure.divider(),
      ...structure
        .documentTypeListItems()
        .filter((item) => !singletonSchemaTypes.has(item.getId() ?? "")),
    ]);
