import stack from './index';

describe('Stack', () => {
  beforeEach(() => {
    stack.clear();
  });

  describe('add()', () => {
    it('should correctly add an entry', () => {
      const route = {
        pathname: '/myroute',
      };

      stack.add('123', route);

      expect(stack.getAll().size).toBe(1);
      expect(stack.get('123')).toEqual(route);
    });

    it('should not add when params are missing', () => {
      stack.add();
      expect(stack.getAll().size).toBe(0);
    });
  });

  describe('first()', () => {
    it('should correctly return the first entry', () => {
      stack.add('123', { a: 1 });
      stack.add('456', { a: 2 });

      expect(stack.first()).toEqual(['123', { a: 1 }]);
    });

    it('should return null when stack is empty', () => {
      expect(stack.first()).toBeNull();
    });
  });

  describe('get()', () => {
    it('should correctly get an entry', () => {
      const route = {
        pathname: '/myroute',
      };

      stack.add('123', route);
      expect(stack.get('123')).toEqual(route);
    });

    it('should return null when entry is not found', () => {
      expect(stack.get('invalid')).toBe(null);
    });
  });

  describe('getByIndex()', () => {
    it('should return null when no index is given', () => {
      expect(stack.getByIndex()).toBeNull();
    });
  });

  describe('getAll()', () => {
    it('should correctly return the complete map', () => {
      stack.add('123', {});
      const entries = stack.getAll();
      expect(entries instanceof Map).toBeTruthy();
      expect(entries.size).toBe(1);
    });
  });

  describe('last()', () => {
    it('should correctly return the last entry', () => {
      stack.add('123', { a: 1 });
      stack.add('456', { a: 2 });

      expect(stack.last()).toEqual(['456', { a: 2 }]);
    });

    it('should return null when stack is empty', () => {
      expect(stack.last()).toBeNull();
    });
  });

  describe('remove()', () => {
    it('should correctly remove an entry', () => {
      stack.add('123', {});
      stack.add('456', {});
      stack.remove('123');

      expect(stack.get('123')).toBeNull();
      expect(stack.get('456')).toBeTruthy();
      expect(stack.getAll().size).toBe(1);
    });
  });

  describe('update()', () => {
    it('should correctly update an entry', () => {
      stack.add('123', { a: 1 });
      stack.update('123', { a: 2 });

      expect(stack.get('123')).toEqual({ a: 2 });
    });

    it('should not update when id is missing', () => {
      stack.add('123', { a: 1 });
      stack.update();

      expect(stack.get('123')).toEqual({ a: 1 });
    });

    it('should not update when id is not inside stack', () => {
      stack.add('123', { a: 1 });
      stack.update('456', { a: 2 });

      expect(stack.get('123')).toEqual({ a: 1 });
    });
  });

  describe('clear()', () => {
    it('should remove all entries', () => {
      stack.add('123', { a: 1 });
      stack.clear();

      expect(stack.getAll().size).toBe(0);
    });
  });
});

