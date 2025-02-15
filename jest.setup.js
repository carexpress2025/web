require('@testing-library/jest-dom');

jest.mock('next/navigation', () => require('next-router-mock'));

afterEach(() => {
  jest.clearAllMocks();
});
