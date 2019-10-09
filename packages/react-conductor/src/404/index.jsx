import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { router } from '@virtuous/conductor';
import { RouterContext } from '../context';

function RouteNotFound({ component: Component }) {
  const { stack } = useContext(RouterContext);
  const { pathname } = stack[router.routeIndex][1];

  if (router.match(pathname)) {
    return null;
  }

  return (
    <Component />
  );
}

RouteNotFound.propTypes = {
  component: PropTypes.func.isRequired,
};

export default RouteNotFound;
