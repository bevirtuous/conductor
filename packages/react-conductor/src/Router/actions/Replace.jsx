import React from 'react';
import PropTypes from 'prop-types';
import { router } from '@virtuous/conductor';

function Replace({ children, className, state, to }) {
  function handleClick(event) {
    event.preventDefault();
    router.replace({ pathname: to, state });
  }

  return <a className={className} href={to} onClick={handleClick}>{children}</a>;
}

Replace.propTypes = {
  children: PropTypes.node.isRequired,
  to: PropTypes.string.isRequired,
  className: PropTypes.string,
  state: PropTypes.shape(),
};

Replace.defaultProps = {
  className: null,
  state: {},
};

export default React.memo(Replace);
