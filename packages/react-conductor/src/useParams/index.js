import { useContext } from 'react';
import { RouteContext } from '../context';

/**
 * @returns {Object}
 */
function useParams() {
  return useContext(RouteContext).params;
}

export default useParams;
