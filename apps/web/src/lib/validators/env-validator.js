/**
 * Frontend environment variables validator.
 * Assures configuration integrity for API endpoints and auth integrations.
 */
const requiredEnv = {
  VITE_API_URL: import.meta.env.VITE_API_URL,
  VITE_CLERK_PUBLISHABLE_KEY: import.meta.env.VITE_CLERK_PUBLISHABLE_KEY,
};

const missing = Object.entries(requiredEnv)
  .filter(([_, val]) => !val)
  .map(([key]) => key);

if (missing.length > 0) {
  console.warn(
    `⚠️ [EUNOIA Config Warning]: Missing required frontend environment variables: ${missing.join(', ')}`
  );
}

export const env = {
  apiUrl: import.meta.env.VITE_API_URL || 'http://localhost:5000',
  clerkPublishableKey: import.meta.env.VITE_CLERK_PUBLISHABLE_KEY || '',
};
