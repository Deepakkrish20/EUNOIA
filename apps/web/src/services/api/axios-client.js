import axios from 'axios';
import { env } from '../../lib/validators/env-validator.js';

export const axiosClient = axios.create({
  baseURL: env.apiUrl,
  headers: {
    'Content-Type': 'application/json',
  },
});

let getAuthTokenFn = null;

/**
 * Register a callback helper to retrieve active user JWT session tokens (e.g. from Clerk)
 * @param {Function} tokenFn 
 */
export function registerTokenResolver(tokenFn) {
  getAuthTokenFn = tokenFn;
}

// Request Interceptor: Inject Bearer Session token dynamically
axiosClient.interceptors.request.use(
  async (config) => {
    if (getAuthTokenFn) {
      try {
        const token = await getAuthTokenFn();
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
      } catch (error) {
        console.error('[Axios Request Interceptor] Failed to fetch session token:', error);
      }
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response Interceptor: Flatten payload formats and parse server exceptions
axiosClient.interceptors.response.use(
  (response) => response.data,
  (error) => {
    const apiError = error.response?.data?.error?.message || error.message || 'Server connection error';
    return Promise.reject(new Error(apiError));
  }
);
