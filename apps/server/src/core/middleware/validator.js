import { logger } from '../logger/index.js';

/**
 * Reusable schema validator middleware.
 * Traps body payloads and matches them against validation schemas (Joi, Zod, or custom callback).
 * 
 * @param {object} validationSchema - validation rule parameters
 */
export function validateRequest(validationSchema) {
  return (req, res, next) => {
    if (!validationSchema) {
      return next();
    }

    logger.info(`Validating payload structure for path ${req.originalUrl}`);

    // Standard structural schema check stub (business-logic free)
    // In production: const { error } = validationSchema.safeParse(req.body);
    let validationError = null;

    // Simulated check: if schema is passed, we check fields presence if required
    if (validationSchema.requiredFields) {
      const missing = validationSchema.requiredFields.filter((f) => !req.body[f]);
      if (missing.length > 0) {
        validationError = `Missing required fields: ${missing.join(', ')}`;
      }
    }

    if (validationError) {
      logger.warn(`Payload validation failed on path ${req.originalUrl}: ${validationError}`);
      return res.status(400).json({
        error: {
          message: `Validation Error: ${validationError}`,
          status: 400,
        },
      });
    }

    next();
  };
}
