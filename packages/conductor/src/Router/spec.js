import router from './index';
import stack from '../Stack';
import emitter from '../emitter';
import history from '../history';
import * as constants from '../constants';
import * as errors from './errors';

const pattern1 = '/myroute';

describe('Conductor', () => {
  beforeEach(() => {
    router.constructor();
  });

  describe('constructor()', () => {
    // it('should set an initial stack entry', () => {

    // });
  });

  describe('register()', () => {
    it('should correctly register a pattern with a matching function', () => {
      router.register(pattern1);
      expect(typeof router.patterns[pattern1]).toBe('function');
    });

    it('should not register with missing pattern', () => {
      expect(router.register).toThrowError(errors.EMISSINGPATTERN);
    });

    it('should not register with invalid type', () => {
      expect(() => router.register(123)).toThrowError(errors.EINVALIDPATTERN);
    });

    // it('should update initial entry when matching pattern is registered', () => {

    // });
  });

  describe('push()', () => {
    it('should resolve correctly', () => {
      const params = {
        pathname: pattern1,
      };

      router.register(pattern1);

      const willCallback = jest.fn();
      const didCallback = jest.fn();

      emitter.once(constants.EVENT_WILL_PUSH, willCallback);
      emitter.once(constants.EVENT_DID_PUSH, didCallback);

      return router.push(params).then((id) => {
        // Id was returned correctly.
        expect(typeof id).toBe('string');

        // Route index was updated.
        expect(router.routeIndex).toBe(2);

        expect(willCallback).toBeCalledWith(id);
        expect(didCallback).toBeCalledWith(id);

        const route = stack.get(id);

        expect(route).toBeTruthy();
        expect(route.constructor.name === 'Route').toBeTruthy();
      });
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

    it('should reject when pathname cannot be matched', () => {
      const params = {
        pathname: pattern1,
      };

      return router.push(params).catch(error => (
        expect(error).toEqual(new Error(errors.EINVALIDPATHNAME))
      ));
    });

    it('should only emit willPush event', () => {
      const params = {
        pathname: pattern1,
        emitBefore: false,
      };

      const callback = jest.fn();

      router.register(pattern1);

      emitter.once(constants.EVENT_WILL_PUSH, callback);

      return router.push(params).then(() => {
        expect(callback).not.toHaveBeenCalled();
      });
    });

    it('should only emit didPush event', () => {
      const params = {
        pathname: pattern1,
        emitAfter: false,
      };

      const callback = jest.fn();

      router.register(pattern1);

      emitter.once(constants.EVENT_DID_PUSH, callback);

      return router.push(params).then(() => {
        expect(callback).not.toHaveBeenCalled();
      });
    });

    // it('should resolve correctly with a native event', () => {

    // });

    // it('should reject when already routing', () => {

    // });
  });
});
