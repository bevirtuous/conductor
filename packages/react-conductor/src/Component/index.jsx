import React from 'react';
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

    events.onDidPush(this.handleRouteChange);
    events.onDidPop(this.handleRouteChange);
    events.onDidReplace(this.handleRouteChange);
  }

  /**
   * @param {string} routeId The current route id.
   */
  handleRouteChange = (routeId) => {
    return;
    // const pageId = this.context.routeId();

    // // Check if component is not entered and the context id matches the new current route id.
    // if (!this.entered && pageId === routeId) {
    //   this.entered = true;
    //   this.componentDidEnter();
    //   return;
    // }

    // // Check if component is not entered and the context id matches the new current route id.
    // if (this.entered && pageId !== routeId) {
    //   this.entered = false;
    //   this.componentDidLeave();
    // }
  }

  componentDidEnter = () => {}
  componentDidLeave = () => {}
}

export default ConductorComponent;
