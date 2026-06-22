import { logger } from '../logger/index.js';

/**
 * Middleware stub to validate Clerk JWT session headers.
 * (No business logic or API calls are implemented).
 */
export function requireAuth(req, res, next) {
  logger.info('Authenticating request session (Stub)...');
  next();
}

/**
 * Middleware stub for logging route request traces.
 */
export function requestLogger(req, res, next) {
  logger.info(`Request: ${req.method} ${req.originalUrl}`);
  next();
}
