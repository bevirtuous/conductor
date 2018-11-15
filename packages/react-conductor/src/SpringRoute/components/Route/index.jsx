import React from 'react';
import PropTypes from 'prop-types';
import { Spring } from 'react-spring';
import { router } from '@virtuous/conductor';

/**
 * The SpringRoute Component.
 */
class SpringRoute extends React.Component {
  static propTypes = {
    component: PropTypes.func.isRequired,
    current: PropTypes.bool.isRequired,
    index: PropTypes.number.isRequired,
    transition: PropTypes.shape().isRequired,
  }

  state = {
    render: true,
  }

  /**
   * @returns {Object}
   */
  get transition() {
    const { current, transition } = this.props;
    const subset = transition[router.action.toLowerCase()];

    // TODO: check for transition passed through route action.

    if (!current) {
      return subset.out;
    }

    return subset.in;
  }

  /**
   * When the route is the current route, make sure that it can render.
   * @param {Object} props The new component props.
   * @returns {Object|null}
   */
  static getDerivedStateFromProps(props) {
    if (props.current) {
      return { render: true };
    }

    return null;
  }

  /**
   * When the animation has completed, we need to set the render state of the component.
   * If the component animated out then it should not be rendered.
   */
  handleRest = () => {
    const { current } = this.props;

    if (!current) {
      this.setState({ render: false });
    }
  }

  /**
   * @returns {JSX|null}
   */
  render() {
    const { render } = this.state;

    if (!render) {
      return null;
    }

    const { component: Component, index } = this.props;

    return (
      <Spring {...this.transition} onRest={this.handleRest}>
        {props => (
          <div style={{ transform: `translateX(${props.x}px)`, height: '100vh', zIndex: index, position: 'absolute' }}>
            <Component />
          </div>
        )}
      </Spring>
    );
  }
}

export default SpringRoute;
