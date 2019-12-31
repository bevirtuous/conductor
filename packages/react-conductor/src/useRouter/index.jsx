import { useEffect } from 'react';
import {
  emitter,
  router,
  ON_PUSH,
  ON_POP,
  ON_REPLACE,
  ON_RESET,
} from '@virtuous/conductor';

function eventHook(event, callback) {
  useEffect(() => {
    emitter.addListener(event, callback);
    return () => emitter.removeListener(event, callback);
  });
}

function push(params) {
  return router.push(params);
}

function didPush(callback) {
  return eventHook(ON_PUSH, callback);
}

function pop(params) {
  return router.pop(params);
}

function didPop(callback) {
  return eventHook(ON_POP, callback);
}

function replace(params) {
  return router.replace(params);
}

function didReplace(callback) {
  return eventHook(ON_REPLACE, callback);
}

function reset(state = null) {
  return router.reset(state);
}

function didReset(callback) {
  return eventHook(ON_RESET, callback);
}

function resetTo(params) {
  return router.resetTo(params.pathname, params.state);
}

export default () => ({
  push,
  pop,
  replace,
  reset,
  resetTo,
  didPush,
  didPop,
  didReplace,
  didReset,
});
