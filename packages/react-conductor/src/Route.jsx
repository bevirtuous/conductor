import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Transition from 'react-transition-group/Transition';
import uuid from 'uuid/v4';
import conductor from '@virtuous/conductor';
import getCurrentAction from '@virtuous/conductor-helpers/src/getCurrentAction';

/**
 * The Route component.
 */
class Route extends Component {
  static propTypes = {
    content: PropTypes.func.isRequired,
    pattern: PropTypes.string.isRequired,
    component: PropTypes.string,
    index: PropTypes.number,
    isOpen: PropTypes.bool,
    isVisible: PropTypes.bool,
    path: PropTypes.string,
    state: PropTypes.shape(),
    transition: PropTypes.shape(),
  };

  static defaultProps = {
    component: 'div',
    index: null,
    isOpen: false,
    isVisible: false,
    path: null,
    state: {},
    transition: null,
  };

  static childContextTypes = {
    route: PropTypes.shape(),
  };

  /**
   * The constructor.
   * @param {Object} props The component props.
   */
  constructor(props) {
    super(props);

    // Generate a unique ID for this route.
    this.id = uuid();

    // Register this route with the router.
    conductor.register(this.id, this.props.pattern);
  }

  /**
   * Creates a context about this route.
   * @returns {Object}
   */
  getChildContext() {
    return {
      route: {
        id: this.id,
      },
    };
  }

  /**
   * @param {Object} nextProps The next set of props.
   * @returns {boolean}
   */
  shouldComponentUpdate(nextProps) {
    return (
      this.props.isOpen !== nextProps.isOpen ||
      this.props.isVisible !== nextProps.isVisible
    );
  }

  /**
   * Returns a transition object based on the state of the route.
   * @returns {Object}
   */
  get transitionType() {
    const currentAction = getCurrentAction();

    if (this.props.isOpen) {
      return this.props.transition.backward;
    } else if (currentAction === 'REPLACE') {
      return this.props.transition.replace;
    }

    return this.props.transition.forward;
  }

  /**
   * Renders the component.
   * @returns {JSX}
   */
  render() {
    const {
      component: Wrapper,
      content: Content,
      index,
      isVisible,
      transition,
    } = this.props;

    if (!transition) {
      return (
        <Wrapper
          {...this.props.state}
          style={{
            ...(index !== null) && { zIndex: index },
            ...(!isVisible) && { display: 'none' },
          }}
        >
          <Content />
        </Wrapper>
      );
    }

    /**
     * Switch between the transitions based on whether or not
     * this route is open or if the route was replaced.
     */
    const { transitionType } = this;

    return (
      <Transition
        in={isVisible}
        timeout={transitionType.duration}
      >
        {state => (
          <Wrapper
            {...this.props.state}
            style={{
              ...(index !== null) && { zIndex: index },
              ...transitionType.default,
              ...transitionType[state],
            }}
          >
            <Content />
          </Wrapper>
        )}
      </Transition>
    );
  }
}

export default Route;
