export const CONDUCTOR_PUSH = 'CONDUCTOR_PUSH';
export const CONDUCTOR_PUSHED = 'CONDUCTOR_PUSHED';
export const CONDUCTOR_POP = 'CONDUCTOR_POP';
export const CONDUCTOR_POPPED = 'CONDUCTOR_POPPED';
export const CONDUCTOR_REPLACE = 'CONDUCTOR_REPLACE';
export const CONDUCTOR_REPLACED = 'CONDUCTOR_REPLACED';
export const CONDUCTOR_RESET = 'CONDUCTOR_RESET';

/**
 * Creates the CONDUCTOR_PUSH action object.
 * @param {Object} location The location being pushed.
 * @param {Array} cacheStack The new cache stack.
 * @return {Object} A Redux action.
 */
export const conductorPush = (location, cacheStack) => ({
  type: CONDUCTOR_PUSH,
  location,
  stack: cacheStack,
});

/**
 * Creates the CONDUCTOR_PUSHED action object.
 * @param {Object} location The location that was pushed.
 * @return {Object} A Redux action.
 */
export const conductorPushed = location => ({
  type: CONDUCTOR_PUSHED,
  location,
});

/**
 * Creates the CONDUCTOR_POP action object.
 * @param {Object} location The location being popped.
 * @param {Array} cacheStack The new cache stack.
 * @return {Object} A Redux action.
 */
export const conductorPop = (location, cacheStack) => ({
  type: CONDUCTOR_POP,
  location,
  stack: cacheStack,
});

/**
 * Creates the CONDUCTOR_POPPED action object.
 * @param {Object} location The location that was popped.
 * @return {Object} A Redux action.
 */
export const conductorPopped = location => ({
  type: CONDUCTOR_POPPED,
  location,
});

/**
 * Creates the CONDUCTOR_REPLACE action object.
 * @param {Object} location The location being replaced.
 * @param {Array} cacheStack The new cache stack.
 * @return {Object} A Redux action.
 */
export const conductorReplace = (location, cacheStack) => ({
  type: CONDUCTOR_REPLACE,
  location,
  stack: cacheStack,
});

/**
 * Creates the CONDUCTOR_REPLACED action object.
 * @param {Object} location The location that was replaced.
 * @return {Object} A Redux action.
 */
export const conductorReplaced = location => ({
  type: CONDUCTOR_REPLACED,
  location,
});

/**
 * Creates the CONDUCTOR_RESET action object.
 * @param {Object} location The location that was reset to.
 * @return {Object} A Redux action.
 */
export const conductorReset = location => ({
  type: CONDUCTOR_RESET,
  location,
});
