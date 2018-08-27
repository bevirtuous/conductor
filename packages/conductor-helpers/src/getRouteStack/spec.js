import conductor from '@virtuous/conductor';
import getRouteStack from './index';

describe('Helpers - getRouteStack', () => {
  beforeAll(() => {
    conductor.register('/mypage');
  });

  it('should return the route stack', () => {
    const stack = getRouteStack();
    expect(stack.length).toEqual(1);
  });
});
