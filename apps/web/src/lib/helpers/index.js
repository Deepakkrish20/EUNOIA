/**
 * Local helper functions for the web frontend interface.
 */

/**
 * Format raw numbers as dynamic currency figures
 * @param {number} value 
 * @returns {string}
 */
export function formatCurrency(value) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(value);
}
