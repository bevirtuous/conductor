import router from './index';
import stack from '../Stack';
import emitter from '../emitter';
import * as constants from '../constants';
import * as errors from './errors';

const pathname1 = '/myroute/123';
const pattern1 = '/myroute/:id';

describe('Conductor', () => {
  beforeEach(() => {
    stack.constructor();
    router.constructor();
    router.register(pattern1);
  });

  describe('constructor()', () => {
    it('should set an initial stack entry', () => {
      const [, entry] = stack.first();

      expect(stack.getAll().size).toBe(1);
      expect(entry.pathname).toBe(pathname1);
    });
  });

  describe('register()', () => {
    it('should correctly register a pattern with a matching function', () => {
      expect(typeof router.patterns[pattern1]).toBe('function');
    });

    it('should not register with missing pattern', () => {
      expect(router.register).toThrowError(errors.EMISSINGPATTERN);
    });

    it('should not register with invalid type', () => {
      expect(() => router.register(123)).toThrowError(errors.EINVALIDPATTERN);
    });

    it('should update initial entry when matching pattern is registered', () => {
      const [, route] = stack.first();

      expect(route.pattern).toEqual(pattern1);
      expect(route.params).toEqual({ id: '123' });
    });
  });

  describe('push()', () => {
    it('should resolve correctly', () => {
      const params = {
        pathname: pathname1,
      };

      const willCallback = jest.fn();
      const didCallback = jest.fn();

      emitter.once(constants.EVENT_WILL_PUSH, willCallback);
      emitter.once(constants.EVENT_DID_PUSH, didCallback);

      return router.push(params).then((id) => {
        // Id was returned correctly.
        expect(typeof id).toBe('string');

        // Route index was updated.
        expect(router.routeIndex).toBe(1);

        expect(willCallback).toBeCalledWith(id);
        expect(didCallback).toBeCalledWith(id);

        const route = stack.get(id);

        expect(route).toBeTruthy();
        expect(route.constructor.name === 'Route').toBeTruthy();
        expect(router.history.location.pathname).toBe(pathname1);
      });
    });

    // it('should remove all next routes from the stack', () => (
      // Needs pop() to work
    // ));

    it('should reject when params are missing', () => (
      router.push().catch(error => (
        expect(error).toEqual(new Error(errors.EPARAMSMISSING))
      ))
    ));

    it('should reject when params are empty', () => (
      router.push({}).catch(error => (
        expect(error).toEqual(new Error(errors.EPARAMSEMPTY))
      ))
    ));

    it('should not emit willPush event', () => {
      const params = {
        pathname: pathname1,
        emitBefore: false,
      };

      const callback = jest.fn();

      emitter.once(constants.EVENT_WILL_PUSH, callback);

      return router.push(params).then(() => {
        expect(callback).not.toHaveBeenCalled();
      });
    });

    it('should not emit didPush event', () => {
      const params = {
        pathname: pathname1,
        emitAfter: false,
      };

      const callback = jest.fn();
      emitter.once(constants.EVENT_DID_PUSH, callback);

      return router.push(params).then(() => {
        expect(callback).not.toHaveBeenCalled();
      });
    });

    it('should reject when pathname cannot be matched', () => {
      const params = {
        pathname: pathname1,
      };

      return router.push(params).catch(error => (
        expect(error).toEqual(new Error(errors.EINVALIDPATHNAME))
      ));
    });
  });

  describe('pop()', () => {
    it('should resolve correctly', async () => {
      const willCallback = jest.fn();
      const didCallback = jest.fn();

      emitter.once(constants.EVENT_WILL_POP, willCallback);
      emitter.once(constants.EVENT_DID_POP, didCallback);

      await router.push({ pathname: '/myroute/456' });
      await router.pop().then((id) => {
        const route = stack.getByIndex(0);

        expect(stack.getAll().size).toBe(2);
        expect(router.routeIndex).toBe(0);
        expect(route.id).toEqual(id);
        expect(willCallback).toHaveBeenCalledWith(id);
        expect(didCallback).toHaveBeenCalledWith(id);
        expect(router.history.location.pathname).toBe(pathname1);
      });
    });

    it('should pop multiple routes', async () => {
      await router.push({ pathname: '/myroute/456' });
      await router.push({ pathname: '/myroute/789' });
      await router.pop({ steps: 2 }).then((id) => {
        const { id: currentId } = stack.getByIndex(router.routeIndex);
        expect(currentId).toEqual(id);
      });
    });

    it('should not pop when stack has less than 2 entries', async () => {
      await router.pop().catch(error => (
        expect(error).toEqual(new Error(errors.ESTACKLENGTH))
      ));
    });

    it('should not pop when steps is negative', async () => {
      await router.push({ pathname: '/myroute/456' });
      await router.pop({ steps: -3 }).catch(error => (
        expect(error).toEqual(new Error(errors.EINVALIDSTEPS))
      ));
    });

    it('should clamp when steps is larger than the stack', async () => {
      await router.push({ pathname: '/myroute/456' });
      await router.push({ pathname: '/myroute/789' });
      await router.pop({ steps: 5 }).then(id => (
        expect(id).toBe(stack.getByIndex(0).id)
      ));
    });

    it('should not emit willPop event', async () => {
      const callback = jest.fn();
      emitter.once(constants.EVENT_WILL_POP, callback);

      await router.push({ pathname: '/myroute/456' });

      return router.pop({ emitBefore: false }).then(() => {
        expect(callback).not.toHaveBeenCalled();
      });
    });

    it('should not emit didPop event', async () => {
      const callback = jest.fn();
      emitter.once(constants.EVENT_DID_POP, callback);

      await router.push({ pathname: '/myroute/456' });

      return router.pop({ emitAfter: false }).then(() => {
        expect(callback).not.toHaveBeenCalled();
      });
    });
  });
});
