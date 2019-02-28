import React from 'react';
import { fireEvent, render } from 'react-testing-library';
import { router } from '@virtuous/conductor';
import Router from '../index';

describe('<Router.{Action} />', () => {
  it('should render as expected', () => {
    const className = 'sausage';
    const state = {
      something: true,
    };

    const pushSpy = jest.spyOn(router, 'push');
    const popSpy = jest.spyOn(router, 'pop');
    const replaceSpy = jest.spyOn(router, 'replace');
    const resetSpy = jest.spyOn(router, 'reset');
    const resetToSpy = jest.spyOn(router, 'resetTo');

    const app = render((
      <Router>
        <Router.Push className={className} to="/" state={state}>
          Push!
        </Router.Push>
        <Router.Pop className={className} steps={2} state={state}>
          Pop!
        </Router.Pop>
        <Router.Replace className={className} to="/" state={state}>
          Replace!
        </Router.Replace>
        <Router.Reset className={className}>
          Reset!
        </Router.Reset>
        <Router.ResetTo className={className} to="/" state={state}>
          Reset to!
        </Router.ResetTo>
      </Router>
    ));

    fireEvent.click(app.queryByText('Push!'));
    fireEvent.click(app.queryByText('Pop!'));
    fireEvent.click(app.queryByText('Replace!'));
    fireEvent.click(app.queryByText('Reset!'));
    fireEvent.click(app.queryByText('Reset to!'));

    expect(app).toMatchSnapshot();
    expect(pushSpy).toHaveBeenCalled();
    expect(popSpy).toHaveBeenCalled();
    expect(replaceSpy).toHaveBeenCalled();
    expect(resetSpy).toHaveBeenCalled();
    expect(resetToSpy).toHaveBeenCalled();
  });
});
