import React from 'react';
import PropTypes from 'prop-types';
import { router } from '@virtuous/conductor';
import RouteNotFound from '../404';
import { RouteContext, RouterContext } from '../context';

/**
 * The Route component.
 */
class Route extends React.Component {
  static contextType = RouterContext;

  static NotFound = RouteNotFound;

  static propTypes = {
    component: PropTypes.func.isRequired,
    path: PropTypes.string.isRequired,
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
    router.register(props.path, props.transform);
  }

  /**
   * @returns {JSX}
   */
  render() {
    const { component: Component, path } = this.props;
    const route = router.getCurrentRoute();

    if (route.pattern !== path) {
      return null;
    }

    const { transform, ...props } = route;
    const key = `${route.id}-${route.pathname}`;

    return (
      <RouteContext.Provider key={key} value={props}>
        <Component route={props} />
      </RouteContext.Provider>
    );
  }
}

export default Route;
