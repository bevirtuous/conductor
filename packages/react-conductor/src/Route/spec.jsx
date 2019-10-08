import React from 'react';
import { mount } from 'enzyme';
import { router } from '@virtuous/conductor';
import Router from '../Router/index';
import { RouteContext } from '../context';
import Route from './index';

const pattern = '/myroute/:id';
const spy = jest.spyOn(router, 'register');
const transform = route => route;

describe('<Route />', () => {
  it('should render component', () => {
    mount((
      <Router>
        <Route
          pattern={pattern}
          component={() => <div />}
          transform={transform}
        />
      </Router>
    ));

    expect(spy).toHaveBeenCalledWith(pattern, transform);
  });

  it('should correctly set the RouteContext value', () => {
    let contextValue = null;
    const current = router.getCurrentRoute();

    const MyComponent = () => (
      <RouteContext.Consumer>
        {(route) => {
          contextValue = route;
          return null;
        }}
      </RouteContext.Consumer>
    );

    mount((
      <Router>
        <Route
          pattern={pattern}
          component={MyComponent}
        />
      </Router>
    ));

    expect(current).toMatchObject(contextValue);
  });

  it('should render null when does not match current route', () => {
    const route = mount((
      <Router>
        <Route
          pattern="/wrong"
          component={() => <div />}
        />
      </Router>
    ));

    expect(route.html()).toBe('');
  });

  it('should react to router events and update', async () => {
    const route = mount((
      <Router>
        <Route
          pattern={pattern}
          component={() => <div />}
        />
        <Route
          pattern="/other"
          component={() => <div />}
        />
      </Router>
    ));

    // Should initially render the component (match found).
    expect(route.find(Route).at(0).html()).toBe('<div></div>');
    expect(route.find(Route).at(1).html()).toBeNull();

    await router.push({ pathname: '/other' });

    route.update();

    // Should now render null (first route does not match).
    expect(route.find(Route).at(0).html()).toBeNull();
    expect(route.find(Route).at(1).html()).toBe('<div></div>');
  });
});
