import { router } from '@virtuous/conductor';

export function push(params) {
  return router.push(params);
}

export function pop(params) {
  return router.pop(params);
}

export function replace(params) {
  return router.replace(params);
}

export function reset() {
  return router.reset();
}

export function resetTo(params) {
  return router.resetTo(params.pathname, params.state);
}
