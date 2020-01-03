import queryString from 'query-string';
import matcher from '../matcher';

class Route {
  /**
   * @param {Object} params The route parameters.
   */
  constructor(params) {
    const {
      id,
      pathname,
      pattern = null,
      state = {},
      transform = null,
    } = params;
    const [path, hash = null] = pathname.split('#');
    const { query, url } = queryString.parseUrl(path);

    this.matcher = matcher(pattern || '');

    this.id = id;
    this.pathname = url;
    this.pattern = pattern;
    this.location = pathname;

    this.params = this.matcher(url) || {};
    this.query = query;
    this.hash = hash;
    this.state = state;

    this.created = Date.now();
    this.updated = null;

    this.transform = transform;
    this.runTransform();
  }

  runTransform() {
    if (typeof this.transform === 'function') {
      const transformed = this.transform(this);

      this.params = Object.assign(this.params, transformed.params);
      this.state = Object.assign(this.state, transformed.state);
    }
  }

  /**
   * @param {string} pattern The pattern to set for this route.
   * @param {Function} transform The transformer function.
   */
  setPattern(pattern, transform) {
    this.matcher = matcher(pattern);

    this.pattern = pattern;
    this.params = this.matcher(this.pathname) || {};

    this.transform = transform;
    this.runTransform();
  }
}

export default Route;
