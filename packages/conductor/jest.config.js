const defaultConfig = require('@virtuous/react-unit-test-suite/jest.config');

const config = {
  ...defaultConfig,
  testURL: 'http://localhost',
};

module.exports = config;
