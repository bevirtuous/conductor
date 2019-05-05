import { createBrowserHistory, createMemoryHistory } from 'history';

describe('history', () => {
  it('should return `createBrowserHistory`', () => {
    const history = require('./index').default;
    expect(history).toBe(createBrowserHistory);
  });

  it.skip('should return `createMemoryHistory`', () => {
    const history = require('./index').default;
    expect(history).toBe(createMemoryHistory);
  });
});
