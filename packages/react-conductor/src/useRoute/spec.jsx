import React from 'react';
import { shallow } from 'enzyme';
import useRoute from './index';

/**
 * 
 */
function MyComponent() {
  const route = useRoute();
  return JSON.stringify(route);
}

describe('useRoute()', () => {
  it('should return the current route', () => {
    const component = shallow((
      <MyComponent />
    ));

    expect(component).toMatchSnapshot();
  });
});
