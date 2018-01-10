import * as constants from '@virtuous/conductor/constants';
import emitter from '@virtuous/conductor/emitter';

/**
 * The ConductorEvents class.
 */
class ConductorEvents {
  /**
   * ConductorEvents constructor.
   * @param {Object} event An event emitter instance.
   */
  constructor(event) {
    this.event = event;
  }

  /**
   * Registers a callback function to a certain event.
   * @param {string} event The event name.
   * @param {Function} callback The callback to register.
   */
  addCallback(event, callback) {
    if (callback && typeof callback === 'function') {
      this.event.addListener(event, callback);
    }
  }

  /**
   * Registers a callback to the error event.
   * @param {Function} callback The callback to register.
   */
  onError(callback) {
    this.addCallback(constants.EVENT_ERROR, callback);
  }

  /**
   * Registers a callback to the willEnter event.
   * @param {Function} callback The callback to register.
   */
  onWillEnter(callback) {
    this.addCallback(constants.EVENT_WILL_ENTER, callback);
  }

  /**
   * Registers a callback to the didEnter event.
   * @param {Function} callback The callback to register.
   */
  onDidEnter(callback) {
    this.addCallback(constants.EVENT_DID_ENTER, callback);
  }

  /**
   * Registers a callback to the willLeave event.
   * @param {Function} callback The callback to register.
   */
  onWillLeave(callback) {
    this.addCallback(constants.EVENT_WILL_LEAVE, callback);
  }

  /**
   * Registers a callback to the didLeave event.
   * @param {Function} callback The callback to register.
   */
  onDidLeave(callback) {
    this.addCallback(constants.EVENT_DID_LEAVE, callback);
  }

  /**
   * Registers a callback to the pop event.
   * @param {Function} callback The callback to register.
   */
  onPop(callback) {
    this.addCallback(constants.EVENT_POP, callback);
  }

  /**
   * Registers a callback to the popped event.
   * @param {Function} callback The callback to register.
   */
  onPopped(callback) {
    this.addCallback(constants.EVENT_POPPED, callback);
  }

  /**
   * Registers a callback to the push event.
   * @param {Function} callback The callback to register.
   */
  onPush(callback) {
    this.addCallback(constants.EVENT_PUSH, callback);
  }

  /**
   * Registers a callback to the pushed event.
   * @param {Function} callback The callback to register.
   */
  onPushed(callback) {
    this.addCallback(constants.EVENT_PUSHED, callback);
  }

  /**
   * Registers a callback to the replace event.
   * @param {Function} callback The callback to register.
   */
  onReplace(callback) {
    this.addCallback(constants.EVENT_REPLACE, callback);
  }

  /**
   * Registers a callback to the replaced event.
   * @param {Function} callback The callback to register.
   */
  onReplaced(callback) {
    this.addCallback(constants.EVENT_REPLACED, callback);
  }

  /**
   * Registers a callback to the reset event.
   * @param {Function} callback The callback to register.
   */
  onReset(callback) {
    this.addCallback(constants.EVENT_RESET, callback);
  }
}

export default new ConductorEvents(emitter);
