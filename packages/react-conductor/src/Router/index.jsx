import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  stack as routeStack,
  onDidPush,
  onDidPop,
  onDidReplace,
  onDidReset,
} from '@virtuous/conductor';
import { RouterContext } from '../context';

/**
 * The Router component.
 */
class Router extends Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
  }

  /**
   * @param {Object} props The component props.
   */
  constructor(props) {
    super(props);

    this.state = {
      stack: routeStack.getAll(),
      updated: Date.now(),
    };

    onDidPush(this.update);
    onDidPop(this.update);
    onDidReplace(this.update);
    onDidReset(this.update);
  }

  /**
   * @param {Object} nextProps The next component props.
   * @param {Object} nextState The next component state.
   * @returns {boolean}
   */
  shouldComponentUpdate(nextProps, nextState) {
    const { updated } = this.state;
    return updated !== nextState.updated;
  }

  /**
   * Update the local stack with the route stack.
   * The local stack items are grouped by the route pattern.
   * The order is then identifiable by a given index.
   */
  update = () => {
    const routes = Array.from(routeStack.getAll());

    const stack = routes.reduce((acc, [, route], index) => {
      // Find the given pattern inside the accumulated value.
      const entry = acc[route.pattern] || [];

      // Push a new route into this pattern entry.
      entry.push({
        index,
        route,
      });

      // Set the entry back to the accumulated value.
      acc[route.pattern] = entry;

      return acc;
    }, {});

    this.setState({
      stack,
      updated: Date.now(),
    });
  }

  /**
   * @returns {JSX}
   */
  render() {
    const { children } = this.props;
    const { stack } = this.state;
    const context = { stack };

    return (
      <RouterContext.Provider value={context}>
        {children}
      </RouterContext.Provider>
    );
  }
}

export default Router;
