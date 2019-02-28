import React from 'react';
import PropTypes from 'prop-types';
import { router } from '@virtuous/conductor';

function Push({ children, className, state, to }) {
  function handleClick(event) {
    event.preventDefault();
    router.push({ pathname: to, state });
  }

  return <a className={className} href={to} onClick={handleClick}>{children}</a>;
}

Push.propTypes = {
  children: PropTypes.node.isRequired,
  to: PropTypes.string.isRequired,
  className: PropTypes.string,
  state: PropTypes.shape(),
};

Push.defaultProps = {
  className: null,
  state: {},
};

export default React.memo(Push);
