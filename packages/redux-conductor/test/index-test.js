import sinon from 'sinon';
import assert from 'assert';
import emitter from '@virtuous/conductor/emitter';
import * as constants from '@virtuous/conductor/constants';
import * as actions from '../src/action-creators';
import conductorMiddleware from '../src/index';

let result = null;

const dispatch = sinon.spy((object) => { result = object; });
conductorMiddleware({ dispatch });

const mockPathname = '/some';
const mockPrevPathname = '/thing';
const mockStack = [
  {
    id: 'someId',
    pathname: mockPathname,
    pattern: mockPathname,
  },
];

describe('index', () => {
  beforeEach(() => {
    dispatch.resetHistory();
    result = null;
  });

  it('should perform the conductorPush action', () => {
    emitter.emit(constants.EVENT_PUSH, 'push', mockPathname, mockPrevPathname, mockStack);
    sinon.assert.calledOnce(dispatch);
    assert.equal(result.type, actions.CONDUCTOR_PUSH);
    assert.equal(result.stack, mockStack);
  });

  it('should perform the conductorPushed action', () => {
    emitter.emit(constants.EVENT_PUSHED);
    sinon.assert.calledOnce(dispatch);
    assert.equal(result.type, actions.CONDUCTOR_PUSHED);
  });

  it('should perform the conductorPop action', () => {
    emitter.emit(constants.EVENT_POP, 'pop', mockPathname, mockPrevPathname, mockStack);
    sinon.assert.calledOnce(dispatch);
    assert.equal(result.type, actions.CONDUCTOR_POP);
    assert.equal(result.stack, mockStack);
  });

  it('should perform the conductorPopped action', () => {
    emitter.emit(constants.EVENT_POPPED);
    sinon.assert.calledOnce(dispatch);
    assert.equal(result.type, actions.CONDUCTOR_POPPED);
  });

  it('should perform the conductorReplace action', () => {
    emitter.emit(constants.EVENT_REPLACE, 'replace', mockPathname, mockPrevPathname, mockStack);
    sinon.assert.calledOnce(dispatch);
    assert.equal(result.type, actions.CONDUCTOR_REPLACE);
    assert.equal(result.stack, mockStack);
  });

  it('should perform the conductorReplaced action', () => {
    emitter.emit(constants.EVENT_REPLACED);
    sinon.assert.calledOnce(dispatch);
    assert.equal(result.type, actions.CONDUCTOR_REPLACED);
  });

  it('should perform the conductorReset action', () => {
    emitter.emit(constants.EVENT_RESET);
    sinon.assert.calledOnce(dispatch);
    assert.equal(result.type, actions.CONDUCTOR_RESET);
  });
});
