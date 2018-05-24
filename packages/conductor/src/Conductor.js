import uuid from 'uuid/v4';
import UrlPattern from 'url-pattern';
import matcher from './matcher';
import history from './history';
import emitter from './emitter';
import logger from './logger';
import * as constants from './constants';

/**
 * The Conductor class.
 */
class Conductor {
  /**
   * Constructor
   */
  constructor() {
    /**
     * Holds the current error object.
     * @type {Object|null}
     */
    this.error = null;

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

    history.listen(this.handleHistoryEvent);
  }

  /**
   * Sends and error event and throws an error.
   * @param {string} message The error message.
   */
  throwError(message) {
    // TODO: Probably doesn't have to be a class variable
    this.error = new Error(message);
    logger.error(this.error);
    emitter.emit(constants.EVENT_ERROR, this.error);
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
    const { conductorEvent } = this;

    if (action === constants.ACTION_POP) {
      if (!conductorEvent) {
        this.pop(false);
      }
      this.didPop(location);
    } else if (action === constants.ACTION_PUSH) {
      this.didPush(location);
    } else if (action === constants.ACTION_REPLACE) {
      this.didReplace(location);
    }

    this.conductorEvent = false;
  }

  /**
   * Registers a route with the router. Routed need to be registered
   * here to be considered when determining what the current route is.
   * @param {string} pattern The URL pattern.
   */
  register = (pattern) => {
    if (!pattern) {
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
   * @param {string} options History options.
   */
  push(pathname, options = {}) {
    this.doMatchLoop(pathname, route => this.willPush(pathname, options, route));
  }

  /**
   * Handles the push action.
   * @param {string} pathname The pathname to push.
   * @param {Object} options The push state options.
   * @param {Object} route The route definition.
   */
  willPush(pathname, options, route) {
    const id = uuid();

    // Emit the willEnter life cycle event.
    this.sendEvent(constants.EVENT_WILL_PUSH, id);

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
  didPush(location) {
    this.sendEvent(constants.EVENT_DID_PUSH, location.state.id);
  }

  /**
   * Go back in history. Remove the route entries from the stacks.
   * @param {boolean} navigate Whether or not to perform the history action.
   */
  pop(navigate = true) {
    if (!this.stack.length) {
      return;
    }

    // Grab the id from the last route in the stack.
    const { id } = this.stack[this.stack.length - 1];

    // Emit the willReplace life cycle event.
    this.sendEvent(constants.EVENT_WILL_POP, id);

    // Pop the stack.
    this.stack.pop();

    // Update internal flag.
    this.conductorEvent = true;

    // Call the history action.
    if (navigate) {
      history.go(-1);
    }
  }

  /**
   * Emits an event after a POP occured.
   * @param {Object} location The current history entry.
   */
  didPop(location) {
    this.sendEvent(constants.EVENT_DID_POP, location.state.id);
  }

  /**
   * Replace a path in the history stack.
   * @param {string} pathname The pathname of the new route.
   * @param {string} options History options.
   */
  replace(pathname, options = {}) {
    this.doMatchLoop(pathname, route => this.willReplace(pathname, options, route));
  }

  /**
   * Handles the replace action.
   * @param {string} pathname The pathname to push.
   * @param {Object} state The push state.
   * @param {Object} route The route definition.
   */
  willReplace(pathname, state, { pattern }) {
    const id = uuid();

    // Emit the willReplace life cycle event.
    this.sendEvent(constants.EVENT_WILL_REPLACE, id);

    // Replace the last cache entry with the given values.
    this.stack[this.stack.length - 1] = {
      id,
      pathname,
      pattern,
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
  didReplace(location) {
    this.sendEvent(constants.EVENT_DID_REPLACE, location.state.id);
  }

  /**
   * Loop over the registered routes and try to match them against
   * the given pathname.
   * @param {string} pathname The pathname to match against.
   * @param {Function} callback The action to run when match.
   */
  doMatchLoop(pathname, callback) {
    Object.keys(this.routes).some((definition) => {
      const route = this.routes[definition];

      // If there is no match, do no further actions.
      if (!route.match(pathname)) {
        return false;
      }

      callback(route);
      return true;
    });
  }

  /**
   * Adds a new element to the cache stack.
   * @param {string} pathname The new pathname
   * @param {Object} route The route definition to store.
   * @param {Object} id The id for this route.
   * @param {Object} state The state for this route.
   */
  addToStack(pathname, { pattern }, id, state) {
    const urlPattern = new UrlPattern(pattern);

    this.stack.push({
      id,
      params: urlPattern.match(pathname),
      pathname,
      pattern,
      state,
    });
  }
}

export default new Conductor();

// For testing.
export { Conductor as Uninitialized };
