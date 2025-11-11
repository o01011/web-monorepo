import { join } from 'node:path';
import { loadEnvFile } from 'node:process';
import { defineConfig, env } from 'prisma/config';

loadEnvFile('.env');

export default defineConfig({
	engine: 'classic',
	schema: join(__dirname, 'prisma', 'schemas'),
	datasource: {
		url: env('POSTGRES_URL'),
	},
	migrations: {
		path: join(__dirname, 'prisma', 'migrations'),
		seed: `node --optimize-for-size --max-old-space-size=3048 --gc-interval=100 -r tsconfig-paths/register -r ts-node/register ${join(__dirname, 'prisma', 'seeders', 'seed.ts')}`,
	},
});
