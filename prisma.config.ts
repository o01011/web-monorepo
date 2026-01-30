import { defineConfig } from "prisma/config";
import { join } from "node:path";

export default defineConfig({
  schema: join(__dirname, "prisma", "schema.prisma"),
  migrations: {
    path: join(__dirname, "prisma", "migrations"),
  },
  datasource: {
    url: process.env["POSTGRES_URL"],
  },
});
