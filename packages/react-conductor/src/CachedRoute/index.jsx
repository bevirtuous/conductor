import React from 'react';
import PropTypes from 'prop-types';
import { router } from '@virtuous/conductor';
import Route from '../Route';
import { RouteContext } from '../context';

/**
 * The CachedRoute component.
 */
class CachedRoute extends Route {
  static propTypes = {
    ...Route.propTypes,
    prerender: PropTypes.bool,
  };

  static defaultProps = {
    ...Route.defaultProps,
    prerender: false,
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
    const { component: Component } = this.props;
    const routes = this.matchingRoutes;

    if (!routes || !routes.length) {
      return null;
    }

    return routes.map((entry) => {
      const { setPattern, ...context } = entry.route;
      context.current = entry.index === router.routeIndex;
      context.visible = context.current;
      context.open = true;

      return (
        <RouteContext.Provider key={entry.route.id} value={context}>
          <Component />
        </RouteContext.Provider>
      );
    });
  }
}

export default CachedRoute;

