import React from 'react';
import PropTypes from 'prop-types';
import * as events from '@virtuous/conductor-events';

/**
 * The ConductorComponent component.
 */
class ConductorComponent extends React.Component {
  /**
   * @param {Object} props The component props.
   */
  constructor(props) {
    super(props);

    this.entered = false;

    events.onWillPush(this.handleRouteChange);
    events.onWillPop(this.handleRouteChange);
  }

  /**
   * 
   */
  handleRouteChange = (routeId) => {

  }

  componentWillEnter = () => {}
  componentDidEnter = () => {}
  componentWillLeave = () => {}
  componentDidLeave = () => {}
}

export default ConductorComponent;
