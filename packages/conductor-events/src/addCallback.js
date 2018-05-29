import emitter from '@virtuous/conductor/emitter';

/**
 * Registers a callback function to the given event name.
 * @param {string} event The event name.
 * @param {Function} callback The callback to register.
 */
const addCallback = (event, callback) => {
  if (callback && typeof callback === 'function') {
    emitter.addListener(event, callback);
  }
};

export default addCallback;
