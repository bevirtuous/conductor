import React from 'react';
import { cleanup, render } from 'react-testing-library';
import {
  emitter,
  router,
  ON_PUSH,
  ON_POP,
  ON_REPLACE,
  ON_RESET,
} from '@virtuous/conductor';
import useRouter from './index';

const {
  push,
  pop,
  replace,
  reset,
  resetTo,
  didPush,
  didPop,
  didReplace,
  didReset,
} = useRouter();

const params = {
  pathname: '123',
  state: { something: true },
};

const spyPush = jest.spyOn(router, 'push');
const spyPop = jest.spyOn(router, 'pop');
const spyReplace = jest.spyOn(router, 'replace');
const spyReset = jest.spyOn(router, 'reset');
const spyResetTo = jest.spyOn(router, 'resetTo');

describe('useRouter()', () => {
  it('should provide router functions', () => {
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

  it('should register and de-register events', async () => {
    function MyComponent() {
      didPush(() => {});
      didPop(() => {});
      didReplace(() => {});
      didReset(() => {});

      return <div />;
    }

    render(<MyComponent />);

    // Make sure that the listeners are setup.
    expect(emitter.listenerCount(ON_PUSH)).toBe(1);
    expect(emitter.listenerCount(ON_POP)).toBe(1);
    expect(emitter.listenerCount(ON_REPLACE)).toBe(1);
    expect(emitter.listenerCount(ON_RESET)).toBe(1);

    // Unmount everything to trigger useEffect cleanup.
    cleanup();

    // Make sure that the listeners were reset.
    expect(emitter.listenerCount(ON_PUSH)).toBe(0);
    expect(emitter.listenerCount(ON_POP)).toBe(0);
    expect(emitter.listenerCount(ON_REPLACE)).toBe(0);
    expect(emitter.listenerCount(ON_RESET)).toBe(0);
  });
});
