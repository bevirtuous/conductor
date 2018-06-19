import reducer from '../reducer';
import * as constants from '../constants';

describe('Redux Conductor - Reducer', () => {
  it('should return the initial state', () => {
    const state = reducer(undefined, {});

    expect(state).toEqual({
      routing: false,
      stack: [],
    });
  });

  it('should handle a PUSH action', () => {
    const state = reducer(undefined, {
      type: constants.CONDUCTOR_PUSH,
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
});
