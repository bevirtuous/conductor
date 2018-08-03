import conductor from '@virtuous/conductor';
import getPreviousRoute from './index';

describe('Helpers - getPreviousRoute', () => {
  beforeAll(() => {
    conductor.register('/mypage');
    conductor.register('/mypage2');
  });

  describe('Error Cases', () => {
    it('should return null when stack is empty', () => {
      const route = getPreviousRoute();
      expect(route).toBeNull();
    });

    it('should return null when stack has 1 item', () => {
      conductor.push('/mypage');
      const route = getPreviousRoute();
      expect(route).toBeNull();
    });
  });

  describe('Correct Route', () => {
    it('should return previous route', () => {
      conductor.push('/mypage2');
      const route = getPreviousRoute();
      expect(route.pattern).toEqual('/mypage');
    });
  });
});
