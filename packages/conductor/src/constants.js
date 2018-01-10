export const NAMESPACE = 'conductor';

const LIFECYCLE_WILL_ENTER = 'willEnter';
const LIFECYCLE_WILL_LEAVE = 'willLeave';
const LIFECYCLE_DID_ENTER = 'didEnter';
const LIFECYCLE_DID_LEAVE = 'didLeave';

export const ROUTER_ACTION_PUSH = 'push';
export const ROUTER_ACTION_POP = 'pop';
export const ROUTER_ACTION_REPLACE = 'replace';
export const ROUTER_ACTION_RESET = 'reset';

export const EVENT_ERROR = `${NAMESPACE}.error`;

export const EVENT_WILL_ENTER = `${NAMESPACE}.${LIFECYCLE_WILL_ENTER}`;
export const EVENT_WILL_LEAVE = `${NAMESPACE}.${LIFECYCLE_WILL_LEAVE}`;
export const EVENT_DID_ENTER = `${NAMESPACE}.${LIFECYCLE_DID_ENTER}`;
export const EVENT_DID_LEAVE = `${NAMESPACE}.${LIFECYCLE_DID_LEAVE}`;

export const EVENT_PUSH = `${NAMESPACE}.${ROUTER_ACTION_PUSH}`;
export const EVENT_PUSHED = `${NAMESPACE}.pushed`;
export const EVENT_POP = `${NAMESPACE}.${ROUTER_ACTION_POP}`;
export const EVENT_POPPED = `${NAMESPACE}.popped`;
export const EVENT_REPLACE = `${NAMESPACE}.${ROUTER_ACTION_REPLACE}`;
export const EVENT_REPLACED = `${NAMESPACE}.replaced`;
export const EVENT_RESET = `${NAMESPACE}.${ROUTER_ACTION_RESET}`;
