import React from 'react';
import PropTypes from 'prop-types';
import { router } from '@virtuous/conductor';

function Reset({ children, className, to }) {
  function handleClick(event) {
    event.preventDefault();
    router.reset();
  }

  return <a className={className} href={to} onClick={handleClick}>{children}</a>;
}

Reset.propTypes = {
  children: PropTypes.node.isRequired,
  to: PropTypes.string.isRequired,
  className: PropTypes.string,
};

Reset.defaultProps = {
  className: null,
};

export default React.memo(Reset);
