import React from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ClerkProvider } from '@clerk/clerk-react';

// Centralised React Query client configuration
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
      staleTime: 5 * 60 * 1000,
    },
  },
});

const CLERK_PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY || 'pk_test_placeholder';

/**
 * Root Application Providers component
 * Houses context providers for Auth, API state, theme, etc.
 * @param {{ children: React.ReactNode }} props
 */
export default function AppProvider({ children }) {
  const isPlaceholderKey = 
    !CLERK_PUBLISHABLE_KEY || 
    CLERK_PUBLISHABLE_KEY === 'pk_test_placeholder' || 
    CLERK_PUBLISHABLE_KEY.includes('placeholder');

  if (isPlaceholderKey) {
    return (
      <QueryClientProvider client={queryClient}>
        {children}
      </QueryClientProvider>
    );
  }

  return (
    <ClerkProvider publishableKey={CLERK_PUBLISHABLE_KEY}>
      <QueryClientProvider client={queryClient}>
        {children}
      </QueryClientProvider>
    </ClerkProvider>
  );
}
