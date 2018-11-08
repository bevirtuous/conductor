import React from 'react';
import PropTypes from 'prop-types';
import conductor from '@virtuous/conductor';
import {
  ACTION_PUSH,
  ACTION_POP,
  ACTION_REPLACE,
} from '@virtuous/conductor/constants';

/**
 * The Link component.
 */
class Link extends React.Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
    href: PropTypes.string.isRequired,
    action: PropTypes.oneOf([ACTION_PUSH, ACTION_POP, ACTION_REPLACE]),
    state: PropTypes.shape(),
    tag: PropTypes.string,
  };

  static defaultProps = {
    action: ACTION_PUSH,
    state: {},
    tag: 'a',
  }

  /**
   * @param {MouseEvent} event The click event.
   */
  handleClick = (event) => {
    event.preventDefault();

    const { action, state, href } = this.props;

    if (action === ACTION_PUSH) {
      conductor.push(href, state);
    } else if (action === ACTION_POP) {
      conductor.pop();
    } else {
      conductor.replace(href, state);
    }
  }

  /**
   * @returns {JSX}
   */
  render() {
    const { children, tag: Component } = this.props;
    return (
      <Component onClick={this.handleClick}>
        {children}
      </Component>
    );
  }
}

export default Link;