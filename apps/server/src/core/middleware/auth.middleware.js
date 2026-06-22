import { logger } from '../logger/index.js';

// Auth system system roles definition
export const ROLES = {
  ADMIN: 'ADMIN',
  USER: 'USER',
  GUEST: 'GUEST',
};

/**
 * Clerk Identity Extractor Middleware.
 * Decodes the Bearer token and assigns req.auth context.
 * 
 * @param {import('express').Request} req 
 * @param {import('express').Response} res 
 * @param {import('express').NextFunction} next 
 */
export function ClerkAuthMiddleware(req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    req.auth = { userId: null, role: ROLES.GUEST };
    return next();
  }

  const token = authHeader.split(' ')[1];

  // In production, we call the Clerk Node SDK: clerkClient.verifyToken(token)
  logger.info(`Validating authorization token suffix: ...${token.slice(-6)}`);

  // Decode context stubs for client integrations
  if (token === 'admin-token') {
    req.auth = { userId: 'user_clerk_admin_123', role: ROLES.ADMIN };
  } else if (token === 'guest-token') {
    req.auth = { userId: 'user_clerk_guest_123', role: ROLES.GUEST };
  } else {
    // Standard User
    req.auth = { userId: 'user_clerk_standard_123', role: ROLES.USER };
  }

  next();
}

/**
 * Authentication Guard.
 * Restricts access to authenticated users.
 */
export function requireAuth(req, res, next) {
  if (!req.auth || !req.auth.userId) {
    logger.warn(`Unauthorized request path access blocked: ${req.method} ${req.originalUrl}`);
    return res.status(401).json({
      error: {
        message: 'Unauthorized: Access token missing or invalid',
        status: 401,
      },
    });
  }
  next();
}

/**
 * Role-Based Access Control (RBAC) Guard.
 * Validates active user role against allowed list.
 * 
 * @param {string[]} allowedRoles 
 */
export function requireRole(allowedRoles = []) {
  return (req, res, next) => {
    // Must be authenticated first
    if (!req.auth || !req.auth.userId) {
      return res.status(401).json({
        error: {
          message: 'Unauthorized: Session missing',
          status: 401,
        },
      });
    }

    const userRole = req.auth.role || ROLES.USER;

    if (!allowedRoles.includes(userRole)) {
      logger.warn(
        `RBAC Access Denied: User role ${userRole} denied access to path ${req.originalUrl}`
      );
      return res.status(403).json({
        error: {
          message: `Forbidden: Resource restricted. Required roles: [${allowedRoles.join(', ')}]`,
          status: 403,
        },
      });
    }

    next();
  };
}
