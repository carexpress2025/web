module.exports = {
  '*.{ts,tsx}': (filenames) => {
    return [
      `prettier --write ${filenames.join(' ')}`,
      `eslint ${filenames.join(' ')}`,
      'npx tsc --noEmit --pretty',
    ];
  },
  '*.json': (filenames) => {
    return [`prettier --write ${filenames.join(' ')}`];
  },
  '*.spec.tsx': (filenames) => {
    return [`vitest run --silent ${filenames.join(' ')}`];
  },
  '*.test.ts': (filenames) => {
    return [`jest --coverage ${filenames.join(' ')}`];
  },
  '*.cy.tsx': (filenames) => {
    return [`cypress run ${filenames.join(' ')}`];
  },
};
