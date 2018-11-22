import React from 'react';
import PropTypes from 'prop-types';
import { RouteContext } from '../Router/context';

/**
 * The Route component.
 * @param {Object} props The component props.
 * @returns {JSX}
 */
function Route(props) {
  const {
    component: Content,
    created,
    id,
    open,
    params,
    path,
    pattern,
    query,
    state: routeState,
    tag: Tag,
    visible,
    updated,
  } = props;

  const context = {
    id,
    open,
    pathname: path,
    pattern,
    params,
    query,
    state: routeState,
    visible,
    created,
    updated,
  };

  const styles = {
    height: '100vh',
    left: '0',
    position: 'absolute',
    top: '0',
    width: '100%',
    ...!visible && { display: 'none' },
  };

  return (
    <RouteContext.Provider value={context}>
      <Tag
        data-pattern={pattern}
        data-pathname={path}
        style={styles}
      >
        <Content />
      </Tag>
    </RouteContext.Provider>
  );
}

Route.propTypes = {
  component: PropTypes.func.isRequired,
  pattern: PropTypes.string.isRequired,
  created: PropTypes.number,
  id: PropTypes.string,
  open: PropTypes.bool,
  params: PropTypes.shape(),
  path: PropTypes.string,
  query: PropTypes.shape(),
  state: PropTypes.shape(),
  tag: PropTypes.string,
  updated: PropTypes.number,
  visible: PropTypes.bool,
};

Route.defaultProps = {
  created: null,
  id: null,
  open: false,
  params: {},
  path: null,
  query: {},
  state: {},
  tag: 'div',
  updated: null,
  visible: false,
};

export default Route;
