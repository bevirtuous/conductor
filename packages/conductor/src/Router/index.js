import Route from '../Route';
import * as errors from './errors';
import emitter from '../emitter';
import history from '../history';
import matcher from '../matcher';
import stack from '../Stack';
import * as constants from '../constants';

class Router {
  /**
   * @param {Function} createHistory The function to create a history instance.
   */
  constructor(createHistory = history) {
    // Flag to indicate a native history event. Should always be reset to true.
    this.nativeEvent = true;

    this.history = createHistory();

    // The patterns are collected to match against pathnames.
    this.patterns = {};

    // The `routeIndex` is used to track which stack entry is the current route.
    this.routeIndex = 0;

    this.action = constants.PUSH;

    // Unsubscribe to any other history module changes.
    if (typeof this.historyListener === 'function') {
      this.historyListener();
      stack.clear();
    }

    this.addInitialRoute();

    this.historyListener = this.history.listen(this.handleNativeEvent);
  }

  /**
   * @param {string} location The new history location.
   * @param {string} action The most recent history action.
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
      }, false, true);

      return;
    }

    if (action === constants.POP) {
      this.handlePop();
    }
  }

  /**
   * @returns {string}
   */
  createId = () => (
    Math.random().toString(36).substr(2, 5)
  );

  /**
   * Populate the stack with an initial entry to match the history module.
   * Note: we cannot match it against a pattern at this point.
   */
  addInitialRoute = () => {
    const { hash, pathname, search } = this.history.location;
    const fullPathname = `${pathname}${search}${hash}`;
    const id = this.createId();
    stack.add(id, new Route({ id, pathname: fullPathname }));
  }

  /**
   * @param {Object} params The router action params.
   * @returns {Promise}
   */
  handlePop = (params = {}) => new Promise((resolve, reject) => {
    const {
      emit = true,
      forceNative = false,
      steps = 1,
      state = null,
    } = params;
    let unlisten = null;

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

    if (state) {
      next.state = Object.assign(next.state, state);
    }

    /**
     *
     */
    const callback = () => {
      unlisten();
      this.routeIndex = targetIndex;
      this.action = constants.POP;

      if (emit) {
        emitter.emit(constants.ON_POP, end);
      }

      resolve(end);
      this.nativeEvent = true;
    };

    /**
     * Create a reference to the history listener
     * to be able to unsubscribe from inside the callback.
     */
    unlisten = this.history.listen(callback);

    // Perform the history back action.
    if (forceNative || !this.nativeEvent) {
      this.history.go(steps * -1);
    } else {
      callback();
    }
  });

