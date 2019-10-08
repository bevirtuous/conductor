import * as constants from '../constants';

/**
 * @param {Object} routes The previous and next routes.
 * @return {Object} A Redux action.
 */
export const conductorPush = routes => ({
  type: constants.CONDUCTOR_PUSH,
  routes,
});

/**
 * @param {Array} stack The new stack.
 * @return {Object} A Redux action.
 */
export const conductorPop = stack => ({
  type: constants.CONDUCTOR_POP,
  stack,
});

/**
 * @param {Array} stack The new stack.
 * @return {Object} A Redux action.
 */
export const conductorReplace = stack => ({
  type: constants.CONDUCTOR_REPLACE,
  stack,
});

/**
 * @param {Object} routes The previous and next routes.
 * @return {Object} A Redux action.
 */
export const conductorReset = routes => ({
  type: constants.CONDUCTOR_RESET,
  routes,
});

/**
 * @param {Route} route The updated route.
 * @return {Object} A Redux action.
 */
export const conductorUpdate = route => ({
  type: constants.CONDUCTOR_UPDATE,
  route,
});
