# conductor-events

Event API for Conductor.


## Installation

Using npm:

`npm i @virtuous/conductor-events -S`

Usage:

```js
import { onDidPush } from '@virtuous/conductor-events';

const myCallback = id => {
  // do stuff
};

onDidPush(myCallback);

```

## API

_Note:_ Each acallback receives an `id` parameter representing the route that is in context i.e. the route that is being popped or pushed.

**onWillPush**

**onDidPush**

**onWillPop**

**onDidPop**

**onWillReplace**

**onDidReplace**

**onWillReset**

**onDidReset**
