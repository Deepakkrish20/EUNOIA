import { useAuth as useClerkAuth, useUser } from '@clerk/clerk-react';

/**
 * Custom authentication hook wrapping Clerk provider hooks.
 * Abstracts identity checks and user details from business-logic components.
 * 
 * @returns {{ isAuthenticated: boolean, isLoading: boolean, user: object|null }}
 */
export function useAuth() {
  const { isSignedIn, isLoaded } = useClerkAuth();
  const { user } = useUser();

  return {
    isAuthenticated: !!isSignedIn,
    isLoading: !isLoaded,
    user: user ? {
      id: user.id,
      email: user.primaryEmailAddress?.emailAddress,
      fullName: user.fullName,
      imageUrl: user.imageUrl,
    } : null,
  };
}
