import { useContext } from 'react';
import { router } from '@virtuous/conductor';
import { RouteContext } from '../context';

/**
 * @returns {Object|null}
 */
function useRoute() {
  const { transform, ...rest } = useContext(RouteContext);

  return {
    ...rest,
    update: (state) => {
      router.update(rest.id, state);
    },
  };
}

export default useRoute;
