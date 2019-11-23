import { useContext } from 'react';
import { router, stack } from '@virtuous/conductor';
import { RouterContext } from '../context';

/**
 * @returns {Object|null}
 */
function useCurrentRoute() {
  const { next } = useContext(RouterContext);
  const route = stack.get(next);

  return {
    ...route,
    update: (state) => {
      router.update(route.id, state);
    },
  };
}

export default useCurrentRoute;
