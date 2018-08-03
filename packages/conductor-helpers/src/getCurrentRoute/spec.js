import conductor from '@virtuous/conductor';
import getCurrentRoute from './index';

describe('Helpers - getCurrentRoute', () => {
  describe('Error Cases', () => {
    it('should return null when stack is empty', () => {
      const route = getCurrentRoute();
      expect(route).toBeNull();
    });
  });

  describe('Correct Route', () => {
    beforeAll(() => {
      conductor.register('/mypage');
      conductor.register('/mypage2');
      conductor.push('/mypage');
      conductor.push('/mypage2');
    });

    it('should be correct after PUSH', () => {
      const route = getCurrentRoute();
      expect(route.pattern).toEqual('/mypage2');
    });

    it('should be correct after POP', () => {
      conductor.pop();
      const route = getCurrentRoute();
      expect(route.pattern).toEqual('/mypage');
    });

    it('should be correct after REPLACE', () => {
      conductor.replace('/mypage2');
      const route = getCurrentRoute();
      expect(route.pattern).toEqual('/mypage2');
    });
  });
});
