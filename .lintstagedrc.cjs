module.exports = {
  "*.{ts,tsx}": (filenames) => {
    return [`eslint --fix ${filenames.join(" ")}`, `prettier --write ${filenames.join(" ")}`];
  },
  "*.json": (filenames) => {
    return [`prettier --write ${filenames.join(" ")}`];
  },
  "*.spec.tsx": (filenames) => {
    return [
      `eslint --fix ${filenames.join(" ")}`,
      `prettier --write ${filenames.join(" ")}`,
      `jest --coverage ${filenames.join(" ")}`,
    ];
  },
};
