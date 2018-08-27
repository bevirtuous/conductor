import uuid from 'uuid/v4';
import * as errors from './errors';
import history from '../history';
import matcher from '../matcher';
import {
  ACTION_PUSH,
} from '../constants';

/**
 *
 */
class Router {
  /**
   *
   */
  constructor() {
    /**
     * The patterns are collected to match pathnames.
     */
    this.patterns = {};

    /**
     * Flag to indicate whether or not there is an ongoing history change.
     */
    this.routing = false;

    /**
     * The `routeIndex` is used to track which route is the current route.
     */
    this.routeIndex = 1;
  }

  /**
   * @param {string} action The intended history action.
   * @param {Object} params The params to use when navigating.
   * @returns {Promise}
   */
  navigate(action, params) {
    return new Promise((resolve, reject) => {
      /**
       * Check for missing parameters.
       */
      if (!action || !params) {
        reject(new Error(errors.EPARAMSMISSING));
        return;
      }

      /**
       * Check for empty params.
       */
      if (Object.keys(params).length === 0) {
        reject(new Error(errors.EPARAMSEMPTY));
        return;
      }

      /**
       * Check for ongoing router action.
       */
      if (this.routing) {
        reject(new Error('Error'));
        return;
      }

      /**
       * Block further router actions until this Promise has been returned.
       */
      this.routing = true;

      const id = uuid();
      const { pathname, state } = params;
      let unlisten = null;

      // TODO: Emit willPush event

      /**
       * The history event callback.
       */
      const callback = () => {
        // Unsubscribe from the history events.
        unlisten();

        // Increment the route index.
        this.routeIndex += 1;

        // TODO: Emit didPush event

        // Resolve the Promise with the new id.
        resolve(id);
      };

      /**
       * Create a reference to the hitory listener
       * to be able to unsubscribe inside the callback.
       */
      unlisten = history.listen(callback);

      // Add route to the stack

      /**
       * Perform the history push action.
       */
      history.push({
        pathname,
        state,
      });
    });
  }

  /**
   * @param {string} pattern The pattern to register.
   */
  register = (pattern) => {
    if (!pattern) {
      throw new Error(errors.EMISSINGPATTERN);
    }

    if (typeof pattern !== 'string') {
      throw new Error(errors.EINVALIDPATTERN);
    }

    const match = matcher(pattern);

    this.patterns[pattern] = match;
  }

  /**
   * 
   * @param {*} params 
   */
  push = (params) => {
    return this.navigate(ACTION_PUSH, params);
  }
}

export default new Router();
