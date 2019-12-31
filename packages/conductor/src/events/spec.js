import emitter from '../emitter';
import * as constants from '../constants';
import * as events from './index';

const mockCallback = jest.fn();

describe('Events', () => {
  beforeEach(() => {
    mockCallback.mockClear();
  });

  it('registers for onPush event', () => {
    events.onPush(mockCallback);
    emitter.emit(constants.ON_PUSH);
    expect(mockCallback).toHaveBeenCalled();
  });

  it('registers for onPop event', () => {
    events.onPop(mockCallback);
    emitter.emit(constants.ON_POP);
    expect(mockCallback).toHaveBeenCalled();
  });

  it('registers for onReplace event', () => {
    events.onReplace(mockCallback);
    emitter.emit(constants.ON_REPLACE);
    expect(mockCallback).toHaveBeenCalled();
  });

  it('registers for onReset event', () => {
    events.onReset(mockCallback);
    emitter.emit(constants.ON_RESET);
    expect(mockCallback).toHaveBeenCalled();
  });

  it('registers for onUpdate event', () => {
    events.onUpdate(mockCallback);
    emitter.emit(constants.ON_UPDATE);
    expect(mockCallback).toHaveBeenCalled();
  });

  it('should not register with no callback', () => {
    events.onUpdate({});
    expect(emitter.listenerCount()).toBe(0);
  });
});
