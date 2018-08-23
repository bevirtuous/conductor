import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { ACTION_REPLACE } from '@virtuous/conductor/constants';
import { getCurrentAction } from '@virtuous/conductor-helpers';
import Transition from 'react-transition-group/Transition';
import defaultTransition from './transition';
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
    transition: defaultTransition,
    updated: null,
    visible: false,
  };

  /**
   * @param {Object} props The initial component props.
   */
  constructor(props) {
    super(props);
    this.node = React.createRef();
  }

  /**
   * Returns the route context content.
   */
  get contextContent() {
    const {
      created,
      id,
      open,
      params,
      path,
      pattern,
      query,
      state,
      visible,
      updated,
    } = this.props;

    return {
      id,
      open,
      pathname: path,
      pattern,
      params,
      query,
      state,
      visible,
      created,
      updated,
    };
  }

  /**
   * Returns a transition object representing the position of the route.
   */
  get transition() {
    const { path, transition, visible } = this.props;

    if (path && !visible) {
      return transition.backward;
    }

    if (getCurrentAction() === ACTION_REPLACE) {
      return transition.replace;
    }

    return transition.forward;
  }

  /**
   * Renders the component.
   * @returns {JSX}
   */
  render() {
    const {
      component: Content,
      path,
      pattern,
      tag: Tag,
      visible,
    } = this.props;

    const { contextContent, transition } = this;

    return (
      <RouteContext.Provider value={contextContent}>
        <Transition in={visible} timeout={0}>
          {state => (
            <Tag
              data-pattern={pattern}
              data-pathname={path}
              style={{
                ...transition.default,
                ...transition[state],
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
