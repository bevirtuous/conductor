import matcher from './matcher';
import history from './history';
import emitter from './emitter';
import logger from './logger';
import * as constants from './constants';

/**
 * The Conductor main class.
 */
class Conductor {
  /**
   * Conductor.
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
    this.cacheStack = [];

    /**
     * The ID of the popped route.
     * @type {string}
     */
    this.poppedId = null;

    /**
     * The ID of the replaced route.
     * @type {string}
     */
    this.replacedId = null;

    /**
     * Whether or not the latest history change was called directly
     * or by this router. Assume not initially.
     * @type {boolean}
     */
    this.isRouterAction = false;

    this.currentAction = 'POP';

    history.listen(this.handleHistoryEvent);
  }

  /**
   * Sends and error event and throws an error.
   * @param {string} message The error message.
   */
  throwError(message) {
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
    /**
     * When the history change was a back action and the flag is
     * not checked then we can assume that this action was
     * triggered by the device back button. In that case we need
     * to call the `back` function directly to ensure concurrency.
     */
    if (!this.isRouterAction && action === 'POP') {
      this.pop(1, false);
    }

    /**
     * Reset the flag, always assume that actions did not
     * come from this router.
     */
    this.unsetIsRouterAction();
  }

  /**
   * Registers a route with the router. Routed need to be registered
   * here to be considered when determining what the current route is.
   * @param {string} id The route identifier.
   * @param {string} pattern The URL pattern.
   */
  register(id, pattern) {
    if (!id) {
      this.throwError('You can\'t register a route without a route identifier!');
      return;
    }

    if (!pattern) {
      this.throwError('You can\'t register a route without a pattern!');
      return;
    }

    this.routes[pattern] = {
      id,
      pattern,
      match: matcher(pattern),
    };
  }

  /**
   * Push a path into the history stack.
   * @param {string} pathname The pathname of the new route.
   * @param {string} options History options.
   */
  push(pathname, options) {
    if (this.isActivePath(pathname)) {
      return;
    }

    this.currentAction = 'PUSH';
    this.setIsRouterAction();
    this.doMatchLoop(pathname, route => this.handlePush(pathname, options, route));
  }

  /**
   * Handles the push action.
   * @param {string} pathname The pathname to push.
   * @param {Object} options The push state options.
   * @param {Object} route The route definition.
   */
  handlePush(pathname, options, route) {
    let previousRoute = {
      pathname: undefined,
    };

    if (this.cacheLength) {
      // Emit the willLeave life cycle event.
      previousRoute = this.cacheStack[this.cacheLength - 1];
      this.sendEvent(constants.EVENT_WILL_LEAVE, previousRoute.id);
    }

    // Emit the willEnter life cycle event.
    this.sendEvent(constants.EVENT_WILL_ENTER, route.id);

    // Cache the new route.
    this.addToStack(pathname, route);

    // Call the history action.
    history.push(pathname, options);

    // Emit an event.
    this.sendEvent(
      constants.EVENT_PUSH,
      constants.ROUTER_ACTION_PUSH,
      pathname,
      previousRoute.pathname,
      this.cacheStack
    );
  }

  /**
   * Emits events when a route has been pushed.
   * @param {string} id The parent route id.
   * @param {string} pathname The pushed path.
   */
  pushed(id, pathname) {
    const previousRoute = this.cacheStack[this.cacheLength - 2];
    this.sendEvent(constants.EVENT_DID_LEAVE, previousRoute.id);
    this.sendEvent(constants.EVENT_DID_ENTER, id);
    this.sendEvent(constants.EVENT_PUSHED, pathname);
  }

  /**
   * Go back in history. Remove the route entries from the stacks.
   * @param {number} [num=1] The number of steps to go back.
   * @param {boolean} [useHistory=true] Whether or not to call the history action.
   */
  pop(num = 1, useHistory = true) {
    this.currentAction = 'POP';
    this.setIsRouterAction();

    // Call the history action.
    if (useHistory) {
      history.go(num * -1);
    }

    const prevPath = this.cacheStack[this.cacheLength - 1].pathname;

    this.setPoppedId(this.cacheStack[this.cacheLength - 1].id);
    this.sendEvent(constants.EVENT_WILL_LEAVE, this.poppedId);

    if (num === 1) {
      this.cacheStack.pop();
    } else {
      this.cacheStack.splice(1, num);
    }

    this.sendEvent(constants.EVENT_DID_ENTER, this.cacheStack[this.cacheLength - 1].id);

    this.sendEvent(
      constants.EVENT_POP,
      constants.ROUTER_ACTION_POP,
      this.cacheStack[this.cacheLength - 1].pathname,
      prevPath,
      this.cacheStack
    );
  }

  /**
   * Emit an event when a route has been popped.
   * @param {string} id The ID of the popped route.
   * @param {string} pathname The popped path.
   */
  popped(id, pathname) {
    this.sendEvent(constants.EVENT_DID_LEAVE, this.poppedId);
    this.unsetPoppedId();
    this.sendEvent(constants.EVENT_DID_ENTER, id);
    this.sendEvent(constants.EVENT_POPPED, pathname);
  }

  /**
   * Replace a path in the history stack.
   * @param {string} pathname The pathname of the new route.
   * @param {string} options History options.
   */
  replace(pathname, options) {
    this.currentAction = 'REPLACE';
    this.setIsRouterAction();
    this.doMatchLoop(pathname, route => this.handleReplace(pathname, options, route));
  }

  /**
   * Handles the replace action.
   * @param {string} pathname The pathname to push.
   * @param {Object} options The push state options.
   * @param {Object} route The route definition.
   */
  handleReplace(pathname, options, { id, pattern }) {
    // Emit the willLeave life cycle event.
    const previousRoute = this.cacheStack[this.cacheLength - 1];
    this.sendEvent(constants.EVENT_WILL_LEAVE, previousRoute.id);
    this.sendEvent(constants.EVENT_WILL_ENTER, previousRoute.id);

    this.setReplacedId(previousRoute.id);

    // Replace the last cache entry with the given values.
    this.cacheStack[this.cacheLength - 1] = {
      id,
      pathname,
      pattern,
    };

    // Call the history action.
    history.replace(pathname, options);

    // Emit an event.
    this.sendEvent(
      constants.EVENT_REPLACE,
      constants.ROUTER_ACTION_REPLACE,
      pathname,
      previousRoute.pathname,
      this.cacheStack
    );
  }

  /**
   * Emit an event when a route has been replaced.
   * @param {string} id The ID of the route replacement.
   * @param {string} pathname The replaced path.
   */
  replaced(id, pathname) {
    this.sendEvent(constants.EVENT_DID_LEAVE, this.replacedId);
    this.unsetReplacedId();
    this.sendEvent(constants.EVENT_DID_ENTER, id);
    this.sendEvent(constants.EVENT_REPLACED, pathname);
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
   */
  addToStack(pathname, route) {
    this.cacheStack.push({
      id: route.id,
      pathname,
      pattern: route.pattern,
    });
  }

  /**
   * Checks whether the supplied parameter is the current active path.
   * @param {string} pathname The path to check.
   * @return {boolean}
   */
  isActivePath(pathname) {
    if (!this.cacheLength) {
      return false;
    }

    return pathname === this.cacheStack[this.cacheLength - 1].pathname;
  }

  /**
   * Returns the cache stack length.
   * @return {number}
   */
  get cacheLength() {
    return this.cacheStack.length;
  }

  /**
   * Set the isRouterAction property to true.
   */
  setIsRouterAction() {
    this.isRouterAction = true;
  }

  /**
   * Sets the isRouterAction to false.
   */
  unsetIsRouterAction() {
    this.isRouterAction = false;
  }

  /**
   * Stores the ID of the currently popped route.
   * @param {string} id The route ID.
   */
  setPoppedId(id) {
    this.poppedId = id;
  }

  /**
   * Unsets the popped ID.
   */
  unsetPoppedId() {
    this.poppedId = null;
  }

  /**
   * Stores the ID of the replaced route.
   * @param {string} id The route ID.
   */
  setReplacedId(id) {
    this.replacedId = id;
  }

  /**
   * Unsets the replaced ID.
   */
  unsetReplacedId() {
    this.replacedId = null;
  }

  /**
   * Gets the most recent history action.
   * @returns {string}
   */
  getCurrentAction = () => history.action;
}

export default new Conductor();

// For testing.
export { Conductor as Uninitialized };
