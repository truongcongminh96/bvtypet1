import { visionTool } from "@sanity/vision";
import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";

import { sanityDataset, sanityProjectId } from "./src/sanity/env";
import { schemaTypes } from "./src/sanity/schemas";

export default defineConfig({
  name: "pet-one",
  title: "Pet One Content Studio",
  projectId: sanityProjectId,
  dataset: sanityDataset,
  basePath: "/studio",
  plugins: [structureTool(), visionTool()],
  schema: {
    types: schemaTypes,
  },
});
