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

    if (typeof transform === 'function') {
      const transformed = transform(this);
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
   */
  setPattern = (pattern) => {
    if (!pattern) {
      return;
    }

    const urlPattern = new UrlPattern(pattern);

    this.pattern = pattern;
    this.params = urlPattern.match(this.pathname) || {};
  }

  /**
   * Updates the state of the Route by merging the given state with the existing state.
   * @param {Object} state The state to merge with the existing state.
   */
  set setState(state) {
    if (typeof state !== 'object' || Object.keys(state).length === 0) {
      return;
    }

    this.state = Object.assign(this.state, state);
    this.updated = Date.now();
  }
}

export default Route;
