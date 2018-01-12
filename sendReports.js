const coveralls = require('@sourceallies/coveralls-merge');

/**
 * Adds a new report file.
 * @param {string} packageName The package name.
 * @return {Oject}
 */
const addReport = packageName => ({
  type: 'lcov',
  reportFile: `./packages/${packageName}/build/lcov.info`,
});

coveralls.sendReports([
  addReport('conductor'),
  addReport('conductor-events'),
  addReport('conductor-helpers'),
  addReport('react-conductor'),
  addReport('react-conductor-transitions'),
  addReport('redux-conductor'),
]);
