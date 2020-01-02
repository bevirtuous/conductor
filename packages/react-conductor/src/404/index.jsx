import PropTypes from 'prop-types';
import { router } from '@virtuous/conductor';
import useHistory from '../useHistory';

function RouteNotFound({ children }) {
  const { current } = useHistory();

  if (router.match(current.pathname)) {
    return null;
  }

  return children;
}

RouteNotFound.propTypes = {
  children: PropTypes.node.isRequired,
};

export default RouteNotFound;
