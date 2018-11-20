import emitter from '../emitter';
import * as constants from '../constants';
import * as events from './index';

const mockCallback = jest.fn();

describe('Events', () => {
  beforeEach(() => {
    mockCallback.mockClear();
  });

  it('registers for onWillPush event', () => {
    events.onWillPush(mockCallback);
    emitter.emit(constants.EVENT_WILL_PUSH);
    expect(mockCallback).toHaveBeenCalled();
  });

  it('registers for onDidPush event', () => {
    events.onDidPush(mockCallback);
    emitter.emit(constants.EVENT_DID_PUSH);
    expect(mockCallback).toHaveBeenCalled();
  });

  it('registers for onWillPop event', () => {
    events.onWillPop(mockCallback);
    emitter.emit(constants.EVENT_WILL_POP);
    expect(mockCallback).toHaveBeenCalled();
  });

  it('registers for onDidPop event', () => {
    events.onDidPop(mockCallback);
    emitter.emit(constants.EVENT_DID_POP);
    expect(mockCallback).toHaveBeenCalled();
  });

  it('registers for onWillReplace event', () => {
    events.onWillReplace(mockCallback);
    emitter.emit(constants.EVENT_WILL_REPLACE);
    expect(mockCallback).toHaveBeenCalled();
  });

  it('registers for onDidReplace event', () => {
    events.onDidReplace(mockCallback);
    emitter.emit(constants.EVENT_DID_REPLACE);
    expect(mockCallback).toHaveBeenCalled();
  });

  it('registers for onWillReset event', () => {
    events.onWillReset(mockCallback);
    emitter.emit(constants.EVENT_WILL_RESET);
    expect(mockCallback).toHaveBeenCalled();
  });

  it('registers for onDidReset event', () => {
    events.onDidReset(mockCallback);
    emitter.emit(constants.EVENT_DID_RESET);
    expect(mockCallback).toHaveBeenCalled();
  });

  it('registers for onUpdate event', () => {
    events.onUpdate(mockCallback);
    emitter.emit(constants.EVENT_UPDATE);
    expect(mockCallback).toHaveBeenCalled();
  });
});
