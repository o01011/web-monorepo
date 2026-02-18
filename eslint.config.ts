import tseslint from "typescript-eslint";
import { defineConfig } from "eslint/config";
import eslintConfigPrettier from "eslint-config-prettier/flat";
import eslintPluginPrettierRecommended from "eslint-plugin-prettier/recommended";

const globalIgnores: string[] = ["**/dist/**", "**/*.d.ts", "src/generated"];

const gloablExtends = [
  tseslint.configs.recommended,
  eslintPluginPrettierRecommended,
  eslintConfigPrettier,
];

export default defineConfig([
  {
    name: "Global ignores",
    ignores: globalIgnores,
  },
  {
    name: "Configuration files",
    files: [
      "commitlint.config.ts",
      "eslint.config.ts",
      "knip.config.ts",
      "prettier.config.ts",
      "prisma.config.ts",
    ],
    extends: gloablExtends,
  },
  {
    name: "Application files",
    files: ["src/**/*.ts"],
    extends: gloablExtends,
  },
]);
