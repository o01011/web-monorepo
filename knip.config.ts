import { type KnipConfig } from "knip";

const config: KnipConfig = {
  $schema: "https://unpkg.com/knip@5/schema.json",
  project: ["src/**/*.ts"],
  ignoreDependencies: ["tsconfig-paths", "pg"],
  ignoreMembers: ["DEVELOPMENT", "STAGING", "P2002", "P2025"],
  ignore: ["src/generated/**"],
};

export default config;
