// remove(id)
// reset()
// update
// first
// last

/**
 * The Stack class.
 */
class Stack {
  stack = new Map();

  /**
   * @param {string} id The key.
   * @param {Object} entry The entry to add.
   */
  add(id, entry) {
    if (!id || !entry) {
      return;
    }

    this.stack.set(id, entry);
  }

  /**
   * @param {string} id The key to lookup.
   * @returns {Object|null}
   */
  get(id) {
    if (!id || !this.stack.has(id)) {
      return null;
    }

    return this.stack.get(id);
  }

  /**
   * @returns {Map}
   */
  getAll() {
    return this.stack;
  }
}

export default new Stack();
