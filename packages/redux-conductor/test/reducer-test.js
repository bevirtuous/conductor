import assert from 'assert';
import reducer from '../src/reducer';
import {
  CONDUCTOR_PUSH,
  CONDUCTOR_POP,
  CONDUCTOR_REPLACE,
} from '../src/action-creators';

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
      type: CONDUCTOR_PUSH,
      location: `/${CONDUCTOR_PUSH}`,
    };
    const state = reducer(mockState, action);
    assert.equal(state.location, action.location);
  });

  it('should handle the CONDUCTOR_POP action', () => {
    const action = {
      ...mockAction,
      type: CONDUCTOR_POP,
      location: `/${CONDUCTOR_POP}`,
    };
    const state = reducer(mockState, action);
    assert.equal(state.location, action.location);
  });

  it('should handle the CONDUCTOR_REPLACE action', () => {
    const action = {
      ...mockAction,
      type: CONDUCTOR_REPLACE,
      location: `/${CONDUCTOR_REPLACE}`,
    };
    const state = reducer(mockState, action);
    assert.equal(state.location, action.location);
  });
});
