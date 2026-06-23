/**
 * Validation Middleware for Activity Queries.
 * Validates parameters like page and limit to ensure they are valid positive integers.
 */

export function validatePagination(req, res, next) {
  const { page, limit } = req.query;
  const errors = [];

  if (page !== undefined) {
    const parsedPage = parseInt(page, 10);
    if (isNaN(parsedPage) || parsedPage <= 0) {
      errors.push('Page must be a positive integer');
    }
  }

  if (limit !== undefined) {
    const parsedLimit = parseInt(limit, 10);
    if (isNaN(parsedLimit) || parsedLimit <= 0) {
      errors.push('Limit must be a positive integer');
    }
  }

  if (errors.length > 0) {
    return res.status(400).json({
      error: {
        message: `Validation Error: ${errors.join('; ')}`,
        status: 400,
      },
    });
  }

  next();
}
