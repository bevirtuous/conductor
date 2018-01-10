'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _constants = require('../constants');

var transition = _constants.transitionOpacity + ', ' + _constants.transitionTransform;
var transform = 'translate3d(100%, 0, 0)';
var transformAlternat = 'translate3d(-50%, 0, 0)';

var forward = {
  duration: _constants.duration,
  default: {
    height: _constants.height,
    left: _constants.left,
    position: _constants.position,
    top: _constants.top,
    transform: transform,
    transition: transition,
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
    transform: transformAlternat,
    transition: transition,
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
    opacity: '0.2',
    pointerEvents: _constants.pointerEvents,
    transform: transformAlternat
  },
  exited: {
    opacity: 0,
    pointerEvents: _constants.pointerEvents,
    transform: transformAlternat
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
    transition: transition,
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
    opacity: '0.2',
    pointerEvents: _constants.pointerEvents,
    transform: 'translate3d(0, -10%, 0)'
  },
  exited: {
    opacity: 0,
    pointerEvents: _constants.pointerEvents,
    transform: 'translate3d(0, -10%, 0)'
  }
};

exports.default = {
  forward: forward,
  backward: backward,
  replace: replace
};