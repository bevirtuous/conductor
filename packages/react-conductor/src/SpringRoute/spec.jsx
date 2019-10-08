import React from 'react';
import { mount } from 'enzyme';
import { router } from '@virtuous/conductor';
import Router from '../Router';
import SpringRoute from '.';

describe('SpringRoute()', () => {
  it('should render nothing when no routes match', async () => {
    const app = mount((
      <Router>
        <SpringRoute
          component={() => <div>hello</div>}
          path="/myroute/:id"
          spring={() => {}}
        />
      </Router>
    ));

    await router.push({ pathname: '/no-match' });

    expect(app.html()).toMatchSnapshot();
  });

  it('should render a matching route', async () => {
    const app = mount((
      <Router>
        <SpringRoute
          component={() => <div>hello</div>}
          path="/myroute/:id"
          spring={() => ({
            from: { left: 0 },
            to: { left: 50 },
          })}
        />
      </Router>
    ));

    await router.push({ pathname: '/myroute/456' });

    app.update();

    expect(app.html()).toMatchSnapshot();
  });
});
