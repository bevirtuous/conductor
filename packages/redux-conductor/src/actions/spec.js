import * as actions from './index';
import * as constants from '../constants';

describe('Redux Conductor - Action Creators', () => {
  const stack = [
    { pathname: '/mypage' },
  ];

  it('should create an action to PUSH', () => {
    const routes = {
      prev: {},
      next: {},
    };

    const expectedAction = {
      type: constants.CONDUCTOR_PUSH,
      routes,
    };

    expect(actions.conductorPush(routes)).toEqual(expectedAction);
  });

  it('should create an action to POP', () => {
    const expectedAction = {
      type: constants.CONDUCTOR_POP,
      stack,
    };

    expect(actions.conductorPop(stack)).toEqual(expectedAction);
  });

  it('should create an action to REPLACE', () => {
    const expectedAction = {
      type: constants.CONDUCTOR_REPLACE,
      stack,
    };

    expect(actions.conductorReplace(stack)).toEqual(expectedAction);
  });

  it('should create an action to RESET', () => {
    const routes = {
      prev: {},
      next: {},
    };

    const expectedAction = {
      type: constants.CONDUCTOR_RESET,
      routes,
    };

    expect(actions.conductorReset(routes)).toEqual(expectedAction);
  });

  it('should create an action to UPDATE', () => {
    const route = {};

    const expectedAction = {
      type: constants.CONDUCTOR_UPDATE,
      route,
    };

    expect(actions.conductorUpdate(route)).toEqual(expectedAction);
  });
});
