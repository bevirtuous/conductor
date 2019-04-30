import React from 'react';
import PropTypes from 'prop-types';
import { router } from '@virtuous/conductor';
import useRoute from '../useRoute';

function RouteNotFound({ component: Component }) {
  const { pathname } = useRoute();

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

export default React.memo(RouteNotFound, () => true);
