import { createBrowserHistory } from 'history';
import history from '.';

describe('history', () => {
  it('should return `createBrowserHistory` for browsers', () => {
    expect(history).toBe(createBrowserHistory);
  });
});
