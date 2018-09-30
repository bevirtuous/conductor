import queryString from 'query-string';
import UrlPattern from 'url-pattern';

/**
 * Route Class
 */
class Route {
  /**
   * @param {Object} params The route parameters.
   * @param {string} params.pathname The pathname.
   * @param {string} params.pattern The pattern.
   * @param {Object} params.state The route state.
   */
  constructor(params) {
    const {
      id, pathname, pattern = null, state = {},
    } = params;
    const { query, url } = queryString.parseUrl(pathname);
    const urlPattern = pattern ? new UrlPattern(pattern) : null;

    this.id = id;
    this.pathname = pathname;
    this.pattern = pattern;

    this.params = urlPattern ? (urlPattern.match(url) || {}) : {};
    this.query = query;
    this.state = state;

    this.created = Date.now();
    this.updated = null;
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
