import { stack } from '@virtuous/conductor';

/**
 * @returns {Array}
 */
export function getStack() {
  return Array.from(stack.getAll().values());
}
