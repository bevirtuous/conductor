import React from 'react';
import { render } from 'react-testing-library';
import { router } from '@virtuous/conductor';
import Router from '../Router';
import useHistory from './index';

const spyPush = jest.spyOn(router, 'push');
const spyPop = jest.spyOn(router, 'pop');
const spyReplace = jest.spyOn(router, 'replace');
const spyReset = jest.spyOn(router, 'reset');
const spyResetTo = jest.spyOn(router, 'resetTo');

describe('useHistory()', () => {
  it('should provide push method', () => {
    function MyComponent() {
      const { push } = useHistory();
      push({ pathname: '123' });
      return <div />;
    }

    render(<Router><MyComponent /></Router>);

    expect(spyPush).toHaveBeenCalledWith({ pathname: '123' });
  });

  it('should provide pop method', () => {
    function MyComponent() {
      const { pop } = useHistory();
      pop();
      return <div />;
    }

    render(<Router><MyComponent /></Router>);

    expect(spyPop).toHaveBeenCalled();
  });

  it('should provide replace method', () => {
    function MyComponent() {
      const { replace } = useHistory();
      replace({ pathname: '456' });
      return <div />;
    }

    render(<Router><MyComponent /></Router>);

    expect(spyReplace).toHaveBeenCalledWith({ pathname: '456' });
  });

  it('should provide reset method', () => {
    function MyComponent() {
      const { reset } = useHistory();
      reset();
      return <div />;
    }

    render(<Router><MyComponent /></Router>);

    expect(spyReset).toHaveBeenCalled();
  });

  it('should provide resetTo method', () => {
    function MyComponent() {
      const { resetTo } = useHistory();
      resetTo('789');
      return <div />;
    }

    render(<Router><MyComponent /></Router>);

    expect(spyResetTo).toHaveBeenCalledWith('789');
  });
});
