'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _constants = require('../constants');

var forward = {
  duration: _constants.duration,
  default: {
    height: _constants.height,
    left: _constants.left,
    position: _constants.position,
    top: _constants.top,
    transform: 'translate3d(100%, 0, 0)',
    transition: _constants.transitionTransform,
    width: _constants.width
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
    transform: 'translate3d(100%, 0, 0)'
  },
  exited: {
    pointerEvents: _constants.pointerEvents,
    transform: 'translate3d(100%, 0, 0)'
  }
};

var backward = {
  duration: _constants.duration,
  default: {
    height: _constants.height,
    left: _constants.left,
    position: _constants.position,
    top: _constants.top,
    transform: 'scale(0.5, 0.5)',
    transition: _constants.transitionTransform,
    width: _constants.width
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
    transform: 'scale(0.5, 0.5)'
  },
  exited: {
    pointerEvents: _constants.pointerEvents,
    transform: 'scale(0.5, 0.5)'
  }
};

var replace = {
  duration: _constants.duration,
  default: {
    height: _constants.height,
    left: _constants.left,
    position: _constants.position,
    top: _constants.top,
    transform: 'none',
    transition: _constants.transitionTransform,
    width: _constants.width
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
    transform: 'translate3d(0, -25%, 0) scale(0.8, 0.8)'
  },
  exited: {
    pointerEvents: _constants.pointerEvents,
    transform: 'translate3d(0, -25%, 0) scale(0.8, 0.8)'
  }
};

exports.default = {
  forward: forward,
  backward: backward,
  replace: replace
};