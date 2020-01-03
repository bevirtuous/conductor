import queryString from 'query-string';
import matcher from '../matcher';

function setId() {
  return Math.random().toString(36).substr(2, 5);
}

function setParams(u, match) {
  return match(u) || {};
}

function Route(options) {
  const { pathname: location, state = {} } = options;
  const id = setId();

  const splitPath = location.split('#');
  const path = splitPath[0];
  const hash = splitPath[1] || null;
  const { query, url: pathname } = queryString.parseUrl(path);

  const pattern = options.pattern || null;
  const match = matcher(pattern || '');

  const params = setParams(pathname, match);

  const created = Date.now();
  const updated = null;

  function setPattern(newPattern) {
    this.pattern = newPattern;
    this.params = setParams(this.pathname, matcher(this.pattern)) || {};
  }

  return {
    id,
    hash,
    location,
    pathname,
    pattern,
    params,
    query,
    state,
    created,
    updated,
    setPattern,
  };
}

export default Route;
