/**
 * BaseController class.
 * Establishes centralized methods for REST JSON schemas and async controllers wrapper.
 */
export class BaseController {
  /**
   * Send a successful JSON response
   * @param {import('express').Response} res 
   * @param {object|array} data 
   * @param {number} statusCode 
   */
  sendResponse(res, data, statusCode = 200) {
    return res.status(statusCode).json({
      data,
      status: statusCode,
      timestamp: new Date().toISOString(),
    });
  }

  /**
   * Helper decorator to automatically trap async controllers exceptions and forward to global error handler.
   * Eliminates boilerplate try-catch blocks in modules handlers.
   * 
   * @param {Function} asyncFn 
   */
  catchAsync(asyncFn) {
    return (req, res, next) => {
      asyncFn(req, res, next).catch(next);
    };
  }
}
