import react from '@vitejs/plugin-react';
import {loadEnv} from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths';
import {defineConfig} from 'vitest/config';

export default defineConfig({
  plugins: [tsconfigPaths(), react()],
  test: {
    globals: true,
    environment: "jsdom",
    include: ["src/**/*.spec.tsx"],
    setupFiles: ["./vitest.setup.ts"],
    coverage: {
      include: ["src/**/*"],
      exclude: ["src/**/*.stories.{js,jsx,ts,tsx}", "**/*.d.ts"],
    },
    environmentMatchGlobs: [
      ['**/*.spec.tsx', 'jsdom'],
      ['src/hooks/**/*.spec.ts', 'jsdom'],
    ],
    env: loadEnv('', process.cwd(), ''),
  },
});