  /**
   * @param {Object} params The params to use when navigating.
   * @param {boolean} [cleanStack=true] When true, the overhanging routes will be removed.
   * @param {boolean} [nativePush=false] When true, the process of adding a route to
   * the stack is skipped.
   * @returns {Promise}
   */
  handlePush(params, cleanStack = true, nativePush = false) {
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

      const {
        emit = true,
        pathname,
        state,
      } = params;
      const pattern = this.findPattern(pathname.split('?')[0]);
      let unlisten = null;

      // Remove all unwanted items from the stack.
      if (cleanStack) {
        while (this.routeIndex < stack.getAll().size - 1) {
          const [id] = stack.last();
          stack.remove(id);
        }
      }

      const id = this.createId();
      const { transform } = pattern ? this.patterns[pattern] : {};
      const prev = stack.getByIndex(this.routeIndex);
      const next = nativePush ? stack.getByIndex(this.routeIndex + 1) : new Route({
        id,
        pathname,
        pattern,
        state,
        transform,
      });

      if (!nativePush) {
        // Add item to the stack
        stack.add(id, next);
      }

      /**
       * The history event callback.
       */
      const callback = () => {
        // Unsubscribe from the history events.
        unlisten();

        // Increment the route index.
        this.routeIndex += 1;

        this.action = constants.PUSH;

        // Emit completion event.
        if (emit) {
          emitter.emit(constants.ON_PUSH, { prev, next });
        }

        // Resolve the Promise.
        resolve({ prev, next });
        this.nativeEvent = true;
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
  register = (pattern, transform = null) => {
    if (!pattern) {
      throw new Error(errors.EMISSINGPATTERN);
    }

    if (typeof pattern !== 'string') {
      throw new Error(errors.EINVALIDPATTERN);
    }

    const match = matcher(pattern);

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
      route.setPattern(pattern, transform);

      const end = { prev: null, next: route };

      emitter.emit(constants.ON_PUSH, end, true);
    }
  }

  deregister = (pattern) => {
    delete this.patterns[pattern];
  }

  handleReplace = params => new Promise((resolve, reject) => {
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

    const {
      emit = true,
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

    /**
     * The history event callback.
     */
    const callback = () => {
      // Unsubscribe from the history events.
      unlisten();

      this.action = constants.REPLACE;

      // Emit completion event.
      if (emit) {
        emitter.emit(constants.ON_REPLACE, end);
      }

      resolve(end);
      this.nativeEvent = true;
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
  })

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
   * @param {Object} [state=null] The new state of the first route.
   * @returns {Promise}
   */
  reset = (state = null) => new Promise((resolve, reject) => {
    const [, route] = stack.first();

    const prev = stack.getByIndex(this.routeIndex);
    const next = {
      prev,
      next: route,
    };

    if (this.routeIndex === 0) {
      return reject();
    }

    if (state) {
      this.update(route.id, state, false);
    }

    const params = {
      emit: false,
      forceNative: true,
      steps: this.routeIndex,
    };

    return this.handlePop(params)
      .then(() => {
        emitter.emit(constants.ON_RESET, next);
        resolve(next);
      });
  });

  /**
   * @param {string} pathname The pathname to reset to.
   * @param {Object} [state={}] The state of the new route.
   * @returns {Promise}
   */
  resetTo = (pathname, state = {}) => new Promise((resolve, reject) => {
    // Missing pathname.
    if (!pathname) {
      reject(new Error(errors.EMISSINGPATHNAME));
      return;
    }

    // Ensure that the pathname matches a registered pattern.
    if (!this.findPattern(pathname)) {
      reject(new Error(errors.EINVALIDPATHNAME));
      return;
    }

    if (this.routeIndex === 0) {
      reject();
      return;
    }

    const previous = this.getCurrentRoute();
    const popParams = {
      emit: false,
      forceNative: true,
      steps: this.routeIndex,
    };

    this.handlePop(popParams).then(() => {
      this.handleReplace({ pathname, state }).then(() => {
        const [, route] = stack.first();
        const next = {
          prev: previous,
          next: route,
        };

        emitter.emit(constants.ON_RESET, next);
        resolve(next);
      });
    });
  });

  /**
   * @param {string} id The route id to update.
   * @param {Object} state The new state.
   * @param {boolean} emit When true, will emit when the state was updated.
   * @returns {Promise}
   */
  update = (id, state = {}, emit = true) => new Promise((resolve, reject) => {
    if (!id || Object.keys(state).length === 0) {
      reject(new Error(errors.EPARAMSINVALID));
      return;
    }

    const route = stack.get(id);

    if (!route) {
      reject(new Error(errors.EINVALIDID));
      return;
    }

    route.state = Object.assign(route.state, state);
    route.updated = Date.now();

    stack.update(id, route);

    if (emit) {
      emitter.emit(constants.ON_UPDATE, route);
    }

    resolve(route);
  });

  /**
   * @returns {Route}
   */
  getCurrentRoute = () => stack.getByIndex(this.routeIndex)

  /**
   * Returns the matches pattern for the given pathname.
   * @param {string} pathname The pathname to match.
   * @returns {string|null}
   */
  match = (pathname = null) => {
    let foundPattern = false;

    if (!pathname) {
      return false;
    }

    Object.entries(this.patterns).some(([pattern, properties]) => {
      if (properties.match(pathname)) {
        foundPattern = pattern;
        return true;
      }

      return false;
    });

    return foundPattern;
  }

  /**
   * Return true when the given pathname matches
   * the given pattern.
   * @param {string} pattern The pathname to match against.
   * @param {string} pathname The pathname to match.
   * @returns {boolean}
   */
  matches = (pattern = null, pathname = null) => {
    if (!pattern || !pathname) {
      return false;
    }

    if (!(pattern in this.patterns)) {
      return false;
    }

    return !!this.patterns[pattern].match(pathname);
  }
}

export default new Router();
