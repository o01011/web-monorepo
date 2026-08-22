import { join } from "node:path";
import { loadEnvFile } from "node:process";
import { defineConfig, env } from "prisma/config";

const packageRoot = import.meta.dirname;

loadEnvFile(`${join(packageRoot, "..", "..", ".env")}`);

export default defineConfig({
	datasource: {
		url: env("POSTGRES_URL"),
	},
	migrations: {
		path: join(packageRoot, "prisma", "migrations"),
		seed: `node ${join("prisma", "seeders", "seeder.ts")}`,
	},
	schema: join(packageRoot, "prisma", "schema.prisma"),
});
