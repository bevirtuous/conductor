import {
  duration,
  height,
  left,
  top,
  position,
  width,
  willChange,
  transitionTransform,
  transitionOpacity,
  pointerEvents,
} from '../constants';

const transition = `${transitionOpacity}, ${transitionTransform}`;
const transform = 'translate3d(100%, 0, 0)';
const transformAlternat = 'translate3d(-50%, 0, 0)';

const forward = {
  duration,
  default: {
    height,
    left,
    position,
    top,
    transform,
    transition,
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
    transform: transformAlternat,
    transition,
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
    opacity: '0.2',
    pointerEvents,
    transform: transformAlternat,
  },
  exited: {
    opacity: 0,
    pointerEvents,
    transform: transformAlternat,
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
    transition,
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
    opacity: '0.2',
    pointerEvents,
    transform: 'translate3d(0, -10%, 0)',
  },
  exited: {
    opacity: 0,
    pointerEvents,
    transform: 'translate3d(0, -10%, 0)',
  },
};

export default {
  forward,
  backward,
  replace,
};
