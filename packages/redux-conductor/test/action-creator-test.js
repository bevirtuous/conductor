import assert from 'assert';
import {
  CONDUCTOR_PUSH,
  conductorPush,
  CONDUCTOR_PUSHED,
  conductorPushed,
  CONDUCTOR_POP,
  conductorPop,
  CONDUCTOR_POPPED,
  conductorPopped,
  CONDUCTOR_REPLACE,
  conductorReplace,
  CONDUCTOR_REPLACED,
  conductorReplaced,
  CONDUCTOR_RESET,
  conductorReset,
} from '../src/action-creators';

describe('Action Creators', () => {
  let action;

  describe('conductorPush()', () => {
    beforeEach(() => {
      action = conductorPush('/some', []);
    });

    it('should have 3 properties', () => {
      assert.equal(Object.keys(action).length, 3);
    });

    it(`should have action type ${CONDUCTOR_PUSH}`, () => {
      assert.equal(action.type, CONDUCTOR_PUSH);
    });

    it('should have location /some', () => {
      assert.equal(action.location, '/some');
    });

    it('should have stack of type Array', () => {
      assert.ok(Array.isArray(action.stack));
    });
  });

  describe('conductorPushed()', () => {
    beforeEach(() => {
      action = conductorPushed('/some');
    });

    it('should have 2 properties', () => {
      assert.equal(Object.keys(action).length, 2);
    });

    it(`should have action type ${CONDUCTOR_PUSHED}`, () => {
      assert.equal(action.type, CONDUCTOR_PUSHED);
    });

    it('should have location /some', () => {
      assert.equal(action.location, '/some');
    });
  });

  describe('conductorPop()', () => {
    beforeEach(() => {
      action = conductorPop('/some', []);
    });

    it('should have 3 properties', () => {
      assert.equal(Object.keys(action).length, 3);
    });

    it(`should have action type ${CONDUCTOR_POP}`, () => {
      assert.equal(action.type, CONDUCTOR_POP);
    });

    it('should have location /some', () => {
      assert.equal(action.location, '/some');
    });

    it('should have stack of type Array', () => {
      assert.ok(Array.isArray(action.stack));
    });
  });

  describe('conductorPopped()', () => {
    beforeEach(() => {
      action = conductorPopped('/some');
    });

    it('should have 2 properties', () => {
      assert.equal(Object.keys(action).length, 2);
    });

    it(`should have action type ${CONDUCTOR_POPPED}`, () => {
      assert.equal(action.type, CONDUCTOR_POPPED);
    });

    it('should have location /some', () => {
      assert.equal(action.location, '/some');
    });
  });

  describe('conductorReplace()', () => {
    beforeEach(() => {
      action = conductorReplace('/some', []);
    });

    it('should have 3 properties', () => {
      assert.equal(Object.keys(action).length, 3);
    });

    it(`should have action type ${CONDUCTOR_REPLACE}`, () => {
      assert.equal(action.type, CONDUCTOR_REPLACE);
    });

    it('should have location /some', () => {
      assert.equal(action.location, '/some');
    });

    it('should have stack of type Array', () => {
      assert.ok(Array.isArray(action.stack));
    });
  });

  describe('conductorReplaced()', () => {
    beforeEach(() => {
      action = conductorReplaced('/some');
    });

    it('should have 2 properties', () => {
      assert.equal(Object.keys(action).length, 2);
    });

    it(`should have action type ${CONDUCTOR_REPLACED}`, () => {
      assert.equal(action.type, CONDUCTOR_REPLACED);
    });

    it('should have location /some', () => {
      assert.equal(action.location, '/some');
    });
  });

  describe('conductorReset()', () => {
    beforeEach(() => {
      action = conductorReset('/some');
    });

    it('should have 2 properties', () => {
      assert.equal(Object.keys(action).length, 2);
    });

    it(`should have action type ${CONDUCTOR_RESET}`, () => {
      assert.equal(action.type, CONDUCTOR_RESET);
    });

    it('should have location /some', () => {
      assert.equal(action.location, '/some');
    });
  });
});
