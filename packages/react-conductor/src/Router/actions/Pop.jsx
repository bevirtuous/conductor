import React from 'react';
import PropTypes from 'prop-types';
import { router, stack } from '@virtuous/conductor';

function Pop({ children, className, state, steps }) {
  const targetIndex = router.routeIndex - steps;
  const { location = null } = stack.getByIndex(targetIndex) || {};

  function handleClick(event) {
    event.preventDefault();
    router.pop({ state, steps });
  }

  return <a className={className} href={location} onClick={handleClick}>{children}</a>;
}

Pop.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  state: PropTypes.shape(),
  steps: PropTypes.number,
};

Pop.defaultProps = {
  className: null,
  state: {},
  steps: 1,
};

export default React.memo(Pop);
