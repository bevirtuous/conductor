import proxyquire from 'proxyquire';
import sinon from 'sinon';

const emitter = {
  addListener: sinon.spy(),
};

const proxy = {
  '@virtuous/conductor/emitter': {
    default: emitter,
  },
};

const addCallback = proxyquire('../src/addCallback', proxy).default;

describe('addCallback()', () => {
  it('should not add the callback on wrong type', () => {
    addCallback('some', 'wrong');
    sinon.assert.notCalled(emitter.addListener);
  });

  it('should register a new callback', () => {
    addCallback('some', () => {});
    sinon.assert.calledOnce(emitter.addListener);
  });
});
