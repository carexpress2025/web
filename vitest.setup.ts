import '@testing-library/jest-dom/vitest';

import failOnConsole from 'vitest-fail-on-console';
import { cleanup } from '@testing-library/react';
import { afterEach } from 'vitest';

// Runs a cleanup function after each test case
// https://testing-library.com/docs/react-testing-library/api/#cleanup
afterEach(() => {
  cleanup();
});

failOnConsole({
  shouldFailOnDebug: true,
  shouldFailOnError: true,
  shouldFailOnInfo: true,
  shouldFailOnLog: true,
  shouldFailOnWarn: true,
});
