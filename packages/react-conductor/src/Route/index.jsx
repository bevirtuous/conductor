import React, { Component } from 'react';
import PropTypes from 'prop-types';
import getCurrentAction from '@virtuous/conductor-helpers/getCurrentAction';
import Transition from 'react-transition-group/Transition';
import transition from './transition';
import { RouteContext } from '../Router/context';

/**
 * The Route component.
 */
class Route extends Component {
  static propTypes = {
    component: PropTypes.func.isRequired,
    pattern: PropTypes.string.isRequired,
    created: PropTypes.number,
    id: PropTypes.string,
    open: PropTypes.bool,
    params: PropTypes.shape(),
    path: PropTypes.string,
    query: PropTypes.shape(),
    state: PropTypes.shape(),
    tag: PropTypes.string,
    transition: PropTypes.shape(),
    updated: PropTypes.number,
    visible: PropTypes.bool,
  };

  static defaultProps = {
    created: null,
    id: null,
    open: false,
    params: {},
    path: null,
    query: {},
    state: {},
    tag: 'div',
    transition,
    updated: null,
    visible: false,
  };

  /**
   *
   * @param {*} props
   */
  constructor(props) {
    super(props);
    this.node = React.createRef();
  }

  /**
   *
   */
  get transitionType() {
    if (this.props.path && !this.props.visible) {
      return this.props.transition.backward;
    } if (getCurrentAction() === 'REPLACE') {
      return this.props.transition.replace;
    }

    return this.props.transition.forward;
  }

  /**
   * Renders the component.
   * @returns {JSX}
   */
  render() {
    const {
      component: Content,
      created,
      id,
      open,
      params,
      path,
      pattern,
      query,
      state: routeState,
      tag: Tag,
      visible,
      updated,
    } = this.props;

    const { transitionType } = this;

    const route = {
      id,
      open,
      pathname: path,
      pattern,
      params,
      query,
      state: routeState,
      visible,
      created,
      updated,
    };

    return (
      <RouteContext.Provider value={route}>
        <Transition
          in={this.props.visible}
          timeout={0}
        >
          {state => (
            <Tag
              data-pattern={route.pattern}
              data-pathname={route.pathname}
              style={{
                ...transitionType.default,
                ...transitionType[state],
              }}
            >
              <Content />
            </Tag>
          )}
        </Transition>
      </RouteContext.Provider>
    );
  }
}

export default Route;
