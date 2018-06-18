import getCurrentAction from '../getCurrentAction';
import sinon from 'sinon';
/**
 * The event callback to use in the tests.
 */
const eventCallback = () => { };

describe('Events', () => {
  it('returns the most recent history action', () => {
    events.onError(eventCallback);
    sinon.assert.calledWith(spy, constants.EVENT_ERROR, eventCallback);
  });
});

