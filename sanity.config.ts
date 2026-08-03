import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";

import { PetOneStudioLogo } from "./src/components/sanity/studio-logo";
import { sanityDataset, sanityProjectId } from "./src/sanity/env";
import { schemaTypes } from "./src/sanity/schemas";
import {
  singletonDocumentActions,
  singletonSchemaTypes,
  studioStructure,
} from "./src/sanity/structure";
import { petOneStudioTheme } from "./src/sanity/theme";

export default defineConfig({
  name: "pet-one",
  title: "Pet One Content Studio",
  projectId: sanityProjectId,
  dataset: sanityDataset,
  basePath: "/studio",
  plugins: [structureTool({ structure: studioStructure })],
  theme: petOneStudioTheme,
  studio: {
    components: {
      logo: PetOneStudioLogo,
    },
  },
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
