import React from 'react';
import PropTypes from 'prop-types';
import { router, stack } from '@virtuous/conductor';
import Route from '../Route';
import Child from './components/Route';
import { RouteContext } from '../context';

/**
 * The SpringGroup component.
 */
class SpringGroup extends Route {
  static propTypes = {
    ...Route.propTypes,
    spring: PropTypes.func.isRequired,
    className: PropTypes.string,
  };

  /**
   * @returns {Object}
   */
  get matchingRoutes() {
    const { pattern } = this.props;
    const matches = [];
    const prev = stack.get(this.context.prev);
    const next = stack.get(this.context.next);

    if (prev && prev.pattern === pattern) {
      const index = this.context.stack.findIndex(([id]) => id === prev.id);

      matches.push({
        index,
        route: prev,
      });
    }

    if (next && next.pattern === pattern) {
      const index = this.context.stack.findIndex(([id]) => id === next.id);

      matches.push({
        index,
        route: next,
      });
    }

    return matches;
  }

  /**
   * @returns {JSX}
   */
  render() {
    const { className, component, spring } = this.props;
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
            spring={spring}
            prevRoute={this.context.prev}
            nextRoute={this.context.next}
          />
        </RouteContext.Provider>
      );
    });
  }
}

export default SpringGroup;
