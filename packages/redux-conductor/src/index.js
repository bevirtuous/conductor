import * as actions from './action-creators';

export { default as reducer } from './reducer';

export default ({ dispatch }) => {
  events.onDidPush(() => dispatch(actions.conductorPush(getRouteStack())));
  events.onDidPop(() => dispatch(actions.conductorPop(getRouteStack())));
  events.onDidReplace(() => dispatch(actions.conductorReplace(getRouteStack())));
  events.onDidReset(() => dispatch(actions.conductorReset(getRouteStack())));
  events.onUpdate(() => dispatch(actions.conductorUpdate(getRouteStack())));
};
