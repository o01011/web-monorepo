import tseslint from "typescript-eslint";
import { defineConfig } from "eslint/config";
import eslintConfigPrettier from "eslint-config-prettier/flat";
import eslintPluginPrettierRecommended from "eslint-plugin-prettier/recommended";

export default defineConfig([
  {
    name: "Ignores",
    ignores: ["dist"],
  },
  {
    name: "Files",
    files: ["src/**/*.ts"],
    extends: [
      tseslint.configs.recommended,
      eslintPluginPrettierRecommended,
      eslintConfigPrettier,
    ],
  },
]);
