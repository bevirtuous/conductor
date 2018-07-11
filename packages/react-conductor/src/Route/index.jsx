import React, { Component } from 'react';
import PropTypes from 'prop-types';
import getCurrentAction from '@virtuous/conductor-helpers/getCurrentAction';
import Transition from 'react-transition-group/Transition';
import { TweenLite } from 'gsap';
import transition from './transition';
import { RouteContext } from '../Router';

/**
 * The Route component.
 */
class Route extends Component {
  static propTypes = {
    component: PropTypes.func.isRequired,
    pattern: PropTypes.string.isRequired,
    id: PropTypes.string,
    open: PropTypes.bool,
    params: PropTypes.shape(),
    path: PropTypes.string,
    query: PropTypes.shape(),
    state: PropTypes.shape(),
    tag: PropTypes.string,
    transition: PropTypes.shape(),
    visible: PropTypes.bool,
  };

  static defaultProps = {
    id: null,
    open: false,
    params: {},
    path: null,
    query: {},
    state: {},
    tag: 'div',
    transition,
    visible: false,
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
   * @param {Object} nextProps The next set of props.
   * @returns {boolean}
   */
  shouldComponentUpdate(nextProps) {
    return (
      this.props.visible !== nextProps.visible ||
      this.props.path !== nextProps.path
    );
  }

  /**
   *
   */
  componentDidMount() {
    // Const start = this.props.transition.push.out;
    // TweenLite.to(this.node.current, 0, start);
  }

  /**
   *
   * @param {*} nextProps
   */
  // ComponentWillReceiveProps(nextProps) {
  //   //
  //   If (this.props.isVisible === nextProps.isVisible) {
  //     Return;
  //   }

  //   // Then find out which history action was just fired (use helper)
  //   Const action = getCurrentAction();

  //   Const position = this.props.isVisible ? 'in' : 'out';
  //   Const newPosition = nextProps.isVisible ? 'in' : 'out';
  //   Console.warn(position, newPosition, action);

  //   Const start = transition[action.toLowerCase()][position];
  //   Const end = transition[action.toLowerCase()][newPosition];

  //   TweenLite.fromTo(this.node.current, 300 / 1000, start, end);
  // }

  /**
   *
   */
  get transitionType() {
    if (this.props.path && !this.props.visible) {
      return this.props.transition.backward;
    } else if (getCurrentAction() === 'REPLACE') {
      return this.props.transition.replace;
    }

    return this.props.transition.forward;
  }

  setPosition = (props, duration = this.props.transition.duration) => {
    const start = this.getStartPosition(props);
    // Let position;

    // If (props.path) {
    //   If (props.isVisible) {
    //     Position = this.props.transition.visible;
    //   } else {
    //     Position = this.props.transition.post;
    //   }
    // } else {
    //   Position = this.props.transition.pre;
    // }

    TweenLite.to(this.node.current, duration / 1000, start);
  }

  /**
   *
   */
  getStartPosition = (isVisible, isNew) => {
    // First, find out if we are animating in (isVisible = true)
    const intention = isVisible ? 'out' : 'in';

    // Then find out which history action was just fired (use helper)
    const action = getCurrentAction();

    return transition[intention][action.toLowerCase()];
  }

  /**
   *
   */
  getEndPosition = () =>
    // Determine the end position of the element
    this.props.transition.in.push

  /**
   * Renders the component.
   * @returns {JSX}
   */
  render() {
    const {
      component: Content,
      id,
      params,
      path,
      pattern,
      query,
      state: routeState,
    } = this.props;

    const { transitionType } = this;
    const route = {
      id,
      pathname: path,
      pattern,
      params,
      query,
      state: routeState,
    };

    return (
      <RouteContext.Provider value={route}>
        <Transition
          in={this.props.visible}
          timeout={0}
        >
          {state => (
            <div
              data-pattern={route.pattern}
              data-pathname={route.pathname}
              style={{
                ...transitionType.default,
                ...transitionType[state],
              }}
            >
              <Content />
            </div>
          )}
        </Transition>
      </RouteContext.Provider>
    );
  }
}

export default Route;
