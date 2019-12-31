import { useContext } from 'react';
import { router, stack } from '@virtuous/conductor';
import { RouterContext } from '../context';

const useHistory = () => {
  const { next, prev } = useContext(RouterContext);

  return {
    current: stack.get(next),
    currentIndex: router.routeIndex,
    length: stack.length,
    previous: stack.get(prev),

    push: router.push,
    pop: router.pop,
    replace: router.replace,
    reset: router.reset,
    resetTo: router.resetTo,
  };
};

export default useHistory;
