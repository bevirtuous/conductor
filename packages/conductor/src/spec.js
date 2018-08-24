import { Conductor } from './index';
import {
  EVENT_WILL_RESET,
  EVENT_DID_RESET,
  EVENT_WILL_PUSH,
  EVENT_DID_PUSH,
  EVENT_WILL_POP,
  EVENT_DID_POP,
  EVENT_WILL_REPLACE,
  EVENT_DID_REPLACE,
  EVENT_UPDATE,
} from './constants';
import emitter from './emitter';

let conductor;
let dateNowSpy;

describe('Conductor', () => {
  beforeAll(() => {
    dateNowSpy = jest.spyOn(Date, 'now').mockImplementation(() => 123456);
  });

  beforeEach(() => {
    conductor = new Conductor();
  });

  describe('register()', () => {
    it('should register a valid pattern', () => {
      const pattern = '/mypage';
      conductor.register(pattern);
      expect(conductor.routes[pattern]).toBeTruthy();
    });

    it('should not register an invalid pattern', () => {
      const pattern = 1234;
      conductor.register(pattern);
      expect(Object.keys(conductor.routes).length).toBe(0);
    });

    it('should not register a missing pattern', () => {
      conductor.register();
      expect(Object.keys(conductor.routes).length).toBe(0);
    });
  });

  describe('push()', () => {
    it('should push a route to the stack', (done) => {
      const callback = jest.fn();

      emitter.once(EVENT_WILL_PUSH, callback);
      emitter.once(EVENT_DID_PUSH, callback);

      conductor.register('/mypage');
      conductor.push('/mypage');

      expect(conductor.stack.length).toBe(1);
      expect(conductor.stack[conductor.stack.length - 1].pathname).toEqual('/mypage');

      setTimeout(() => {
        expect(callback).toHaveBeenCalledTimes(2);
        done();
      }, 1);
    });
  });

  describe('pop()', () => {
    it('should not pop when the stack has less than 2 entries inside', (done) => {
      const callback = jest.fn();

      emitter.once(EVENT_DID_POP, callback);

      conductor.register('/mypage');
      conductor.push('/mypage');
      conductor.pop();

      setTimeout(() => {
        expect(callback).toHaveBeenCalledTimes(0);
        done();
      }, 1);
    });

    it('should pop a route', (done) => {
      const callback = jest.fn();

      emitter.once(EVENT_WILL_POP, callback);
      emitter.once(EVENT_DID_POP, callback);

      conductor.register('/mypage');
      conductor.push('/mypage');
      conductor.push('/mypage');
      conductor.pop();

      setTimeout(() => {
        expect(callback).toHaveBeenCalledTimes(2);
        done();
      }, 50);
    });

    it('should pop multiple routes', (done) => {
      const callback = jest.fn();

      emitter.once(EVENT_WILL_POP, callback);
      emitter.once(EVENT_DID_POP, callback);

      conductor.register('/mypage');
      conductor.push('/mypage');
      conductor.push('/mypage');
      conductor.push('/mypage');
      conductor.pop(2);

      setTimeout(() => {
        expect(conductor.stack.length).toBe(1);
        expect(callback).toHaveBeenCalledTimes(2);
        done();
      }, 50);
    });

    it('should not pop when steps equals or exceeds the stack length', (done) => {
      const callback = jest.fn();

      emitter.once(EVENT_WILL_POP, callback);
      emitter.once(EVENT_DID_POP, callback);

      conductor.register('/mypage');
      conductor.push('/mypage');
      conductor.push('/mypage');
      conductor.push('/mypage');
      conductor.pop(3);

      setTimeout(() => {
        expect(conductor.stack.length).toBe(3);
        expect(callback).toHaveBeenCalledTimes(0);
        done();
      }, 50);
    });
  });

  describe('replace()', () => {
    it('should not replace when the stack is empty', (done) => {
      const callback = jest.fn();

      emitter.once(EVENT_WILL_REPLACE, callback);

      conductor.register('/mypage');
      conductor.replace('/mypage');

      expect(conductor.stack.length).toBe(0);

      setTimeout(() => {
        expect(callback).toHaveBeenCalledTimes(0);
        done();
      }, 1);
    });

    it('should replace a route', (done) => {
      const callback = jest.fn();

      emitter.once(EVENT_WILL_REPLACE, callback);
      emitter.once(EVENT_DID_REPLACE, callback);

      conductor.register('/mypage');
      conductor.register('/mypage2');
      conductor.push('/mypage');
      conductor.replace('/mypage2');

      expect(conductor.stack.length).toBe(1);
      expect(conductor.stack[conductor.stack.length - 1].pathname).toEqual('/mypage2');

      setTimeout(() => {
        expect(callback).toHaveBeenCalledTimes(2);
        done();
      }, 1);
    });
  });

  describe('reset()', () => {
    it('should reset to the first route in the stack', (done) => {
      const callback = jest.fn();

      emitter.once(EVENT_WILL_RESET, callback);
      emitter.once(EVENT_DID_RESET, callback);

      conductor.register('/mypage');
      conductor.register('/mypage2');
      conductor.push('/mypage');
      conductor.push('/mypage2');
      conductor.reset();

      expect(conductor.stack.length).toBe(1);
      expect(conductor.stack[conductor.stack.length - 1].pathname).toEqual('/mypage');

      setTimeout(() => {
        expect(callback).toHaveBeenCalledTimes(2);
        done();
      }, 1);
    });

    it('should not reset when stack only has a single entry', (done) => {
      const callback = jest.fn();

      emitter.once(EVENT_WILL_RESET, callback);
      emitter.once(EVENT_DID_RESET, callback);

      conductor.register('/mypage');
      conductor.push('/mypage');
      conductor.reset();

      expect(conductor.stack.length).toBe(1);
      expect(conductor.stack[conductor.stack.length - 1].pathname).toEqual('/mypage');

      setTimeout(() => {
        expect(callback).not.toBeCalled();
        done();
      }, 1);
    });
  });

  describe('update()', () => {
    it('should not update with missing id param', (done) => {
      const callback = jest.fn();

      emitter.once(EVENT_UPDATE, callback);

      conductor.register('/mypage');
      conductor.push('/mypage');
      conductor.update();

      setTimeout(() => {
        expect(callback).toHaveBeenCalledTimes(0);
        done();
      }, 1);
    });

    it('should not update with missing state param', (done) => {
      const callback = jest.fn();

      emitter.once(EVENT_UPDATE, callback);

      conductor.register('/mypage');
      conductor.push('/mypage');

      const { id } = conductor.stack[conductor.stack.length - 1];
      conductor.update(id);

      setTimeout(() => {
        expect(callback).toHaveBeenCalledTimes(0);
        done();
      }, 1);
    });

    it('should not update when no matching route found', (done) => {
      const callback = jest.fn();

      emitter.once(EVENT_UPDATE, callback);

      conductor.register('/mypage');
      conductor.push('/mypage');

      const { state } = conductor.stack[conductor.stack.length - 1];
      conductor.update('missingId', { a: 1 });

      expect(state).toEqual({});

      setTimeout(() => {
        expect(callback).toHaveBeenCalledTimes(0);
        done();
      }, 1);
    });

    it('should update a route', (done) => {
      const callback = jest.fn();

      emitter.once(EVENT_UPDATE, callback);

      conductor.register('/mypage');
      conductor.push('/mypage', { a: 1 });

      const { id } = conductor.stack[conductor.stack.length - 1];

      conductor.update(id, { b: 2 });

      const { state } = conductor.stack[conductor.stack.length - 1];

      expect(state).toEqual({
        a: 1,
        b: 2,
      });

      setTimeout(() => {
        expect(callback).toHaveBeenCalledTimes(1);
        done();
      }, 1);
    });
  });

  describe('addToStack()', () => {
    it('should correctly add a new route', () => {
      const pattern = '/mypage/:myParam';

      const pathname = '/mypage/thing?a=456&b=789';
      const route = { pattern };
      const id = 123;
      const state = {
        title: 'My Page',
      };

      const expected = {
        created: dateNowSpy(),
        id,
        params: {
          myParam: 'thing',
        },
        pathname,
        pattern,
        query: {
          a: '456',
          b: '789',
        },
        state,
        updated: null,
      };

      conductor.register(pattern);
      conductor.addToStack(pathname, route, id, state);

      const entry = conductor.stack[conductor.stack.length - 1];

      expect(entry).toEqual(expected);
    });
  });

  describe('doMatchLoop()', () => {
    it('should match a registered pattern', () => {
      const pattern = '/mypage';
      const callback = jest.fn();

      conductor.register(pattern);
      const match = conductor.doMatchLoop(pattern, callback);

      expect(match).toBeTruthy();
      expect(callback).toHaveBeenCalled();
    });

    it('should not match an unrecognised pattern', () => {
      const pattern = '/mypage';
      const callback = jest.fn();

      conductor.register(pattern);
      const match = conductor.doMatchLoop('/myotherpage', callback);

      expect(match).toBeFalsy();
      expect(callback).not.toBeCalled();
    });
  });
});
