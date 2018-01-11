import {
  CONDUCTOR_PUSH,
  CONDUCTOR_POP,
  CONDUCTOR_REPLACE,
} from './action-creators';

/**
 * The default state definition.
 * @type {Object}
 */
const defaultState = {
  location: {},
  stack: [],
};

/**
 * The conductor router reducer.
 * @param {Object} state The current state.
 * @param {Object} action The action object.
 * @returns {Object} The new state.
 */
export default (state = defaultState, { type, location, stack }) => {
  switch (type) {
    case CONDUCTOR_PUSH:
    case CONDUCTOR_POP:
    case CONDUCTOR_REPLACE:
      return {
        location,
        stack,
      };
    default:
      return state;
  }
};
