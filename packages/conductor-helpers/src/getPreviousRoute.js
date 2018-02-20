import conductor from '@virtuous/conductor';
import getRouteStack from './getRouteStack';

/**
 * Returns the second last items in the history stack, null if there is no item.
 * @returns {Object|null}
 */
const getPreviousRoute = () => {
  const stack = getRouteStack();
  return (stact.length > 1) ? stact.slice(-2)[0] : null
};

export default getPreviousRoute;
