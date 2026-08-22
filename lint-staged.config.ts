import type { Configuration } from "lint-staged";

const config: Configuration = {
	"*": [(): string => "npm run lint:clean:check", (): string => "npm run lint:fs:check"],
	"apps/backend-nestjs/**/*.ts": [(): string => "", (): string => ""],
};
