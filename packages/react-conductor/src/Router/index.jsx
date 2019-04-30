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
import Push from './actions/Push';
import Pop from './actions/Pop';
import Replace from './actions/Replace';
import Reset from './actions/Reset';
import ResetTo from './actions/ResetTo';

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

  static Push = Push;

  static Pop = Pop;

  static Replace = Replace;

  static Reset = Reset;

  static ResetTo = ResetTo;

  /**
   * @param {Object} props The component props.
   */
  constructor(props) {
    super(props);

    if (typeof props.history === 'function') {
      router.constructor(props.history);
    }

    this.state = {
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

  update = () => {
    this.setState({
      updated: Date.now(),
    });
  }

  /**
   * @returns {JSX}
   */
  render() {
    const { children } = this.props;
    const stack = Array.from(routeStack.getAll());

    return (
      <RouterContext.Provider value={stack}>
        {children}
      </RouterContext.Provider>
    );
  }
}

export default Router;
