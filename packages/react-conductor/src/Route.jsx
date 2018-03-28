import React, { Component } from 'react';
import PropTypes from 'prop-types';

/**
 * The Route component.
 */
class Route extends Component {
  static propTypes = {
    content: PropTypes.func.isRequired,
    pattern: PropTypes.string.isRequired,
    component: PropTypes.string,
    id: PropTypes.string,
    isVisible: PropTypes.bool,
    path: PropTypes.string,
    state: PropTypes.shape(),
  };

  static defaultProps = {
    component: 'div',
    id: null,
    isVisible: false,
    path: null,
    state: null,
  };

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
   * Renders the component.
   * @returns {JSX}
   */
  render() {
    const {
      component: Wrapper,
      content: Content,
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
