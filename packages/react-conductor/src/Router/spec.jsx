import React from 'react';
import { mount } from 'enzyme';
import Router from './index';

describe('<Router />', () => {
  it('should render with children and context', () => {
    const router = mount((
      <Router>
        <p />
      </Router>
    ));

    const child = router.find('p');
    expect(child.length).toBe(1);
    expect(router).toMatchSnapshot();

    // TODO: Test Router context value
  });

  it('should re-render with children and context', () => {
    // TODO: Test Router context value
  });
});
