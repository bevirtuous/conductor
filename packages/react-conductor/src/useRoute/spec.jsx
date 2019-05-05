import React from 'react';
import { render } from 'react-testing-library';
import { router, stack } from '@virtuous/conductor';
import Router from '../Router';
import useRoute from '.';

const spy = jest.spyOn(router, 'update');

const spy = jest.spyOn(router, 'update');

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
  beforeAll(() => {
    router.register('/test');
  });

  beforeEach(() => {
    useRoute1 = null;
    useRoute2 = null;
  });

  it('should use the current route or the given route id', async () => {
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

    const newState = {
      hi: 5,
    };

    useRoute1.update(newState);
    useRoute2.update(newState);

    expect(spy).toHaveBeenCalledWith(useRoute1.id, newState);
    expect(spy).toHaveBeenCalledWith(useRoute2.id, newState);
  });

  it('should return empty object when no matching route is found', () => {
    render((
      <Router>
        <MyComponent id={12345} />
      </Router>
    ));

    expect(useRoute2).toEqual({});
  });
});
