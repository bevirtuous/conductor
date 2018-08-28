import stack from './index';

describe('Stack', () => {
  beforeEach(() => {
    stack.constructor();
  });

  describe('add()', () => {
    it('should correctly add an entry', () => {
      const route = {
        pathname: '/myroute',
      };

      stack.add('123', route);
      expect(stack.getAll().size).toBe(1);
    });

    it('should not add when params are missing', () => {
      stack.add();
      expect(stack.getAll().size).toBe(0);
    });
  });
});

