import { useContext } from 'react';
import { RouteContext } from '../context';

/**
 * @returns {Object}
 */
function useQuery() {
  return useContext(RouteContext).query;
}

export default useQuery;
