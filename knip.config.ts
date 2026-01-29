import { type KnipConfig } from "knip";

const config: KnipConfig = {
  $schema: "https://unpkg.com/knip@5/schema.json",
  project: ["src/**/*.ts"],
  ignoreDependencies: ["tsconfig-paths", "@commitlint/cli"],
  ignoreMembers: ["DEVELOPMENT", "STAGING", "P2002", "P2025"],
};

export default config;
