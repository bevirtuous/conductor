import conductor from '@virtuous/conductor';

/**
 * Returns a route that is found with the given id.
 * @param {string} id - The route id to search for.
 * @returns {Object|null}
 */
const getRouteById = id => (
  conductor.cacheStack.find(element => id === element.id) || null
);

export default getRouteById;
