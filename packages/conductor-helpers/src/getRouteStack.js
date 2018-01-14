import conductor from '@virtuous/conductor';

/**
 * Returns the complete history stack.
 * @returns {Array}
 */
const getRouteStack = () => conductor.cacheStack;

export default getRouteStack;
