import uuid from 'uuid/v4';
import queryString from 'query-string';
import UrlPattern from 'url-pattern';
import cloneDeep from 'lodash/cloneDeep';
import matcher from './matcher';
import history from './history';
import emitter from './emitter';
import * as constants from './constants';

/**
 * The conductor class.
 */
export class Conductor {
  /**
   * Constructor
   */
  constructor() {
    /**
     * Contains the templates for each route. Includes the
     * route pattern, component definition and a matching function.
     * @type {Object}
     */
    this.routes = {};

    /**
     * Contains the cached routes matching the route templates.
     * @type {Array}
     */
    this.stack = [];

    this.conductorEvent = false;
    this.silentMode = false;

    history.listen(this.handleHistoryEvent);
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
      if (!this.conductorEvent) {
        this.pop(1, false);
      }

      if (!this.silentMode) {
        this.didPop(location);
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

    this.routes[pattern] = {
      match: matcher(pattern),
      pattern,
    };
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

    this.doMatchLoop(url, route => this.willPush(pathname, options, route));
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
    history.push(pathname, {
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
   */
  pop = (steps = 1, navigate = true, silent = false) => {
    if (!this.stack.length) {
      return;
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
      history.go(-steps);
    }
  }

  /**
   * Emits an event after a POP occured.
   * @param {Object} location The current history entry.
   */
  didPop = (location) => {
    this.sendEvent(constants.EVENT_DID_POP, location.state.id);
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
    history.replace(pathname, {
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
      pathname,
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

    this.stack = cloneDeep(this.stack);

    this.sendEvent(constants.EVENT_UPDATE, id);
  }
}

export default new Conductor();
