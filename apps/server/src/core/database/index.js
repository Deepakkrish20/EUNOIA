import { PrismaClient } from '@prisma/client';

/**
 * Configure database connections through unified Prisma instance.
 */
export const prisma = new PrismaClient({
  log: process.env.NODE_ENV === 'development' 
    ? ['query', 'info', 'warn', 'error'] 
    : ['error'],
});
