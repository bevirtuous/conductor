import React from 'react';
import { shallow } from 'enzyme';
import Router from '../Router';
import Route from '../Route';
import RouteNotFound from '.';

describe('<Route.NotFound />', () => {
  it('should render the given component', () => {
    const app = shallow((
      <Router>
        <Route
          pattern="/myroute/123"
          component={() => <div />}
        />
        <RouteNotFound component={() => null} />
      </Router>
    ));

    expect(app.html()).toBeTruthy();
  });

  it('should render null', () => {
    const app = shallow((
      <Router>
        <RouteNotFound component={() => null} />
      </Router>
    ));

    expect(app.html()).toBeFalsy();
  });
});
