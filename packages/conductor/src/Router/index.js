import uuid from 'uuid/v4';
import Route from '../Route';
import * as errors from './errors';
import emitter from '../emitter';
import history from '../history';
import matcher from '../matcher';
import stack from '../Stack';
import * as constants from '../constants';

/**
 * The Router class.
 */
class Router {
  /**
   * TODO:
   */
  constructor(createHistory = history) {
    // Flag to indicate a native history event. Should always be reset to true.
    this.nativeEvent = true;

    this.history = createHistory();

    // The patterns are collected to match against pathnames.
    this.patterns = {};

    // Flag to indicate whether or not there is an ongoing history change.
    this.routing = false;

    // The `routeIndex` is used to track which stack entry is the current route.
    this.routeIndex = 0;

    // 
    this.addInitialRoute();

    // 
    this.history.listen(this.handleNativeEvent);
  }

  /**
   * 
   */
  handleNativeEvent = (location, action) => {
    if (!this.nativeEvent) {
      return;
    }

    if (action === constants.ACTION_PUSH) {
      this.push({
        pathname: location.pathname,
        state: location.state,
      });
    }
  }

  /**
   * Populate the stack with an initial entry to match the history module.
   * Note: we cannot match it against a pattern at this point.
   */
  addInitialRoute = () => {
    const { pathname } = this.history.location;
    const id = uuid();
    stack.add(id, new Route({ id, pathname }));
  }

  /**
   * 
   */
  pop = (params = {}) => {
    return new Promise((resolve, reject) => {
      const {
        emitBefore = true,
        emitAfter = true,
        nativeEvent = false,
        steps = 1,
      } = params;
      let unlisten = null;
      const { size } = stack.getAll();

      if (size < 2) {
        reject(new Error(errors.ESTACKLENGTH));
        return;
      }

      if (steps <= 0) {
        reject(new Error(errors.EINVALIDSTEPS));
        return;
      }

      // If steps is negative, stick at 0
      // If steps is positive, stick at stack length

      // Get id of target route.
      const targetIndex = Math.max(this.routeIndex - steps, 0);
      const { id } = stack.getByIndex(targetIndex);

      // Emit creation event.
      if (emitBefore) {
        emitter.emit(constants.EVENT_WILL_POP, id);
      }

      /**
       * 
       */
      const callback = () => {
        unlisten();
        this.routeIndex = targetIndex;

        if (emitAfter) {
          emitter.emit(constants.EVENT_DID_POP, id);
        }
        resolve(id);
      };

      /**
       * Create a reference to the history listener
       * to be able to unsubscribe from inside the callback.
       */
      unlisten = this.history.listen(callback);

      // Perform the history pop action.
      if (!nativeEvent) {
        this.history.go(-1);
      }
    });
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
        // TODO: create real error
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
        return;
      }

      // Block further router actions until this Promise has been returned.
      this.routing = true;

      // Add item to the stack
      stack.add(id, new Route({
        id,
        pathname,
        pattern,
      }));

      // Emit creation event.
      if (emitBefore) {
        emitter.emit(constants.EVENT_WILL_PUSH, id);
      }

      /**
       * TODO: move to class function with params
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
        this.routing = false;
      };

      /**
       * Create a reference to the history listener
       * to be able to unsubscribe from inside the callback.
       */
      unlisten = this.history.listen(callback);

      // Perform the history push action.
      if (!this.nativeEvent) {
        this.history.push({
          pathname,
          state,
        });
      }
    });
  }

  /**
   * Match the given pathname to a registered pattern.
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

    // 
    const match = matcher(pattern);

    // 
    this.patterns[pattern] = match;

    // Find the pathname of the first route.
    const [, route] = stack.first();

    // If it has been set then we don't need to match it.
    if (route.pattern !== null) {
      return;
    }

    // 
    if (match(route.pathname)) {
      route.setPattern(pattern);
    }
  }

  /**
   * @param {Object} params The params when routing.
   * @returns {Promise}
   */
  push = (params) => {
    this.nativeEvent = false;
    return this.navigate(constants.ACTION_PUSH, params);
  }
}

export default new Router();
