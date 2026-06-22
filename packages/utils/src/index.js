/**
 * Formats a date into a clean display string
 * @param {Date|string|number} date 
 * @returns {string}
 */
export function formatDate(date) {
  return new Date(date).toLocaleDateString();
}

/**
 * Delays execution for a specified amount of time (promisified setTimeout)
 * @param {number} ms 
 * @returns {Promise<void>}
 */
export function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * Truncates a string to a specified length and appends ellipses
 * @param {string} str 
 * @param {number} num 
 * @returns {string}
 */
export function truncateString(str, num) {
  if (!str) return '';
  if (str.length <= num) return str;
  return str.slice(0, num) + '...';
}
