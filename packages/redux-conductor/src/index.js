import events from '@virtuous/conductor-events';
import history from '@virtuous/conductor/history';
import * as actions from './action-creators';

export default ({ dispatch }) => {
  events.onPush((action, pathname, prevPathname, stack) => {
    dispatch(actions.conductorPush(history.location, stack));
  });

  events.onPushed(() => {
    dispatch(actions.conductorPushed(history.location.pathname));
  });

  events.onPop((action, pathname, prevPathname, stack) => {
    dispatch(actions.conductorPop(history.location, stack));
  });

  events.onPopped(() => {
    dispatch(actions.conductorPopped(history.location.pathname));
  });

  events.onReplace((action, pathname, prevPathname, stack) => {
    dispatch(actions.conductorReplace(history.location, stack));
  });

  events.onReplaced(() => {
    dispatch(actions.conductorReplaced(history.location.pathname));
  });

  events.onReset(() => {
    dispatch(actions.conductorReset(history.location.pathname));
  });
};
