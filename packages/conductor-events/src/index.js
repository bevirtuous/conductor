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
 * Registers a callback to the push event.
 * @param {Function} callback The callback to register.
 */
export const onPush = (callback) => {
  addCallback(constants.EVENT_DID_PUSH, callback);
};

/**
 * Registers a callback to the pop event.
 * @param {Function} callback The callback to register.
 */
export const onPop = (callback) => {
  addCallback(constants.EVENT_DID_POP, callback);
};

/**
 * Registers a callback to the replace event.
 * @param {Function} callback The callback to register.
 */
export const onReplace = (callback) => {
  addCallback(constants.EVENT_DID_REPLACE, callback);
};
