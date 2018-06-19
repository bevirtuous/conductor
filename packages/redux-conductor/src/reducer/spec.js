import reducer from '../reducer';
import {
  CONDUCTOR_PUSH,
  CONDUCTOR_RESET,
} from '../action-creators';

describe('Redux Conductor - Reducer', () => {
  it('should handle a PUSH action', () => {
    const mockState = {
      routing: false,
      stack: [],
    };

    const action = {
      type: CONDUCTOR_PUSH,
      stack: [
        {
          pathname: '/mypage',
        },
      ],
    };

    const state = reducer(mockState, action);
    expect(state.stack.length).toEqual(1);
  });

  it('should handle a RESET action', () => {
    const mockState = {
      routing: false,
      stack: [
        {
          pathname: '/mypage',
        }, {
          pathname: '/mypage2',
        },
      ],
    };

    const action = {
      type: CONDUCTOR_RESET,
      stack: mockState.stack,
    };

    const { stack } = reducer(mockState, action);
    expect(stack.length).toEqual(1);
    expect(stack[stack.length - 1].pathname).toEqual('/mypage');
  });

  it('should handle any other action', () => {
    const mockState = {
      routing: false,
      stack: [],
    };

    const action = {
      type: 'MY_ACTION',
    };

    const state = reducer(mockState, action);
    expect(state.stack.length).toEqual(0);
  });
});
