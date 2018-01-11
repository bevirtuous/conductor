import assert from 'assert';
import reducer from '../src/reducer';
import * as actions from '../src/action-creators';

const mockState = {
  location: '/some',
  stack: [],
};
const mockAction = {
  type: 'SOME_OTHER',
  location: '/some',
  stack: [],
};

describe('reducer', () => {
  it('should return the previous state in case of any other action.', () => {
    const state = reducer(mockState, mockAction);
    assert.equal(state, mockState);
  });

  it('should handle the CONDUCTOR_PUSH action', () => {
    const action = {
      ...mockAction,
      type: actions.CONDUCTOR_PUSH,
      location: `/${actions.CONDUCTOR_PUSH}`,
    };
    const state = reducer(mockState, action);
    assert.equal(state.location, action.location);
  });

  it('should handle the CONDUCTOR_POP action', () => {
    const action = {
      ...mockAction,
      type: actions.CONDUCTOR_POP,
      location: `/${actions.CONDUCTOR_POP}`,
    };
    const state = reducer(mockState, action);
    assert.equal(state.location, action.location);
  });

  it('should handle the CONDUCTOR_REPLACE action', () => {
    const action = {
      ...mockAction,
      type: actions.CONDUCTOR_REPLACE,
      location: `/${actions.CONDUCTOR_REPLACE}`,
    };
    const state = reducer(mockState, action);
    assert.equal(state.location, action.location);
  });
});
