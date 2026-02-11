import { type KnipConfig } from "knip";

const config: KnipConfig = {
  $schema: "https://unpkg.com/knip@5/schema.json",
  project: ["src/**/*.ts"],
  ignoreDependencies: ["tsconfig-paths", "@commitlint/cli", "pg"],
  ignoreMembers: ["DEVELOPMENT", "STAGING", "P2002", "P2025"],
  ignoreFiles: [
    "src/modules/user/entities/user.entity.ts",
    "src/modules/user/user.repository.ts",
  ],
};

export default config;
