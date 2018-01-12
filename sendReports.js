const coveralls = require('@sourceallies/coveralls-merge');
const { existsSync } = require('fs');

const reports = [];

/**
 * Adds a new report file.
 * @param {string} packageName The package name.
 */
const addReport = (packageName) => {
  const reportFile = `./packages/${packageName}/build/lcov.info`;

  if (!existsSync(reportFile)) {
    return;
  }

  reports.push({
    type: 'lcov',
    reportFile: `./packages/${packageName}/build/lcov.info`,
  });
};

addReport('conductor');
addReport('conductor-events');
addReport('conductor-helpers');
addReport('react-conductor');
addReport('react-conductor-transitions');
addReport('redux-conductor');

try {
  if (reports.length) {
    coveralls.sendReports(reports);
    console.log('Reports send!');
  }
} catch (err) {
  console.error(err);
}
