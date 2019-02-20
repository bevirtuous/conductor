import { router, stack } from '@virtuous/conductor';
import * as constants from '../constants';

/**
 * @type {Object}
 */
const initialState = {
  index: 0,
  routing: false,
  stack: Array.from(stack.getAll().values()),
};

/**
 * @param {Object} state The current state.
 * @param {Object} action The action object.
 * @returns {Object} The new state.
 */
export default (state = initialState, action) => {
  switch (action.type) {
    case constants.CONDUCTOR_POP:
      return {
        ...state,
        index: router.routeIndex,
      };
    case constants.CONDUCTOR_PUSH: {
      const index = state.index + 1;
      const clipped = state.stack.slice(0, index);

      return {
        ...state,
        index,
        stack: clipped.concat(action.routes.next),
      };
    }
    case constants.CONDUCTOR_REPLACE:
      return {
        ...state,
        stack: state.stack.map((route, index) => {
          if (index === router.routeIndex) {
            return action.routes.next;
          }

          return route;
        }),
      };
    case constants.CONDUCTOR_RESET: {
      const clipped = state.stack.slice(1, state.stack.length);

      return {
        ...state,
        index: 0,
        stack: [action.routes.next].concat(clipped),
      };
    }
    case constants.CONDUCTOR_UPDATE:
      return {
        ...state,
        stack: state.stack.map((route) => {
          if (route.id !== action.route.id) {
            return route;
          }

          return {
            ...route,
            state: action.route.state,
          };
        }),
      };
    default:
      return state;
  }
};
