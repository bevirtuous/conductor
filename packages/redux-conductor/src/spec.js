import {
  emitter,
  EVENT_DID_PUSH,
  EVENT_DID_POP,
  EVENT_DID_REPLACE,
  EVENT_DID_RESET,
  EVENT_UPDATE,
} from '@virtuous/conductor';
import syncStore from './index';
import * as actions from './actions';

const dispatch = jest.fn();
const routes = {
  prev: {
    pthname: '/myroute/123',
  },
  next: {
    pathname: '/myroute/789',
  },
};

describe('Redux Conductor - Setup', () => {
  beforeAll(() => {
    syncStore({ dispatch });
  });

  afterEach(() => {
    dispatch.mockClear();
  });

  it('should dispatch when pushed', () => {
    const spy = jest.spyOn(actions, 'conductorPush');

    emitter.emit(EVENT_DID_PUSH, routes);

    expect(dispatch).toHaveBeenCalled();
    expect(spy).toHaveBeenCalledWith(routes);
  });

  it('should not dispatch for push', () => {
    emitter.emit(EVENT_DID_PUSH, routes, true);

    expect(dispatch).not.toHaveBeenCalled();
  });

  it('should dispatch when popped', () => {
    const spy = jest.spyOn(actions, 'conductorPop');

    emitter.emit(EVENT_DID_POP);

    expect(dispatch).toHaveBeenCalled();
    expect(spy).toHaveBeenCalled();
  });

  it('should dispatch when replaced', () => {
    const spy = jest.spyOn(actions, 'conductorReplace');

    emitter.emit(EVENT_DID_REPLACE, routes);

    expect(dispatch).toHaveBeenCalled();
    expect(spy).toHaveBeenCalledWith(routes);
  });

  it('should dispatch when reset', () => {
    const spy = jest.spyOn(actions, 'conductorReset');

    emitter.emit(EVENT_DID_RESET, routes);

    expect(dispatch).toHaveBeenCalled();
    expect(spy).toHaveBeenCalledWith(routes);
  });

  it('should dispatch when updated', () => {
    const spy = jest.spyOn(actions, 'conductorUpdate');
    const route = {};

    emitter.emit(EVENT_UPDATE, route);

    expect(dispatch).toHaveBeenCalled();
    expect(spy).toHaveBeenCalledWith(route);
  });
});
