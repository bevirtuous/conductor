import React, { Component } from 'react';
import PropTypes from 'prop-types';
import conductor from '@virtuous/conductor';
import * as events from '@virtuous/conductor-events';
import getRouteStack from '@virtuous/conductor-helpers/src/getRouteStack';

/**
 * The Router component.
 */
class Router extends Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
    initialPath: PropTypes.string.isRequired,
    initialPattern: PropTypes.string.isRequired,
  };

  /**
   * The constructor.
   * @param {Object} props The component props.
   */
  constructor(props) {
    super(props);

    this.state = {
      routeStack: [{
        path: props.initialPath,
        pattern: props.initialPattern,
      }],
    };

    // Setup some listeners for router events.
    events.onPush(this.handleRouteChange);
    events.onPop(this.handleRouteChange);
    events.onReplace(this.handleRouteChange);

    // Push the first route.
    setTimeout(() => {
      conductor.push(props.initialPath);
    }, 0);
  }

  /**
   * Limit re-rendering unless the state actually changes.
   *
   * @param {Object} nextProps The next props.
   * @param {Object} nextState The next state.
   * @returns {boolean}
   */
  shouldComponentUpdate() {
    // TODO: Add some sort of check.
    return true;
  }

  /**
   * Find the index of the given route pattern against the currently open routes.
   * @param {string} pattern The pattern to check for.
   * @returns {number} The index of the pattern.
   */
  getRouteIndex(pattern) {
    for (let i = 0, j = this.state.routeStack.length; i < j; i += 1) {
      if (this.state.routeStack[i].pattern === pattern) {
        return i;
      }
    }
    return -1;
  }

  /**
   * Update the state based on the router changes.
   * @param {string} action The history action performed.
   * @param {string} currentPath The newly opened path.
   * @param {string} prevPath The previous path.
   * @param {string} routeStack The open routes.
   */
  handleRouteChange = () => {
    const routeStack = getRouteStack();
    this.setState({ routeStack });
  }

  /**
   * The render method.
   * @returns {JSX}
   */
  render() {
    /**
     * We need to apply some props to the children based on
     * the current router state.
     */
    // TODO: Move this code to another function.
    return React.Children.map(this.props.children, (route, index) => {

      // TODO: This is not the correct way to get the index.
      // Get the index of this route.
      const routeIndex = this.getRouteIndex(route.props.pattern);

      // Check if this route is open.
      const isOpen = routeIndex > -1;

      // Check if this route is the current visible route.
      const isVisible = routeIndex === this.state.routeStack.length - 1;

      // If this route is open then pass the pathname as a prop.
      const path = isOpen ? this.state.routeStack[routeIndex].pathname : null;
      const state = isOpen ? this.state.routeStack[routeIndex].state : null;

      return React.cloneElement(route, {
        index,
        isOpen,
        isVisible,
        path,
        state,
      });
    });
  }
}

export default Router;
