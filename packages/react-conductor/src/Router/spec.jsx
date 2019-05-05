import React from 'react';
import { shallow, mount } from 'enzyme';
import { router } from '@virtuous/conductor';
import Router from './index';

const spy = jest.spyOn(router, 'constructor');

describe('<Router />', () => {
  it('should render with children and context', () => {
    const app = mount((
      <Router>
        <p />
      </Router>
    ));

    const child = app.find('p');
    expect(child.length).toBe(1);
    expect(app).toMatchSnapshot();

    // TODO: Test Router context value
  });

  it('should re-render with children and context', () => {
    // TODO: Test Router context value
  });

  it.only('should pass the history function to core', () => {
    const mockHistory = () => ({
      listen: () => {},
      location: {},
    });

    shallow((
      <Router history={mockHistory}>
        <p />
      </Router>
    ));

    expect(spy).toHaveBeenCalledWith(mockHistory);
  });
});
