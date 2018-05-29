export const CONDUCTOR_PUSH = 'CONDUCTOR_PUSH';
export const CONDUCTOR_POP = 'CONDUCTOR_POP';
export const CONDUCTOR_REPLACE = 'CONDUCTOR_REPLACE';
export const CONDUCTOR_RESET = 'CONDUCTOR_RESET';

/**
 * Creates the CONDUCTOR_PUSH action object.
 * @param {Array} stack The new stack.
 * @return {Object} A Redux action.
 */
export const conductorPush = stack => ({
  type: CONDUCTOR_PUSH,
  stack,
});

/**
 * Creates the CONDUCTOR_POP action object.
 * @param {Array} stack The new stack.
 * @return {Object} A Redux action.
 */
export const conductorPop = stack => ({
  type: CONDUCTOR_POP,
  stack,
});

/**
 * Creates the CONDUCTOR_REPLACE action object.
 * @param {Array} stack The new stack.
 * @return {Object} A Redux action.
 */
export const conductorReplace = stack => ({
  type: CONDUCTOR_REPLACE,
  stack,
});

/**
 * Creates the CONDUCTOR_REPLACE action object.
 * @param {Array} stack The new stack.
 * @return {Object} A Redux action.
 */
export const conductorReset = stack => ({
  type: CONDUCTOR_RESET,
  stack,
});
