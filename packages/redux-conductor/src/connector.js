import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import isEqual from 'lodash/isEqual';
import emitter from '@virtuous/conductor/emitter';

/**
 * Connects a components to the store that takes care about the current route.
 * The component will only be updated when the current route matches the route
 * where it was initially mounted.
 * @param {function} mapStateToProps The map state to props callback.
 * @param {function} mapDispatchToProps The map dispatch to props callback.
 * @param {function} mergeProps The merge props callback.
 * @param {Object} options The connect options.
 * @return {function} The connected component.
 */
const routeConnect = (
  mapStateToProps = null,
  mapDispatchToProps = null,
  mergeProps = null,
  options = {},
  componentOptions = {
    deferUpdates: true,
  }
) => {
  /**
   * The local map state to props callback. Appends the pathname from history.
   * @param {Object} state The state.
   * @param {Object} props The component properties.
   * @return {Object} The new component props.
   */
  const localMapStateToProps = (state, props) => {
    const realMappedProps = mapStateToProps ? mapStateToProps(state, props) : {};

    return {
      ...realMappedProps,
      path: state.router.location.pathname,
    };
  };

  // Wrap the real connect method with the local map state to props callback.
  const reduxConnect = connect(
    localMapStateToProps,
    mapDispatchToProps,
    mergeProps,
    options
  );

  /**
   * Creates a wrapping component that takes care about the current path.
   * @param {Component} WrappedComponent The component to wrap.
   * @param {Component} WrappedOptions The given options form the wrapped component.
   * @return {Component} The component wrapper.
   */
  const RouteConnect = (WrappedComponent, WrappedOptions) => class extends Component {
    static propTypes = {
      dispatch: PropTypes.func,
    };

    static defaultProps = {
      dispatch: () => { },
    };

    static contextTypes = {
      route: PropTypes.shape(),
      router: PropTypes.shape(),
    };

    static displayName = 'Connect';

    /**
     * 
     * @param {*} props 
     */
    constructor(props) {
      super(props);

      /**
       * A flag the represents if the props have changed since
       * this component was last allowed to update.
       */
      this.havePropsChanged = false;

      this.shouldUpdate = !WrappedOptions.deferUpdates;

      if (WrappedOptions.deferUpdates) {
        emitter.on('router.pushed', (pathname) => {
          if (pathname === this.context.route.path) {
            this.shouldUpdate = true;
            this.forceUpdate();
          } else {
            this.shouldUpdate = false;
          }
        });
      }
    }

    /**
     * 
     * @param {*} nextProps 
     */
    componentWillReceiveProps(nextProps) {
      const wrappedProps = this.getWrappedProps(this.props);
      const wrappedNextProps = this.getWrappedProps(nextProps);

      if (!isEqual(wrappedProps, wrappedNextProps)) {
        this.havePropsChanged = true;
      }
    }

    /**
     * Only allows component updates when the current route matches the components mounting route.
     * @return {boolean} Whether to update the component.
     */
    shouldComponentUpdate() {
      // Only render if the next route matches the mounted route and the props changed.
      if (this.shouldUpdate && this.context.route.path === this.context.router.path) {
        if (this.havePropsChanged) {
          this.havePropsChanged = false;
          return true;
        }
      }

      return false;
    }

    getWrappedProps = (props) => {
      const { dispatch, ...wrappedProps } = props;
      return wrappedProps;
    }

    /**
     * Renders the component.
     * @return {Node} The rendered component.
     */
    render() {
      // TODO: convert to React.createElement()
      return <WrappedComponent {...this.getWrappedProps(this.props)} />;
    }
  };

  // Return the connected wrapper.
  return RealComponent => reduxConnect(RouteConnect(RealComponent, componentOptions));
};

export default routeConnect;
