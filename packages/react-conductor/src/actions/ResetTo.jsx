import React from 'react';
import PropTypes from 'prop-types';
import { router } from '@virtuous/conductor';

function ResetTo({ children, className, state, to }) {
  function handleClick(event) {
    event.preventDefault();
    router.resetTo(to, state);
  }

  return <a className={className} href={to} onClick={handleClick}>{children}</a>;
}

ResetTo.propTypes = {
  children: PropTypes.node.isRequired,
  to: PropTypes.string.isRequired,
  className: PropTypes.string,
  state: PropTypes.shape(),
};

ResetTo.defaultProps = {
  className: null,
  state: {},
};

export default React.memo(ResetTo);
