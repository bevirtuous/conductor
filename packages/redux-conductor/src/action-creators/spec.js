import * as actions from '../action-creators';
import * as constants from '../constants';

describe('Redux Conductor - Action Creators', () => {
  const stack = [
    { pathname: '/mypage' },
  ];

  it('should create an action to PUSH', () => {
    const expectedAction = {
      type: constants.CONDUCTOR_PUSH,
      stack,
    };

    expect(actions.conductorPush(stack)).toEqual(expectedAction);
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
    const expectedAction = {
      type: constants.CONDUCTOR_RESET,
      stack,
    };

    expect(actions.conductorReset(stack)).toEqual(expectedAction);
  });
});
