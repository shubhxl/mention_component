module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'jsdom',
    testMatch: ['<rootDir>/src/tests/**/*.test.tsx'],
    transformIgnorePatterns: [
      "/node_modules/",
      "\\.css$",
    ],
  };
  