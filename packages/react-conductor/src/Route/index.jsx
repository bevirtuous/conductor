import React from 'react';
import PropTypes from 'prop-types';
import { router } from '@virtuous/conductor';
import { RouteContext, RouterContext } from '../context';

/**
 * The Route component.
 */
class Route extends React.Component {
  static contextType = RouterContext;

  static propTypes = {
    component: PropTypes.func.isRequired,
    pattern: PropTypes.string.isRequired,
    transform: PropTypes.func,
  }

  static defaultProps = {
    transform: null,
  }

  /**
   * @param {Object} props The component props.
   */
  constructor(props) {
    super(props);
    router.register(props.pattern, props.transform);
  }

  /**
   * TODO: Move to router
   */
  get currentRoute() {
    const { [router.routeIndex]: [, route] } = this.context;

    return route;
  }

  /**
   * @returns {Object}
   */
  get contextValue() {
    const { setPattern, ...context } = this.currentRoute;

    return context;
  }

  /**
   * @returns {JSX}
   */
  render() {
    const { component: Component, pattern } = this.props;
    const route = this.currentRoute;

    if (route.pattern !== pattern) {
      return null;
    }

    return (
      <RouteContext.Provider key={route.id} value={this.contextValue}>
        <Component />
      </RouteContext.Provider>
    );
  }
}

export default Route;
