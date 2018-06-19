import conductor from '@virtuous/conductor';
import isRouteOpen from './';

describe('Helpers - isRouteOpen', () => {
  beforeAll(() => {
    conductor.register('/mypage');
  });

  it('should return false when route is not open', () => {
    const isOpen = isRouteOpen('/mypage');
    expect(isOpen).toBeFalsy();
  });

  it('should return true when route is open', () => {
    conductor.push('/mypage');
    const isOpen = isRouteOpen('/mypage');
    expect(isOpen).toBeTruthy();
  });
});
