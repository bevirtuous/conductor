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
 * Registers a callback to execute before the push event.
 * @param {Function} callback The callback to register.
 */
export const onWillPush = (callback) => {
  addCallback(constants.EVENT_WILL_PUSH, callback);
};

/**
 * Registers a callback to execute after the push event.
 * @param {Function} callback The callback to register.
 */
export const onDidPush = (callback) => {
  addCallback(constants.EVENT_DID_PUSH, callback);
};

/**
 * Registers a callback to execute before the pop event.
 * @param {Function} callback The callback to register.
 */
export const onWillPop = (callback) => {
  addCallback(constants.EVENT_WILL_POP, callback);
};

/**
 * Registers a callback to execute after the pop event.
 * @param {Function} callback The callback to register.
 */
export const onDidPop = (callback) => {
  addCallback(constants.EVENT_DID_POP, callback);
};

/**
 * Registers a callback to execute before the push event.
 * @param {Function} callback The callback to register.
 */
export const onWillReplace = (callback) => {
  addCallback(constants.EVENT_WILL_REPLACE, callback);
};

/**
 * Registers a callback to execute after the replace event.
 * @param {Function} callback The callback to register.
 */
export const onDidReplace = (callback) => {
  addCallback(constants.EVENT_DID_REPLACE, callback);
};

/**
 * Registers a callback to execute before the history has been reset.
 * @param {Function} callback The callback to register.
 */
export const onWillReset = (callback) => {
  addCallback(constants.EVENT_WILL_RESET, callback);
};

/**
 * Registers a callback to execute after the history has been reset.
 * @param {Function} callback The callback to register.
 */
export const onDidReset = (callback) => {
  addCallback(constants.EVENT_DID_RESET, callback);
};
