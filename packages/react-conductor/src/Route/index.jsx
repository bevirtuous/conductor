import React from 'react';
import PropTypes from 'prop-types';
import { router, stack } from '@virtuous/conductor';
import RouteNotFound from '../404';
import { RouteContext, RouterContext } from '../context';

class Route extends React.Component {
  static contextType = RouterContext;

  static NotFound = RouteNotFound;

  static propTypes = {
    children: PropTypes.node.isRequired,
    path: PropTypes.string.isRequired,
    transform: PropTypes.func,
  }

  static defaultProps = {
    transform: null,
  }

  constructor(props) {
    super(props);
    router.register(props.path, props.transform);
  }

  render() {
    const { children, path } = this.props;
    const route = stack.get(this.context.next);

    if (route.pattern !== path) {
      return null;
    }

    const { transform, ...rest } = route;
    const key = `${route.id}-${route.pathname}`;

    return (
      <RouteContext.Provider key={key} value={rest}>
        {children}
      </RouteContext.Provider>
    );
  }
}

export default Route;
