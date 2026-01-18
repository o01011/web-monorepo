import { defineConfig } from 'prisma/config';
import { loadEnvFile } from 'node:process';
import { join } from 'node:path';

loadEnvFile('.env');

export default defineConfig({
  schema: join(__dirname, 'prisma', 'schema.prisma'),
  migrations: {
    path: join(__dirname, 'prisma', 'migrations'),
  },
  datasource: {
    url: process.env['POSTGRES_URL'],
  },
});
