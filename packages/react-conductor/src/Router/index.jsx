import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import conductor from '@virtuous/conductor';
import * as constants from '@virtuous/conductor/constants';
import * as events from '@virtuous/conductor-events';
import getCurrentAction from '@virtuous/conductor-helpers/getCurrentAction';
import getRouteStack from '@virtuous/conductor-helpers/getRouteStack';
import Route from '../Route';

export const RouteContext = React.createContext();
export const RouterContext = React.createContext();

/**
 * 
 * @param {*} oldStack 
 * @param {*} newStack 
 */
const stateUpdated = (oldStack, newStack) => {
  return newStack.some((entry, index) => {
    console.warn(entry.updated, oldStack[index].updated);
    return entry.updated !== oldStack[index].updated;
  });
};

/**
 * The Router component.
 */
class Router extends Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
  };

  /**
   * The constructor.
   * @param {Object} props The component props.
   */
  constructor(props) {
    super(props);

    this.state = {
      stack: [],
    };

    // The route definitions.
    this.routes = {};

    // The stack of route definitions to use when rendering.
    this.routeStack = [];

    // Register the routes with Conductor.
    React.Children.forEach(props.children, child => this.registerChild(child.props));

    // Setup the callbacks for routing events.
    events.onDidPush(() => this.handleRouteChange(constants.ACTION_PUSH));
    events.onDidPop(() => this.handleRouteChange(constants.ACTION_POP));
    events.onDidReplace(() => this.handleRouteChange(constants.ACTION_REPLACE));
    events.onDidReset(() => this.handleRouteChange(constants.ACTION_RESET));
    events.onUpdate(() => this.handleRouteChange());
  }

  /**
   * @param {Object} nextProps The next props.
   * @param {Object} nextState The next state.
   * @returns {boolean}
   */
  shouldComponentUpdate(nextProps, nextState) {
    // Render if the stacks are different sizes.
    if (this.state.stack.length !== nextState.stack.length) {
      return true;
    }

    // Render if the history action was a replace.
    if (getCurrentAction() === constants.ACTION_REPLACE) {
      return true;
    }

    return stateUpdated(this.state.stack, nextState.stack);
  }

  /**
   * Determines the last occurence of a path in the stack of open routes.
   * @param {Array} stack The open routes stack.
   * @param {string} pattern The pattern to look for.
   * @returns {number|null}
   */
  getlastOccurence = (stack, pattern) => {
    for (let i = stack.length - 1; i >= 0; --i) {
      if (stack[i].pattern === pattern) {
        return i;
      }
    }

    return null;
  }

  /**
   * Update the state based on the router changes.
   * TODO:
   */
  handleRouteChange = (action) => {
    const stack = getRouteStack();

    switch (action) {
      case constants.ACTION_PUSH: {
        //
        const { pattern } = stack[stack.length - 1];

        //
        if (this.routes[pattern].preload) {
          this.routeStack.push(this.routes[pattern].pattern);
        }

        break;
      }

      case constants.ACTION_POP: {
        //
        const { pattern } = this.state.stack[this.state.stack.length - 1];

        //
        if (this.routes[pattern].preload) {
          this.routeStack.pop();
        }

        break;
      }

      case constants.ACTION_REPLACE: {
        const { pattern } = this.state.stack[this.state.stack.length - 1];
        const newPattern = stack[stack.length - 1].pattern;

        //
        if (this.routes[pattern].preload) {
          this.routeStack.pop();
        }

        //
        if (this.routes[newPattern].preload) {
          this.routeStack.push(this.routes[newPattern].pattern);
        }

        break;
      }

      case constants.ACTION_RESET: {
        const { pattern, preload } = this.state.stack[0];

        // Set the routeStack back to it's initial state.
        this.routeStack.length = this.props.children.length;

        /**
         * Check if the initial entry is the stack is a preload route.
         * If so then immediately push another to the route stack.
         */
        if (preload) {
          this.routeStack.push(pattern);
        }

        break;
      }

      default:
        break;
    }

    this.setState({ stack });
  };

  /**
   * @param {Object} props - The child's props.
   */
  registerChild(props) {
    conductor.register(props.pattern);

    this.routes[props.pattern] = {
      component: props.component,
      pattern: props.pattern,
      preload: props.preload,
    };

    this.routeStack.push(props.pattern);
  }

  /**
   * TODO:
   * @returns {JSX}
   */
  renderOpenRoutes() {
    const ignoredSingletons = [];
    const usedRoutes = [];

    return (
      <Fragment>
        {this.routeStack.map((item, index) => {
          let pathname = null;
          let open = false;
          let visible = false;
          let id = null;
          let params = {};
          let query = {};
          let state = {};
          let created;
          let updated;

          const { component, pattern, preload } = this.routes[item];

          if (preload) {
            const match = this.state.stack.find((stackItem, stackItemIndex) => {
              const isMatch =
                stackItem.pattern === pattern && !usedRoutes.includes(stackItemIndex);

              if (isMatch) {
                open = true;
                usedRoutes.push(stackItemIndex);
              }

              if (isMatch && stackItemIndex === this.state.stack.length - 1) {
                visible = true;
              }

              return isMatch;
            });

            if (match) {
              id = match.id;
              pathname = match.pathname;
              params = match.params;
              query = match.query;
              state = match.state;
              created = match.created;
              updated = match.updated;
            }
          } else {
            // Skip this route if this pattern has already been handled.
            if (ignoredSingletons.includes(pattern)) {
              return null;
            }

            // We are handling this pattern only once, ignore it.
            ignoredSingletons.push(pattern);

            const lastOccurence = this.getlastOccurence(
              this.state.stack,
              pattern
            );

            if (this.state.stack[lastOccurence]) {
              id = this.state.stack[lastOccurence].id;
              pathname = this.state.stack[lastOccurence].pathname;
              params = this.state.stack[lastOccurence].params;
              query = this.state.stack[lastOccurence].query;
              state = this.state.stack[lastOccurence].state;
              created = this.state.stack[lastOccurence].created;
              updated = this.state.stack[lastOccurence].updated;
            }

            open = !!pathname;
            visible = lastOccurence === this.state.stack.length - 1;
          }

          const key = `route-${index}`;

          return (
            <Route
              id={id}
              component={component}
              key={key}
              open={open}
              params={params}
              path={pathname}
              pattern={pattern}
              query={query}
              state={state}
              visible={visible}
              created={created}
              updated={updated}
            />
          );
        })}
      </Fragment>
    );
  }

  /**
   * The render method.
   * @returns {JSX}
   */
  render() {
    const current = this.state.stack[this.state.stack.length - 1];

    return (
      <RouterContext.Provider value={current}>
        {this.renderOpenRoutes()}
      </RouterContext.Provider>
    );
  }
}

export default Router;
