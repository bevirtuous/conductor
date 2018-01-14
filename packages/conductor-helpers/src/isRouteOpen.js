import conductor from '@virtuous/conductor';

/**
 * Returns true if a route is found with the given pathname.
 * @param {string} pathname - The pathname to find.
 * @returns {boolean}
 */
const isRouteOpen = pathname => conductor.cacheStack.some(route => pathname === route.pathname);

export default isRouteOpen;
