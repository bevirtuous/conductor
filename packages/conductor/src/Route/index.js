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
    const { pathname, pattern = null, state = {} } = params;
    const { query, url } = queryString.parseUrl(pathname);
    const urlPattern = pattern ? new UrlPattern(pattern) : null;

    this.pathname = pathname;
    this.pattern = pattern;

    this.params = urlPattern ? (urlPattern.match(url) || {}) : {};
    this.query = query;
    this.state = state;

    this.created = Date.now();
    this.updated = null;
  }

  /**
   * @param {Object} state The state to merge with the existing state.
   */
  set setState(state) {
    if (typeof state !== 'object') {
      return;
    }

    this.state = {
      ...this.state,
      ...state,
    };

    this.updated = Date.now();
  }
}

export default Route;
