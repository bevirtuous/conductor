import React from 'react';
import { mount } from 'enzyme';
import Route from '.';

describe('SpringRoute Child', () => {
  it('should render as expected', () => {
    const app = mount((
      <Route
        className="my-classname"
        component={() => <div />}
        current
        index={1}
        spring={() => {}}
      />
    ));

    expect(app).toMatchSnapshot();
  });

  it('should not render when `render` state is false', (done) => {
    const app = mount((
      <Route
        className="my-classname"
        component={() => <div />}
        current={false}
        index={1}
        spring={() => {}}
      />
    ));

    app.setState({ render: false }, () => {
      expect(app).toMatchSnapshot();
      done();
    });
  });
});
