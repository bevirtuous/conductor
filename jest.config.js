const defaultConfig = require('@virtuous/react-unit-test-suite/jest.config');

const config = {
  ...defaultConfig,
  testURL: 'http://localhost/myroute/123',
};

module.exports = config;
