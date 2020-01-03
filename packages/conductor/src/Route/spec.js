import Route from './index';

Date.now = () => 123456789;

describe('Route', () => {
  describe('constructor()', () => {
    it('should correctly initialise', () => {
      const route = new Route({
        pathname: '/myroute/123?search=hello#headline',
        pattern: '/myroute/:id',
        state: {
          a: 1,
          b: 2,
        },
      });

      expect(route.location).toBe('/myroute/123?search=hello#headline');
      expect(route.pathname).toBe('/myroute/123');
      expect(route.pattern).toBe('/myroute/:id');
      expect(route.params).toEqual({ id: '123' });
      expect(route.query).toEqual({ search: 'hello' });
      expect(route.hash).toBe('headline');
      expect(route.state).toEqual({ a: 1, b: 2 });
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
});

