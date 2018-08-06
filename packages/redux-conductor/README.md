## redux-conductor

Bindings for Redux.

### Installation

Using npm:

`npm i @virtuous/redux-conductor -S`

Usage:

```js
import { combineReducers, createStore } from 'redux';
import syncRouter, { reducer } from '@virtuous/redux-conductor';

const reducers = combineReducers({
  router: reducer,
  // other reducers
});

const store = createStore(
  reducers,
  // middleware, etc
);

syncRouter(store);

```
