import dotenv from 'dotenv';

dotenv.config();

const requiredEnvVars = ['DATABASE_URL', 'CLERK_SECRET_KEY', 'GEMINI_API_KEY'];
const missingEnvVars = requiredEnvVars.filter((varName) => !process.env[varName]);

if (missingEnvVars.length > 0) {
  console.error('❌ Configuration Error: Missing environment variables:');
  missingEnvVars.forEach((v) => console.error(`  - ${v}`));
  throw new Error(`Configuration Error: Missing environment variables: ${missingEnvVars.join(', ')}`);
}

/**
 * Validated backend configurations schema map
 */
export const config = {
  port: parseInt(process.env.PORT || '5000', 10),
  env: process.env.NODE_ENV || 'development',
  clerk: {
    publishableKey: process.env.CLERK_PUBLISHABLE_KEY || '',
    secretKey: process.env.CLERK_SECRET_KEY,
  },
  gemini: {
    apiKey: process.env.GEMINI_API_KEY,
  },
  databaseUrl: process.env.DATABASE_URL,
};
