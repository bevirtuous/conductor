'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _constants = require('../constants');

var transform = 'translate3d(0, 100%, 0)';

var forward = {
  duration: _constants.duration,
  default: {
    height: _constants.height,
    left: _constants.left,
    position: _constants.position,
    top: _constants.top,
    transform: transform,
    transition: _constants.transitionTransform,
    width: _constants.width,
    willChange: _constants.willChange
  },
  entering: {
    pointerEvents: _constants.pointerEvents,
    transform: 'none'
  },
  entered: {
    transform: 'none'
  },
  exiting: {
    pointerEvents: _constants.pointerEvents,
    transform: transform
  },
  exited: {
    pointerEvents: _constants.pointerEvents,
    transform: transform
  }
};

var backward = {
  duration: _constants.duration,
  default: {
    height: _constants.height,
    left: _constants.left,
    position: _constants.position,
    top: _constants.top,
    transform: transform,
    transition: _constants.transitionTransform,
    width: _constants.width,
    willChange: _constants.willChange
  },
  entering: {
    pointerEvents: _constants.pointerEvents,
    transform: 'none'
  },
  entered: {
    transform: 'none'
  },
  exiting: {
    pointerEvents: _constants.pointerEvents,
    transform: transform
  },
  exited: {
    pointerEvents: _constants.pointerEvents,
    transform: transform
  }
};

var replace = {
  duration: _constants.duration,
  default: {
    height: _constants.height,
    left: _constants.left,
    position: _constants.position,
    top: _constants.top,
    transform: transform,
    transition: _constants.transitionTransform,
    width: _constants.width,
    willChange: _constants.willChange
  },
  entering: {
    pointerEvents: _constants.pointerEvents,
    transform: 'none'
  },
  entered: {
    transform: 'none'
  },
  exiting: {
    pointerEvents: _constants.pointerEvents,
    transform: transform
  },
  exited: {
    pointerEvents: _constants.pointerEvents,
    transform: transform
  }
};

exports.default = {
  forward: forward,
  backward: backward,
  replace: replace
};