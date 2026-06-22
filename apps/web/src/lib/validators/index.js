/**
 * Common client-side validation rules (can connect to Zod or standard validator schemas).
 */

/**
 * Validate input as standard email
 * @param {string} email 
 * @returns {boolean}
 */
export function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}
