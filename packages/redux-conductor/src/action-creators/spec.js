import assert from 'assert';
import * as actions from '../action-creators';

describe('Action Creators', () => {
  let action;

  describe('conductorPush()', () => {
    beforeEach(() => {
      action = actions.conductorPush('/some', []);
    });

    it('should have 3 properties', () => {
      assert.equal(Object.keys(action).length, 3);
    });

    it(`should have action type ${actions.CONDUCTOR_PUSH}`, () => {
      assert.equal(action.type, actions.CONDUCTOR_PUSH);
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
      action = actions.conductorPushed('/some');
    });

    it('should have 2 properties', () => {
      assert.equal(Object.keys(action).length, 2);
    });

    it(`should have action type ${actions.CONDUCTOR_PUSHED}`, () => {
      assert.equal(action.type, actions.CONDUCTOR_PUSHED);
    });

    it('should have location /some', () => {
      assert.equal(action.location, '/some');
    });
  });

  describe('conductorPop()', () => {
    beforeEach(() => {
      action = actions.conductorPop('/some', []);
    });

    it('should have 3 properties', () => {
      assert.equal(Object.keys(action).length, 3);
    });

    it(`should have action type ${actions.CONDUCTOR_POP}`, () => {
      assert.equal(action.type, actions.CONDUCTOR_POP);
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
      action = actions.conductorPopped('/some');
    });

    it('should have 2 properties', () => {
      assert.equal(Object.keys(action).length, 2);
    });

    it(`should have action type ${actions.CONDUCTOR_POPPED}`, () => {
      assert.equal(action.type, actions.CONDUCTOR_POPPED);
    });

    it('should have location /some', () => {
      assert.equal(action.location, '/some');
    });
  });

  describe('conductorReplace()', () => {
    beforeEach(() => {
      action = actions.conductorReplace('/some', []);
    });

    it('should have 3 properties', () => {
      assert.equal(Object.keys(action).length, 3);
    });

    it(`should have action type ${actions.CONDUCTOR_REPLACE}`, () => {
      assert.equal(action.type, actions.CONDUCTOR_REPLACE);
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
      action = actions.conductorReplaced('/some');
    });

    it('should have 2 properties', () => {
      assert.equal(Object.keys(action).length, 2);
    });

    it(`should have action type ${actions.CONDUCTOR_REPLACED}`, () => {
      assert.equal(action.type, actions.CONDUCTOR_REPLACED);
    });

    it('should have location /some', () => {
      assert.equal(action.location, '/some');
    });
  });

  describe('conductorReset()', () => {
    beforeEach(() => {
      action = actions.conductorReset('/some');
    });

    it('should have 2 properties', () => {
      assert.equal(Object.keys(action).length, 2);
    });

    it(`should have action type ${actions.CONDUCTOR_RESET}`, () => {
      assert.equal(action.type, actions.CONDUCTOR_RESET);
    });

    it('should have location /some', () => {
      assert.equal(action.location, '/some');
    });
  });
});
