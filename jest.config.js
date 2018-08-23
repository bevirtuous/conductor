const defaultConfig = require('@virtuous/react-unit-test-suite/jest.config');

const config = {
  ...defaultConfig,
  testURL: 'http://localhost',
  collectCoverageFrom: [
    'packages/**/src/**/*.js',
    'packages/**/src/**/*.jsx',
  ],
};

module.exports = config;
