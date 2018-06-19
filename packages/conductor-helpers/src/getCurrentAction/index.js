import history from '@virtuous/conductor/history';

/**
 * Returns the action of the last history action.
 * @returns {string}
 */
const getCurrentAction = () => history.action;

export default getCurrentAction;
