import React from 'react';
import PropTypes from 'prop-types';
import { router } from '@virtuous/conductor';
import Route from '../Route';
import Child from './components/Route';
import { RouteContext } from '../context';

/**
 * The SpringGroup component.
 */
class SpringGroup extends Route {
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
      if (pattern === route.pattern) {
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
      const current = entry.index === router.routeIndex;
      const { setPattern, ...context } = entry.route;
      context.open = true;
      context.visible = true;

      return (
        <RouteContext.Provider key={entry.route.id} value={context}>
          <Child
            component={component}
            current={current}
            index={entry.index}
            transition={transition}
          />
        </RouteContext.Provider>
      );
    });
  }
}

export default SpringGroup;
