import { useContext } from 'react';
import PropTypes from 'prop-types';
import { router } from '@virtuous/conductor';
import { RouterContext } from '../context';

function RouteNotFound({ children }) {
  const { stack } = useContext(RouterContext);
  const { pathname } = stack[router.routeIndex][1];

  if (router.match(pathname)) {
    return null;
  }

  return children;
}

RouteNotFound.propTypes = {
  children: PropTypes.node.isRequired,
};

export default RouteNotFound;
