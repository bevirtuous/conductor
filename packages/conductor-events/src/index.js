import * as constants from '@virtuous/conductor/constants';
import addCallback from './addCallback';

/**
 * Registers a callback to the error event.
 * @param {Function} callback The callback to register.
 */
export const onError = (callback) => {
  addCallback(constants.EVENT_ERROR, callback);
};

/**
 * Registers a callback to the willEnter event.
 * @param {Function} callback The callback to register.
 */
export const onWillEnter = (callback) => {
  addCallback(constants.EVENT_WILL_ENTER, callback);
};

/**
 * Registers a callback to the didEnter event.
 * @param {Function} callback The callback to register.
 */
export const onDidEnter = (callback) => {
  addCallback(constants.EVENT_DID_ENTER, callback);
};

/**
 * Registers a callback to the willLeave event.
 * @param {Function} callback The callback to register.
 */
export const onWillLeave = (callback) => {
  addCallback(constants.EVENT_WILL_LEAVE, callback);
};

/**
 * Registers a callback to the didLeave event.
 * @param {Function} callback The callback to register.
 */
export const onDidLeave = (callback) => {
  addCallback(constants.EVENT_DID_LEAVE, callback);
};

/**
 * Registers a callback to the pop event.
 * @param {Function} callback The callback to register.
 */
export const onPop = (callback) => {
  addCallback(constants.EVENT_POP, callback);
};

/**
 * Registers a callback to the popped event.
 * @param {Function} callback The callback to register.
 */
export const onPopped = (callback) => {
  addCallback(constants.EVENT_POPPED, callback);
};

/**
 * Registers a callback to the push event.
 * @param {Function} callback The callback to register.
 */
export const onPush = (callback) => {
  addCallback(constants.EVENT_PUSH, callback);
};

/**
 * Registers a callback to the pushed event.
 * @param {Function} callback The callback to register.
 */
export const onPushed = (callback) => {
  addCallback(constants.EVENT_PUSHED, callback);
};

/**
 * Registers a callback to the replace event.
 * @param {Function} callback The callback to register.
 */
export const onReplace = (callback) => {
  addCallback(constants.EVENT_REPLACE, callback);
};

/**
 * Registers a callback to the replaced event.
 * @param {Function} callback The callback to register.
 */
export const onReplaced = (callback) => {
  addCallback(constants.EVENT_REPLACED, callback);
};

/**
 * Registers a callback to the reset event.
 * @param {Function} callback The callback to register.
 */
export const onReset = (callback) => {
  addCallback(constants.EVENT_RESET, callback);
};
