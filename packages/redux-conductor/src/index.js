import {
  onDidPush,
  onDidPop,
  onDidReplace,
  onDidReset,
  onUpdate,
} from '@virtuous/conductor';
import * as actions from './action-creators';
import { getStack } from './helpers';

export { default as reducer } from './reducer';
export * from './constants';

/**
 * @param {Object} store The redux store instance.
 */
export const sync = ({ dispatch }) => {
  onDidPush(() => dispatch(actions.conductorPush(getStack())));
  onDidPop(() => dispatch(actions.conductorPop(getStack())));
  onDidReplace(() => dispatch(actions.conductorReplace(getStack())));
  onDidReset(() => dispatch(actions.conductorReset(getStack())));
  onUpdate(() => dispatch(actions.conductorUpdate(getStack())));
};
