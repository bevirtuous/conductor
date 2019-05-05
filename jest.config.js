module.exports = {
  moduleFileExtensions: ['js', 'jsx', 'json'],
  snapshotSerializers: [
    'enzyme-to-json/serializer',
  ],
  testRegex: '(/__tests__/.*|(\\.|/)spec)\\.(js|jsx)?$',
  testPathIgnorePatterns: [
    '/node_modules/',
    '/dist/',
    '/coverage/',
    '/config/',
  ],
  transformIgnorePatterns: [
    '/node_modules/',
  ],
  unmockedModulePathPatterns: [
    '<rootDir>/node_modules/react/',
    '<rootDir>/node_modules/enzyme/',
  ],
  collectCoverageFrom: [
    '**/*.{js,jsx}',
    '!**/node_modules/**',
    '!**/coverage/**',
    '!**/react-conductor/*.js',
    '!**/react-conductor/src/*.js',
    '!**/redux-conductor/*.js',
    '!babel.config.js',
    '!.eslintrc.js',
    '!**/jest.config.js',
  ],
  setupFiles: [
    './testSetup.js',
  ],
  testURL: 'http://localhost/myroute/123',
};
