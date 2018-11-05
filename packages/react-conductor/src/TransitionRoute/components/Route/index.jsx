import React from 'react';
import { Spring } from 'react-spring';

// How to know when a route has to leave?
  // When the stack changes and the route is no longer at current index (previous routes only)
// How to know when a route is intended to be gone? (forward routes)
  // Not in stack at all
  // How to transition out?
  // Stateful component!

  // internally the route can check to see if it should render it's content or not
  // (if it's a next route and has animated out)

/**
 * The SpringRoute Component.
 */
class SpringRoute extends React.Component {
  /**
   * 
   * @param {*} props 
   */
  constructor(props) {
    super(props);

    this.state = {
      in: false,
      render: true,
    };
  }

  componentWillReceiveProps() {
    // Check if the route became visible
    // Check if 
    // Case 1. Route leaves via push (in history)
      // How to know how to move?

    // Case 2. Route leaves via pop (removed from history)
      // How to know how to move?
      // Update render state after animating
  }

  /**
   * @returns {Object}
   */
  get transition() {
    const { component: Component } = this.props;
    return {
      from: { x: window.innerWidth },
      to: { x: 0 },
    };
  }

  /**
   * @returns {JSX|null}
   */
  render() {
    const { render } = this.state;

    if (!render) {
      return null;
    }

    const { component: Component } = this.props;
    return (
      <Spring {...this.transition}>
        {props => (
          <div style={{ transform: `translateX(${props.x}px)` }}>
            <Component />
          </div>
        )}
      </Spring>
    );
  }
}

export default SpringRoute;
