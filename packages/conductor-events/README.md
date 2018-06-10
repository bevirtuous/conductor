# conductor-events

Event API for Conductor.


## Installation

Using npm:

`npm i @virtuous/conductor-events -S`

Usage:

```js
import { onDidPush } from '@virtuous/conductor-events';

const myFunc = id => {
  // do stuff
};

onDidPush(myFunc);

```

## API

_Note:_ Each function receives an `id` parameter representing the route that is in context i.e. the route that is being popped or pushed.

**onWillPush**

**onDidPush**

**onWillPop**

**onDidPop**

**onWillReplace**

**onDidReplace**

**onWillReset**

**onDidReset**
