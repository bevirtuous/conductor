import React from 'react';
import { render } from 'react-testing-library';
import { router, stack } from '@virtuous/conductor';
import Router from '../Router';
import Route from '../Route';
import useRoute from '.';

let useRoute1 = null;

/**
 * @returns {null}
 */
function MyComponent() {
  useRoute1 = useRoute();
  return null;
}

describe('useRoute()', () => {
  beforeAll(() => {
    router.register('/test');
  });

  it('should use the current route or the given route id', async () => {
    render((
      <Router>
        <Route path="/myroute/123">
          <MyComponent />
        </Route>
      </Router>
    ));

    const { transform, ...route } = stack.getByIndex(router.routeIndex);

    expect(useRoute1).toMatchObject({
      ...route,
      update: expect.any(Function),
    });

    // Ensure that the used context id was updated when a new route was pushed.
    const newState = {
      hi: 5,
    };

    useRoute1.update(newState);

    expect(stack.get(useRoute1.id).state).toEqual({ hi: 5 });
  });
});
