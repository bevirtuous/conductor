import React from 'react';
import { render } from 'react-testing-library';
import { router } from '@virtuous/conductor';
import Router from '../Router';
import Route from '../Route';
import useParams from '.';

let useParams1 = null;

/**
 * @returns {null}
 */
function MyComponent() {
  useParams1 = useParams();
  return null;
}

describe('useParams()', () => {
  beforeEach(() => {
    useParams1 = null;
  });

  it('should use the current route params', async () => {
    render((
      <Router>
        <Route path="/test/:id">
          <MyComponent />
        </Route>
      </Router>
    ));

    await router.push({ pathname: '/test/123' });
    expect(useParams1).toEqual({ id: '123' });
  });
});
