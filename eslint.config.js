// import perfectionist from 'eslint-plugin-perfectionist';
import { defineConfig, globalIgnores } from 'eslint/config';

export default defineConfig([
	globalIgnores(['node_modules/*', 'dist/**/*']),
	{
		plugins: {
			// perfectionist,
		},
		rules: {},
	},
]);
