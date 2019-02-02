import React from 'react';
import { render } from 'react-testing-library';
import { router, stack } from '@virtuous/conductor';
import { Router } from '../index';
import useRoute from './index';

let useRoute1 = null;
let useRoute2 = null;

/**
 * @returns {null}
 */
function MyComponent({ id = null }) {
  useRoute1 = useRoute();
  useRoute2 = useRoute(id);
  return null;
}

describe('useRoute()', () => {
  it('should use the current route or the given route id', async () => {
    router.register('/test');

    const { id } = stack.getByIndex(router.routeIndex);

    render((
      <Router>
        <MyComponent id={id} />
      </Router>
    ));

    expect(useRoute1.id).toEqual(stack.getByIndex(router.routeIndex).id);
    expect(useRoute2.id).toEqual(stack.getByIndex(router.routeIndex).id);

    await router.push({ pathname: '/test' });

    expect(useRoute1.id).toEqual(stack.getByIndex(router.routeIndex).id);
    // Ensure that the used context id was updated when a new route was pushed.
    expect(useRoute2.id).toEqual(stack.get(id).id);
  });

  // should return null when the given route id is invalid
});
