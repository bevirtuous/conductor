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
    isVisible: PropTypes.bool,
    params: PropTypes.shape(),
    path: PropTypes.string,
    query: PropTypes.shape(),
    state: PropTypes.shape(),
    tag: PropTypes.string,
  };

  static defaultProps = {
    id: null,
    isVisible: false,
    params: {},
    path: null,
    query: {},
    state: {},
    tag: 'div',
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
      this.props.isVisible !== nextProps.isVisible ||
      this.props.path !== nextProps.path
    );
  }

  /**
   * 
   */
  componentDidMount() {
    // const start = transition.push.out;
    // TweenLite.to(this.node.current, 0, start);
  }

  /**
   * 
   * @param {*} nextProps 
   */
  // componentWillReceiveProps(nextProps) {
  //   //
  //   if (this.props.isVisible === nextProps.isVisible) {
  //     return;
  //   }

  //   // Then find out which history action was just fired (use helper)
  //   const action = getCurrentAction();

  //   const position = this.props.isVisible ? 'in' : 'out';
  //   const newPosition = nextProps.isVisible ? 'in' : 'out';
  //   console.warn(position, newPosition, action);

  //   const start = transition[action.toLowerCase()][position];
  //   const end = transition[action.toLowerCase()][newPosition];

  //   TweenLite.fromTo(this.node.current, 300 / 1000, start, end);
  // }

  /**
   * 
   */
  get transitionType() {
    if (this.props.path && !this.props.isVisible) {
      return transition.backward;
    } else if (getCurrentAction() === 'REPLACE') {
      return transition.replace;
    }

    return transition.forward;
  }

  setPosition = (props, duration = transition.duration) => {
    const start = this.getStartPosition(props);
    // let position;

    // if (props.path) {
    //   if (props.isVisible) {
    //     position = transition.visible;
    //   } else {
    //     position = transition.post;
    //   }
    // } else {
    //   position = transition.pre;
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
  getEndPosition = () => {
    // Determine the end position of the element
    return transition.in.push;
  }

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
          in={this.props.isVisible}
          timeout={0}
        >
          {state => (
            <div
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
