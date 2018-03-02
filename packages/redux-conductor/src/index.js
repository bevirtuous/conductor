import * as events from '@virtuous/conductor-events';
import getRouteStack from '@virtuous/conductor-helpers/getRouteStack';
import * as actions from './action-creators';

export default ({ dispatch }) => {
  events.onDidPush(() => dispatch(actions.conductorPush(getRouteStack())));
  events.onDidPop(() => dispatch(actions.conductorPop(getRouteStack())));
  events.onDidReplace(() => dispatch(actions.conductorReplace(getRouteStack())));
};
