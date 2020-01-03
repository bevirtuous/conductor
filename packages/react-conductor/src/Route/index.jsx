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
  }

  constructor(props) {
    super(props);
    router.register(props.path);
  }

  render() {
    const { children, path } = this.props;
    const route = stack.get(this.context.next);

    if (route.pattern !== path) {
      return null;
    }

    const key = `${route.id}-${route.pathname}`;

    return (
      <RouteContext.Provider key={key} value={route}>
        {children}
      </RouteContext.Provider>
    );
  }
}

export default Route;
