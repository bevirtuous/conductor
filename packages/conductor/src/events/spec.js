import emitter from '../emitter';
import * as constants from '../constants';
import * as events from './index';

const mockCallback = jest.fn();

describe('Events', () => {
  beforeEach(() => {
    mockCallback.mockClear();
  });

  it('registers for onDidPush event', () => {
    events.onDidPush(mockCallback);
    emitter.emit(constants.ON_PUSH);
    expect(mockCallback).toHaveBeenCalled();
  });

  it('registers for onDidPop event', () => {
    events.onDidPop(mockCallback);
    emitter.emit(constants.ON_POP);
    expect(mockCallback).toHaveBeenCalled();
  });

  it('registers for onDidReplace event', () => {
    events.onDidReplace(mockCallback);
    emitter.emit(constants.ON_REPLACE);
    expect(mockCallback).toHaveBeenCalled();
  });

  it('registers for onDidReset event', () => {
    events.onDidReset(mockCallback);
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
