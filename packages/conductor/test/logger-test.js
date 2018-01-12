import proxyquire from 'proxyquire';
import sinon from 'sinon';

const proxy = {
  logger: {
    warn: sinon.spy(),
  },
};

const { logInvalidCallback } = proxyquire('../src/logger', proxy);

describe('logger', () => {
  describe('logInvalidCallback', () => {
    it('should log a warning', () => {
      logInvalidCallback('customEvent', 'undefined');
    });
  });
});
