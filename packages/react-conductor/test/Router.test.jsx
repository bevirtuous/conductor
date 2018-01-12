import React from 'react';
import sinon from 'sinon';
import { shallow } from 'enzyme';
import Router from '../src/Router';

sinon.stub(console, 'error');

describe('Router', () => {
  it('can not render without children', (done) => {
    try {
      shallow(<Router />);
      done('Did not throw!');
    } catch (err) {
      done();
    }
  });
});
