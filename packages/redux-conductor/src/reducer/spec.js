import { router } from '@virtuous/conductor';
import reducer from './index';
import * as constants from '../constants';

describe('Redux Conductor - Reducer', () => {
  it('should handle a PUSH action', () => {
    const initialState = {
      index: 0,
      stack: [{
        pathname: '123',
      }, {
        pathname: '456',
      }, {
        pathname: '789',
      }],
    };

    const action = {
      type: constants.CONDUCTOR_PUSH,
      routes: {
        next: {
          pathname: 'abc',
        },
      },
    };

    const state = reducer(initialState, action);

    expect(state).toEqual({
      index: 1,
      stack: [{
        pathname: '123',
      }, {
        pathname: 'abc',
      }],
    });
  });

  it('should handle a POP action', () => {
    const action = {
      type: constants.CONDUCTOR_POP,
    };

    const state = reducer(undefined, action);

    expect(state).toEqual({
      index: 0,
      routing: false,
      stack: [router.getCurrentRoute()],
    });
  });

  it('should handle a REPLACE action', () => {
    const initialState = {
      stack: [{
        pathname: '/myroute/123',
      }, {
        pathname: '/myroute/456',
      }],
    };

    const action = {
      type: constants.CONDUCTOR_REPLACE,
      routes: {
        next: {
          pathname: '/myroute/789',
        },
      },
    };

    const state = reducer(initialState, action);

    expect(state).toEqual({
      stack: [{
        pathname: '/myroute/789',
      }, {
        pathname: '/myroute/456',
      }],
    });
  });

  it('should handle a RESET action', () => {
    const initialState = {
      index: 1,
      stack: [{
        pathname: '/myroute/123',
      }, {
        pathname: '/myroute/456',
      }],
    };

    const action = {
      type: constants.CONDUCTOR_RESET,
      routes: {
        next: {
          pathname: '/myroute/789',
        },
      },
    };

    const state = reducer(initialState, action);

    expect(state).toEqual({
      index: 0,
      stack: [{
        pathname: '/myroute/789',
      }, {
        pathname: '/myroute/456',
      }],
    });
  });

  it('should handle an UPDATE action', () => {
    const route = router.getCurrentRoute();
    const initialState = {
      stack: [route, { id: 'other-route' }],
    };
    const action = {
      type: constants.CONDUCTOR_UPDATE,
      route: {
        id: route.id,
        state: {
          a: 1,
        },
      },
    };

    const state = reducer(initialState, action);

    expect(state).toMatchObject({
      stack: [{
        ...route,
        state: {
          a: 1,
        },
      }, {
        id: 'other-route',
      }],
    });
  });

  it('should ignore non-router actions', () => {
    const route = router.getCurrentRoute();
    const initialState = {
      stack: [route],
    };

    const action = {
      type: 'OTHER_ACTION',
    };

    const state = reducer(initialState, action);

    expect(state).toBe(initialState);
  });
});
