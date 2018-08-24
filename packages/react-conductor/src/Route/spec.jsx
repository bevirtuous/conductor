import React from 'react';
import { render, shallow } from 'enzyme';
import conductor from '../../../conductor';
import Route from './index';
import transition from './transition';

/**
 * @returns {JSX}
 */
const MyComponent = () => <article />;

describe('<Route />', () => {
  beforeAll(() => {
    conductor.register('/mypage');
  });

  it('should match the snapshot', () => {
    const wrapper = shallow((
      <Route pattern="/mypage" component={MyComponent} />
    ));

    expect(wrapper).toMatchSnapshot();
  });

  it('should render with children', () => {
    const wrapper = render((
      <Route component={MyComponent} pattern="/mypage" />
    ));

    expect(wrapper.find('article').length).toBe(1);
  });

  it('should transition forwards', () => {
    const wrapper = shallow((
      <Route
        component={MyComponent}
        pattern="/mypage"
      />
    ));

    expect(wrapper.instance().transition).toEqual(transition.forward);
  });

  it('should transition backwards', () => {
    const wrapper = shallow((
      <Route
        component={MyComponent}
        path="/mypage"
        pattern="/mypage"
        visible={false}
      />
    ));

    expect(wrapper.instance().transition).toEqual(transition.backward);
  });

  it('should transition correctly after replace', () => {
    conductor.push('/mypage');
    conductor.replace('/mypage');

    const wrapper = shallow((
      <Route component={MyComponent} pattern="/mypage" />
    ));

    expect(wrapper.instance().transition).toEqual(transition.replace);
  });
});
