import {
  emitter,
  EVENT_DID_PUSH,
  EVENT_DID_POP,
  EVENT_DID_REPLACE,
  EVENT_DID_RESET,
  EVENT_UPDATE,
} from '@virtuous/conductor';
import syncStore from './index';

const dispatch = jest.fn();

describe.skip('Redux Conductor - Setup', () => {
  beforeAll(() => {
    syncStore({ dispatch });
  });

  afterEach(() => {
    dispatch.mockClear();
  });

  it('should dispatch when pushed', () => {
    emitter.emit(EVENT_DID_PUSH);
    expect(dispatch).toHaveBeenCalled();
  });

  it('should dispatch when popped', () => {
    emitter.emit(EVENT_DID_POP);
    expect(dispatch).toHaveBeenCalled();
  });

  it('should dispatch when replaced', () => {
    emitter.emit(EVENT_DID_REPLACE);
    expect(dispatch).toHaveBeenCalled();
  });

  it('should dispatch when reset', () => {
    emitter.emit(EVENT_DID_RESET);
    expect(dispatch).toHaveBeenCalled();
  });

  it('should dispatch when updated', () => {
    emitter.emit(EVENT_UPDATE);
    expect(dispatch).toHaveBeenCalled();
  });
});
