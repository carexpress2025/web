module.exports = {
  '*.{ts,tsx}': (filenames) => {
    return [
      `prettier --write ${filenames.join(' ')}`,
      `eslint ${filenames.join(' ')}`,
    ];
  },
  '*.json': (filenames) => {
    return [`prettier --write ${filenames.join(' ')}`];
  },
  '*.spec.tsx': (filenames) => {
    return [
      `prettier --write ${filenames.join(' ')}`,
      `eslint ${filenames.join(' ')}`,
      `jest --coverage ${filenames.join(' ')}`,
    ];
  },
};
