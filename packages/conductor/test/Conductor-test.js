import assert from 'assert';
import sinon from 'sinon';
import matcher from '../src/matcher';
import { Uninitialized as Conductor } from '../src/Conductor';
import { isObject } from '../src/helpers';

const mockId = 'someId';
const mockPattern = '/something';
const mockPathname = '/something';
const emitter = {
  emit: sinon.spy(),
};
const history = {
  listen: sinon.spy(),
  push: sinon.spy(),
  go: sinon.spy(),
};
let conductor;

describe('Conductor', () => {
  beforeEach(() => {
    emitter.emit.resetHistory();
    history.listen.resetHistory();
    history.push.resetHistory();
    history.go.resetHistory();
    conductor = new Conductor(emitter, history);
  });

  describe.skip('constructor()', () => {
    it('should be initialized correctly', () => {
      assert.ok(conductor instanceof Conductor);
      assert.equal(conductor.error, null);
      assert.ok(isObject(conductor.routes));
      assert.ok(Array.isArray(conductor.stack));
      assert.equal(conductor.isRouterAction, false);
      sinon.assert.calledOnce(history.listen);
    });
  });

  describe.skip('handleHistoryEvent()', () => {
    it('should reset the isRouterAction flag', () => {
      const spy = sinon.spy(conductor, 'unsetIsRouterAction');
      conductor.handleHistoryEvent({}, 'PUSH');
      sinon.assert.calledOnce(spy);
    });

    it('should call the pop action', () => {
      const spy = sinon.stub(conductor, 'pop');
      conductor.handleHistoryEvent({}, 'POP');
      sinon.assert.calledOnce(spy);
      spy.reset();
    });
  });

  describe.skip('register()', () => {
    it('should throw an error if no ID is passed', () => {
      conductor.register(null, '/something');
      sinon.assert.calledOnce(emitter.emit);
    });

    it('should throw an error if no pattern is passed', () => {
      conductor.register('something', null);
      sinon.assert.calledOnce(emitter.emit);
    });

    it('should register a new route', () => {
      const expected = {
        [mockPattern]: {
          id: mockId,
          pattern: mockPattern,
        },
      };
      conductor.register(mockId, mockPattern);
      assert.equal(JSON.stringify(expected), JSON.stringify(conductor.routes));
    });
  });

  describe.skip('push()', () => {
    it('should check if it is the active path', () => {
      const spy1 = sinon.spy(conductor, 'isActivePath');
      const spy2 = sinon.spy(conductor, 'setIsRouterAction');
      const spy3 = sinon.spy(conductor, 'doMatchLoop');
      const spy4 = sinon.spy(conductor, 'handlePush');
      conductor.stack.push({ pathname: '/something/else' });
      conductor.routes[mockPattern] = {
        id: mockId,
        pattern: mockPattern,
        match: matcher(mockPattern),
      };
      conductor.push(mockPathname, {});
      sinon.assert.calledOnce(spy1);
      sinon.assert.calledOnce(spy2);
      sinon.assert.calledOnce(spy3);
      sinon.assert.called(spy4);
    });

    it('should skip the push if is current pathname', () => {
      const spy1 = sinon.spy(conductor, 'isActivePath');
      const spy2 = sinon.spy(conductor, 'setIsRouterAction');
      const spy3 = sinon.spy(conductor, 'doMatchLoop');
      const spy4 = sinon.spy(conductor, 'handlePush');
      conductor.stack.push({ pathname: mockPathname });
      conductor.push(mockPathname, {});
      sinon.assert.calledOnce(spy1);
      sinon.assert.notCalled(spy2);
      sinon.assert.notCalled(spy3);
      sinon.assert.notCalled(spy4);
    });
  });

  describe.skip('handlePush()', () => {
    it('should send willLeave event', () => {
      const spy = sinon.stub(conductor, 'sendEvent');
      conductor.stack.push({
        id: '123',
        pathname: '/something/else',
      });
      conductor.stack.push({
        id: mockId,
        pathname: mockPathname,
      });
      conductor.handlePush(
        '/new/path',
        {},
        {
          id: 'newID',
          pattern: '/new/path',
        }
      );
      sinon.assert.calledThrice(spy);
    });
  });
});
