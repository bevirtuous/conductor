import {
  onDidPush,
  onDidPop,
  onDidReplace,
  onDidReset,
  onUpdate,
} from '@virtuous/conductor';
import * as actions from './actions';

export { default as reducer } from './reducer';
export * from './constants';

/**
 * @param {Object} store A Redux store instance.
 */
export const sync = ({ dispatch }) => {
  onDidPush(routes => dispatch(actions.conductorPush(routes)));
  onDidPop(() => dispatch(actions.conductorPop()));
  onDidReplace(routes => dispatch(actions.conductorReplace(routes)));
  onDidReset(routes => dispatch(actions.conductorReset(routes)));
  onUpdate(route => dispatch(actions.conductorUpdate(route)));
};

export default sync;
