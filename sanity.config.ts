import { visionTool } from "@sanity/vision";
import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";

import { sanityDataset, sanityProjectId } from "./src/sanity/env";
import { schemaTypes } from "./src/sanity/schemas";
import {
  singletonDocumentActions,
  singletonSchemaTypes,
  studioStructure,
} from "./src/sanity/structure";

export default defineConfig({
  name: "pet-one",
  title: "Pet One Content Studio",
  projectId: sanityProjectId,
  dataset: sanityDataset,
  basePath: "/studio",
  plugins: [structureTool({ structure: studioStructure }), visionTool()],
  schema: {
    types: schemaTypes,
  },
  document: {
    newDocumentOptions: (templates) =>
      templates.filter(
        (template) => !singletonSchemaTypes.has(template.templateId),
      ),
    actions: (actions, context) =>
      singletonSchemaTypes.has(context.schemaType)
        ? actions.filter(
            (action) =>
              action.action && singletonDocumentActions.has(action.action),
          )
        : actions,
  },
});
