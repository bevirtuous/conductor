# conductor-helpers

Useful helpers functions for Conductor.

## Installation

Using npm:

`npm i @virtuous/conductor-helpers -S`

Usage:

```js
import { getCurrentRoute } from '@virtuous/conductor-helpers';

const route = getCurrentRoute();

```

## API

| Function                      | Returns                                                                     |
|-------------------------------|-----------------------------------------------------------------------------|
| getCurrentAction()            | `string` The most recent history action.                                    |
| getCurrentRoute()             | `Object\|null` Returns the current route.                                  |
| getPreviousRoute()            | `Object\|null` Returns the previous route.                                  |
| getRouteById(`string id`)     | `Object\|null` Returns a route with the given id.                           |
| getRouteStack()               | `Array` Returns the complete history stack.                                 |
| isRouteOpen(`string pattern`) | `boolean` Returns true if a matching route is found in the history stack.   |
