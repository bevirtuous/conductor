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

  it('registers for onWillPush event', () => {
    events.onWillPush(eventCallback);
    sinon.assert.calledWith(spy, constants.EVENT_WILL_PUSH, eventCallback);
  });

  it('registers for onDidPush event', () => {
    events.onDidPush(eventCallback);
    sinon.assert.calledWith(spy, constants.EVENT_DID_PUSH, eventCallback);
  });

  it('registers for onWillPop event', () => {
    events.onWillPop(eventCallback);
    sinon.assert.calledWith(spy, constants.EVENT_WILL_POP, eventCallback);
  });

  it('registers for onDidPop event', () => {
    events.onDidPop(eventCallback);
    sinon.assert.calledWith(spy, constants.EVENT_DID_POP, eventCallback);
  });

  it('registers for onWillReplace event', () => {
    events.onWillReplace(eventCallback);
    sinon.assert.calledWith(spy, constants.EVENT_WILL_REPLACE, eventCallback);
  });

  it('registers for onDidReplace event', () => {
    events.onDidReplace(eventCallback);
    sinon.assert.calledWith(spy, constants.EVENT_DID_REPLACE, eventCallback);
  });

  it('registers for onWillReset event', () => {
    events.onWillReset(eventCallback);
    sinon.assert.calledWith(spy, constants.EVENT_WILL_RESET, eventCallback);
  });

  it('registers for onDidReset event', () => {
    events.onDidReset(eventCallback);
    sinon.assert.calledWith(spy, constants.EVENT_DID_RESET, eventCallback);
  });
});
