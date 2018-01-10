import {
  duration,
  height,
  left,
  top,
  position,
  width,
  transitionTransform,
  pointerEvents,
} from '../constants';

const forward = {
  duration,
  default: {
    height,
    left,
    position,
    top,
    transform: 'translate3d(100%, 0, 0)',
    transition: transitionTransform,
    width,
  },
  entering: {
    pointerEvents,
    transform: 'none',
  },
  entered: {
    transform: 'none',
  },
  exiting: {
    pointerEvents,
    transform: 'translate3d(100%, 0, 0)',
  },
  exited: {
    pointerEvents,
    transform: 'translate3d(100%, 0, 0)',
  },
};

const backward = {
  duration,
  default: {
    height,
    left,
    position,
    top,
    transform: 'scale(0.5, 0.5)',
    transition: transitionTransform,
    width,
  },
  entering: {
    pointerEvents,
    transform: 'none',
  },
  entered: {
    transform: 'none',
  },
  exiting: {
    pointerEvents,
    transform: 'scale(0.5, 0.5)',
  },
  exited: {
    pointerEvents,
    transform: 'scale(0.5, 0.5)',
  },
};

const replace = {
  duration,
  default: {
    height,
    left,
    position,
    top,
    transform: 'none',
    transition: transitionTransform,
    width,
  },
  entering: {
    pointerEvents,
    transform: 'none',
  },
  entered: {
    transform: 'none',
  },
  exiting: {
    pointerEvents,
    transform: 'translate3d(0, -25%, 0) scale(0.8, 0.8)',
  },
  exited: {
    pointerEvents,
    transform: 'translate3d(0, -25%, 0) scale(0.8, 0.8)',
  },
};

export default {
  forward,
  backward,
  replace,
};
