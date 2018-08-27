const defaultConfig = require('@virtuous/react-unit-test-suite/jest.config');

const config = {
  ...defaultConfig,
  testURL: 'http://localhost/myroute',
};

module.exports = config;
