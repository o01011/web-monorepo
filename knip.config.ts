import type { KnipConfig } from "knip";

const config: KnipConfig = {
	$schema: "https://unpkg.com/knip@5/schema.json",
	ignoreDependencies: ["tsconfig-paths", "pg", "branch-name-lint"],
	ignoreMembers: ["DEVELOPMENT", "STAGING", "P2002", "P2025"],
	workspaces: {
		"apps/backend-expressjs": {},
		"apps/backend-nestjs": {},
		"apps/web-astro": {},
		"apps/web-tanstack": {},
		"apps/web-vite": {},
		"packages/shared": {},
		"packages/db": {
			ignore: ["src/generated/**"],
		},
	},
};

export default config;
