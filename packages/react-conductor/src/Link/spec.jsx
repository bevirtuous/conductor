import React from 'react';
import { shallow } from 'enzyme';
import conductor from '../../../conductor';
import Link from './index';

describe.skip('<Link />', () => {
  beforeAll(() => {
    conductor.register('/mypage');
  });

  it('should render correctly with given props', () => {
    const wrapper = shallow((
      <Link href="/mypage">
        My Link
      </Link>
    ));

    expect(wrapper).toMatchSnapshot();
    expect(wrapper.find('a').length).toBe(1);
    expect(wrapper.text()).toEqual('My Link');
  });

  it('should push when clicked with default action prop', () => {
    const wrapper = shallow((
      <Link href="/mypage">
        My Link
      </Link>
    ));

    wrapper.simulate('click', { preventDefault() {} });

    expect(wrapper).toMatchSnapshot();
    expect(conductor.stack.length).toBe(1);
  });

  it('should pop when clicked with prop action=REPLACE', () => {
    const wrapper = shallow((
      <Link href="/mypage" action="REPLACE">
        My Link
      </Link>
    ));

    wrapper.simulate('click', { preventDefault() { } });

    expect(wrapper).toMatchSnapshot();
    expect(conductor.stack.length).toBe(1);
  });

  it('should pop when clicked with prop action=POP', () => {
    const wrapper = shallow((
      <Link href="/mypage" action="POP">
        My Link
      </Link>
    ));

    wrapper.simulate('click', { preventDefault() { } });

    expect(wrapper).toMatchSnapshot();
    expect(conductor.stack.length).toBe(0);
  });
});
