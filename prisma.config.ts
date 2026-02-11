import { defineConfig, env } from "prisma/config";
import { join } from "node:path";
import { loadEnvFile } from "node:process";

loadEnvFile(".env");

export default defineConfig({
  schema: join(__dirname, "prisma", "schema.prisma"),
  migrations: {
    path: join(__dirname, "prisma", "migrations"),
    seed: `node ${join("prisma", "seeders", "seeder.ts")}`,
  },
  datasource: {
    url: env("POSTGRES_URL"),
  },
});
