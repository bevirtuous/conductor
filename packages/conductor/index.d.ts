import { EventEmitter } from 'events';
import { History } from 'history';

/**
 * An *action* represents the native history action that is performed when
 * manipulating the browser's history.
 */
export type Actions = 'POP' | 'PUSH' | 'REPLACE' | 'RESET' | 'UPDATE';

/**
 * The parameters for the router event callback function.
 */
export interface CallbackParams {
  prev: Route;
  next: Route;
}

/**
 * A function that is called when a router event is emitted.
 */
export type Callback = (p: CallbackParams) => void;

/**
 * Will be triggered when ever the router *will push* a new route.
 * @param callback {Function} The callback function to call once the event has been triggered.
 */
export function onWillPush(callback: Callback): void;

/**
 * Will be triggered when ever the router *did push* a new route.
 * @param callback {Function} The callback function to call once the event has been triggered.
 */
export function onDidPush(callback: Callback): void;

/**
 * Will be triggered when ever the router *will pop* from a route.
 * @param callback {Function} The callback function to call once the event has been triggered.
 */
export function onWillPop(callback: Callback): void;

/**
 * Will be triggered when ever the router *did pop* from a route.
 * @param callback {Function} The callback function to call once the event has been triggered.
 */
export function onDidPop(callback: Callback): void;

/**
 * Will be triggered when ever the router *will replace* a route.
 * @param callback {Function} The callback function to call once the event has been triggered.
 */
export function onWillReplace(callback: Callback): void;

/**
 * Will be triggered when ever the router *did replace* a route.
 * @param callback {Function} The callback function to call once the event has been triggered.
 */
export function onDidReplace(callback: Function): void;

/**
 * Will be triggered when ever the router *will reset* the history.
 * @param callback {Function} The callback function to call once the event has been triggered.
 */
export function onWillReset(callback: Callback): void;

/**
 * Will be triggered when ever the router *did reset* the history.
 * @param callback {Function} The callback function to call once the event has been triggered.
 */
export function onDidReset(callback: Callback): void;

/**
 * Will be triggered when ever the router *updates* a route.
 * @param callback {Function} The callback function to call once the event has been triggered.
 */
export function onUpdate(callback: Callback): void;

/**
 * The event emitter that is used to emit browser events that someone can register for.
 */
export type Emitter = EventEmitter;

/**
 * The ID of a single route.
 */
export type RouteId = string;

/**
 * Object whose values correspond to URL parameters defined in the route definition.
 */
export interface Params {
  [anyProps: string]: any
}

/**
 * Object whose values correspond to the URL query string individuals.
 */
export interface Query {
  [anyProps: string]: any
}

/**
 * Object containing custom key value pairs. This can be used to include
 * arbitrary data when opening a route.
 */
export interface State {
  [anyProps: string]: any
}

/**
 * The parameters a single route definition can receive.
 */
export interface RouteParams {
  id: RouteId;
  pathname: string;
  pattern?: string;
  state?: object;
  transform?: Function;
}

/**
 * The instance of a *route* that the router will create.
 */
export class Route {
  constructor(params: RouteParams)
  id: RouteId;
  pathname: string;
  pattern: string;
  location: string;
  params: Params;
  query: Query;
  hash: string;
  state: State;
  created: number;
  updated: number | null;
}

/**
 * The *stack* holds all active routes.
 */
export class Stack {
  add: (id: RouteId, entry: Route) => void;
  first: () => void;
  get: (id: RouteId) => Route;
  getByIndex: (index: number | null) => Route | null;
  getAll: () => Map<RouteId, Route>;
  last: () => Route | null;
  clear: () => void;
  remove: (id: string) => void;
  reset: (p: Array<RouteId, Route>) => void;
  update: (id: string, entry: Route) => void;
}

/**
 * The parameters for every route *actions* that can be emitted.
 */
export type ActionParams = {
  emit: boolean;
  steps: Number;
  state: Object | null;
}

/**
 * The *router* handles all the logic when navigating and controls the individual routes.
 */
export class Router {
  constructor(createHistory: History);
  nativeEvent: boolean;
  history: History;
  patterns: object;
  routing: boolean;
  routeIndex: number;
  action: Actions;
  handleNativeEvent: (location: Route, action: Actions) => void;
  createId: () => void;
  addInitialRoute: () => void;
  handlePop: (params: ActionParams) => Promise<object>;
  handlePush: (params: ActionParams, override?: boolean) => Promise;
  findPattern: (pathname: string) => string | null;
  register: (pattern: string, transform: Function | null) => void;
  handleReplace: (params: ActionParams) => Promise;
  push: (params: ActionParams) => Promise;
  pop: (params: ActionParams) => Promise;
  replace: (params: ActionParams) => Promise;
  reset: () => Promise;
  resetTo: (pathname: string) => Promise;
  update: (id: string, state?: IState, emit?: boolean) => Promise;
  getCurrentRoute: () => Route;
}
