import * as events from '../../conductor/constants';
import emitter from '../../conductor/emitter';
import syncStore from './index';

const dispatch = jest.fn();

describe('Redux Conductor - Setup', () => {
  beforeAll(() => {
    syncStore({ dispatch });
  });

  afterEach(() => {
    dispatch.mockClear();
  });

  it('should dispatch when pushed', () => {
    emitter.emit(events.EVENT_DID_PUSH);
    expect(dispatch).toHaveBeenCalled();
  });

  it('should dispatch when popped', () => {
    emitter.emit(events.EVENT_DID_POP);
    expect(dispatch).toHaveBeenCalled();
  });

  it('should dispatch when replaced', () => {
    emitter.emit(events.EVENT_DID_REPLACE);
    expect(dispatch).toHaveBeenCalled();
  });

  it('should dispatch when reset', () => {
    emitter.emit(events.EVENT_DID_RESET);
    expect(dispatch).toHaveBeenCalled();
  });

  it('should dispatch when updated', () => {
    emitter.emit(events.EVENT_UPDATE);
    expect(dispatch).toHaveBeenCalled();
  });
});
