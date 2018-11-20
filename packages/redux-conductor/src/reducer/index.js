import * as constants from '../constants';
import cloneDeep from 'lodash/cloneDeep';
import { getStack } from '../helpers';

/**
 * The default state definition.
 * @type {Object}
 */
const defaultState = {
  routing: false,
  stack: getStack(),
};

/**
 * @param {Object} state The current state.
 * @param {Object} action The action object.
 * @returns {Object} The new state.
 */
export default (state = defaultState, { type, stack }) => {
  switch (type) {
    case constants.CONDUCTOR_PUSH:
    case constants.CONDUCTOR_POP:
    case constants.CONDUCTOR_REPLACE:
    case constants.CONDUCTOR_UPDATE:
      return {
        routing: false,
        stack: cloneDeep(stack),
      };
    case constants.CONDUCTOR_RESET:
      return {
        routing: false,
        stack: [cloneDeep(stack[0])],
      };
    default:
      return state;
  }
};
