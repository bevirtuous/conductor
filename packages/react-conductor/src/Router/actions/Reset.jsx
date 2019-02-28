import React from 'react';
import PropTypes from 'prop-types';
import { router, stack } from '@virtuous/conductor';

function Reset({ children, className, state }) {
  const [, route] = stack.first();

  function handleClick(event) {
    event.preventDefault();
    router.reset(state);
  }

  return <a className={className} href={route.location} onClick={handleClick}>{children}</a>;
}

Reset.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  state: PropTypes.shape(),
};

Reset.defaultProps = {
  className: null,
  state: null,
};

export default React.memo(Reset);
