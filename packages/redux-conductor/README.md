## redux-conductor

Bindings for Redux.

### Installation

Using npm:

`npm i @virtuous/redux-conductor -S`

Usage:

```js
import { createStore } from 'redux';
import syncRouter from '@virtuous/redux-conductor';

const store = createStore(
  // reducers, middleware and things
);

syncRouter(store);

```
