import conductor from '@virtuous/conductor';
import getRouteStack from './index';

describe('Helpers - getRouteStack', () => {
  beforeAll(() => {
    conductor.register('/mypage');
  });

  it('should return empty array when stack is empty', () => {
    const stack = getRouteStack();
    expect(stack).toEqual([]);
  });

  it('should return the route stack', () => {
    conductor.push('/mypage');
    const stack = getRouteStack();
    expect(stack.length).toEqual(1);
  });
});
