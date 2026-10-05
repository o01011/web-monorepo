import { spawnSync } from "node:child_process";

const workspaces = ["@web-monorepo/backend-nestjs", "@web-monorepo/backend-expressjs", "@web-monorepo/db"];

for (const workspace of workspaces) {
	const result = spawnSync("npm", ["run", "lint:types:check", "-w", workspace], { stdio: "inherit" });

	if (result.error) {
		console.error(`Failed to run the type check for ${workspace}`, result.error);
		process.exitCode = 1;
		break;
	}

	if (result.status !== 0) {
		process.exitCode = result.status ?? 1;
		break;
	}
}
