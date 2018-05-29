import * as actions from './action-creators';

/**
 * The default state definition.
 * @type {Object}
 */
const defaultState = {
  routing: false,
  stack: [],
};

/**
 * The conductor router reducer.
 * @param {Object} state The current state.
 * @param {Object} action The action object.
 * @returns {Object} The new state.
 */
export default (state = defaultState, { type, stack }) => {
  switch (type) {
    case actions.CONDUCTOR_PUSH:
    case actions.CONDUCTOR_POP:
    case actions.CONDUCTOR_REPLACE:
      return {
        routing: state.routing,
        stack,
      };
    case actions.CONDUCTOR_RESET:
      return {
        routing: state.routing,
        stack: [stack[0]],
      };
    default:
      return state;
  }
};
