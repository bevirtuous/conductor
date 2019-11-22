import React from 'react';
import { fireEvent, render } from 'react-testing-library';
import { router } from '@virtuous/conductor';
import Router from '../Router';
import Push from './Push';
import Pop from './Pop';
import Replace from './Replace';
import Reset from './Reset';
import ResetTo from './ResetTo';

describe('<{Action} />', () => {
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
        <Push className={className} to="/" state={state}>
          Push!
        </Push>
        <Pop className={className} steps={2} state={state}>
          Pop!
        </Pop>
        <Replace className={className} to="/" state={state}>
          Replace!
        </Replace>
        <Reset className={className}>
          Reset!
        </Reset>
        <ResetTo className={className} to="/" state={state}>
          Reset to!
        </ResetTo>
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
