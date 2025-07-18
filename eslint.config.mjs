import js from '@eslint/js';
import globals from 'globals';
import tseslint from 'typescript-eslint';
import { defineConfig } from 'eslint/config';
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended';

export default defineConfig([
	{
		files: ['{src,apps,libs,test}/**/*.{ts,mts,cts}'],
		plugins: { js },
		extends: ['js/recommended'],
	},
	{
		files: ['{src,apps,libs,test}/**/*.{ts,mts,cts}'],
		languageOptions: { globals: globals.browser },
	},
	eslintPluginPrettierRecommended,
	tseslint.configs.recommended,
]);
