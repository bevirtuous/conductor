const forward = {
  duration: 375,
  default: {
    height: '100vh',
    left: '0',
    position: 'absolute',
    top: '0',
    transform: 'translate3d(100%, 0, 0)',
    width: '100%',
    willChange: 'transform',
  },
  entering: {
    pointerEvents: 'none',
    transform: 'none',
  },
  entered: {
    transform: 'none',
  },
  exiting: {
    pointerEvents: 'none',
    transform: 'translate3d(100%, 0, 0)',
  },
  exited: {
    pointerEvents: 'none',
    transform: 'translate3d(100%, 0, 0)',
  },
};

const backward = {
  duration: 375,
  default: {
    height: '100vh',
    left: '0',
    position: 'absolute',
    top: '0',
    transform: 'translate3d(-50%, 0, 0)',
    width: '100%',
    willChange: 'transform',
  },
  entering: {
    pointerEvents: 'none',
    transform: 'none',
  },
  entered: {
    transform: 'none',
  },
  exiting: {
    pointerEvents: 'none',
    transform: 'translate3d(-50%, 0, 0)',
  },
  exited: {
    pointerEvents: 'none',
    transform: 'translate3d(-50%, 0, 0)',
  },
};

const replace = {
  duration: 375,
  default: {
    height: '100vh',
    left: '0',
    position: 'absolute',
    top: '0',
    transform: 'none',
    transition: 'opacity 375ms cubic-bezier(0.25, 0.1, 0.25, 1), transform 375ms cubic-bezier(0.25, 0.1, 0.25, 1)',
    width: '100%',
    willChange: 'transform',
  },
  entering: {
    pointerEvents: 'none',
    transform: 'none',
  },
  entered: {
    transform: 'none',
  },
  exiting: {
    opacity: '0.2',
    pointerEvents: 'none',
    transform: 'translate3d(0, -10%, 0)',
  },
  exited: {
    opacity: 0,
    pointerEvents: 'none',
    transform: 'translate3d(0, -10%, 0)',
  },
};

export default {
  forward,
  backward,
  replace,
};
