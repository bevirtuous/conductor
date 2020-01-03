const stack = new Map();

/**
   * @param {string} id The key.
   * @param {Object} entry The entry to add.
   */
function add(id, entry) {
  if (!id || !entry) {
    return;
  }

  stack.set(id, entry);
}

/**
   * @returns {Array|null}
   */
function first() {
  if (!stack.size) {
    return null;
  }

  return stack.entries().next().value;
}

/**
   * @param {string} id The key to lookup.
   * @returns {Object|null}
   */
function get(id) {
  if (!id || !stack.has(id)) {
    return null;
  }

  return stack.get(id);
}

/**
   * @param {number} index The index to find.
   * @returns {Object|null}
   */
function getByIndex(index = null) {
  if (index === null) {
    return null;
  }

  if (index > stack.size - 1) {
    return null;
  }

  return stack.get(Array.from(stack.keys())[index]);
}

/**
   * @returns {Map}
   */
function getAll() {
  return this.stack;
}

/**
   * @returns {Array|null}
   */
function last() {
  if (!stack.size) {
    return null;
  }

  return Array.from(stack.entries()).pop();
}

/**
   * Clers the stack of all Routes.
   */
function clear() {
  stack.clear();
}

/**
   * @param {string} id The key to remove.
   */
function remove(id) {
  stack.delete(id);
}

/**
   * @param {string} id The key to update.
   * @param {Object} entry The value to update at the given id.
   */
function update(id, entry) {
  if (!id || !entry) {
    return;
  }

  if (!stack.has(id)) {
    return;
  }

  stack.set(id, entry);
}

export default {
  add,
  clear,
  first,
  get,
  getAll,
  getByIndex,
  last,
  remove,
  stack,
  update,
};
