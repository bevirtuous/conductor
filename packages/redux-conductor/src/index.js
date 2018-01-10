import emitter from '@virtuous/conductor/emitter';
import history from '@virtuous/conductor/history';
import {
  EVENT_PUSH,
  EVENT_PUSHED,
  EVENT_POP,
  EVENT_POPPED,
  EVENT_REPLACE,
  EVENT_REPLACED,
  EVENT_RESET,
} from '@virtuous/conductor/constants';
import {
  conductorPush,
  conductorPushed,
  conductorPop,
  conductorPopped,
  conductorReplace,
  conductorReplaced,
  conductorReset,
} from './action-creators';

export default ({ dispatch }) => {
  emitter.on(EVENT_PUSH, (action, pathname, prevPathname, stack) =>
    dispatch(conductorPush(history.location, stack)));

  emitter.on(EVENT_PUSHED, () =>
    dispatch(conductorPushed(history.location.pathname)));

  emitter.on(EVENT_POP, (action, pathname, prevPathname, stack) =>
    dispatch(conductorPop(history.location, stack)));

  emitter.on(EVENT_POPPED, () =>
    dispatch(conductorPopped(history.location.pathname)));

  emitter.on(EVENT_REPLACE, (action, pathname, prevPathname, stack) =>
    dispatch(conductorReplace(history.location, stack)));

  emitter.on(EVENT_REPLACED, () =>
    dispatch(conductorReplaced(history.location.pathname)));

  emitter.on(EVENT_RESET, () =>
    dispatch(conductorReset(history.location.pathname)));
};
