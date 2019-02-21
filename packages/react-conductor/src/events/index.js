import { addCallback } from '@virtuous/conductor';
import * as events from '../constants';

/**
 * @param {Function} callback The callback to register.
 */
export const onWillEnter = (callback) => {
  addCallback(events.EVENT_WILL_ENTER, callback);
};

/**
 * @param {Function} callback The callback to register.
 */
export const onDidEnter = (callback) => {
  addCallback(events.EVENT_DID_ENTER, callback);
};

/**
 * @param {Function} callback The callback to register.
 */
export const onWillLeave = (callback) => {
  addCallback(events.EVENT_WILL_LEAVE, callback);
};

/**
 * @param {Function} callback The callback to register.
 */
export const onDidLeave = (callback) => {
  addCallback(events.EVENT_DID_LEAVE, callback);
};
