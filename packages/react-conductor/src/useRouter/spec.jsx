import React from 'react';
import { cleanup, render } from 'react-testing-library';
import {
  emitter,
  router,
  EVENT_DID_PUSH,
  EVENT_WILL_PUSH,
  EVENT_DID_POP,
  EVENT_WILL_POP,
  EVENT_DID_REPLACE,
  EVENT_WILL_REPLACE,
  EVENT_DID_RESET,
  EVENT_WILL_RESET,
} from '@virtuous/conductor';
import useRouter from './index';

const {
  push,
  pop,
  replace,
  reset,
  resetTo,
  willPush,
  didPush,
  willPop,
  didPop,
  willReplace,
  didReplace,
  willReset,
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
      willPush(() => {});
      didPush(() => {});

      willPop(() => {});
      didPop(() => {});

      willReplace(() => {});
      didReplace(() => {});

      willReset(() => {});
      didReset(() => {});

      return <div />;
    }

    render(<MyComponent />);

    // Make sure that the listeners are setup.
    expect(emitter.listenerCount(EVENT_WILL_PUSH)).toBe(1);
    expect(emitter.listenerCount(EVENT_DID_PUSH)).toBe(1);
    expect(emitter.listenerCount(EVENT_WILL_POP)).toBe(1);
    expect(emitter.listenerCount(EVENT_DID_POP)).toBe(1);
    expect(emitter.listenerCount(EVENT_WILL_REPLACE)).toBe(1);
    expect(emitter.listenerCount(EVENT_DID_REPLACE)).toBe(1);
    expect(emitter.listenerCount(EVENT_WILL_RESET)).toBe(1);
    expect(emitter.listenerCount(EVENT_DID_RESET)).toBe(1);

    // Unmount everything to trigger useEffect cleanup.
    cleanup();

    // Make sure that the listeners were reset.
    expect(emitter.listenerCount(EVENT_WILL_PUSH)).toBe(0);
    expect(emitter.listenerCount(EVENT_DID_PUSH)).toBe(0);
    expect(emitter.listenerCount(EVENT_WILL_POP)).toBe(0);
    expect(emitter.listenerCount(EVENT_DID_POP)).toBe(0);
    expect(emitter.listenerCount(EVENT_WILL_REPLACE)).toBe(0);
    expect(emitter.listenerCount(EVENT_DID_REPLACE)).toBe(0);
    expect(emitter.listenerCount(EVENT_WILL_RESET)).toBe(0);
    expect(emitter.listenerCount(EVENT_DID_RESET)).toBe(0);
  });
});
