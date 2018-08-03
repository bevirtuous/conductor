import conductor from '@virtuous/conductor';
import getCurrentAction from './index';

describe('Events', () => {
  beforeAll(() => {
    conductor.register('/mypage');
    conductor.register('/mypage2');
  });

  it('default action should be POP', () => {
    const action = getCurrentAction();
    expect(action).toEqual('POP');
  });

  it('current action should be PUSH', () => {
    conductor.push('/mypage');
    const action = getCurrentAction();
    expect(action).toEqual('PUSH');
  });

  it('current action should be REPLACE', () => {
    conductor.replace('/mypage2');
    const action = getCurrentAction();
    expect(action).toEqual('REPLACE');
  });
});
