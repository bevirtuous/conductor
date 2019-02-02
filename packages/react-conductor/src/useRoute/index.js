import { useContext } from 'react';
import { router } from '@virtuous/conductor';
import { RouterContext } from '../context';

function useRoute(id = null) {
  const routes = useContext(RouterContext);

  if (!id) {
    return routes[router.routeIndex][1];
  }

  return routes.find(([routeId]) => (id === routeId))[1] || null;
}

export default useRoute;
