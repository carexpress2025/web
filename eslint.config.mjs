import { dirname } from 'path';
import { fileURLToPath } from 'url';
import { FlatCompat } from '@eslint/eslintrc';
import eslintPluginPrettier from 'eslint-plugin-prettier';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends('next/core-web-vitals', 'next/typescript', 'prettier'),
  {
    files: ['**/*.{js,jsx,ts,tsx}'],
    plugins: {
      prettier: eslintPluginPrettier,
    },
    rules: {
      'prettier/prettier': 'error',
    },
  },
  {
    ignores: [
      'node_modules/',
      '.next/',
      '.husky/',
      '.vscode/',
      'cypress/',
      'prisma/',
      'public/',
      '.lint-stagedrc.cjs',
      'commitlint.config.cjs',
      'cypress.config.ts',
      'eslint.config.mjs',
      'jest.config.js',
      'jest.setup.js',
      'next.config.ts',
      'postcss.config.mjs',
      'tailwind.config.ts',
    ],
  },
];

export default eslintConfig;
