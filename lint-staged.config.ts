import type { Configuration } from "lint-staged";

const config: Configuration = {
	"*": [(): string => "npm run lint:clean:check", (): string => "npm run lint:fs:check"],
	"apps/backend-nestjs/**/*.ts": [
		(): string => "npm run lint:format:check -w @web-monorepo/backend-nestjs",
		(): string => "npm run lint:check -w @web-monorepo/backend-nestjs",
	],
	"apps/backend-expressjs/**/*.ts": [
		(): string => "npm run lint:format:check -w @web-monorepo/backend-expressjs",
		(): string => "npm run lint:check -w @web-monorepo/backend-expressjs",
	],
	"apps/web-astro/**/*.{ts,tsx}": [
		(): string => "npm run lint:format:check -w @web-monorepo/backend-expressjs",
		(): string => "npm run lint:check -w @web-monorepo/backend-expressjs",
	],
	"apps/web-tanstack/**/*.{ts,tsx}": [
		(): string => "npm run lint:format:check -w @web-monorepo/backend-expressjs",
		(): string => "npm run lint:check -w @web-monorepo/backend-expressjs",
	],
	"apps/web-vite/**/*.{ts,tsx}": [
		(): string => "npm run lint:format:check -w @web-monorepo/backend-expressjs",
		(): string => "npm run lint:check -w @web-monorepo/backend-expressjs",
	],
	"packages/shared/**/*.ts": [
		(): string => "npm run lint:format:check -w @web-monorepo/backend-expressjs",
		(): string => "npm run lint:check -w @web-monorepo/backend-expressjs",
	],
	"packages/db/**/*.ts": [
		(): string => "npm run lint:format:check -w @web-monorepo/backend-expressjs",
		(): string => "npm run lint:check -w @web-monorepo/backend-expressjs",
	],
};

export default config;
