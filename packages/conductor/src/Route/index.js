import queryString from 'query-string';
import UrlPattern from 'url-pattern';

/**
 * Route Class
 */
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
    const urlPattern = pattern ? new UrlPattern(pattern) : null;

    this.id = id;
    this.pathname = url;
    this.pattern = pattern;
    this.location = pathname;

    this.params = urlPattern ? (urlPattern.match(url) || {}) : {};
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
      this.params = {
        ...this.params,
        ...transformed.params,
      };
      this.state = {
        ...this.state,
        ...transformed.state,
      };
    }
  }

  /**
   * @param {string} pattern The pattern to set for this route.
   * @param {Function} transform The transformer function.
   */
  setPattern(pattern, transform) {
    const urlPattern = new UrlPattern(pattern);

    this.pattern = pattern;
    this.params = urlPattern.match(this.pathname) || {};

    this.transform = transform;
    this.runTransform();
  }
}

export default Route;
