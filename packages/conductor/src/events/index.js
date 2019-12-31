import * as events from '../constants';
import addCallback from './addCallback';

export { addCallback };

/**
 * Registers a callback to be executed after the push event.
 * @param {Function} callback The callback to register.
 */
export const onDidPush = (callback) => {
  addCallback(events.EVENT_DID_PUSH, callback);
};

/**
 * Registers a callback to be executed after the pop event.
 * @param {Function} callback The callback to register.
 */
export const onDidPop = (callback) => {
  addCallback(events.EVENT_DID_POP, callback);
};

/**
 * Registers a callback to be executed after the replace event.
 * @param {Function} callback The callback to register.
 */
export const onDidReplace = (callback) => {
  addCallback(events.EVENT_DID_REPLACE, callback);
};

/**
 * Registers a callback to be executed after the history has been reset.
 * @param {Function} callback The callback to register.
 */
export const onDidReset = (callback) => {
  addCallback(events.EVENT_DID_RESET, callback);
};

/**
 * Registers a callback to be executed after the update event.
 * @param {Function} callback The callback to register.
 */
export const onUpdate = (callback) => {
  addCallback(events.EVENT_UPDATE, callback);
};
