import { NAMESPACE } from './constants';

const logger = console;

/**
 * Logs invalid event callback warning.
 * @param {string} event The event name.
 * @param {string} type The received callback type.
 */
export const logInvalidCallback = (event, type) => {
  if (process.env.NODE_ENV === 'production') {
    return;
  }

  const receivedType = `Received '${type}'.`;
  logger.warn(`${NAMESPACE}: '${event}' callback needs to be a valid function! ${receivedType}`);
};

export default logger;
