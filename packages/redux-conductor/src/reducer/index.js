import * as constants from '../constants';

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
    case constants.CONDUCTOR_PUSH:
    case constants.CONDUCTOR_POP:
    case constants.CONDUCTOR_REPLACE:
      return {
        routing: false,
        stack,
      };
    case constants.CONDUCTOR_UPDATE:
      return {
        routing: false,
        stack,
      };
    case constants.CONDUCTOR_RESET:
      return {
        routing: false,
        stack: [stack[0]],
      };
    default:
      return state;
  }
};
