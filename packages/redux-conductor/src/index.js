import history from '@virtuous/conductor/history';
import * as events from '@virtuous/conductor-events';
import getRouteStack from '@virtuous/conductor-helpers/src/getRouteStack';
import * as actions from './action-creators';

export default ({ dispatch }) => {
  events.onPush(() => dispatch(actions.conductorPush(history.location, getRouteStack())));
  events.onPop(() => dispatch(actions.conductorPop(history.location, getRouteStack())));
  events.onReplace(() => dispatch(actions.conductorReplace(history.location, getRouteStack())));
};
