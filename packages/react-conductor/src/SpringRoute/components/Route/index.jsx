import React from 'react';
import PropTypes from 'prop-types';
import { animated, Spring } from 'react-spring/renderprops';
import { emitter, router, stack } from '@virtuous/conductor';
import { RouteContext } from '../../../context';
import {
  EVENT_WILL_ENTER,
  EVENT_WILL_LEAVE,
  EVENT_DID_ENTER,
  EVENT_DID_LEAVE,
} from '../../../constants';

let immediate = true;

class SpringRoute extends React.Component {
  static contextType = RouteContext;

  static propTypes = {
    component: PropTypes.func.isRequired,
    current: PropTypes.bool.isRequired,
    index: PropTypes.number.isRequired,
    spring: PropTypes.func.isRequired,
    className: PropTypes.string,
  }

  static defaultProps = {
    className: null,
  }

  state = {
    render: true,
  }

  /**
   * When the route is the current route then make sure that it renders.
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
    const eventName = current ? EVENT_WILL_ENTER : EVENT_WILL_LEAVE;

    immediate = false;

    emitter.emit(eventName, this.context);
  }

  /**
   * When the animation has completed we need to tell the component to not output anything.
   * If the component animated out then it should not be rendered.
   */
  handleRest = () => {
    const { current } = this.props;

    if (current) {
      this.emitDidEnter();
    } else {
      this.setState(
        { render: false },
        this.emitDidLeave
      );
    }
  }

  emitDidEnter = () => {
    emitter.emit(EVENT_DID_ENTER, this.context);
  }

  emitDidLeave = () => {
    emitter.emit(EVENT_DID_LEAVE, this.context);
  }

  /**
   * @returns {JSX|null}
   */
  render() {
    const { render } = this.state;

    if (!render) {
      return null;
    }

    const {
      className,
      component: Component,
      current,
      index,
      nextRoute,
      prevRoute,
      spring,
    } = this.props;

    const prev = stack.get(prevRoute);
    const next = stack.get(nextRoute);

    const params = {
      action: router.action,
      current,
      index,
      prev,
      next,
    };

    return (
      <Spring
        {...spring(params)}
        immediate={immediate}
        native
        onStart={this.handleStart}
        onRest={this.handleRest}
      >
        {props => (
          <animated.article className={className} style={{ ...props, zIndex: index }}>
            <Component route={current ? next : prev} />
          </animated.article>
        )}
      </Spring>
    );
  }
}

export default SpringRoute;
