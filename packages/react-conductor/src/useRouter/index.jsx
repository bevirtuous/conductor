import { useEffect } from 'react';
import {
  emitter,
  router,
  EVENT_DID_PUSH,
  EVENT_DID_POP,
  EVENT_DID_REPLACE,
  EVENT_DID_RESET,
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
  return eventHook(EVENT_DID_PUSH, callback);
}

function pop(params) {
  return router.pop(params);
}

function didPop(callback) {
  return eventHook(EVENT_DID_POP, callback);
}

function replace(params) {
  return router.replace(params);
}

function didReplace(callback) {
  return eventHook(EVENT_DID_REPLACE, callback);
}

function reset(state = null) {
  return router.reset(state);
}

function didReset(callback) {
  return eventHook(EVENT_DID_RESET, callback);
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
