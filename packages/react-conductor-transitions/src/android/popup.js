import {
  duration,
  height,
  left,
  position,
  top,
  transitionTransform,
  width,
  willChange,
  pointerEvents,
} from '../constants';

const transform = 'translate3d(0, 100%, 0)';

const forward = {
  duration,
  default: {
    height,
    left,
    position,
    top,
    transform,
    transition: transitionTransform,
    width,
    willChange,
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
    transform,
  },
  exited: {
    pointerEvents,
    transform,
  },
};

const backward = {
  duration,
  default: {
    height,
    left,
    position,
    top,
    transform,
    transition: transitionTransform,
    width,
    willChange,
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
    transform,
  },
  exited: {
    pointerEvents,
    transform,
  },
};

const replace = {
  duration,
  default: {
    height,
    left,
    position,
    top,
    transform,
    transition: transitionTransform,
    width,
    willChange,
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
    transform,
  },
  exited: {
    pointerEvents,
    transform,
  },
};

export default {
  forward,
  backward,
  replace,
};
