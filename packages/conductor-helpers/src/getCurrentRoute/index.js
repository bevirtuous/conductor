import conductor from '@virtuous/conductor';

/**
 * Returns the last item in the history stack, null if there are no items.
 * @returns {Object|null}
 */
const getCurrentRoute = () => (
  (conductor.stack.length > 0) ? conductor.stack.slice(-1)[0] : null
);

export default getCurrentRoute;
