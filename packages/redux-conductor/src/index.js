import * as events from '@virtuous/conductor-events';
import getRouteStack from '@virtuous/conductor-helpers/getRouteStack';
import * as actions from './action-creators';

export default ({ dispatch }) => {
  events.onPush(() => dispatch(actions.conductorPush(getRouteStack())));
  events.onPop(() => dispatch(actions.conductorPop(getRouteStack())));
  events.onReplace(() => dispatch(actions.conductorReplace(getRouteStack())));
};
