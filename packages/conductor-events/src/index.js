import {
  EVENT_ERROR,
  EVENT_WILL_PUSH,
  EVENT_DID_PUSH,
  EVENT_WILL_POP,
  EVENT_DID_POP,
  EVENT_WILL_REPLACE,
  EVENT_DID_REPLACE,
  EVENT_WILL_RESET,
  EVENT_DID_RESET,
} from '@virtuous/conductor/constants';
import addCallback from './addCallback';

/**
 * Registers a callback to be executed after the error event.
 * @param {Function} callback The callback to register.
 */
export const onError = (callback) => {
  addCallback(EVENT_ERROR, callback);
};

/**
 * Registers a callback to be executed before the push event.
 * @param {Function} callback The callback to register.
 */
export const onWillPush = (callback) => {
  addCallback(EVENT_WILL_PUSH, callback);
};

/**
 * Registers a callback to be executed after the push event.
 * @param {Function} callback The callback to register.
 */
export const onDidPush = (callback) => {
  addCallback(EVENT_DID_PUSH, callback);
};

/**
 * Registers a callback to be executed before the pop event.
 * @param {Function} callback The callback to register.
 */
export const onWillPop = (callback) => {
  addCallback(EVENT_WILL_POP, callback);
};

/**
 * Registers a callback to be executed after the pop event.
 * @param {Function} callback The callback to register.
 */
export const onDidPop = (callback) => {
  addCallback(EVENT_DID_POP, callback);
};

/**
 * Registers a callback to be executed before the push event.
 * @param {Function} callback The callback to register.
 */
export const onWillReplace = (callback) => {
  addCallback(EVENT_WILL_REPLACE, callback);
};

/**
 * Registers a callback to be executed after the replace event.
 * @param {Function} callback The callback to register.
 */
export const onDidReplace = (callback) => {
  addCallback(EVENT_DID_REPLACE, callback);
};

/**
 * Registers a callback to be executed before the history has been reset.
 * @param {Function} callback The callback to register.
 */
export const onWillReset = (callback) => {
  addCallback(EVENT_WILL_RESET, callback);
};

/**
 * Registers a callback to be executed after the history has been reset.
 * @param {Function} callback The callback to register.
 */
export const onDidReset = (callback) => {
  addCallback(EVENT_DID_RESET, callback);
};
