import conductor from '@virtuous/conductor';

/**
 * Returns the complete history stack.
 * @returns {Array}
 */
const getRouteStack = () => [...conductor.stack];

export default getRouteStack;
