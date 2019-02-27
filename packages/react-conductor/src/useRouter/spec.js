import { router } from '@virtuous/conductor';
import {
  push,
  pop,
  replace,
  reset,
  resetTo,
} from './index';

const params = {
  pathname: '123',
  state: { something: true },
};

describe('useRouter()', () => {
  it('should provide router actions', () => {
    const spyPush = jest.spyOn(router, 'push');
    const spyPop = jest.spyOn(router, 'pop');
    const spyReplace = jest.spyOn(router, 'replace');
    const spyReset = jest.spyOn(router, 'reset');
    const spyResetTo = jest.spyOn(router, 'resetTo');

    push(params);
    pop(params);
    replace(params);
    reset();
    reset(params.state);
    resetTo(params);

    expect(spyPush).toHaveBeenCalledWith(params);
    expect(spyPop).toHaveBeenCalledWith(params);
    expect(spyReplace).toHaveBeenCalledWith(params);
    expect(spyReset).toHaveBeenNthCalledWith(1, null);
    expect(spyReset).toHaveBeenNthCalledWith(2, params.state);
    expect(spyResetTo).toHaveBeenCalledWith(params.pathname, params.state);
  });
});
