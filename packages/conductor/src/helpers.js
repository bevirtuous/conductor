/**
 * Tests if the prop is an object.
 * @param {*} prop The property to test.
 * @return {boolean}
 */
export const isObject = prop =>
  (typeof prop === 'object') && (prop !== null) && (prop.constructor === Object);
