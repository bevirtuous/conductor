import * as constants from '../constants';

/**
 * Creates the CONDUCTOR_PUSH action object.
 * @param {Array} stack The new stack.
 * @return {Object} A Redux action.
 */
export const conductorPush = stack => ({
  type: constants.CONDUCTOR_PUSH,
  stack,
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
 * Creates the CONDUCTOR_REPLACE action object.
 * @param {Array} stack The new stack.
 * @return {Object} A Redux action.
 */
export const conductorReset = stack => ({
  type: constants.CONDUCTOR_RESET,
  stack,
});

/**
 * Creates the CONDUCTOR_UPDATE action object.
 * @param {Array} stack The new stack.
 * @return {Object} A Redux action.
 */
export const conductorUpdate = stack => ({
  type: constants.CONDUCTOR_UPDATE,
  stack,
});
