import React from 'react';
import { render } from 'react-testing-library';
import { router } from '@virtuous/conductor';
import Router from '../Router';
import Route from '../Route';
import useQuery from '.';

let useQuery1 = null;

/**
 * @returns {null}
 */
function MyComponent() {
  useQuery1 = useQuery();
  return null;
}

describe('useQuery()', () => {
  beforeEach(() => {
    useQuery1 = null;
  });

  it('should use the current route query', async () => {
    render((
      <Router>
        <Route path="/test">
          <MyComponent />
        </Route>
      </Router>
    ));

    await router.push({ pathname: '/test?id=123' });
    expect(useQuery1).toEqual({ id: '123' });
  });
});
