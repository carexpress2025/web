import { dirname } from 'path';
import { fileURLToPath } from 'url';
import { FlatCompat } from '@eslint/eslintrc';
import eslintPluginPrettier from 'eslint-plugin-prettier';
import eslintPluginReactHooks from 'eslint-plugin-react-hooks';
import eslintPluginReactRefresh from 'eslint-plugin-react-refresh';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({ baseDirectory: __dirname });

const eslintConfig = [
  ...compat.extends('next/core-web-vitals', 'next/typescript', 'prettier'),
  {
    files: ['**/*.{js,jsx,ts,tsx}'],
    plugins: {
      prettier: eslintPluginPrettier,
      'react-hooks': eslintPluginReactHooks,
      'react-refresh': eslintPluginReactRefresh,
    },
    rules: {
      'prettier/prettier': 'error',
      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'warn',
      'react-refresh/only-export-components': 'warn',
      'react/prefer-destructuring-assignment': 'off',
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
      'vitest.config.mts',
      'next.config.ts',
      'postcss.config.mjs',
      'tailwind.config.ts',
      'vitest.setup.ts',
      'jest.config.js',
      'jest.setup.js',
      'release.config.cjs',
      'i18n.ts',
      '*.d.ts'
    ],
  },
];

export default eslintConfig;
