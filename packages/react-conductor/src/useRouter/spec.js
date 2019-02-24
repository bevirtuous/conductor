import { router } from '@virtuous/conductor';
import {
  push,
  pop,
  replace,
  reset,
  resetTo,
} from './index';

const params = { pathname: '123' };

describe('useRouter()', () => {
  it('should provide router actions', () => {
    const spyPush = jest.spyOn(router, 'push');
    const spyPop = jest.spyOn(router, 'push');
    const spyReplace = jest.spyOn(router, 'push');
    const spyReset = jest.spyOn(router, 'push');
    const spyResetTo = jest.spyOn(router, 'push');

    push(params);
    pop(params);
    replace(params);
    reset();
    resetTo(params);

    expect(spyPush).toHaveBeenCalledWith(params);
    expect(spyPop).toHaveBeenCalledWith(params);
    expect(spyReplace).toHaveBeenCalledWith(params);
    expect(spyReset).toHaveBeenCalled();
    expect(spyResetTo).toHaveBeenCalledWith(params);
  });
});
