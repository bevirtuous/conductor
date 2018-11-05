import uuid from 'uuid/v4';
import queryString from 'query-string';
import UrlPattern from 'url-pattern';
import matcher from './matcher';
import history from './history';
import emitter from './emitter';
import * as constants from './constants';

let historyListener;

/**
 * The Conductor class.
 */
export class Conductor {
  /**
   * Constructor
   */
  constructor(customHistory = null) {
    /**
     * Contains the templates for each route. Includes the
     * route pattern, component definition and a matching function.
     * @type {Object}
     */
    this.routes = {};
    this.history = customHistory || history;

    /**
     * Contains the active history stack.
     * @type {Array}
     */
    this.stack = [{
      id: uuid(),
      params: null,
      pathname: this.history.location.pathname,
      pattern: null,
      query: queryString.parseUrl(this.history.location.search).query,
      state: {},
      created: Date.now(),
      updated: null,
    }];

    this.conductorEvent = false;
    this.silentMode = false;
    this.syncedWithHistory = false;

    if (typeof historyListener === 'function') {
      historyListener();
    }

    historyListener = this.history.listen(this.handleHistoryEvent);
  }

  /**
   * Sends and error event and throws an error.
   * @param {string} message The error message.
   */
  throwError = (message) => {
    const error = new Error(message);
    emitter.emit(constants.EVENT_ERROR, error);
  }

  /**
   * Sends an event on router action.
   */
  sendEvent = (...args) => {
    setTimeout(() => emitter.emit(...args), 0);
  }

  /**
   * Gets called when the history triggers any event.
   * @param {Object} location The current history location.
   * @param {string} action The executed action.
   */
  handleHistoryEvent = (location, action) => {
    // TODO: consider a switch case
    if (action === constants.ACTION_POP) {
      /**
       * Flag to know if a pop happened.
       */
      let popped;

      /**
       * Native back event, try to pop.
       */
      if (!this.conductorEvent) {
        popped = this.pop(1, false);
      }

      if (this.conductorEvent && !this.silentMode) {
        this.didPop();
      } else if (!this.conductorEvent && popped) {
        this.didPop();
      }
    } else if (action === constants.ACTION_PUSH) {
      if (!this.silentMode) {
        this.didPush(location);
      }
    } else if (action === constants.ACTION_REPLACE) {
      if (!this.silentMode) {
        this.didReplace(location);
      }
    }

    this.silentMode = false;
    this.conductorEvent = false;
  }

  /**
   * Registers a route with the router. Routed need to be registered
   * here to be considered when determining what the current route is.
   * @param {string} pattern The URL pattern.
   */
  register = (pattern) => {
    if (!pattern || typeof pattern !== 'string') {
      this.throwError('You can\'t register a route without a pattern!');
      return;
    }

    const match = matcher(pattern);

    this.routes[pattern] = {
      match,
      pattern,
    };

    if (this.syncedWithHistory) {
      return;
    }

    // Take the pathname of the first route and try to match it.
    const { id, pathname } = this.stack[0];

    if (match(pathname)) {
      const urlPattern = new UrlPattern(pattern);

      this.syncedWithHistory = true;
      this.stack[0].pattern = pattern;
      this.stack[0].params = urlPattern.match(pathname) || {};

      this.sendEvent(constants.EVENT_WILL_PUSH, id);
      this.sendEvent(constants.EVENT_DID_PUSH, id);
    }
  }

  /**
   * Push a path into the history stack.
   * @param {string} pathname The pathname of the new route.
   * @param {string} options A state object to associate with this history entry.
   * @param {boolean} silent Whather or not to navigate without emitting events.
   */
  push = (pathname, options = {}, silent = false) => {
    this.silentMode = silent;

    const { url } = queryString.parseUrl(pathname);

    this.doMatchLoop(url, route => this.willPush(pathname, options, route, url));
  }

  /**
   * Handles the push action.
   * @param {string} pathname The pathname to push.
   * @param {Object} options The push state options.
   * @param {Object} route The route definition.
   */
  willPush = (pathname, options, route) => {
    const id = uuid();

    // Emit the willEnter life cycle event.
    if (!this.silentMode) {
      this.sendEvent(constants.EVENT_WILL_PUSH, id);
    }

    // Cache the new route.
    this.addToStack(pathname, route, id, options);

    // Update internal flag.
    this.conductorEvent = true;

    // Call the history action.
    this.history.push(pathname, {
      ...options,
      id,
    });
  }

  /**
   * Emits an event after a PUSH occured.
   * @param {Object} location The current history entry.
   */
  didPush = (location) => {
    this.sendEvent(constants.EVENT_DID_PUSH, location.state.id);
  }

