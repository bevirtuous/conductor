import conductor from '@virtuous/conductor';

/**
 * Returns the action of the last history action.
 * @returns {string}
 */
const getCurrentAction = () => conductor.currentAction;

export default getCurrentAction;
