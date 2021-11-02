/*
 * For a detailed explanation regarding each configuration property and type check, visit:
 * https://jestjs.io/docs/configuration
 */

export default {
  preset: 'ts-jest',
  testEnvironment: 'node',
  moduleNameMapper: {
    'test/(.*)': '<rootDir>/test/$1',
  },
  clearMocks: true,
  collectCoverage: true,
  collectCoverageFrom: ['__test__/**/*.{js,ts}'],
  coverageDirectory: 'coverage',
};
