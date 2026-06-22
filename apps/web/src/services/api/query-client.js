import { QueryClient } from '@tanstack/react-query';

/**
 * Configure global TanStack Query caching parameters.
 */
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
      staleTime: 5 * 60 * 1000, // 5 minutes cache TTL
    },
    mutations: {
      onError: (error) => {
        console.error('[React Query Mutation Error]:', error.message || error);
      },
    },
  },
});
