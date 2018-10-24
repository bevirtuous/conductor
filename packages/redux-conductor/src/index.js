import {
  stack,
  onDidPush,
  onDidPop,
  onDidReplace,
  onDidReset,
  onUpdate,
} from '@virtuous/conductor';
import * as actions from './action-creators';

export { default as reducer } from './reducer';

export default ({ dispatch }) => {
  onDidPush(() => dispatch(actions.conductorPush(stack.getAll())));
  onDidPop(() => dispatch(actions.conductorPop(stack.getAll())));
  onDidReplace(() => dispatch(actions.conductorReplace(stack.getAll())));
  onDidReset(() => dispatch(actions.conductorReset(stack.getAll())));
  onUpdate(() => dispatch(actions.conductorUpdate(stack.getAll())));
};
