import conductor from '@virtuous/conductor';
import getRouteStack from './getRouteStack';

/**
 * Returns a route that is found with the given id.
 * @param {string} id - The route id to search for.
 * @returns {Object|null}
 */
const getRouteById = id => (
  getRouteStack().find(element => id === element.id) || null
);

export default getRouteById;
