import uuid from 'uuid/v4';
import queryString from 'query-string';
import UrlPattern from 'url-pattern';
import * as errors from './errors';
import emitter from '../emitter';
import history from '../history';
import matcher from '../matcher';
import stack from '../Stack';
import * as constants from '../constants';

/**
 *
 */
class Router {
  /**
   *
   */
  constructor() {
    // Flag to indicate a native history event. Should always be reset to true.
    this.nativeEvent = true;

    // The patterns are collected to match pathnames.
    this.patterns = {};

    // Flag to indicate whether or not there is an ongoing history change.
    this.routing = false;

    // The `routeIndex` is used to track which route is the current route.
    this.routeIndex = 1;

    this.addInitialRoute();

    // TODO: offset to a function
    history.listen((location, action) => {
      if (this.nativeEvent) {
        return;
      }

      if (action === constants.ACTION_PUSH) {
        this.push({
          pathname: location.pathname,
          state: location.state,
        });
      }
    });
  }

  /**
   * Populate the stack with an initial entry to match the history module.
   * Note: we cannot match it against a pattern at this point.
   */
  addInitialRoute = () => {
    const { pathname } = history.location;

    stack.add({
      id: uuid(),
      params: null,
      pathname,
      pattern: null,
      query: queryString.parseUrl(pathname).query,
      state: {},
      created: Date.now(),
      updated: null,
    });
  }

  /**
   * 
   */
  updateInitialRoute = () => {

  }

  /**
   * @param {string} action The intended history action.
   * @param {Object} params The params to use when navigating.
   * @returns {Promise}
   */
  navigate(action, params) {
    return new Promise((resolve, reject) => {
      // Check for missing parameters.
      if (!action || !params) {
        reject(new Error(errors.EPARAMSMISSING));
        this.nativeEvent = true;
        return;
      }

      // Check for empty params.
      if (Object.keys(params).length === 0) {
        reject(new Error(errors.EPARAMSEMPTY));
        this.nativeEvent = true;
        return;
      }

      // Check for ongoing router action.
      if (this.routing) {
        reject(new Error('Error'));
        this.nativeEvent = true;
        return;
      }

      const id = uuid();
      const {
        emitBefore = true,
        emitAfter = true,
        pathname,
        state,
      } = params;
      const pattern = this.findPattern(pathname);
      let unlisten = null;

      if (!pattern) {
        reject(new Error(errors.EINVALIDPATHNAME));
        this.nativeEvent = true;
      }

      // Block further router actions until this Promise has been returned.
      this.routing = true;

      //  Add item to the stack
      stack.add(id, this.createRoute(pathname, pattern));

      // Emit creation event.
      if (emitBefore) {
        emitter.emit(constants.EVENT_WILL_PUSH, id);
      }

      /**
       * The history event callback.
       */
      const callback = () => {
        // Unsubscribe from the history events.
        unlisten();

        // Increment the route index.
        this.routeIndex += 1;

        // Emit completion event.
        if (emitAfter) {
          emitter.emit(constants.EVENT_DID_PUSH, id);
        }

        // Resolve the Promise with the new id.
        resolve(id);
        this.nativeEvent = true;
      };

      /**
       * Create a reference to the hitory listener
       * to be able to unsubscribe from inside the callback.
       */
      unlisten = history.listen(callback);

      // Perform the history push action.
      if (!this.nativeEvent) {
        history.push({
          pathname,
          state,
        });
      }
    });
  }

  /**
   * Match the given athname to a registered pattern.
   * @param {string} pathname The pathname to match.
   * @returns {string|null}
   */
  findPattern = (pathname) => {
    const pattern = Object.keys(this.patterns).find(key => this.patterns[key](pathname));
    return pattern || null;
  }

  /**
   * Registers a route pattern to match new pathnames against.
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
   */
  createRoute = (pathname, pattern) => {
    if (!pathname) {
      return null;
    }

    return {
      id: uuid(),
      params: null,
      pathname: history.location.pathname,
      pattern,
      query: queryString.parseUrl(history.location.pathname).query,
      state: {},
      created: Date.now(),
      updated: null,
    };
  }

  /**
   * 
   * @param {*} params 
   */
  push = (params) => {
    this.nativeEvent = false;
    return this.navigate(constants.ACTION_PUSH, params);
  }
}

export default new Router();
