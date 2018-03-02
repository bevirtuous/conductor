import getRouteStack from './getRouteStack';

/**
 * Returns the second last items in the history stack, null if there is no item.
 * @returns {Object|null}
 */
const getPreviousRoute = () => {
  const stack = getRouteStack();
  return (stack.length > 1) ? stack.slice(-2)[0] : null;
};

export default getPreviousRoute;
