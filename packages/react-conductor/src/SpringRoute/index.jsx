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
    transition: PropTypes.func.isRequired,
    className: PropTypes.string,
  };

  /**
   * @returns {Object}
   */
  get matchingRoutes() {
    const { pattern } = this.props;

    return this.context.stack.reduce((acc, [, route], index) => {
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
    const { className, component, transition } = this.props;
    const routes = this.matchingRoutes;

    return routes.map((entry) => {
      const current = (entry.index === router.routeIndex);
      const {
        transform,
        ...context
      } = entry.route;
      context.open = true;
      context.visible = true;

      const key = `${entry.route.id}-${entry.route.pathname}`;

      return (
        <RouteContext.Provider key={key} value={context}>
          <Child
            className={className}
            component={component}
            current={current}
            index={entry.index}
            transition={transition}
            prevRoute={this.context.prev}
            nextRoute={this.context.next}
          />
        </RouteContext.Provider>
      );
    });
  }
}

export default SpringGroup;