  /**
   * Go back in history. Remove the route entries from the stacks.
   * @param {number} steps The number of steps to pop.
   * @param {boolean} navigate Whether or not to perform the history action.
   * @param {boolean} silent Whather or not to navigate without emitting events.
   * @returns {boolean}
   */
  pop = (steps = 1, navigate = true, silent = false) => {
    /**
     * Do not pop when the history stack has 0 or 1 entry.
     */
    if (this.stack.length < 2) {
      return false;
    }

    /**
     * Do not pop when the number of steps exceeds the stack length.
     */
    if ((this.stack.length) <= steps) {
      return false;
    }

    this.silentMode = silent;

    // Grab the id from the last route in the stack.
    const { id } = this.stack[this.stack.length - 1];

    // Emit the willReplace life cycle event.
    if (!this.silentMode) {
      this.sendEvent(constants.EVENT_WILL_POP, id);
    }

    // Pop the stack.
    this.stack.length = this.stack.length - steps;

    // Update internal flags.
    this.conductorEvent = true;

    // Call the history action.
    if (navigate) {
      this.history.go(-steps);
    }

    return true;
  }

  /**
   * Emits an event after a POP occured.
   */
  didPop = () => {
    const { id } = this.stack[this.stack.length - 1];
    this.sendEvent(constants.EVENT_DID_POP, id);
  }

  /**
   * Replace a path in the history stack.
   * @param {string} pathname The pathname of the new route.
   * @param {string} options History options.
   * @param {boolean} silent Whather or not to navigate without emitting events.
   */
  replace = (pathname, options = {}, silent) => {
    this.silentMode = silent;

    const { url } = queryString.parseUrl(pathname);

    this.doMatchLoop(url, route => this.willReplace(pathname, options, route));
  }

  /**
   * Handles the replace action.
   * @param {string} pathname The pathname to push.
   * @param {Object} state The push state.
   * @param {Object} route The route definition.
   */
  willReplace = (pathname, state, { pattern }) => {
    if (this.stack.length === 0) {
      return;
    }

    const id = uuid();

    // Emit the willReplace life cycle event.
    if (!this.silentMode) {
      this.sendEvent(constants.EVENT_WILL_REPLACE, id);
    }

    const urlPattern = new UrlPattern(pattern);
    const { url, query } = queryString.parseUrl(pathname);

    // Replace the last cache entry with the given values.
    this.stack[this.stack.length - 1] = {
      id,
      params: urlPattern.match(url) || {},
      pathname,
      pattern,
      query,
      state,
    };

    // Update internal flag.
    this.conductorEvent = true;

    // Call the history action.
    this.history.replace(pathname, {
      ...state,
      id,
    });
  }

  /**
   * Emits an event after a REPLACE occured.
   * @param {Object} location The current history entry.
   */
  didReplace = (location) => {
    this.sendEvent(constants.EVENT_DID_REPLACE, location.state.id);
  }

  /**
   * Loop over the registered routes and try to match them against
   * the given pathname.
   * @param {string} pathname The pathname to match against.
   * @param {Function} callback The action to run when match.
   * @returns {boolean}
   */
  doMatchLoop = (pathname, callback) => (
    Object.keys(this.routes).some((definition) => {
      const route = this.routes[definition];

      // If there is no match then do nothing.
      if (!route.match(pathname)) {
        return false;
      }

      callback(route);
      return true;
    })
  )

  /**
   * Adds a new element to the cache stack.
   * @param {string} pathname The new pathname
   * @param {Object} route The route definition to store.
   * @param {Object} id The id for this route.
   * @param {Object} state The state for this route.
   */
  addToStack = (pathname, { pattern }, id, state) => {
    const urlPattern = new UrlPattern(pattern);
    const { url, query } = queryString.parseUrl(pathname);

    this.stack.push({
      id,
      params: urlPattern.match(url) || {},
      pathname: url,
      pattern,
      query,
      state,
      created: Date.now(),
      updated: null,
    });
  }

  reset = () => {
    // Don't reset if we are already on the first route.
    if (this.stack.length === 1) {
      return;
    }

    const { id } = this.stack[0];

    this.sendEvent(constants.EVENT_WILL_RESET, id);

    // Pop everything except for the first route.
    this.pop(this.stack.length - 1, true, true);

    this.sendEvent(constants.EVENT_DID_RESET, id);
  }

  /**
   * @param {number} id The id of the route to update.
   * @param {Object} state The new state for the route.
   */
  update = (id, state) => {
    if (!id || !state) {
      return;
    }

    // Find a matching route with the given id.
    const match = this.stack.find(item => item.id === id);

    if (!match) {
      return;
    }

    // TODO: Check if state objects are different

    const newState = {
      ...match.state,
      ...state,
    };

    match.state = newState;
    match.updated = Date.now();

    this.sendEvent(constants.EVENT_UPDATE, id);
  }
}

export default new Conductor();
