import router from './index';
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

    it('should update initial entry when matching pattern is registered', () => {
      // expect(() => router.register(123)).toThrowError(errors.EINVALIDPATTERN);
    });
  });

  describe('push()', () => {
    it('should resolve correctly', () => {
      const params = {
        pathname: '/myroute',
      };

      return router.push(params).then((id) => {
        // Id was returned correctly.
        expect(typeof id).toBe('string');

        // Route index was updated.
        expect(router.routeIndex).toBe(2);
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

    // it('should reject when already routing', () => {

    // });
  });
});
