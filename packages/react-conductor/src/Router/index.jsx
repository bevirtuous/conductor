import React from 'react';
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
class Router extends React.Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
  }

  /**
   * @param {Object} props The component props.
   */
  constructor(props) {
    super(props);

    this.state = {
      stack: {},
      updated: null,
    };

    onDidPush(this.update);
    onDidPop(this.update);
    onDidReplace(this.update);
    onDidReset(this.update);
  }

  /**
   * Update the format of the stack when the router is mounted.
   */
  componentDidMount() {
    this.update();
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
   * @returns {Object}
   */
  formatStack = () => {
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

    return stack;
  }

  /**
   * Update the local stack with the route stack.
   * The local stack items are grouped by the route pattern.
   * The order is then identifiable by a given index.
   */
  update = () => {
    this.setState({
      stack: this.formatStack(),
      updated: Date.now(),
    });
  }

  /**
   * @returns {JSX}
   */
  render() {
    const { children } = this.props;
    const { stack } = this.state;

    return (
      <RouterContext.Provider value={stack}>
        {children}
      </RouterContext.Provider>
    );
  }
}

export default Router;
