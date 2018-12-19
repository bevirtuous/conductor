import React from 'react';
import PropTypes from 'prop-types';
import {
  router,
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
    history: PropTypes.func,
  }

  static defaultProps = {
    history: null,
  }

  /**
   * @param {Object} props The component props.
   */
  constructor(props) {
    super(props);

    if (typeof props.history === 'function') {
      router.constructor(props.history);
    }

    this.state = {
      stack: Array.from(routeStack.getAll()),
      updated: null,
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
   */
  update = () => {
    this.setState({
      stack: Array.from(routeStack.getAll()),
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
