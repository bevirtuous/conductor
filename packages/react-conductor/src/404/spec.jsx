import React from 'react';
import { shallow } from 'enzyme';
import { router } from '@virtuous/conductor';
import Router from '../Router';
import Route from '../Route';

function ErrorPage() {
  return (
    <div>404 page</div>
  );
}

describe('<Route.NotFound />', () => {
  beforeEach(() => {
    router.constructor();
  });

  it('should render nothing when route matches', () => {
    const app = shallow((
      <Router>
        <Route path="/myroute/123">
          <div>My Route page</div>
        </Route>
        <Route.NotFound component={ErrorPage} />
      </Router>
    ));

    expect(app.html()).toBe('<div>My Route page</div>');
  });

  it('should render the given component when no route matches', () => {
    const app = shallow((
      <Router>
        <Route.NotFound component={ErrorPage} />
      </Router>
    ));

    expect(app.html()).toBe('<div>404 page</div>');
  });
});
