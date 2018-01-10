import assert from 'assert';
import popup from '../src/ios/popup';
import slide from '../src/ios/slide';

describe('iOS', () => {
  describe('popup', () => {
    it('has 3 presets defined', () => {
      assert.equal(Object.keys(popup).length, 3);
    });
    it('has forward preset', () => {
      assert.ok(popup.hasOwnProperty('forward'));
    });
    it('has backward preset', () => {
      assert.ok(popup.hasOwnProperty('backward'));
    });
    it('has backward replace', () => {
      assert.ok(popup.hasOwnProperty('replace'));
    });
  });
  describe('slide', () => {
    it('has 3 presets defined', () => {
      assert.equal(Object.keys(slide).length, 3);
    });
    it('has forward preset', () => {
      assert.ok(slide.hasOwnProperty('forward'));
    });
    it('has backward preset', () => {
      assert.ok(slide.hasOwnProperty('backward'));
    });
    it('has backward replace', () => {
      assert.ok(slide.hasOwnProperty('replace'));
    });
  });
});
