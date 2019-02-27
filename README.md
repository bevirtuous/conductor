<p>
  <a href="https://travis-ci.org/bevirtuous/conductor">
    <img alt="Travis CI Build" src="https://travis-ci.org/bevirtuous/conductor.svg?branch=master">
  </a>
  <a href='https://coveralls.io/github/bevirtuous/conductor?branch=master'>
    <img src='https://coveralls.io/repos/github/bevirtuous/conductor/badge.svg?branch=master' alt='Coverage Status' />
  </a>
  <a href="https://github.com/bevirtuous/conductor/releases">
    <img alt="GitHub release" src="https://img.shields.io/github/release/bevirtuous/conductor.svg">
  </a>
  <a href="https://opensource.org/licenses/MIT">
    <img alt="License: MIT" src="https://img.shields.io/badge/License-MIT-yellow.svg">
  </a>
</p>

<p>
  <img width="200" alt="conductor" src="https://user-images.githubusercontent.com/2123279/32792787-92996cdc-c964-11e7-96c6-ffd86f4ee087.png" />
</p>

Conductor is a simple, yet powerful JavaScript router for single-page applications.

<h3><a href="#" target="_blank">Documentation</a></h3>

### Installation

```
npm i @virtuous/react-conductor -S
```

### Features
- Promise based routing API
- Event API
- Route based state
- Route transitions (coming soon)
- React integration
  - Declarative
  - Hooks
  - Contexts
- Redux integration

### Basic usage
```javascript
import React from 'react';
import { Router, Route } from '@virtuous/react-conductor';
import { Homepage, Browse, Login, Profile } from './routes';

function MyApp() {
  return (
    <Router>
     <Menu />
     <Route pattern="/" component={Homepage} />
     <Route pattern="/browse" component={Browse} />
     <Route pattern="/login" component={Login} />
     <Route pattern="/profile/:userId" component={Profile} />
   </Router>
  );
}

export default MyApp;
```

### Examples (with ReactJS)

- [Simple application with routes](https://codesandbox.io/s/38xko4wn2m)
- [Using React hooks](https://codesandbox.io/s/oq71k20q89)
- [Usage with Redux](https://codesandbox.io/s/kmz7962r43)
- Route Transitions (coming soon)

### Packages

| Package| Description |
| - | - |
| [`@virtuous/conductor`](https://github.com/bevirtuous/conductor/blob/master/packages/conductor)  | The core of Conductor  |
| [`@virtuous/react-conductor`](https://github.com/bevirtuous/conductor/blob/master/packages/react-conductor) | Bindings for React |
| [`@virtuous/redux-conductor`](https://github.com/bevirtuous/conductor/blob/master/packages/redux-conductor) | Bindings for Redux |

### About

This project is maintained by [@richardgorman](https://github.com/richardgorman) and [@devbucket](https://github.com/devbucket). We welcome any feedback or suggestions.
