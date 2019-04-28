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
   * @returns {Object}
   */
  getContextValue = () => {
    const { ...context } = router.getCurrentRoute();
    context.open = true;
    context.visible = true;

    return context;
  }

  /**
   * @returns {JSX}
   */
  render() {
    const { component: Component, pattern } = this.props;
    const route = router.getCurrentRoute();

    if (route.pattern !== pattern) {
      return null;
    }

    const { transform, ...props } = route;
    const key = `${route.id}-${route.pathname}`;

    return (
      <RouteContext.Provider key={key} value={this.getContextValue()}>
        <Component route={props} />
      </RouteContext.Provider>
    );
  }
}

export default Route;
