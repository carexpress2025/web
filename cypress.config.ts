import { defineConfig } from 'cypress';

export default defineConfig({
  e2e: {
    specPattern: 'e2e/**/*.{ts,tsx}',
    supportFile: false,
    baseUrl: 'http://localhost:3000',
  },
  component: {
    devServer: {
      framework: 'next',
      bundler: 'webpack',
    },
  },
});
