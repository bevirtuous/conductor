import * as events from '../constants';
import addCallback from './addCallback';

export { addCallback };

/**
 * Registers a callback to be executed after the push event.
 * @param {Function} callback The callback to register.
 */
export const onPush = (callback) => {
  addCallback(events.ON_PUSH, callback);
};

/**
 * Registers a callback to be executed after the pop event.
 * @param {Function} callback The callback to register.
 */
export const onPop = (callback) => {
  addCallback(events.ON_POP, callback);
};

/**
 * Registers a callback to be executed after the replace event.
 * @param {Function} callback The callback to register.
 */
export const onReplace = (callback) => {
  addCallback(events.ON_REPLACE, callback);
};

/**
 * Registers a callback to be executed after the history has been reset.
 * @param {Function} callback The callback to register.
 */
export const onReset = (callback) => {
  addCallback(events.ON_RESET, callback);
};

/**
 * Registers a callback to be executed after the update event.
 * @param {Function} callback The callback to register.
 */
export const onUpdate = (callback) => {
  addCallback(events.ON_UPDATE, callback);
};
