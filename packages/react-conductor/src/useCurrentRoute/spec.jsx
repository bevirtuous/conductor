import React from 'react';
import { render } from 'react-testing-library';
import { router, stack } from '@virtuous/conductor';
import Router from '../Router';
import Route from '../Route';
import useCurrentRoute from './index';

let useCurrentRoute1 = null;

/**
 * @returns {null}
 */
function MyComponent() {
  useCurrentRoute1 = useCurrentRoute();
  return null;
}

describe('useCurrentRoute()', () => {
  it('should use the current route or the given route id', () => {
    render((
      <Router>
        <Route path="/myroute/123">
          <MyComponent />
        </Route>
      </Router>
    ));

    const { transform, ...route } = router.getCurrentRoute();

    expect(useCurrentRoute1).toMatchObject({
      ...route,
      update: expect.any(Function),
    });

    // Ensure that the used context id was updated when a new route was pushed.
    const newState = {
      hi: 5,
    };

    useCurrentRoute1.update(newState);

    expect(stack.get(useCurrentRoute1.id).state).toEqual({ hi: 5 });
  });
});
