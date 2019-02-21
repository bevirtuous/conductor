import { emitter } from '@virtuous/conductor';
import * as constants from '../constants';
import * as events from './index';

describe('Events', () => {
  it('registers for onWillEnter event', () => {
    const mockCallback = jest.fn();
    events.onWillEnter(mockCallback);
    emitter.emit(constants.EVENT_WILL_ENTER);
    expect(mockCallback).toHaveBeenCalled();
  });

  it('registers for onDidEnter event', () => {
    const mockCallback = jest.fn();
    events.onDidEnter(mockCallback);
    emitter.emit(constants.EVENT_DID_ENTER);
    expect(mockCallback).toHaveBeenCalled();
  });

  it('registers for onWillLeave event', () => {
    const mockCallback = jest.fn();
    events.onWillLeave(mockCallback);
    emitter.emit(constants.EVENT_WILL_LEAVE);
    expect(mockCallback).toHaveBeenCalled();
  });

  it('registers for onDidLeave event', () => {
    const mockCallback = jest.fn();
    events.onDidLeave(mockCallback);
    emitter.emit(constants.EVENT_DID_LEAVE);
    expect(mockCallback).toHaveBeenCalled();
  });
});
