import { useContext } from 'react';
import { router } from '@virtuous/conductor';
import { RouterContext } from '../context';

/**
 * @param {string} id A route id.
 * @returns {Object|null}
 */
function useRoute(id = null) {
  const routes = useContext(RouterContext);

  if (!id) {
    return routes[router.routeIndex][1];
  }

  const match = routes.find(([routeId]) => (id === routeId));

  return match ? match[1] : {};
}

export default useRoute;
