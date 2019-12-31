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

  it('registers for onEnter event', () => {
    const mockCallback = jest.fn();
    events.onEnter(mockCallback);
    emitter.emit(constants.EVENT_DID_ENTER);
    expect(mockCallback).toHaveBeenCalled();
  });

  it('registers for onWillLeave event', () => {
    const mockCallback = jest.fn();
    events.onWillLeave(mockCallback);
    emitter.emit(constants.EVENT_WILL_LEAVE);
    expect(mockCallback).toHaveBeenCalled();
  });

  it('registers for onLeave event', () => {
    const mockCallback = jest.fn();
    events.onLeave(mockCallback);
    emitter.emit(constants.EVENT_DID_LEAVE);
    expect(mockCallback).toHaveBeenCalled();
  });
});
