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

    this.action = constants.ACTION_PUSH;

    // Unsubscribe to any other history module changes.
    if (typeof this.historyListener === 'function') {
      this.historyListener();
      stack.clear();
    }

    // 
    this.addInitialRoute();

    this.historyListener = this.history.listen(this.handleNativeEvent);
  }

  /**
   * 
   */
  handleNativeEvent = (location, action) => {
    if (!this.nativeEvent) {
      return;
    }

    const next = stack.getByIndex(this.routeIndex + 1);

    if (next && location.state && location.state.route && next.id === location.state.route.id) {
      this.handlePush({
        pathname: location.pathname,
        state: location.state,
      }, false);

      return;
    }

    if (action === constants.ACTION_POP) {
      this.handlePop();
    }
  }

  /**
   * Populate the stack with an initial entry to match the history module.
   * Note: we cannot match it against a pattern at this point.
   */
  addInitialRoute = () => {
    const { hash, pathname, search } = this.history.location;
    const fullPathname = `${pathname}${search}${hash}`;
    const id = uuid();
    stack.add(id, new Route({ id, pathname: fullPathname }));
  }

  /**
   * @param {Object} params The router action params.
   * @returns {Promise}
   */
  handlePop = (params = {}) => {
    return new Promise((resolve, reject) => {
      const {
        emitBefore = true,
        emitAfter = true,
        steps = 1,
        state = null,
      } = params;
      let unlisten = null;
      const { size } = stack.getAll();

      if (size < 2) {
        reject(new Error(errors.ESTACKLENGTH));
        this.nativeEvent = true;
        return;
      }

      if (steps <= 0) {
        reject(new Error(errors.EINVALIDSTEPS));
        this.nativeEvent = true;
        return;
      }

      // Get id of target route.
      const targetIndex = Math.max(this.routeIndex - steps, 0);
      const prev = stack.getByIndex(this.routeIndex);
      const next = stack.getByIndex(targetIndex);
      const end = { prev, next };

      // Emit creation event.
      if (emitBefore) {
        emitter.emit(constants.EVENT_WILL_POP, end);
      }

      if (state) {
        next.state = Object.assign(next.state, state);
      }

      /**
       * 
       */
      const callback = () => {
        unlisten();
        this.routeIndex = targetIndex;
        this.action = constants.ACTION_POP;

        if (emitAfter) {
          emitter.emit(constants.EVENT_DID_POP, end);
        }

        resolve(end);
        this.nativeEvent = true;
        this.routing = false;
      };

      /**
       * Create a reference to the history listener
       * to be able to unsubscribe from inside the callback.
       */
      unlisten = this.history.listen(callback);

      // Perform the history back action.
      if (!this.nativeEvent) {
        this.history.go(steps * -1);
      } else {
        callback();
      }
    });
  }

  /**
   * @param {Object} params The params to use when navigating.
   * @returns {Promise}
   */
  handlePush(params, override = true) {
    return new Promise((resolve, reject) => {
      // Check for missing parameters.
      if (!params) {
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

      const {
        emitBefore = true,
        emitAfter = true,
        pathname,
        state,
      } = params;
      const pattern = this.findPattern(pathname.split('?')[0]);
      let unlisten = null;

      if (!pattern) {
        reject(new Error(errors.EINVALIDPATHNAME));
        this.nativeEvent = true;
        return;
      }

      // Block further router actions until this Promise has been returned.
      this.routing = true;

      // Remove all unwanted items from the stack.
      if (override) {
        while (this.routeIndex < stack.getAll().size - 1) {
          const [id] = stack.last();
          stack.remove(id);
        }
      }

      const id = uuid();
      const { transform } = this.patterns[pattern];
      const prev = stack.getByIndex(this.routeIndex);
      const next = new Route({
        id,
        pathname,
        pattern,
        state,
        transform,
      });

      // Add item to the stack
      stack.add(id, next);

      // Emit creation event.
      if (emitBefore) {
        emitter.emit(constants.EVENT_WILL_PUSH, { prev, next });
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

        this.action = constants.ACTION_PUSH;

        // Emit completion event.
        if (emitAfter) {
          emitter.emit(constants.EVENT_DID_PUSH, { prev, next });
        }

        // Resolve the Promise.
        resolve({ prev, next });
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
          state: {
            ...state,
            route: { id },
          },
        });
      } else {
        callback();
      }
    });
  }

  /**
   * Match the given pathname to a registered pattern.
   * @param {string} pathname The pathname to match.
   * @returns {string|null}
   */
  findPattern = (pathname) => {
    const pattern = Object.keys(this.patterns).find(key => this.patterns[key].match(pathname));
    return pattern || null;
  }

  /**
   * Registers a route pattern to match new pathnames against.
   * @param {string} pattern The pattern to register.
   * @param {Function} transform The route transformer.
   */
  // TODO: convert to Promise
  register = (pattern, transform = null) => {
    if (!pattern) {
      throw new Error(errors.EMISSINGPATTERN);
    }

    if (typeof pattern !== 'string') {
      throw new Error(errors.EINVALIDPATTERN);
    }

    // 
    const match = matcher(pattern);

    // 
    this.patterns[pattern] = {
      match,
      transform,
    };

    // Find the pathname of the first route.
    const [, route] = stack.first();

    // If it has been set then we don't need to match it.
    if (route.pattern !== null) {
      return;
    }

    // 
    if (match(route.pathname)) {
      route.setPattern(pattern);

      const end = { prev: null, next: route };

      emitter.emit(constants.EVENT_WILL_PUSH, end);
      emitter.emit(constants.EVENT_DID_PUSH, end);
    }
  }

  handleReplace = (params) => {
    return new Promise((resolve, reject) => {
      // Check for missing parameters.
      if (!params) {
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

      const {
        emitBefore = true,
        emitAfter = true,
        pathname,
        state,
      } = params;
      const pattern = this.findPattern(pathname.split('?')[0]);
      let unlisten = null;

      if (!pattern) {
        reject(new Error(errors.EINVALIDPATHNAME));
        this.nativeEvent = true;
        return;
      }

      // Block further router actions until this Promise has been returned.
      this.routing = true;

      const { id } = stack.getByIndex(this.routeIndex);
      const { transform } = this.patterns[pattern];
      const prev = stack.get(id);
      const next = new Route({
        id,
        pathname,
        pattern,
        state,
        transform,
      });
      const end = { prev, next };

      // Add item to the stack
      stack.add(id, next);

      // Emit creation event.
      if (emitBefore) {
        emitter.emit(constants.EVENT_WILL_REPLACE, end);
      }

      /**
       * The history event callback.
       */
      const callback = () => {
        // Unsubscribe from the history events.
        unlisten();

        this.action = constants.ACTION_REPLACE;

        // Emit completion event.
        if (emitAfter) {
          emitter.emit(constants.EVENT_DID_REPLACE, end);
        }

        resolve(end);
        this.nativeEvent = true;
        this.routing = false;
      };

      /**
       * Create a reference to the history listener
       * to be able to unsubscribe from inside the callback.
       */
      unlisten = this.history.listen(callback);

      // Perform the history replace action.
      if (!this.nativeEvent) {
        this.history.replace({
          pathname,
          state: {
            ...state,
            route: { id },
          },
        });
      } else {
        callback();
      }
    });
  }

  /**
   * @param {Object} params The params when routing.
   * @returns {Promise}
   */
  push = (params) => {
    this.nativeEvent = false;
    return this.handlePush(params);
  }

  /**
   * @param {Object} params The params when routing.
   * @returns {Promise}
   */
  pop = (params) => {
    this.nativeEvent = false;
    return this.handlePop(params);
  }

  /**
   * @param {Object} params The params when routing.
   * @returns {Promise}
   */
  replace = (params) => {
    this.nativeEvent = false;
    return this.handleReplace(params);
  }

  /**
   * 
   */
  reset = () => {
    return new Promise((resolve, reject) => {
      const { size } = stack.getAll();
      const [, route] = stack.first();

      const prev = stack.getByIndex(this.routeIndex);
      const end = {
        prev,
        next: route,
      };

      if (size === 1) {
        // TODO: Add error
        reject();
        return;
      }

      emitter.emit(constants.EVENT_WILL_RESET, end);

      this.pop({
        emitBefore: false,
        emitAfter: false,
        steps: size,
      }).then(() => {
        emitter.emit(constants.EVENT_DID_RESET, end);
        resolve(end);
      });
    });
  }

  /**
   * @param {string} pathname The pathname to reset to.
   * @returns {Promise}
   */
  resetTo = (pathname) => {
    return new Promise((resolve, reject) => {
      if (!pathname) {
        reject(new Error(errors.EMISSINGPATHNAME));
        return;
      }

      if (!this.findPattern(pathname)) {
        reject(new Error(errors.EINVALIDPATHNAME));
        return;
      }

      const id = uuid();
      const prev = stack.getByIndex(this.routeIndex);
      const next = new Route({ id, pathname });
      const end = { prev, next };

      emitter.emit(constants.EVENT_WILL_RESET, end);
      stack.reset([id, next]);
      emitter.emit(constants.EVENT_DID_RESET, end);

      resolve(end);
    });
  }

  /**
   * 
   */
  update = (id, state = {}, emit = true) => {
    return new Promise((resolve, reject) => {
      //
      if (!id || Object.keys(state).length === 0) {
        reject(new Error(errors.EPARAMSINVALID));
        return;
      }

      const route = stack.get(id);

      if (!route) {
        reject(new Error(errors.EINVALIDID));
        return;
      }

      route.state = {
        ...route.state,
        ...state,
      };
      route.updated = Date.now();

      stack.update(id, route);

      if (emit) {
        emitter.emit(constants.EVENT_UPDATE, route);
      }

      resolve(route);
    });
  }

  // TODO: Add deprecation warning
  getCurrentRoute = () => (
    stack.getByIndex(this.routeIndex)
  )
}

export default new Router();
