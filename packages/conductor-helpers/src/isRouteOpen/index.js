import getRouteStack from '../getRouteStack';

/**
 * Returns true if a route is found with the given pattern.
 * @param {string} pattern - The pattern of the route to find.
 * @returns {boolean}
 */
const isRouteOpen = pattern => getRouteStack().some(route => pattern === route.pattern);

export default isRouteOpen;
