import type { CodegenConfig } from "@graphql-codegen/cli";

console.log();
const config: CodegenConfig = {
  overwrite: true,
  schema: [
    {
      [process.env.HASURA_PROJECT_ENDPOINT as string]: {
        headers: {
          "x-hasura-admin-secret": process.env.HASURA_ADMIN_SECRET as string,
        },
      },
    },
  ],
  documents: "**/*.graphql",
  generates: {
    "generated/graphql.ts": {
      plugins: [
        "typescript",
        "typescript-operations",
        "typescript-document-nodes",
        "urql-introspection",
      ],
    },
    "./graphql.schema.json": {
      plugins: ["introspection"],
    },
  },
};

export default config;
