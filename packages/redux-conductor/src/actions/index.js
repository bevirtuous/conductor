import * as constants from '../constants';

/**
 * Creates the CONDUCTOR_PUSH action object.
 * @param {Object} routes The previous and next routes.
 * @return {Object} A Redux action.
 */
export const conductorPush = routes => ({
  type: constants.CONDUCTOR_PUSH,
  routes,
});

/**
 * Creates the CONDUCTOR_POP action object.
 * @param {Array} stack The new stack.
 * @return {Object} A Redux action.
 */
export const conductorPop = stack => ({
  type: constants.CONDUCTOR_POP,
  stack,
});

/**
 * Creates the CONDUCTOR_REPLACE action object.
 * @param {Array} stack The new stack.
 * @return {Object} A Redux action.
 */
export const conductorReplace = stack => ({
  type: constants.CONDUCTOR_REPLACE,
  stack,
});

/**
 * Creates the CONDUCTOR_RESET action object.
 * @param {Object} routes The previous and next routes.
 * @return {Object} A Redux action.
 */
export const conductorReset = routes => ({
  type: constants.CONDUCTOR_RESET,
  routes,
});

/**
 * Creates the CONDUCTOR_UPDATE action object.
 * @param {Route} route The updated route.
 * @return {Object} A Redux action.
 */
export const conductorUpdate = route => ({
  type: constants.CONDUCTOR_UPDATE,
  route,
});
