const transition = {
  default: {
    height: '100vh',
    left: '0',
    position: 'absolute',
    top: '0',
    width: '100%',
  },
  exiting: {
    display: 'none',
  },
  exited: {
    display: 'none',
  },
};

export default {
  forward: transition,
  backward: transition,
  replace: transition,
};
