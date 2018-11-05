import React from 'react';
import PropTypes from 'prop-types';
import { router } from '@virtuous/conductor';
import Route from '../Route';
import Child from './components/Route';
import { RouteContext } from '../context';

/**
 * The TransitionRoute component.
 */
class TransitionRoute extends Route {
  static propTypes = {
    ...Route.propTypes,
    transition: PropTypes.shape(),
  };

  /**
   * @returns {Object}
   */
  get matchingRoutes() {
    const { pattern } = this.props;

    return this.context.reduce((acc, [, route], index) => {
      // Check index and pattern.
      if (index <= router.routeIndex && pattern === route.pattern) {
        acc.push({
          index,
          route,
        });
      }

      return acc;
    }, []);
  }

  /**
   * @returns {JSX}
   */
  render() {
    const { component, transition } = this.props;
    const routes = this.matchingRoutes;

    return routes.map((entry) => {
      const visible = entry.index === router.routeIndex;

      return (
        <RouteContext.Provider key={entry.route.id} value={entry.route}>
          <Child component={component} visible={visible} transition={transition} />
        </RouteContext.Provider>
      );
    });
  }
}

export default TransitionRoute;
