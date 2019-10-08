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
   * @returns {Array|null}
   */
  first() {
    if (!this.stack.size) {
      return null;
    }

    return this.stack.entries().next().value;
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
   * @param {number} index The index to find.
   * @returns {Object|null}
   */
  getByIndex(index = null) {
    if (index === null) {
      return null;
    }

    if (index > this.stack.size - 1) {
      return null;
    }

    return this.stack.get(Array.from(this.stack.keys())[index]);
  }

  /**
   * @returns {Map}
   */
  getAll() {
    return this.stack;
  }

  /**
   * @returns {Array|null}
   */
  last() {
    if (!this.stack.size) {
      return null;
    }

    return Array.from(this.stack.entries()).pop();
  }

  /**
   * Clers the stack of all Routes.
   */
  clear() {
    this.stack.clear();
  }

  /**
   * @param {string} id The key to remove.
   */
  remove(id) {
    this.stack.delete(id);
  }

  /**
   * @param {Array} The key and value to reset to.
   */
  reset([id, entry] = this.first()) {
    this.stack.clear();
    this.add(id, entry);
  }

  /**
   * @param {string} id The key to update.
   * @param {Object} entry The value to update at the given id.
   */
  update(id, entry) {
    if (!id || !entry) {
      return;
    }

    if (!this.stack.has(id)) {
      return;
    }

    this.stack.set(id, entry);
  }
}

export default new Stack();
