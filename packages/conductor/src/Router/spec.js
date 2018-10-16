import router from './index';
import stack from '../Stack';
import emitter from '../emitter';
import * as constants from '../constants';
import * as errors from './errors';

const pathname1 = '/myroute/123';
const pattern1 = '/myroute/:id';
const dateNowSpy = jest.spyOn(Date, 'now').mockImplementation(() => 123456);

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
      expect(typeof router.patterns[pattern1].match).toBe('function');
    });

    it('should correctly register a pattern with a transform function', () => {
      /**
       * @returns {Object}
       */
      const transform = () => ({});
      router.register('/test', transform);

      expect(typeof router.patterns['/test'].transform).toBe('function');
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

    it('should transform the route when pushed', async () => {
      /**
       * @param {Object} route The route object.
       * @returns {Object}
       */
      const transform = route => ({
        params: {
          test: route.query.search,
        },
        state: {
          searchActive: !!route.query.search,
        },
      });

      router.register('/test', transform);

      await router.push({ pathname: '/test?search=hello' });

      const [, route] = stack.last();
      expect(route.pathname).toBe('/test');
      expect(route.params).toEqual({ test: 'hello' });
      expect(route.state).toEqual({ searchActive: true });
    });

    it('should remove all forward routes from the stack', async () => {
      await router.push({ pathname: '/myroute/456' });
      await router.push({ pathname: '/myroute/789' });

      expect(stack.getAll().size).toBe(3);

      await router.pop({ steps: 2 });
      await router.push({ pathname: '/myroute/abc' });

      expect(router.routeIndex).toBe(1);
      expect(stack.getAll().size).toBe(2);
      expect(stack.getByIndex(1).pathname).toBe('/myroute/abc');
    });

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

  describe('replace()', () => {
    it('should replace correctly', async () => {
      const willCallback = jest.fn();
      const didCallback = jest.fn();
      emitter.once(constants.EVENT_WILL_REPLACE, willCallback);
      emitter.once(constants.EVENT_DID_REPLACE, didCallback);

      await router.replace({
        pathname: '/myroute/456',
        state: { test: 123 },
      });

      const [, route] = stack.first();

      expect(stack.getAll().size).toBe(1);
      expect(route.pathname).toBe('/myroute/456');
      expect(route.state).toEqual({ test: 123 });
      expect(willCallback).toHaveBeenCalledWith(route.id);
      expect(didCallback).toHaveBeenCalledWith(route.id);
    });

    it('should reject when params are missing', () => (
      router.replace().catch(error => (
        expect(error).toEqual(new Error(errors.EPARAMSMISSING))
      ))
    ));

    it('should reject when params are empty', () => (
      router.replace({}).catch(error => (
        expect(error).toEqual(new Error(errors.EPARAMSEMPTY))
      ))
    ));

    it('should not emit willPush event', () => {
      const params = {
        pathname: pathname1,
        emitBefore: false,
      };

      const callback = jest.fn();

      emitter.once(constants.EVENT_WILL_REPLACE, callback);

      return router.replace(params).then(() => {
        expect(callback).not.toHaveBeenCalled();
      });
    });

    it('should not emit didPush event', () => {
      const params = {
        pathname: pathname1,
        emitAfter: false,
      };

      const callback = jest.fn();
      emitter.once(constants.EVENT_DID_REPLACE, callback);

      return router.replace(params).then(() => {
        expect(callback).not.toHaveBeenCalled();
      });
    });

    it('should reject when pathname cannot be matched', () => {
      const params = {
        pathname: pathname1,
      };

      return router.replace(params).catch(error => (
        expect(error).toEqual(new Error(errors.EINVALIDPATHNAME))
      ));
    });
  });

  describe('reset()', () => {
    it('should correctly reset to the first route', (done) => {
      const [firstId] = stack.first();

      const willCallback = jest.fn();
      const didCallback = jest.fn();
      emitter.once(constants.EVENT_WILL_RESET, willCallback);
      emitter.once(constants.EVENT_DID_RESET, didCallback);

      router.push({ pathname: '/myroute/456' });
      router.push({ pathname: '/myroute/789' });

      router.reset().then((id) => {
        expect(id).toBe(firstId);
        expect(willCallback).toHaveBeenCalledWith(firstId);
        expect(didCallback).toHaveBeenCalledWith(firstId);
        done();
      });
    });

    it('should not reset when there is only one route', (done) => {
      const willCallback = jest.fn();
      emitter.once(constants.EVENT_WILL_RESET, willCallback);

      router.reset().catch(() => {
        expect(willCallback).not.toHaveBeenCalled();
        done();
      });
    });
  });

  describe('resetTo()', () => {
    it('should correctly reset to the specified route', async (done) => {
      const willCallback = jest.fn();
      const didCallback = jest.fn();

      emitter.once(constants.EVENT_WILL_RESET, willCallback);
      emitter.once(constants.EVENT_DID_RESET, didCallback);

      await router.push({ pathname: '/myroute/456' });

      router.resetTo('/myroute/789').then((id) => {
        const [, route] = stack.first();
        expect(route.id).toBe(id);
        expect(route.pathname).toBe('/myroute/789');
        expect(stack.getAll().size).toBe(1);
        expect(willCallback).toHaveBeenCalledWith(id);
        expect(didCallback).toHaveBeenCalledWith(id);
        done();
      });
    });

    it('should not reset when pathname is missing', () => (
      router.resetTo().catch(error => (
        expect(error).toEqual(new Error(errors.EMISSINGPATHNAME))
      ))
    ));

    it('should not reset to non-matching pathname', () => (
      router.resetTo('/invalid/path').catch(error => (
        expect(error).toEqual(new Error(errors.EINVALIDPATHNAME))
      ))
    ));
  });

  describe('update()', () => {
    it('should correctly update/override a route`s state', async () => {
      const [id, route] = stack.last();
      const callback = jest.fn();
      emitter.once(constants.EVENT_UPDATE, callback);

      await router.update(id, { test: 123 });
      expect(route.state).toEqual({ test: 123 });
      expect(route.updated).toEqual(dateNowSpy());

      expect(callback).toHaveBeenCalledWith(id);

      await router.update(id, { test: 456 });
      expect(route.state).toEqual({ test: 456 });
    });

    it('should reject when id is missing', () => {
      router.update().catch(error => (
        expect(error).toEqual(new Error(errors.EPARAMSINVALID))
      ));
    });

    it('should reject when state is missing', () => {
      router.update(12345).catch(error => (
        expect(error).toEqual(new Error(errors.EPARAMSINVALID))
      ));
    });

    it('should reject when state is empty', () => {
      router.update(12345, {}).catch(error => (
        expect(error).toEqual(new Error(errors.EPARAMSINVALID))
      ));
    });

    it('should reject when id doesn`t match a route', () => {
      router.update(12345, { test: 123 }).catch(error => (
        expect(error).toEqual(new Error(errors.EINVALIDID))
      ));
    });
  });
});
