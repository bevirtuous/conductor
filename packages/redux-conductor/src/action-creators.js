export const CONDUCTOR_PUSH = 'CONDUCTOR_PUSH';
export const CONDUCTOR_POP = 'CONDUCTOR_POP';
export const CONDUCTOR_REPLACE = 'CONDUCTOR_REPLACE';
export const CONDUCTOR_RESET = 'CONDUCTOR_RESET';

/**
 * Creates the CONDUCTOR_PUSH action object.
 * @param {Object} location The location being pushed.
 * @param {Array} stack The new stack.
 * @return {Object} A Redux action.
 */
export const conductorPush = (location, stack) => ({
  type: CONDUCTOR_PUSH,
  location,
  stack,
});

/**
 * Creates the CONDUCTOR_POP action object.
 * @param {Object} location The location being popped.
 * @param {Array} stack The new stack.
 * @return {Object} A Redux action.
 */
export const conductorPop = (location, stack) => ({
  type: CONDUCTOR_POP,
  location,
  stack,
});

/**
 * Creates the CONDUCTOR_REPLACE action object.
 * @param {Object} location The location being replaced.
 * @param {Array} stack The new stack.
 * @return {Object} A Redux action.
 */
export const conductorReplace = (location, stack) => ({
  type: CONDUCTOR_REPLACE,
  location,
  stack,
});
