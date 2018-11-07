import reducer from './index';
import * as constants from '../constants';

describe('Redux Conductor - Reducer', () => {
  it('should return the initial state', () => {
    const state = reducer(undefined, {});

    expect(state.stack.length).toEqual(1);
  });

  it('should handle a PUSH action', () => {
    const stack = [{
      pathname: 'mypage',
    }];

    const state = reducer(undefined, {
      type: constants.CONDUCTOR_PUSH,
      stack,
    });

    expect(state.stack).not.toBe(stack);

    expect(state).toEqual({
      routing: false,
      stack: [{
        pathname: 'mypage',
      }],
    });
  });

  it('should handle a POP action', () => {
    const state = reducer(undefined, {
      type: constants.CONDUCTOR_POP,
      stack: [{
        pathname: 'mypage',
      }],
    });

    expect(state).toEqual({
      routing: false,
      stack: [{
        pathname: 'mypage',
      }],
    });
  });

  it('should handle a REPLACE action', () => {
    const state = reducer(undefined, {
      type: constants.CONDUCTOR_REPLACE,
      stack: [{
        pathname: 'mypage',
      }],
    });

    expect(state).toEqual({
      routing: false,
      stack: [{
        pathname: 'mypage',
      }],
    });
  });

  it('should handle a RESET action', () => {
    const state = reducer(undefined, {
      type: constants.CONDUCTOR_RESET,
      stack: [{
        pathname: 'mypage',
      }],
    });

    expect(state).toEqual({
      routing: false,
      stack: [{
        pathname: 'mypage',
      }],
    });
  });

  it('should handle a UPDATE action', () => {
    const stack = [{
      pathname: 'mypage',
    }];

    const state = reducer(undefined, {
      type: constants.CONDUCTOR_UPDATE,
      stack,
    });

    expect(state.stack).not.toBe(stack);

    expect(state).toEqual({
      routing: false,
      stack: [{
        pathname: 'mypage',
      }],
    });
  });
});