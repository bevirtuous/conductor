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
   * @returns {JSX}
   */
  render() {
    const { component: Component, pattern } = this.props;
    const { [pattern]: stack } = this.context;

    if (!stack) {
      return null;
    }

    return (
      stack.map((entry) => {
        if (entry.index !== router.routeIndex) {
          return null;
        }

        const { setPattern, ...rest } = entry.route;

        return (
          <RouteContext.Provider key={entry.route.id} value={rest}>
            <Component />
          </RouteContext.Provider>
        );
      })
    );
  }
}

export default Route;
