import conductor from '@virtuous/conductor';
import getRouteById from './';

describe('Helpers - getRouteById', () => {
  beforeAll(() => {
    conductor.register('/mypage');
    conductor.push('/mypage');
  });

  it('should return null when id is not found', () => {
    const route = getRouteById('blah');
    expect(route).toBeNull();
  });

  it('should return an existing id', () => {
    conductor.push('/mypage');
    const { id } = conductor.stack[conductor.stack.length - 1];
    const route = getRouteById(id);
    expect(route.id).toEqual(id);
  });
});
