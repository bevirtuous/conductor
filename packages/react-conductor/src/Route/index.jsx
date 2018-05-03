import React, { Component } from 'react';
import PropTypes from 'prop-types';
import getCurrentAction from '@virtuous/conductor-helpers/getCurrentAction';
import Transition from 'react-transition-group/Transition';
import { TweenLite } from 'gsap';
import transition from './transition';

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
   * @param {*} props 
   */
  constructor(props) {
    super(props);
    this.node = React.createRef();
  }

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
  componentDidMount() {
    // console.warn(this.node);
    // TweenLite.to(this.node.current, 5, { css: { backgroundColor: "#F19939", height: '100vh' } });
  }

  /**
   * 
   */
  componentDidUpdate() {
    if (!transition && this.props.path === this.context.router.path) {
      this.routeDidEnter();
    }
  }

  /**
   * 
   */
  get transitionType() {
    if (this.props.path && !this.props.isVisible) {
      return transition.backward;
    } else if (getCurrentAction() === 'replace') {
      return transition.replace;
    }

    return transition.forward;
  }

  /**
   * 
   */
  getRouteId = () => this.props.id;

  /**
   * 
   */
  routeDidEnter = () => {
    console.warn('RouteDidEnter');
    return;
  }

  /**
   * Renders the component.
   * @returns {JSX}
   */
  render() {
    const { transitionType } = this;
    const {
      component: Content,
      isVisible,
    } = this.props;

    // return (
    //   <div ref={this.node}>
    //     <Content />
    //   </div>
    // );
    return (
      <Transition
        in={isVisible}
        timeout={transitionType.duration}
        onEntered={this.routeDidEnter}
      >
        {state => (
          <div
            style={{
              // ...(index !== null) && { zIndex: index },
              ...transitionType.default,
              ...transitionType[state],
            }}
          >
            <Content />
          </div>
        )}
      </Transition>
    );

    // const {
    //   tag: Wrapper,
    //   component: Content,
    //   isVisible,
    // } = this.props;

    // return (
    //   <Wrapper
    //     style={{
    //       ...(!isVisible) && {
    //         pointerEvents: 'none',
    //         transform: 'translateX(-100%)',
    //       },
    //     }}
    //   >
    //     <Content {...this.props.state} />
    //   </Wrapper>
    // );
  }
}

export default Route;
