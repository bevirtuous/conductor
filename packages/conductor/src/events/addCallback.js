import emitter from '../emitter';

/**
 * Registers a callback to the given event name.
 * @param {string} event The event name.
 * @param {Function} callback The callback to register.
 */
const addCallback = (event, callback) => {
  if (typeof callback === 'function') {
    emitter.addListener(event, callback);
  }
};

export default addCallback;
