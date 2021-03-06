import { useContext } from 'react';
import { router } from '@virtuous/conductor';
import { RouterContext } from '../context';

/**
 * @param {string} id A route id.
 * @returns {Object|null}
 */
function useRoute(id = null) {
  const { stack } = useContext(RouterContext);

  if (!id) {
    return {
      ...stack[router.routeIndex][1],
      update: (state) => {
        router.update(stack[router.routeIndex][1].id, state);
      },
    };
  }

  const match = stack.find(([routeId]) => (id === routeId));

  if (!match) {
    return {};
  }

  return {
    ...match[1],
    update: (state) => {
      router.update(match[1].id, state);
    },
  };
}

export default useRoute;
