## redux-conductor

Bindings for Redux.

### Installation

Using npm:

`npm i @virtuous/redux-conductor -S`

Usage:

```js
import { combineReducers, createStore } from 'redux';
import syncRouter from '@virtuous/redux-conductor';
import router from '@virtuous/redux-conductor/reducer';

const reducers = combineReducers({
  router,
  // other reducers
});

const store = createStore(
  reducers,
  // middleware etc
);

syncRouter(store);

```
