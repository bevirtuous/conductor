import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import {
  router,
  stack as routeStack,
  onPush,
  onPop,
  onReplace,
  onReset,
  onUpdate,
} from '@virtuous/conductor';
import { RouterContext } from '../context';

function Router({ children, history }) {
  const [routes, setRoutes] = useState({
    prev: null,
    next: router.getCurrentRoute().id,
  });

  function update({ prev, next }) {
    setRoutes({
      prev: prev ? prev.id : null,
      next: next.id,
    });
  }

  useEffect(() => {
    onPush(update);
    onPop(update);
    onReplace(update);
    onReset(update);
    onUpdate(update);
  }, []);

  useEffect(() => {
    if (history) {
      router.constructor(history);
    }
  }, [history]);

  const { prev, next } = routes;
  const stack = Array.from(routeStack.getAll());

  return (
    <RouterContext.Provider value={{ prev, next, stack }}>
      {children}
    </RouterContext.Provider>
  );
}

Router.propTypes = {
  children: PropTypes.node.isRequired,
  history: PropTypes.func,
};

Router.defaultProps = {
  history: null,
};

export default Router;
