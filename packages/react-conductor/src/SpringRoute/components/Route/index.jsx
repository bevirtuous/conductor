import React from 'react';
import PropTypes from 'prop-types';
import { Spring } from 'react-spring';
import { emitter, router } from '@virtuous/conductor';
import { RouteContext } from '../../../context';
import * as constants from '../../../constants';

/**
 * The SpringRoute Component.
 */
class SpringRoute extends React.Component {
  static contextType = RouteContext;

  static propTypes = {
    component: PropTypes.func.isRequired,
    current: PropTypes.bool.isRequired,
    index: PropTypes.number.isRequired,
    transition: PropTypes.shape().isRequired,
    className: PropTypes.string,
  }

  static defaultProps = {
    className: null,
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

  handleStart = () => {
    const { current } = this.props;
    const eventName = current ? constants.EVENT_WILL_ENTER : constants.EVENT_WILL_LEAVE;

    emitter.emit(eventName, this.context);
  }

  /**
   * When the animation has completed, we need to set the render state of the component.
   * If the component animated out then it should not be rendered.
   */
  handleRest = () => {
    const { current } = this.props;

    if (!current) {
      this.setState(
        { render: true },
        () => emitter.emit(constants.EVENT_DID_LEAVE, this.context)
      );
    } else {
      emitter.emit(constants.EVENT_DID_ENTER, this.context);
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

    const { className, component: Component, index } = this.props;

    return (
      <Spring {...this.transition} onStart={this.handleStart} onRest={this.handleRest}>
        {props => (
          <div className={className} style={{ ...props, zIndex: index }}>
            <Component />
          </div>
        )}
      </Spring>
    );
  }
}

export default SpringRoute;
