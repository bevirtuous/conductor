import conductor from '@virtuous/conductor';

/**
 * Returns the second last items in the history stack, null if there is no item.
 * @returns {Object|null}
 */
const getPreviousRoute = () => (
  (conductor.cacheStack.length > 1) ? conductor.cacheStack.slice(-2)[0] : null
);

export default getPreviousRoute;
