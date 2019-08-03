/**
 * @jest-environment node
 */
import { createMemoryHistory } from 'history';
import history from '.';

describe('history', () => {
  it('should return `createMemoryHistory` for node environments', () => {
    expect(history).toBe(createMemoryHistory);
  });
});
