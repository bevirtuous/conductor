import Route from './index';

Date.now = () => 123456789;

describe('Stack', () => {
  describe('constructor()', () => {
    it('should correctly initialise', () => {
      const route = new Route({
        pathname: '/myroute/123?search=hello#headline',
        pattern: '/myroute/:id',
        state: {
          a: 1,
          b: 2,
        },
        transform: () => ({
          state: {
            b: 3,
            c: 4,
          },
        }),
      });

      expect(route.location).toBe('/myroute/123?search=hello#headline');
      expect(route.pathname).toBe('/myroute/123');
      expect(route.pattern).toBe('/myroute/:id');
      expect(route.params).toEqual({ id: '123' });
      expect(route.query).toEqual({ search: 'hello' });
      expect(route.hash).toBe('headline');
      expect(route.state).toEqual({ a: 1, b: 3, c: 4 });
      expect(route.created).toEqual(123456789);
      expect(route.updated).toBeNull();
    });

    it('should set params to be empty when pattern is missing ', () => {
      const route = new Route({
        pathname: '/myroute/123?search=hello',
      });

      expect(route.params).toEqual({});
    });

    it('should set query and state to be empty when missing', () => {
      const route = new Route({
        pathname: '/myroute/123',
      });

      expect(route.query).toEqual({});
      expect(route.state).toEqual({});
    });

    it('should set hash to be null when missing', () => {
      const route = new Route({
        pathname: '/myroute/123',
      });

      expect(route.hash).toBeNull();
    });
  });

  describe('setState()', () => {
    it('should correctly update the state', () => {
      const route = new Route({
        pathname: '/myroute/123',
        pattern: '/myroute/:id',
        state: {
          a: 1,
        },
      });

      route.setState = {
        a: 2,
        b: 4,
      };

      expect(route.state).toEqual({
        a: 2,
        b: 4,
      });
    });

    it('should not update when state is empty', () => {
      const route = new Route({
        pathname: '/myroute/123',
        pattern: '/myroute/:id',
        state: {
          a: 1,
        },
      });

      route.setState = {};

      expect(route.state).toEqual({ a: 1 });
    });
  });
});

