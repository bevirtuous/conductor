import proxyquire from 'proxyquire';
import sinon from 'sinon';
import * as constants from '@virtuous/conductor/constants';

const spy = sinon.spy();

const events = proxyquire('../src/index', {
  './addCallback': {
    default: spy,
  },
});

/**
 * The event callback to use in the tests.
 */
const eventCallback = () => {};

describe('Events', () => {
  beforeEach(() => {
    spy.resetHistory();
  });

  it('registers for onError event', () => {
    events.onError(eventCallback);
    sinon.assert.calledWith(spy, constants.EVENT_ERROR, eventCallback);
  });

  it('registers for onWillEnter event', () => {
    events.onWillEnter(eventCallback);
    sinon.assert.calledWith(spy, constants.EVENT_WILL_ENTER, eventCallback);
  });

  it('registers for onDidEnter event', () => {
    events.onDidEnter(eventCallback);
    sinon.assert.calledWith(spy, constants.EVENT_DID_ENTER, eventCallback);
  });

  it('registers for onWillLeave event', () => {
    events.onWillLeave(eventCallback);
    sinon.assert.calledWith(spy, constants.EVENT_WILL_LEAVE, eventCallback);
  });

  it('registers for onDidLeave event', () => {
    events.onDidLeave(eventCallback);
    sinon.assert.calledWith(spy, constants.EVENT_DID_LEAVE, eventCallback);
  });

  it('registers for onPop event', () => {
    events.onPop(eventCallback);
    sinon.assert.calledWith(spy, constants.EVENT_POP, eventCallback);
  });

  it('registers for onPopped event', () => {
    events.onPopped(eventCallback);
    sinon.assert.calledWith(spy, constants.EVENT_POPPED, eventCallback);
  });

  it('registers for onPush event', () => {
    events.onPush(eventCallback);
    sinon.assert.calledWith(spy, constants.EVENT_PUSH, eventCallback);
  });

  it('registers for onPushed event', () => {
    events.onPushed(eventCallback);
    sinon.assert.calledWith(spy, constants.EVENT_PUSHED, eventCallback);
  });

  it('registers for onReplace event', () => {
    events.onReplace(eventCallback);
    sinon.assert.calledWith(spy, constants.EVENT_REPLACE, eventCallback);
  });

  it('registers for onReplaced event', () => {
    events.onReplaced(eventCallback);
    sinon.assert.calledWith(spy, constants.EVENT_REPLACED, eventCallback);
  });

  it('registers for onReset event', () => {
    events.onReset(eventCallback);
    sinon.assert.calledWith(spy, constants.EVENT_RESET, eventCallback);
  });
});
