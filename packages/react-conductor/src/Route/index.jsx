import React, { Component } from 'react';
import PropTypes from 'prop-types';

/**
 * The Route component.
 */
class Route extends Component {
  static propTypes = {
    component: PropTypes.func.isRequired,
    pattern: PropTypes.string.isRequired,
    id: PropTypes.string,
    isVisible: PropTypes.bool,
    path: PropTypes.string,
    state: PropTypes.shape(),
    tag: PropTypes.string,
  };

  static defaultProps = {
    id: null,
    isVisible: false,
    path: null,
    state: null,
    tag: 'div',
  };

  static childContextTypes = {
    routeId: PropTypes.func,
  };

  /**
   * 
   */
  getChildContext() {
    return { routeId: this.getRouteId };
  }

  /**
   * @param {Object} nextProps The next set of props.
   * @returns {boolean}
   */
  shouldComponentUpdate(nextProps) {
    return (
      this.props.isVisible !== nextProps.isVisible ||
      this.props.path !== nextProps.path
    );
  }

  /**
   * 
   */
  getRouteId = () => {
    return this.props.id;
  }

  /**
   * Renders the component.
   * @returns {JSX}
   */
  render() {
    const {
      tag: Wrapper,
      component: Content,
      isVisible,
    } = this.props;

    return (
      <Wrapper
        style={{
          ...(!isVisible) && {
            pointerEvents: 'none',
            transform: 'translateX(-100%)',
          },
        }}
      >
        <Content {...this.props.state} />
      </Wrapper>
    );
  }
}

export default Route;
