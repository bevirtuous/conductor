const defaultConfig = require('@shopgate/pwa-unit-test/jest.config');

const config = {
  ...defaultConfig,
  testURL: 'http://localhost/myroute/123',
};

module.exports = config;
