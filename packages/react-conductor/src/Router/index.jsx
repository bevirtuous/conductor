import React from 'react';
import PropTypes from 'prop-types';
import {
  router,
  stack as routeStack,
  onDidPush,
  onDidPop,
  onDidReplace,
  onDidReset,
  onUpdate,
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
      prev: null,
      next: router.getCurrentRoute().id,
      updated: null,
    };

    onDidPush(this.update);
    onDidPop(this.update);
    onDidReplace(this.update);
    onDidReset(this.update);
    onUpdate(this.update);
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

  update = ({ prev, next }) => {
    this.setState({
      prev: prev ? prev.id : null,
      next: next.id,
      updated: Date.now(),
    });
  }

  /**
   * @returns {JSX}
   */
  render() {
    const { children } = this.props;
    const { prev, next } = this.state;
    const stack = Array.from(routeStack.getAll());

    return (
      <RouterContext.Provider value={{ prev, next, stack }}>
        {children}
      </RouterContext.Provider>
    );
  }
}

export default Router;
