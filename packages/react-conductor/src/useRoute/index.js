import { useContext } from 'react';
import { RouterContext } from '../context';

function useRoute() {
  // This causes the error.
  return useContext(RouterContext);
}

export default useRoute;
